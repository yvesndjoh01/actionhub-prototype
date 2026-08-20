export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
  if(!process.env.OPENAI_API_KEY) return res.status(503).json({error:"OPENAI_API_KEY is not configured"});
  const {problem="",users="",solution="",country="",language="en"}=req.body||{};
  const languageName=language==="fr"?"French":language==="ko"?"Korean":"English";
  const prompt=`You are an Action Plan Coach for a West African youth leadership and entrepreneurship program.
Respond in ${languageName}. Be practical, concise, implementation-oriented, and do not invent evidence.

Country: ${country}
Problem: ${problem}
Affected users: ${users}
Proposed solution: ${solution}

Return:
1. Refined problem statement
2. One 90-day SMART objective
3. Five measurable KPIs
4. Three milestones: Day 30, Day 60, Day 90
5. Key stakeholders and what to ask from each
6. Three risks and mitigation actions
7. Relevant SDGs
8. Three customer-discovery questions

Keep the answer under 500 words.`;
  try{
    const r=await fetch("https://api.openai.com/v1/responses",{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${process.env.OPENAI_API_KEY}`},
      body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-5.6-luna",input:prompt})
    });
    const data=await r.json();
    if(!r.ok)return res.status(r.status).json({error:data?.error?.message||"OpenAI request failed"});
    const text=(data.output||[]).flatMap(item=>item.content||[]).map(c=>c.text||"").filter(Boolean).join("\n");
    return res.status(200).json({text});
  }catch(e){return res.status(500).json({error:e.message});}
}