export default async function handler(req,res){
  if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:"OPENAI_API_KEY is not configured"});
  const {problem="",users="",solution="",country="",language="en"}=req.body||{};
  const languageName=language==="fr"?"French":language==="ko"?"Korean":"English";
  const prompt=`You are the KOICA ActionHub Action Plan Coach for a West African youth leadership and entrepreneurship program. Respond in ${languageName}. Be concise, practical and implementation-oriented. Do not invent evidence.\nCountry: ${country}\nProblem: ${problem}\nAffected users: ${users}\nProposed solution: ${solution}\n\nReturn:\n1. Refined problem statement\n2. One 90-day SMART objective\n3. Five measurable KPIs\n4. Three milestones: Day 30, Day 60, Day 90\n5. Key stakeholders and what to ask from each\n6. Three risks with mitigation\n7. Relevant SDGs\n8. Three customer-discovery questions\nKeep the answer under 500 words.`;
  try{
    const r=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-5.6-luna",input:prompt})});
    const data=await r.json();
    if(!r.ok)return res.status(r.status).json({error:data?.error?.message||"OpenAI request failed"});
    const text=(data.output||[]).flatMap(i=>i.content||[]).map(c=>c.text||"").filter(Boolean).join("\n");
    return res.status(200).json({text});
  }catch(e){return res.status(500).json({error:e.message})}
}
