const SUPABASE_URL=process.env.SUPABASE_URL||"https://sgwtigtlewfnxwujykxl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY=process.env.SUPABASE_PUBLISHABLE_KEY||"sb_publishable_uflUbcUwvZGLW4cRjCnZ_g_aXcpK54g";
const limiter=new Map();

async function verifyUser(req){
  const authorization=req.headers.authorization||"";
  if(!authorization.startsWith("Bearer "))return null;
  const r=await fetch(`${SUPABASE_URL}/auth/v1/user`,{headers:{apikey:SUPABASE_PUBLISHABLE_KEY,Authorization:authorization}});
  if(!r.ok)return null;
  return await r.json();
}
function allowRequest(userId){
  const now=Date.now(),windowMs=5*60*1000,max=30;
  const old=(limiter.get(userId)||[]).filter(t=>now-t<windowMs);
  if(old.length>=max){limiter.set(userId,old);return false;}
  old.push(now);limiter.set(userId,old);return true;
}
function outputText(data){return (data.output||[]).flatMap(i=>i.content||[]).map(c=>c.text||"").filter(Boolean).join("\n");}

export default async function handler(req,res){
  res.setHeader("Cache-Control","no-store");
  if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
  const user=await verifyUser(req);
  if(!user?.id)return res.status(401).json({error:"Authentication required"});
  if(!allowRequest(user.id))return res.status(429).json({error:"Too many translation requests. Please try again shortly."});
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:"Translation service is not configured"});

  const {target_language,texts}=req.body||{};
  if(!["fr","ko"].includes(target_language))return res.status(400).json({error:"Unsupported target language"});
  if(!Array.isArray(texts)||texts.length<1||texts.length>40)return res.status(400).json({error:"Send between 1 and 40 text items"});
  const cleaned=texts.map(x=>String(x??"").trim());
  if(cleaned.some(x=>x.length<1||x.length>2000)||cleaned.reduce((n,x)=>n+x.length,0)>12000)return res.status(400).json({error:"Translation batch is too large"});
  const languageName=target_language==="fr"?"French":"Korean";
  const schema={type:"object",properties:{translations:{type:"array",items:{type:"string"},minItems:cleaned.length,maxItems:cleaned.length}},required:["translations"],additionalProperties:false};
  const instructions=`Translate participant-authored implementation content into ${languageName}. Preserve meaning, numbers, units, acronyms, URLs, SDG references, and technical terms. Do not add explanations, claims, or new facts. Return exactly one translation for each source item in the same order. Do not translate proper names when they appear inside the text unless grammar requires transliteration.`;
  try{
    const r=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:process.env.OPENAI_TRANSLATION_MODEL||process.env.OPENAI_MODEL||"gpt-5.6-luna",reasoning:{effort:"none"},store:false,instructions,input:JSON.stringify({target_language:languageName,texts:cleaned}),text:{format:{type:"json_schema",name:"translation_batch",strict:true,schema}},max_output_tokens:5000})});
    const data=await r.json();
    if(!r.ok)return res.status(r.status).json({error:data?.error?.message||"Translation request failed"});
    const parsed=JSON.parse(outputText(data));
    if(!Array.isArray(parsed.translations)||parsed.translations.length!==cleaned.length)return res.status(502).json({error:"Translation response was incomplete"});
    return res.status(200).json({translations:parsed.translations});
  }catch(e){return res.status(500).json({error:"Translation service error"});}
}
