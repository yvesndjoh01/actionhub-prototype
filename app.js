const CFG=window.ACTIONHUB_CONFIG||{};
const hasSupabase=Boolean(CFG.SUPABASE_URL&&CFG.SUPABASE_ANON_KEY&&window.supabase);
const sb=hasSupabase?window.supabase.createClient(CFG.SUPABASE_URL,CFG.SUPABASE_ANON_KEY):null;

const FLAG_FILES={
  "Cameroon":"assets/flags/cameroon.svg",
  "Côte d'Ivoire":"assets/flags/cote-divoire.svg",
  "Ghana":"assets/flags/ghana.svg",
  "Nigeria":"assets/flags/nigeria.svg",
  "Senegal":"assets/flags/senegal.svg"
};
const COUNTRY_ALIASES={"CM":"Cameroon","CI":"Côte d'Ivoire","GH":"Ghana","NG":"Nigeria","SN":"Senegal","Cote d'Ivoire":"Côte d'Ivoire","Ivory Coast":"Côte d'Ivoire"};
const normalizeCountry=c=>COUNTRY_ALIASES[c]||c||"Cameroon";
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const initials=n=>(n||"Guest").split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase();
const flagPath=c=>FLAG_FILES[normalizeCountry(c)]||FLAG_FILES.Cameroon;
const flagHTML=(c,cls="flag")=>`<img class="${cls}" src="${flagPath(c)}" alt="${esc(normalizeCountry(c))} flag">`;

const T={
en:{unofficial:"Unofficial participant-built prototype",dashboard:"Dashboard",plans:"Cross-country Plans",myPlan:"My Action Plan",aiCoach:"AI Action Plan Coach",challenge:"90-Day Challenge",evidence:"Evidence Uploads",coordinator:"Coordinator Dashboard",login:"Login / Switch role",feedback:"Send Feedback",tagline:"From learning to action. From action to measurable impact.",impactChallenge:"90-DAY IMPACT CHALLENGE",heroTitle:"Turn every Action Plan into visible progress.",heroBody:"Track implementation, evidence, KPIs and collaboration across five West African countries.",openPlan:"Open My Action Plan",explorePlans:"Explore Country Plans",demoBannerTitle:"Prototype data:",demoBannerBody:"Cohort totals and sample participant projects are illustrative until the shared backend is connected.",activePlans:"Active plans",fiveCountries:"Across five countries",milestonesCompleted:"Milestones completed",implementation:"Implementation progress",evidenceItems:"Evidence items",photosDocs:"Photos & documents",collaborations:"Cross-country matches",peerLearning:"Peer learning",myProject:"MY PROJECT",onTrack:"On track",nextMilestone:"Next milestone",country:"Country",quickActions:"QUICK ACTIONS",whatNext:"What do you want to move forward?",generateSmart:"Generate SMART objective",updateMilestone:"Update milestone",uploadEvidence:"Upload evidence",findCollaborator:"Find collaborator",crossCountry:"CROSS-COUNTRY ACTION PLANS",discoverProjects:"Discover what participants are building.",allCountries:"All countries",allSectors:"All sectors",buildImplementable:"Build something you can actually implement.",projectTitle:"Project title",sector:"Sector",stage:"Stage",problem:"Problem",solution:"Proposed solution",beneficiaries:"Target beneficiaries",partners:"Partners / stakeholders",kpis:"Key KPIs",savePlan:"Save Action Plan",exportPdf:"Print / Export PDF",realAi:"AI ACTION PLAN COACH",coachTitle:"Turn a broad idea into a stronger implementation plan.",coachNote:"The secure AI endpoint activates when an OpenAI API key is configured on Vercel.",affected:"Who is affected?",askCoach:"Ask AI Coach",coachOutput:"COACH OUTPUT",ready:"Ready when you are.",coachPrompt:"The coach will suggest a SMART objective, KPIs, milestones, risks, stakeholder actions and SDG links.",oneCommitment:"One commitment. Four checkpoints. Visible progress.",showChange:"Show what changed — not only what you planned.",evidenceTitle:"Evidence title",evidenceType:"Evidence type",file:"File",note:"Short note",storageHint:"In demo mode, only file metadata is stored locally. Configure Supabase Storage for real uploads.",evidenceLibrary:"Evidence library",coordinatorTitle:"See participation, implementation and support needs at a glance.",participants:"Participants",plansSubmitted:"Plans submitted",atRisk:"Need follow-up",participant:"Participant",project:"Project",progress:"Progress",status:"Status",footerText:"Participant-built prototype developed during the KOICA Youth Leaders Program 2026–2027.",welcome:"Welcome to ActionHub",loginNote:"Use demo mode now, or configure Supabase for real accounts.",name:"Name",password:"Password",role:"Role",continueDemo:"Continue in demo mode",realLogin:"Sign in",signUp:"Create participant account",logout:"Sign out",feedbackTitle:"Help us improve ActionHub",feedbackNote:"Share what is useful, confusing, or missing.",feedbackType:"Feedback type",rating:"Overall usefulness",feedbackMessage:"Your feedback",submitFeedback:"Submit feedback"},
fr:{unofficial:"Prototype non officiel développé par un participant",dashboard:"Tableau de bord",plans:"Plans inter-pays",myPlan:"Mon plan d'action",aiCoach:"Coach IA du plan d'action",challenge:"Défi de 90 jours",evidence:"Preuves et fichiers",coordinator:"Tableau de bord coordinateur",login:"Connexion / Changer de rôle",feedback:"Envoyer un avis",tagline:"De l'apprentissage à l'action. De l'action à un impact mesurable.",impactChallenge:"DÉFI D'IMPACT DE 90 JOURS",heroTitle:"Transformez chaque plan d'action en progrès visible.",heroBody:"Suivez la mise en œuvre, les preuves, les KPI et la collaboration dans cinq pays d'Afrique de l'Ouest.",openPlan:"Ouvrir mon plan d'action",explorePlans:"Explorer les plans par pays",demoBannerTitle:"Données du prototype :",demoBannerBody:"Les totaux de cohorte et les projets exemples sont illustratifs jusqu'à la connexion de la base partagée.",activePlans:"Plans actifs",fiveCountries:"Dans cinq pays",milestonesCompleted:"Jalons terminés",implementation:"Progrès de mise en œuvre",evidenceItems:"Éléments de preuve",photosDocs:"Photos et documents",collaborations:"Collaborations inter-pays",peerLearning:"Apprentissage entre pairs",myProject:"MON PROJET",onTrack:"En bonne voie",nextMilestone:"Prochain jalon",country:"Pays",quickActions:"ACTIONS RAPIDES",whatNext:"Que souhaitez-vous faire avancer ?",generateSmart:"Générer un objectif SMART",updateMilestone:"Mettre à jour un jalon",uploadEvidence:"Téléverser une preuve",findCollaborator:"Trouver un collaborateur",crossCountry:"PLANS D'ACTION INTER-PAYS",discoverProjects:"Découvrez ce que les participants construisent.",allCountries:"Tous les pays",allSectors:"Tous les secteurs",buildImplementable:"Construisez quelque chose que vous pouvez réellement mettre en œuvre.",projectTitle:"Titre du projet",sector:"Secteur",stage:"Étape",problem:"Problème",solution:"Solution proposée",beneficiaries:"Bénéficiaires cibles",partners:"Partenaires / parties prenantes",kpis:"Indicateurs clés",savePlan:"Enregistrer le plan",exportPdf:"Imprimer / Exporter PDF",realAi:"COACH IA DU PLAN D'ACTION",coachTitle:"Transformez une idée générale en un meilleur plan de mise en œuvre.",coachNote:"L'IA sécurisée s'active lorsqu'une clé OpenAI est configurée sur Vercel.",affected:"Qui est concerné ?",askCoach:"Demander au coach IA",coachOutput:"RÉSULTAT DU COACH",ready:"Prêt quand vous l'êtes.",coachPrompt:"Le coach proposera un objectif SMART, des KPI, des jalons, des risques, des actions pour les parties prenantes et des liens avec les ODD.",oneCommitment:"Un engagement. Quatre étapes. Des progrès visibles.",showChange:"Montrez ce qui a changé — pas seulement ce qui était prévu.",evidenceTitle:"Titre de la preuve",evidenceType:"Type de preuve",file:"Fichier",note:"Note courte",storageHint:"En mode démo, seules les métadonnées sont conservées localement. Configurez Supabase Storage pour de vrais téléversements.",evidenceLibrary:"Bibliothèque de preuves",coordinatorTitle:"Visualisez la participation, la mise en œuvre et les besoins d'accompagnement.",participants:"Participants",plansSubmitted:"Plans soumis",atRisk:"À suivre",participant:"Participant",project:"Projet",progress:"Progrès",status:"Statut",footerText:"Prototype développé par un participant pendant le KOICA Youth Leaders Program 2026–2027.",welcome:"Bienvenue sur ActionHub",loginNote:"Utilisez le mode démo maintenant ou configurez Supabase pour de vrais comptes.",name:"Nom",password:"Mot de passe",role:"Rôle",continueDemo:"Continuer en mode démo",realLogin:"Se connecter",signUp:"Créer un compte participant",logout:"Se déconnecter",feedbackTitle:"Aidez-nous à améliorer ActionHub",feedbackNote:"Indiquez ce qui est utile, confus ou manquant.",feedbackType:"Type de retour",rating:"Utilité globale",feedbackMessage:"Votre avis",submitFeedback:"Envoyer"},
ko:{unofficial:"참가자가 만든 비공식 프로토타입",dashboard:"대시보드",plans:"국가 간 실행계획",myPlan:"내 실행계획",aiCoach:"AI 실행계획 코치",challenge:"90일 챌린지",evidence:"증빙 업로드",coordinator:"코디네이터 대시보드",login:"로그인 / 역할 변경",feedback:"피드백 보내기",tagline:"학습에서 실행으로, 실행에서 측정 가능한 성과로.",impactChallenge:"90일 임팩트 챌린지",heroTitle:"모든 실행계획을 눈에 보이는 진전으로 전환하세요.",heroBody:"서아프리카 5개국의 실행, 증빙, KPI와 협업을 추적합니다.",openPlan:"내 실행계획 열기",explorePlans:"국가별 계획 보기",demoBannerTitle:"프로토타입 데이터:",demoBannerBody:"공유 백엔드가 연결되기 전까지 코호트 합계와 샘플 프로젝트는 예시 데이터입니다.",activePlans:"활성 계획",fiveCountries:"5개국",milestonesCompleted:"완료된 마일스톤",implementation:"실행 진척도",evidenceItems:"증빙 자료",photosDocs:"사진 및 문서",collaborations:"국가 간 매칭",peerLearning:"동료 학습",myProject:"내 프로젝트",onTrack:"정상 진행",nextMilestone:"다음 마일스톤",country:"국가",quickActions:"빠른 실행",whatNext:"무엇을 진전시키고 싶으신가요?",generateSmart:"SMART 목표 생성",updateMilestone:"마일스톤 업데이트",uploadEvidence:"증빙 업로드",findCollaborator:"협업자 찾기",crossCountry:"국가 간 실행계획",discoverProjects:"참가자들이 추진 중인 프로젝트를 확인하세요.",allCountries:"모든 국가",allSectors:"모든 분야",buildImplementable:"실제로 실행할 수 있는 계획을 만드세요.",projectTitle:"프로젝트 제목",sector:"분야",stage:"단계",problem:"문제",solution:"제안 솔루션",beneficiaries:"대상 수혜자",partners:"파트너 / 이해관계자",kpis:"핵심 KPI",savePlan:"실행계획 저장",exportPdf:"인쇄 / PDF 내보내기",realAi:"AI 실행계획 코치",coachTitle:"아이디어를 더 강력한 실행계획으로 전환하세요.",coachNote:"Vercel에 OpenAI API 키를 설정하면 보안 AI 엔드포인트가 활성화됩니다.",affected:"누가 영향을 받나요?",askCoach:"AI 코치에게 묻기",coachOutput:"코치 결과",ready:"준비되었습니다.",coachPrompt:"SMART 목표, KPI, 마일스톤, 리스크, 이해관계자 행동 및 SDG 연계를 제안합니다.",oneCommitment:"하나의 약속. 네 번의 점검. 눈에 보이는 진전.",showChange:"계획만이 아니라 실제 변화를 보여주세요.",evidenceTitle:"증빙 제목",evidenceType:"증빙 유형",file:"파일",note:"간단한 메모",storageHint:"데모 모드에서는 파일 메타데이터만 로컬에 저장됩니다. 실제 업로드를 위해 Supabase Storage를 설정하세요.",evidenceLibrary:"증빙 라이브러리",coordinatorTitle:"참여, 실행 진척도 및 지원 필요사항을 한눈에 확인하세요.",participants:"참가자",plansSubmitted:"제출된 계획",atRisk:"후속지원 필요",participant:"참가자",project:"프로젝트",progress:"진척도",status:"상태",footerText:"KOICA Youth Leaders Program 2026–2027 기간 중 참가자가 개발한 프로토타입입니다.",welcome:"ActionHub에 오신 것을 환영합니다",loginNote:"지금은 데모 모드를 사용하거나 Supabase를 설정해 실제 계정을 사용할 수 있습니다.",name:"이름",password:"비밀번호",role:"역할",continueDemo:"데모 모드로 계속",realLogin:"로그인",signUp:"참가자 계정 만들기",logout:"로그아웃",feedbackTitle:"ActionHub 개선에 참여해 주세요",feedbackNote:"유용한 점, 혼란스러운 점, 필요한 기능을 알려주세요.",feedbackType:"피드백 유형",rating:"전체 유용성",feedbackMessage:"피드백",submitFeedback:"피드백 제출"}
};

const roleNames={
  en:{participant:"Participant",coordinator:"Coordinator",admin:"Administrator"},
  fr:{participant:"Participant",coordinator:"Coordinateur",admin:"Administrateur"},
  ko:{participant:"참가자",coordinator:"코디네이터",admin:"관리자"}
};

const demoPlans=[
{name:"Yves Frederic Ndjoh",country:"Cameroon",sector:"AgriTech",title:"SmartDry Cameroon",desc:"IoT-enabled hybrid solar drying and monitoring for farmers and processors.",progress:42},
{name:"Ama K.",country:"Ghana",sector:"FinTech",title:"YouthPay",desc:"Digital micro-payment and savings tools for informal youth businesses.",progress:66},
{name:"Moussa D.",country:"Senegal",sector:"Education",title:"SkillBridge",desc:"Mobile skills discovery and apprenticeship matching for youth.",progress:31},
{name:"Chiamaka O.",country:"Nigeria",sector:"Health",title:"CareLink",desc:"Community health referral and follow-up platform.",progress:58},
{name:"Awa K.",country:"Côte d'Ivoire",sector:"AgriTech",title:"AgriMarket CI",desc:"Market and logistics information for women-led agricultural SMEs.",progress:47},
{name:"Gerard A.",country:"Cameroon",sector:"Digital Services",title:"CivicFlow",desc:"Simple digital workflow tools for youth organizations.",progress:24},
{name:"Kwame B.",country:"Ghana",sector:"Energy",title:"SolarServe",desc:"Pay-per-use solar services for micro-enterprises.",progress:73},
{name:"Ibrahima S.",country:"Senegal",sector:"AgriTech",title:"FarmData",desc:"Low-cost field data capture for cooperatives.",progress:39},
{name:"Ngozi E.",country:"Nigeria",sector:"Education",title:"TutorLoop",desc:"Peer learning and tutoring marketplace for university students.",progress:19},
{name:"Koffi Y.",country:"Côte d'Ivoire",sector:"Energy",title:"ColdChain Lite",desc:"Solar-assisted cold-storage monitoring for produce traders.",progress:52}
];

const defaultState={
lang:"en",
user:{name:"Yves Frederic Ndjoh",country:"Cameroon",role:"participant",email:""},
plan:{projectTitle:"SmartDry Cameroon",country:"Cameroon",sector:"AgriTech",stage:"Prototype optimization",problem:"Smallholder farmers and food processors lose income because traditional drying is weather-dependent, unhygienic and difficult to control, while conventional dryers are often too costly or dependent on unreliable electricity.",solution:"Pilot an IoT-enabled Hybrid Intelligent Solar Dryer with sensor monitoring, crop-specific drying profiles, mobile alerts and data-based performance tracking.",beneficiaries:"Smallholder farmers, cooperatives and food processors",partners:"Farmers, cooperatives, agro-processors, local fabricators, KPS technical team",kpis:"20 user interviews; 5 drying trials; 2 pilot partners; drying time; user willingness to pay",sdgs:"SDG 2, 7, 8, 12, 13"},
milestones:[
{day:"Day 0",title:"Baseline & problem validation",desc:"Define pilot scope and current drying practices.",done:true},
{day:"Day 30",title:"Customer discovery",desc:"Complete at least 20 structured user interviews.",done:false},
{day:"Day 60",title:"Version 2 optimization",desc:"Refine airflow, controls, user interface and monitoring logic.",done:false},
{day:"Day 90",title:"Pilot readiness",desc:"Secure pilot partners and prepare monitored deployment.",done:false}
],
evidence:[{title:"Initial implementation roadmap",type:"Document",note:"Baseline 90-day action plan created.",fileName:"Action_Plan_v1.pdf",date:"2026-08-19"}]
};

let state=JSON.parse(localStorage.getItem("actionhub-v21"))||JSON.parse(localStorage.getItem("actionhub-v2"))||defaultState;
state.user=state.user||defaultState.user;
state.user.country=normalizeCountry(state.user.country);
state.user.name=(!state.user.name||state.user.name==="Ndjoh")?"Yves Frederic Ndjoh":state.user.name;
state.user.role=state.user.role||"participant";
state.plan=state.plan||defaultState.plan;
state.plan.country=normalizeCountry(state.plan.country);
state.milestones=state.milestones||defaultState.milestones;
state.evidence=state.evidence||defaultState.evidence;

const persist=()=>{localStorage.setItem("actionhub-v21",JSON.stringify(state));renderAll();};

document.querySelectorAll(".nav").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
document.getElementById("language").addEventListener("change",e=>{state.lang=e.target.value;localStorage.setItem("actionhub-v21",JSON.stringify(state));applyLanguage();renderUser();updateDataMode();});

function applyLanguage(){
  const L=T[state.lang]||T.en;
  document.documentElement.lang=state.lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(L[k])el.textContent=L[k];});
  document.getElementById("language").value=state.lang;
}

function showView(id){
  if(id==="coordinator"&&!["coordinator","admin"].includes(state.user.role)){
    alert(state.lang==="fr"?"Le tableau de bord coordinateur est réservé aux coordinateurs autorisés.":state.lang==="ko"?"코디네이터 대시보드는 승인된 코디네이터만 이용할 수 있습니다.":"Coordinator Dashboard is restricted to authorized coordinators.");
    return;
  }
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  document.querySelectorAll(".nav").forEach(v=>v.classList.toggle("active",v.dataset.view===id));
  document.getElementById(id).classList.add("active");
  const key={dashboard:"dashboard",plans:"plans",myplan:"myPlan",coach:"aiCoach",challenge:"challenge",evidence:"evidence",coordinator:"coordinator"}[id];
  document.getElementById("page-title").textContent=(T[state.lang]||T.en)[key]||key;
  document.getElementById("page-subtitle").textContent=(T[state.lang]||T.en).tagline;
  if(id==="plans")loadSharedPlans();
  if(id==="coordinator")renderCoordinator();
}

function hydrate(){
  ["projectTitle","country","sector","stage","problem","solution","beneficiaries","partners","kpis","sdgs"].forEach(k=>{const el=document.getElementById(k);if(el)el.value=state.plan[k]||"";});
  document.getElementById("coachProblem").value=state.plan.problem;
  document.getElementById("coachUsers").value=state.plan.beneficiaries;
  document.getElementById("coachSolution").value=state.plan.solution;
  document.getElementById("coachCountry").value=state.plan.country;
}

function calcProgress(){return Math.round(state.milestones.filter(m=>m.done).length/state.milestones.length*100);}

function renderUser(){
  const role=(roleNames[state.lang]||roleNames.en)[state.user.role]||state.user.role;
  document.getElementById("profile-name").textContent=state.user.name;
  document.getElementById("profile-meta").textContent=`${state.user.country} · ${role}`;
  document.getElementById("avatar").textContent=initials(state.user.name);
  document.getElementById("side-name").textContent=state.user.name;
  document.getElementById("side-role").textContent=`${state.user.country} · ${role}`;
  document.querySelectorAll(".coordinator-only").forEach(el=>el.style.display=["coordinator","admin"].includes(state.user.role)?"block":"none");
}

function updateDataMode(){
  const badge=document.getElementById("data-mode");
  const banner=document.getElementById("demo-banner");
  if(hasSupabase){
    badge.textContent="LIVE BACKEND";badge.className="mode live";
    if(banner)banner.style.display="none";
  }else{
    badge.textContent=state.lang==="fr"?"DONNÉES DÉMO":state.lang==="ko"?"데모 데이터":"DEMO DATA";
    badge.className="mode demo";if(banner)banner.style.display="block";
  }
}

function renderDashboard(){
  const p=calcProgress();
  document.getElementById("dash-project").textContent=state.plan.projectTitle;
  document.getElementById("dash-solution").textContent=state.plan.solution;
  document.getElementById("dash-progress").style.width=p+"%";
  document.getElementById("dash-next").textContent=(state.milestones.find(m=>!m.done)||{title:"Completed"}).title;
  document.getElementById("dash-country").innerHTML=`<span class="country-inline">${flagHTML(state.plan.country,"")} ${esc(state.plan.country)}</span>`;
  document.getElementById("stat-milestones").textContent=27+state.milestones.filter(m=>m.done).length;
  document.getElementById("stat-evidence").textContent=13+state.evidence.length;
}

async function savePlan(){
  ["projectTitle","country","sector","stage","problem","solution","beneficiaries","partners","kpis","sdgs"].forEach(k=>state.plan[k]=document.getElementById(k).value.trim());
  state.plan.country=normalizeCountry(state.plan.country);
  localStorage.setItem("actionhub-v21",JSON.stringify(state));
  if(hasSupabase){
    try{
      const {data:{user}}=await sb.auth.getUser();
      if(user){
        const {error}=await sb.from("action_plans").upsert({user_id:user.id,title:state.plan.projectTitle,country:state.plan.country,sector:state.plan.sector,stage:state.plan.stage,problem:state.plan.problem,solution:state.plan.solution,beneficiaries:state.plan.beneficiaries,partners:state.plan.partners,kpis:state.plan.kpis,sdgs:state.plan.sdgs,progress:calcProgress(),updated_at:new Date().toISOString()},{onConflict:"user_id"});
        if(error)console.warn(error);
      }
    }catch(e){console.warn(e);}
  }
  renderAll();alert(state.lang==="fr"?"Plan enregistré.":state.lang==="ko"?"실행계획이 저장되었습니다.":"Action Plan saved.");
}

function renderPlans(arr=demoPlans){
  const c=document.getElementById("country-filter").value,s=document.getElementById("sector-filter").value;
  const filtered=arr.filter(x=>(c==="all"||normalizeCountry(x.country)===c)&&(s==="all"||x.sector===s));
  document.getElementById("plans-grid").innerHTML=filtered.map(x=>`<article class="plan-card">${flagHTML(x.country)}<h3>${esc(x.title)}</h3><div class="meta"><span class="pill">${esc(normalizeCountry(x.country))}</span><span class="pill">${esc(x.sector)}</span><span class="pill">${Number(x.progress||0)}%</span></div><p>${esc(x.desc||x.solution||"")}</p><small>${esc(x.name||"Participant")}</small><button class="match" onclick="alert('Collaboration interest recorded in demo mode.')">⇄ Connect / Collaborate</button></article>`).join("")||"<p>No plans match these filters.</p>";
}

async function loadSharedPlans(){
  if(hasSupabase){
    try{
      const {data,error}=await sb.from("action_plans").select("*,profiles(full_name)").order("updated_at",{ascending:false}).limit(100);
      if(!error&&data?.length){
        renderPlans(data.map(x=>({name:x.profiles?.full_name||"Participant",country:normalizeCountry(x.country),sector:x.sector,title:x.title,desc:x.solution,progress:x.progress||0})));return;
      }
    }catch(e){console.warn(e);}
  }
  renderPlans(demoPlans);
}

function renderMilestones(){
  document.getElementById("milestone-list").innerHTML=state.milestones.map((m,i)=>`<article class="milestone ${m.done?"done":""}"><div class="day">${esc(m.day)}</div><div><strong>${esc(m.title)}</strong><p>${esc(m.desc)}</p></div><button onclick="toggleMilestone(${i})">${m.done?"Completed ✓":"Mark complete"}</button></article>`).join("");
}
function toggleMilestone(i){state.milestones[i].done=!state.milestones[i].done;persist();}

async function uploadEvidence(){
  const title=document.getElementById("evidenceTitle").value.trim();
  const type=document.getElementById("evidenceType").value;
  const note=document.getElementById("evidenceNote").value.trim();
  const file=document.getElementById("evidenceFile").files[0];
  if(!title)return alert("Add an evidence title.");
  const item={title,type,note,fileName:file?file.name:"No file attached",date:new Date().toISOString().slice(0,10)};
  if(hasSupabase&&file){
    try{
      const {data:{user}}=await sb.auth.getUser();
      if(user){
        const path=`${user.id}/${Date.now()}-${file.name.replace(/\s+/g,"_")}`;
        const {error:upError}=await sb.storage.from("evidence").upload(path,file);
        if(!upError){
          await sb.from("evidence").insert({user_id:user.id,title,type,note,file_path:path,file_name:file.name});
        }
      }
    }catch(e){console.warn(e);}
  }
  state.evidence.unshift(item);persist();
  document.getElementById("evidenceTitle").value="";document.getElementById("evidenceNote").value="";document.getElementById("evidenceFile").value="";
}

function renderEvidence(){
  document.getElementById("evidence-list").innerHTML=state.evidence.map(e=>`<div class="evidence-item"><div class="evidence-icon">${e.type==="Photo"?"🖼️":"📄"}</div><div><strong>${esc(e.title)}</strong><small>${esc(e.type)} · ${esc(e.fileName)} · ${esc(e.date)}</small><p>${esc(e.note)}</p></div></div>`).join("");
  document.getElementById("storage-hint").style.display=hasSupabase?"none":"block";
}

async function runCoach(){
  const out=document.getElementById("coach-output");
  const payload={problem:document.getElementById("coachProblem").value,users:document.getElementById("coachUsers").value,solution:document.getElementById("coachSolution").value,country:document.getElementById("coachCountry").value,language:state.lang};
  out.innerHTML="<h3>Thinking…</h3><p>Building a practical action plan.</p>";
  try{
    const r=await fetch("/api/coach",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
    if(r.ok){const j=await r.json();if(j.text){out.innerHTML=`<span class="kicker">${(T[state.lang]||T.en).coachOutput}</span><div>${esc(j.text).replace(/\n/g,"<br>")}</div>`;return;}}
  }catch(e){}
  localCoach(payload);
}

function localCoach(p){
  const smart=state.lang==="fr"?`Dans les 90 jours, valider et préparer un pilote de la solution avec au moins 20 ${p.users}, en utilisant des retours structurés et des données mesurables.`:state.lang==="ko"?`90일 이내에 최소 20명의 ${p.users}을 대상으로 솔루션을 검증하고 파일럿을 준비하며, 구조화된 피드백과 측정 가능한 데이터를 활용합니다.`:`Within 90 days, validate and prepare a pilot of the solution with at least 20 ${p.users}, using structured feedback and measurable data.`;
  document.getElementById("coach-output").innerHTML=`<span class="kicker">LOCAL COACH FALLBACK</span><h4>SMART objective</h4><p>${esc(smart)}</p><h4>KPIs</h4><ul><li>20+ target users interviewed</li><li>5+ tests or demonstrations</li><li>Problem-solution fit score</li><li>Pilot partners secured</li><li>One technical or business performance metric</li></ul><h4>Milestones</h4><ul><li>Day 30: customer discovery</li><li>Day 60: MVP refinement</li><li>Day 90: pilot readiness</li></ul><h4>Risks</h4><ul><li>Low adoption → co-design with users</li><li>Affordability → test leasing or pay-per-use</li><li>Reliability → start with a monitored pilot</li></ul>`;
}

async function renderCoordinator(){
  if(!["coordinator","admin"].includes(state.user.role))return;
  const c=document.getElementById("coord-country").value;
  let arr=demoPlans.filter(x=>c==="all"||normalizeCountry(x.country)===c);
  if(hasSupabase){
    try{
      let q=sb.from("action_plans").select("*,profiles(full_name,country)");
      if(c!=="all")q=q.eq("country",c);
      const {data,error}=await q.order("updated_at",{ascending:false});
      if(!error&&data)arr=data.map(x=>({name:x.profiles?.full_name||"Participant",country:normalizeCountry(x.country||x.profiles?.country),title:x.title,progress:x.progress||0}));
    }catch(e){console.warn(e);}
  }
  document.getElementById("coord-parts").textContent=arr.length;
  document.getElementById("coord-plans").textContent=arr.length;
  document.getElementById("coord-risk").textContent=arr.filter(x=>(x.progress||0)<35).length;
  document.getElementById("coord-evidence").textContent=arr.length+4;
  document.getElementById("coord-table").innerHTML=arr.map(x=>`<tr><td>${esc(x.name)}</td><td><span class="td-country">${flagHTML(x.country,"")}${esc(normalizeCountry(x.country))}</span></td><td>${esc(x.title)}</td><td>${Number(x.progress||0)}%</td><td><span class="dot ${(x.progress||0)<25?"risk":(x.progress||0)<40?"warn":"ok"}"></span>${(x.progress||0)<25?"At risk":(x.progress||0)<40?"Follow-up":"On track"}</td></tr>`).join("");
}

function openLogin(){document.getElementById("login-modal").classList.remove("hidden");}
function closeLogin(){document.getElementById("login-modal").classList.add("hidden");}
function openFeedback(){document.getElementById("feedback-modal").classList.remove("hidden");}
function closeFeedback(){document.getElementById("feedback-modal").classList.add("hidden");}

function demoLogin(){
  state.user={name:document.getElementById("login-name").value.trim()||"Participant",email:document.getElementById("login-email").value.trim(),country:normalizeCountry(document.getElementById("login-country").value),role:document.getElementById("login-role").value};
  persist();closeLogin();
}

async function realLogin(){
  if(!hasSupabase)return alert("Supabase is not configured yet.");
  const email=document.getElementById("login-email").value.trim(),password=document.getElementById("login-password").value;
  if(!email||!password)return alert("Enter email and password.");
  const {data,error}=await sb.auth.signInWithPassword({email,password});
  if(error)return alert(error.message);
  const {data:profile}=await sb.from("profiles").select("*").eq("id",data.user.id).single();
  state.user={name:profile?.full_name||email,email,country:normalizeCountry(profile?.country),role:profile?.role||"participant"};
  persist();closeLogin();
}

async function realSignUp(){
  if(!hasSupabase)return alert("Supabase is not configured yet.");
  const name=document.getElementById("login-name").value.trim()||"Participant";
  const email=document.getElementById("login-email").value.trim(),password=document.getElementById("login-password").value,country=normalizeCountry(document.getElementById("login-country").value);
  if(!email||!password)return alert("Enter email and password.");
  const {error}=await sb.auth.signUp({email,password,options:{data:{full_name:name,country,role:"participant"}}});
  if(error)return alert(error.message);
  alert("Participant account created. Check your email if confirmation is enabled, then sign in.");
}

async function realLogout(){
  if(hasSupabase)await sb.auth.signOut();
  state.user={name:"Yves Frederic Ndjoh",country:"Cameroon",role:"participant",email:""};persist();closeLogin();
}

async function submitFeedback(){
  const type=document.getElementById("feedback-type").value,rating=Number(document.getElementById("feedback-rating").value),message=document.getElementById("feedback-message").value.trim();
  if(!message)return alert("Please write a short feedback message.");
  const item={type,rating,message,user_name:state.user.name,country:state.user.country,created_at:new Date().toISOString()};
  const saved=JSON.parse(localStorage.getItem("actionhub-feedback")||"[]");saved.unshift(item);localStorage.setItem("actionhub-feedback",JSON.stringify(saved));
  if(hasSupabase){
    try{
      const {data:{user}}=await sb.auth.getUser();
      await sb.from("feedback").insert({user_id:user?.id||null,type,rating,message,country:state.user.country});
    }catch(e){console.warn(e);}
  }
  document.getElementById("feedback-message").value="";closeFeedback();
  alert(state.lang==="fr"?"Merci pour votre retour !":state.lang==="ko"?"피드백 감사합니다!":"Thank you for your feedback!");
}

function renderAll(){
  hydrate();applyLanguage();renderUser();updateDataMode();renderDashboard();renderPlans();renderMilestones();renderEvidence();
  if(["coordinator","admin"].includes(state.user.role))renderCoordinator();
}
renderAll();

if(hasSupabase){
  sb.auth.onAuthStateChange(async(_event,session)=>{
    if(session?.user){
      const {data:profile}=await sb.from("profiles").select("*").eq("id",session.user.id).single();
      if(profile){state.user={name:profile.full_name||session.user.email,email:session.user.email,country:normalizeCountry(profile.country),role:profile.role||"participant"};localStorage.setItem("actionhub-v21",JSON.stringify(state));renderAll();}
    }
  });
}