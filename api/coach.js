const SUPABASE_URL=process.env.SUPABASE_URL||"https://sgwtigtlewfnxwujykxl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY=process.env.SUPABASE_PUBLISHABLE_KEY||"sb_publishable_uflUbcUwvZGLW4cRjCnZ_g_aXcpK54g";
const limiter=new Map();
async function verifyUser(req){const authorization=req.headers.authorization||"";if(!authorization.startsWith("Bearer "))return null;const r=await fetch(`${SUPABASE_URL}/auth/v1/user`,{headers:{apikey:SUPABASE_PUBLISHABLE_KEY,Authorization:authorization}});if(!r.ok)return null;return await r.json();}
function allowRequest(userId){const now=Date.now(),windowMs=10*60*1000,max=12;const old=(limiter.get(userId)||[]).filter(t=>now-t<windowMs);if(old.length>=max){limiter.set(userId,old);return false;}old.push(now);limiter.set(userId,old);return true;}
function textOut(data){return (data.output||[]).flatMap(i=>i.content||[]).map(c=>c.text||"").filter(Boolean).join("\n");}
export default async function handler(req,res){
  res.setHeader("Cache-Control","no-store");
  if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
  const user=await verifyUser(req);if(!user?.id)return res.status(401).json({error:"Authentication required"});if(!allowRequest(user.id))return res.status(429).json({error:"Too many coach requests. Please try again shortly."});
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:"OPENAI_API_KEY is not configured"});
  let {problem="",users="",solution="",country="",language="en"}=req.body||{};problem=String(problem).slice(0,3000);users=String(users).slice(0,1200);solution=String(solution).slice(0,3000);country=String(country).slice(0,100);language=["en","fr","ko"].includes(language)?language:"en";
  const languageName=language==="fr"?"French":language==="ko"?"Korean":"English";
  const prompt=`You are the KOICA ActionHub Action Plan Coach for a West African youth leadership and entrepreneurship program. Respond in ${languageName}. Be concise, practical and implementation-oriented. Do not invent evidence.\nCountry: ${country}\nProblem: ${problem}\nAffected users: ${users}\nProposed solution: ${solution}\n\nReturn:\n1. Refined problem statement\n2. One 90-day SMART objective\n3. Five measurable KPIs\n4. Three milestones: Day 30, Day 60, Day 90\n5. Key stakeholders and what to ask from each\n6. Three risks with mitigation\n7. Relevant SDGs\n8. Three customer-discovery questions\nKeep the answer under 500 words.`;
  try{const r=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-5.6-luna",reasoning:{effort:"none"},store:false,input:prompt,max_output_tokens:1600})});const data=await r.json();if(!r.ok)return res.status(r.status).json({error:data?.error?.message||"OpenAI request failed"});return res.status(200).json({text:textOut(data)});}catch(e){return res.status(500).json({error:"Coach service error"});}
}
