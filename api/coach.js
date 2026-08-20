export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  if(!process.env.OPENAI_API_KEY) return res.status(503).json({error:'OPENAI_API_KEY is not configured'});
  const {problem='',users='',solution='',country='',language='en'}=req.body||{};
  const languageName=language==='fr'?'French':language==='ko'?'Korean':'English';
  const input=`You are an Action Plan Coach for a West African youth leadership and entrepreneurship program. Respond in ${languageName}. Be practical and concise. Do not invent evidence.\nCountry: ${country}\nProblem: ${problem}\nAffected users: ${users}\nProposed solution: ${solution}\n\nReturn: 1) refined problem statement, 2) one 90-day SMART objective, 3) five measurable KPIs, 4) Day 30/60/90 milestones, 5) key stakeholders and asks, 6) three risks with mitigation, 7) relevant SDGs, 8) three customer-discovery questions. Keep under 500 words.`;
  try{
    const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-5.6-luna',input})});
    const data=await r.json();
    if(!r.ok) return res.status(r.status).json({error:data?.error?.message||'OpenAI request failed'});
    const text=data.output_text||(data.output||[]).flatMap(i=>i.content||[]).map(c=>c.text||'').join('\n');
    res.status(200).json({text});
  }catch(e){res.status(500).json({error:e.message});}
}
