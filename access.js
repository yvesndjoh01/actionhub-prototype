// ACTIONHUB ACCESS GATE V1 - 2026-08-21
// Loads after app.js and profile.js. Guests see only the access landing page.

const AH_ACCESS_COPY={
  en:{
    program:'Youth Leaders Program · West Africa 2026–2027',
    lang:'Language',eyebrow:'KOICA YOUTH LEADERS PROGRAM · SECURE PARTICIPANT ACCESS',
    title:'Turn your Action Plan into measurable change.',
    body:'A secure implementation workspace where programme participants build 90-day missions, document evidence and collaborate across West Africa.',
    signin:'Sign in',create:'Create participant account',
    privacy:'Participant profiles, Action Plans, evidence and the Country Network are available only after authentication.',
    inside:'INSIDE ACTIONHUB',insideTitle:'From programme learning to implementation.',
    f1:'Build your Action Plan',f1b:'Define the problem, solution, users, partners, KPIs and SDGs.',
    f2:'Run a 90-day mission',f2b:'Move through clear checkpoints from validation to pilot readiness.',
    f3:'Document evidence',f3b:'Capture field learning, test results, interviews and partnerships.',
    f4:'Collaborate across borders',f4b:'Discover fellows and projects across the five-country network.',
    countries:'Five-country network',
    footer:'Participant-built implementation platform for the KOICA Youth Leaders Program.',
    protected:'Authenticated participant access',
    loginTitle:'Sign in to ActionHub',loginNote:'Enter the email and password linked to your participant account.',
    signupTitle:'Create your participant account',signupNote:'Register with your name, country, email and password. You can complete your profile after signing in.',
    switchCreate:'New to ActionHub? Create an account',switchLogin:'Already registered? Sign in',
    checking:'Checking secure access…',unavailable:'Secure sign-in is temporarily unavailable.'
  },
  fr:{
    program:"Programme des jeunes leaders · Afrique de l'Ouest 2026–2027",
    lang:'Langue',eyebrow:'KOICA YOUTH LEADERS PROGRAM · ACCÈS PARTICIPANT SÉCURISÉ',
    title:"Transformez votre plan d'action en changement mesurable.",
    body:"Un espace de mise en œuvre sécurisé où les participants construisent une mission de 90 jours, documentent les preuves et collaborent à travers l'Afrique de l'Ouest.",
    signin:'Se connecter',create:'Créer un compte participant',
    privacy:"Les profils, plans d'action, preuves et le Réseau des pays sont accessibles uniquement après authentification.",
    inside:'DANS ACTIONHUB',insideTitle:"De l'apprentissage du programme à la mise en œuvre.",
    f1:"Construire votre plan d'action",f1b:'Définissez le problème, la solution, les utilisateurs, partenaires, KPI et ODD.',
    f2:'Mener une mission de 90 jours',f2b:"Progressez par étapes claires, de la validation jusqu'à la préparation du pilote.",
    f3:'Documenter les preuves',f3b:'Capturez les apprentissages terrain, tests, entretiens et partenariats.',
    f4:'Collaborer au-delà des frontières',f4b:'Découvrez les participants et projets du réseau des cinq pays.',
    countries:'Réseau de cinq pays',
    footer:'Plateforme de mise en œuvre créée par un participant pour le KOICA Youth Leaders Program.',
    protected:'Accès participant authentifié',
    loginTitle:'Se connecter à ActionHub',loginNote:'Saisissez l’e-mail et le mot de passe liés à votre compte participant.',
    signupTitle:'Créer votre compte participant',signupNote:'Inscrivez votre nom, pays, e-mail et mot de passe. Vous pourrez compléter votre profil après connexion.',
    switchCreate:'Nouveau sur ActionHub ? Créer un compte',switchLogin:'Déjà inscrit ? Se connecter',
    checking:'Vérification de l’accès sécurisé…',unavailable:'La connexion sécurisée est temporairement indisponible.'
  },
  ko:{
    program:'서아프리카 청년 리더 프로그램 · 2026–2027',
    lang:'언어',eyebrow:'KOICA YOUTH LEADERS PROGRAM · 안전한 참가자 접속',
    title:'실행계획을 측정 가능한 변화로 전환하세요.',
    body:'프로그램 참가자가 90일 미션을 만들고, 증빙을 기록하며, 서아프리카 전역에서 협업하는 안전한 실행 워크스페이스입니다.',
    signin:'로그인',create:'참가자 계정 만들기',
    privacy:'참가자 프로필, 실행계획, 증빙 및 국가 네트워크는 인증 후에만 이용할 수 있습니다.',
    inside:'ACTIONHUB 내부',insideTitle:'프로그램 학습에서 실제 실행으로.',
    f1:'실행계획 작성',f1b:'문제, 솔루션, 사용자, 파트너, KPI 및 SDG를 정의합니다.',
    f2:'90일 미션 실행',f2b:'검증부터 파일럿 준비까지 명확한 체크포인트로 진행합니다.',
    f3:'증빙 기록',f3b:'현장 학습, 테스트 결과, 인터뷰 및 파트너십을 기록합니다.',
    f4:'국경을 넘는 협업',f4b:'5개국 네트워크의 참가자와 프로젝트를 발견합니다.',
    countries:'5개국 네트워크',
    footer:'KOICA Youth Leaders Program을 위한 참가자 구축 실행 플랫폼.',
    protected:'인증된 참가자 접속',
    loginTitle:'ActionHub 로그인',loginNote:'참가자 계정에 등록된 이메일과 비밀번호를 입력하세요.',
    signupTitle:'참가자 계정 만들기',signupNote:'이름, 국가, 이메일, 비밀번호로 등록하세요. 로그인 후 프로필을 완성할 수 있습니다.',
    switchCreate:'처음이신가요? 계정 만들기',switchLogin:'이미 등록했나요? 로그인',
    checking:'안전한 접속을 확인하는 중…',unavailable:'보안 로그인을 일시적으로 사용할 수 없습니다.'
  }
};

function ahAccessLang(){return (typeof state!=='undefined'&&state?.lang)||'en';}
function ahAccessCopy(){return AH_ACCESS_COPY[ahAccessLang()]||AH_ACCESS_COPY.en;}

function ahAccessCreateGate(){
  let gate=document.getElementById('ah-access-gate');
  if(gate)return gate;
  gate=document.createElement('section');
  gate.id='ah-access-gate';
  gate.className='ah-access-gate';
  document.body.insertBefore(gate,document.body.firstChild);
  return gate;
}

function ahAccessRender(){
  if(document.body.classList.contains('ah-authenticated'))return;
  const c=ahAccessCopy();
  const gate=ahAccessCreateGate();
  gate.innerHTML=`
    <header class="ah-access-topbar">
      <div class="ah-access-brand">
        <img src="assets/actionhub-mark.svg" alt="">
        <div class="ah-access-brand-copy"><strong><em>KOICA</em> ActionHub</strong><small>${c.program}</small></div>
      </div>
      <label class="ah-access-lang"><span>${c.lang}</span><select id="ah-access-language"><option value="en">English</option><option value="fr">Français</option><option value="ko">한국어</option></select></label>
    </header>
    <div class="ah-access-main">
      <section class="ah-access-hero">
        <div class="ah-access-eyebrow">${c.eyebrow}</div>
        <h1>${c.title}</h1>
        <p>${c.body}</p>
        <div class="ah-access-actions">
          <button class="ah-access-btn primary" type="button" onclick="ahAccessOpenAuth('signin')">${c.signin}</button>
          <button class="ah-access-btn secondary" type="button" onclick="ahAccessOpenAuth('signup')">${c.create}</button>
        </div>
        <div class="ah-access-privacy"><span class="ah-access-lock">✓</span><span>${c.privacy}</span></div>
      </section>
      <aside class="ah-access-side">
        <div class="ah-access-side-kicker">${c.inside}</div>
        <h2>${c.insideTitle}</h2>
        <div class="ah-access-flow">
          <div class="ah-access-flow-item"><span>01</span><div><b>${c.f1}</b><p>${c.f1b}</p></div></div>
          <div class="ah-access-flow-item"><span>02</span><div><b>${c.f2}</b><p>${c.f2b}</p></div></div>
          <div class="ah-access-flow-item"><span>03</span><div><b>${c.f3}</b><p>${c.f3b}</p></div></div>
          <div class="ah-access-flow-item"><span>04</span><div><b>${c.f4}</b><p>${c.f4b}</p></div></div>
        </div>
        <div class="ah-access-countries">
          <div class="ah-access-countries-label">${c.countries}</div>
          <div class="ah-access-flags">
            <span class="ah-access-flag"><img src="assets/flags/cameroon.svg" alt="">Cameroon</span>
            <span class="ah-access-flag"><img src="assets/flags/cote-divoire.svg" alt="">Côte d'Ivoire</span>
            <span class="ah-access-flag"><img src="assets/flags/ghana.svg" alt="">Ghana</span>
            <span class="ah-access-flag"><img src="assets/flags/nigeria.svg" alt="">Nigeria</span>
            <span class="ah-access-flag"><img src="assets/flags/senegal.svg" alt="">Senegal</span>
          </div>
        </div>
      </aside>
    </div>
    <footer class="ah-access-footer"><span><strong>KOICA ActionHub</strong> · ${c.footer}</span><span>${c.protected}</span></footer>`;
  const select=document.getElementById('ah-access-language');
  if(select){
    select.value=ahAccessLang();
    select.onchange=e=>{
      if(typeof state!=='undefined')state.lang=e.target.value;
      try{if(typeof saveLocal==='function')saveLocal();}catch(_e){}
      const mainLanguage=document.getElementById('language');if(mainLanguage)mainLanguage.value=e.target.value;
      try{if(typeof applyLanguage==='function')applyLanguage();}catch(_e){}
      ahAccessRender();
    };
  }
}

function ahAccessSetMode(mode){
  const c=ahAccessCopy();
  const modal=document.getElementById('login-modal');
  if(!modal)return;
  const card=modal.querySelector('.modal-card');
  const title=card?.querySelector('h2');
  const note=card?.querySelector('p');
  const name=document.getElementById('login-name');
  const country=document.getElementById('login-country');
  const nameLabel=name?.closest('label');
  const countryRow=country?.closest('.context-row');
  const loginButton=card?.querySelector('button[onclick="realLogin()"]');
  const signupButton=card?.querySelector('button[onclick="realSignUp()"]');
  const signout=document.getElementById('signout-button');
  if(signout)signout.style.display='none';
  let switcher=document.getElementById('ah-auth-switch');
  if(!switcher){
    switcher=document.createElement('button');switcher.id='ah-auth-switch';switcher.type='button';switcher.className='ah-auth-switch';
    card?.querySelector('.modal-actions')?.insertAdjacentElement('afterend',switcher);
  }
  if(mode==='signup'){
    if(title)title.textContent=c.signupTitle;if(note)note.textContent=c.signupNote;
    if(nameLabel)nameLabel.style.display='flex';if(countryRow)countryRow.style.display='flex';
    if(loginButton)loginButton.style.display='none';if(signupButton){signupButton.style.display='inline-flex';signupButton.className='btn solid';}
    switcher.textContent=c.switchLogin;switcher.onclick=()=>ahAccessSetMode('signin');setTimeout(()=>name?.focus(),30);
  }else{
    if(title)title.textContent=c.loginTitle;if(note)note.textContent=c.loginNote;
    if(nameLabel)nameLabel.style.display='none';if(countryRow)countryRow.style.display='none';
    if(signupButton)signupButton.style.display='none';if(loginButton){loginButton.style.display='inline-flex';loginButton.className='btn solid';}
    switcher.textContent=c.switchCreate;switcher.onclick=()=>ahAccessSetMode('signup');setTimeout(()=>document.getElementById('login-email')?.focus(),30);
  }
}

function ahAccessOpenAuth(mode){
  if(typeof openLogin==='function')openLogin();
  ahAccessSetMode(mode==='signup'?'signup':'signin');
}

function ahAccessApplySession(session){
  const signed=Boolean(session?.user);
  document.body.classList.toggle('ah-authenticated',signed);
  document.body.classList.toggle('ah-guest',!signed);
  const gate=document.getElementById('ah-access-gate');
  if(signed){if(gate)gate.remove();}
  else ahAccessRender();
}

async function ahAccessInit(){
  if(typeof hasSupabase==='undefined'||!hasSupabase||typeof sb==='undefined'||!sb){
    document.body.classList.add('ah-guest');ahAccessRender();
    return;
  }
  try{
    const {data:{session}}=await sb.auth.getSession();
    ahAccessApplySession(session);
  }catch(e){
    console.warn('ActionHub access check:',e);document.body.classList.add('ah-guest');ahAccessRender();
  }
  sb.auth.onAuthStateChange((_event,session)=>setTimeout(()=>ahAccessApplySession(session),0));
}

ahAccessInit();
