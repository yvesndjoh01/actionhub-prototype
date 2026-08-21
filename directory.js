// ACTIONHUB PARTICIPANT DIRECTORY V1 - 2026-08-21
// Read-only cohort participant profiles. Load AFTER access.js.
// Does not modify authentication, profile editing, collaboration persistence, or Action Plan saving.

const AH_DIRECTORY_COPY = {
  en: {
    profile: 'PARTICIPANT PROFILE',
    viewProfile: 'View profile',
    participantProfile: 'Participant profile',
    city: 'City',
    organization: 'Organisation / company',
    title: 'Professional title',
    focus: 'Focus area',
    languages: 'Languages',
    interests: 'Collaboration interests',
    bio: 'About',
    linkedin: 'LinkedIn',
    actionPlan: 'ACTION PLAN',
    sector: 'Sector',
    stage: 'Stage',
    progress: 'Implementation progress',
    sdgs: 'SDGs',
    solution: 'What they are implementing',
    edit: 'Edit my profile',
    connect: 'Connect',
    requested: 'Request sent',
    connected: 'Connected',
    unavailable: 'This participant has not completed their profile yet.',
    noValue: 'Not added yet',
    privacy: 'Private account information such as email and date of birth is not shown to other participants.',
    loadError: 'This participant profile could not be loaded. Please try again.'
  },
  fr: {
    profile: 'PROFIL PARTICIPANT',
    viewProfile: 'Voir le profil',
    participantProfile: 'Profil participant',
    city: 'Ville',
    organization: 'Organisation / entreprise',
    title: 'Fonction professionnelle',
    focus: "Domaine d'intérêt",
    languages: 'Langues',
    interests: 'Intérêts de collaboration',
    bio: 'À propos',
    linkedin: 'LinkedIn',
    actionPlan: "PLAN D'ACTION",
    sector: 'Secteur',
    stage: 'Étape',
    progress: 'Progrès de mise en œuvre',
    sdgs: 'ODD',
    solution: 'Ce que le participant met en œuvre',
    edit: 'Modifier mon profil',
    connect: 'Se connecter',
    requested: 'Demande envoyée',
    connected: 'Connecté',
    unavailable: "Ce participant n'a pas encore complété son profil.",
    noValue: 'Non renseigné',
    privacy: "Les informations privées du compte, notamment l'e-mail et la date de naissance, ne sont pas visibles par les autres participants.",
    loadError: "Le profil de ce participant n'a pas pu être chargé. Réessayez."
  },
  ko: {
    profile: '참가자 프로필',
    viewProfile: '프로필 보기',
    participantProfile: '참가자 프로필',
    city: '도시',
    organization: '기관 / 회사',
    title: '직책',
    focus: '관심 분야',
    languages: '언어',
    interests: '협업 관심사',
    bio: '소개',
    linkedin: 'LinkedIn',
    actionPlan: '실행계획',
    sector: '분야',
    stage: '단계',
    progress: '실행 진척도',
    sdgs: 'SDGs',
    solution: '실행 중인 내용',
    edit: '내 프로필 편집',
    connect: '연결',
    requested: '요청 전송됨',
    connected: '연결됨',
    unavailable: '이 참가자는 아직 프로필을 완성하지 않았습니다.',
    noValue: '아직 입력되지 않음',
    privacy: '이메일과 생년월일 같은 비공개 계정 정보는 다른 참가자에게 표시되지 않습니다.',
    loadError: '참가자 프로필을 불러오지 못했습니다. 다시 시도해 주세요.'
  }
};

function ahD(){ return AH_DIRECTORY_COPY[state?.lang] || AH_DIRECTORY_COPY.en; }

function ahDirectoryStyles(){
  if(document.getElementById('ah-directory-styles')) return;
  const style = document.createElement('style');
  style.id = 'ah-directory-styles';
  style.textContent = `
    .ah-participant-link{
      border:0;background:transparent;padding:0;margin:0;text-align:left;
      color:#0b4f86;font:inherit;font-weight:700;cursor:pointer;
      text-decoration:none
    }
    .ah-participant-link:hover,.ah-participant-link:focus{color:#0067b9;text-decoration:underline}
    .ah-participant-link small{
      display:block;margin-top:4px;color:#6b7d90;font-size:10px;
      font-weight:600;text-transform:uppercase;letter-spacing:.06em
    }
    .ah-directory-card{width:min(900px,calc(100vw - 28px));max-height:90vh;overflow:auto;padding:0!important}
    .ah-directory-shell{background:#fff}
    .ah-directory-cover{
      min-height:116px;padding:28px 32px 24px;
      background:linear-gradient(110deg,#073d6d,#0068b7);
      color:white;position:relative;overflow:hidden
    }
    .ah-directory-cover:after{
      content:"";position:absolute;width:230px;height:230px;border:1px solid rgba(255,255,255,.13);
      border-radius:50%;right:-72px;top:-112px
    }
    .ah-directory-cover .section-kicker{color:#8fd5ff;margin:0 0 8px}
    .ah-directory-cover h2{margin:0;color:#fff;font-size:27px;line-height:1.15}
    .ah-directory-cover p{margin:7px 0 0;color:#dcefff}
    .ah-directory-main{padding:0 32px 30px}
    .ah-directory-identity{
      display:grid;grid-template-columns:116px 1fr auto;gap:20px;align-items:end;
      margin-top:-42px;position:relative;z-index:2
    }
    .ah-directory-avatar{
      width:108px;height:108px;border-radius:50%;border:5px solid white;
      background:#e7f1f9;box-shadow:0 4px 16px rgba(0,35,65,.16);
      display:grid;place-items:center;overflow:hidden;font-size:28px;font-weight:800;color:#075a9d
    }
    .ah-directory-avatar img{width:100%;height:100%;object-fit:cover}
    .ah-directory-name{padding-bottom:8px}
    .ah-directory-name h3{margin:0 0 5px;color:#0c2c49;font-size:24px}
    .ah-directory-name p{margin:0;color:#607487;line-height:1.45}
    .ah-directory-actions{padding-bottom:9px;display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}
    .ah-directory-grid{
      display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;
      background:#dce6ef;border:1px solid #dce6ef;margin-top:24px
    }
    .ah-directory-field{background:#fff;padding:16px 18px;min-height:76px}
    .ah-directory-field.full{grid-column:1/-1}
    .ah-directory-field span{
      display:block;margin-bottom:7px;color:#6f8193;font-size:10px;font-weight:800;
      text-transform:uppercase;letter-spacing:.075em
    }
    .ah-directory-field b,.ah-directory-field p{margin:0;color:#173751;line-height:1.55}
    .ah-directory-field p{font-weight:400}
    .ah-directory-link{color:#0067b9;font-weight:700;text-decoration:none;word-break:break-word}
    .ah-directory-link:hover{text-decoration:underline}
    .ah-directory-plan{
      margin-top:24px;border:1px solid #cbd9e6;background:#f8fbfd
    }
    .ah-directory-plan-head{
      display:flex;align-items:center;justify-content:space-between;gap:12px;
      padding:14px 18px;border-bottom:1px solid #dbe5ed
    }
    .ah-directory-plan-head .section-kicker{margin:0}
    .ah-directory-plan-body{padding:18px}
    .ah-directory-plan-body h3{margin:0 0 9px;color:#0c2c49;font-size:21px}
    .ah-directory-plan-body>p{margin:0 0 18px;color:#536a7d;line-height:1.6}
    .ah-directory-meta{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
    .ah-directory-meta div{border-left:2px solid #0b69ad;padding-left:10px}
    .ah-directory-meta span{display:block;color:#718397;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}
    .ah-directory-meta b{font-size:13px;color:#173751}
    .ah-directory-progress{height:7px;background:#dfe8f0;margin-top:16px;overflow:hidden}
    .ah-directory-progress i{display:block;height:100%;background:#0072bc}
    .ah-directory-private{
      margin:20px 0 0;padding:12px 14px;background:#f6f8fa;border-left:3px solid #7b94aa;
      color:#5d7183;font-size:11px;line-height:1.5
    }
    .ah-directory-empty{
      margin-top:24px;padding:18px;border:1px dashed #bdcad5;color:#607487;background:#fafcfd
    }
    @media(max-width:720px){
      .ah-directory-cover{padding:24px 20px 58px}
      .ah-directory-main{padding:0 20px 24px}
      .ah-directory-identity{grid-template-columns:88px 1fr;align-items:center}
      .ah-directory-avatar{width:82px;height:82px}
      .ah-directory-actions{grid-column:1/-1;justify-content:flex-start;padding:0}
      .ah-directory-grid{grid-template-columns:1fr}
      .ah-directory-field.full{grid-column:auto}
      .ah-directory-meta{grid-template-columns:1fr 1fr}
    }
  `;
  document.head.appendChild(style);
}

function ahEnsureDirectoryModal(){
  ahDirectoryStyles();
  let modal=document.getElementById('participant-profile-modal');
  if(modal) return modal;
  modal=document.createElement('div');
  modal.id='participant-profile-modal';
  modal.className='modal hidden';
  modal.innerHTML=`<div class="modal-card ah-directory-card">
    <button class="modal-close" type="button" onclick="closeParticipantProfile()">×</button>
    <div id="ah-directory-content" class="ah-directory-shell"></div>
  </div>`;
  document.body.appendChild(modal);
  return modal;
}

function closeParticipantProfile(){
  const m=document.getElementById('participant-profile-modal');
  if(m) m.classList.add('hidden');
}

function ahDirectoryValue(v){
  const value=String(v||'').trim();
  return value || ahD().noValue;
}

function ahSafeLinkedIn(url){
  const value=String(url||'').trim();
  if(!value || !/^https:\/\/([a-z0-9-]+\.)?linkedin\.com\//i.test(value)) return '';
  return value;
}

function ahDirectorySdg(raw){
  if(typeof ahFormatSdgs==='function') return ahFormatSdgs(raw);
  const value=String(raw||'').trim();
  return value || '—';
}

async function ahDirectoryAvatar(path){
  if(!path) return '';
  try{
    const {data,error}=await sb.storage.from('avatars').createSignedUrl(path,3600);
    if(error) return '';
    return data?.signedUrl||'';
  }catch(_e){ return ''; }
}

function ahDirectoryAction(plan, userId){
  const c=ahD();
  if(!currentSessionUser || !plan) return '';
  if(userId===currentSessionUser.id){
    return `<button type="button" class="btn subtle" onclick="closeParticipantProfile();openProfile()">${esc(c.edit)}</button>`;
  }
  let status='';
  try{
    if(typeof ahCollaborationStatusByPlan!=='undefined') status=ahCollaborationStatusByPlan.get(plan.id)||'';
  }catch(_e){}
  if(status==='new') return `<button type="button" class="btn subtle" disabled>${esc(c.requested)}</button>`;
  if(status==='accepted') return `<button type="button" class="btn subtle" disabled>${esc(c.connected)}</button>`;
  return `<button type="button" class="btn solid" onclick="closeParticipantProfile();openCollaborationRequest('${esc(plan.id)}')">${esc(c.connect)}</button>`;
}

async function openParticipantProfile(userId,planId){
  if(!currentSessionUser){ openLogin(); return; }
  const modal=ahEnsureDirectoryModal();
  const content=document.getElementById('ah-directory-content');
  const c=ahD();

  content.innerHTML=`<div class="ah-directory-cover">
    <div class="section-kicker">${esc(c.profile)}</div>
    <h2>${esc(c.participantProfile)}</h2>
    <p>Loading…</p>
  </div>`;
  modal.classList.remove('hidden');

  try{
    const [{data:profile,error:profileError},{data:plan,error:planError}] = await Promise.all([
      sb.from('profiles')
        .select('id,full_name,country,organization,bio,professional_title,city,focus_area,interests,languages,linkedin_url,avatar_path,profile_completed')
        .eq('id',userId).single(),
      sb.from('action_plans')
        .select('id,user_id,title,country,sector,stage,solution,kpis,sdgs,progress,status,visibility,updated_at')
        .eq('id',planId).eq('visibility','cohort').maybeSingle()
    ]);

    if(profileError) throw profileError;
    if(planError) throw planError;

    const avatarUrl=await ahDirectoryAvatar(profile?.avatar_path);
    const country=normalizeCountry(profile?.country||plan?.country||'');
    const linkedin=ahSafeLinkedIn(profile?.linkedin_url);
    const completed=Boolean(profile?.profile_completed);
    const name=profile?.full_name||'Participant';
    const title=profile?.professional_title||'';
    const org=profile?.organization||'';
    const subtitle=[title,org].filter(Boolean).join(' · ') || ahCountryLabel(country);

    const profileFields = `
      <div class="ah-directory-grid">
        <div class="ah-directory-field"><span>${esc(c.city)}</span><b>${esc(ahDirectoryValue(profile?.city))}</b></div>
        <div class="ah-directory-field"><span>${esc(c.organization)}</span><b>${esc(ahDirectoryValue(profile?.organization))}</b></div>
        <div class="ah-directory-field"><span>${esc(c.title)}</span><b>${esc(ahDirectoryValue(profile?.professional_title))}</b></div>
        <div class="ah-directory-field"><span>${esc(c.focus)}</span><b>${esc(ahDirectoryValue(profile?.focus_area))}</b></div>
        <div class="ah-directory-field"><span>${esc(c.languages)}</span><b>${esc(ahDirectoryValue(profile?.languages))}</b></div>
        <div class="ah-directory-field"><span>${esc(c.interests)}</span><p>${esc(ahDirectoryValue(profile?.interests))}</p></div>
        <div class="ah-directory-field full"><span>${esc(c.bio)}</span><p>${esc(ahDirectoryValue(profile?.bio))}</p></div>
        ${linkedin?`<div class="ah-directory-field full"><span>${esc(c.linkedin)}</span><a class="ah-directory-link" href="${esc(linkedin)}" target="_blank" rel="noopener noreferrer">${esc(linkedin)}</a></div>`:''}
      </div>`;

    const planBlock=plan?`
      <section class="ah-directory-plan">
        <div class="ah-directory-plan-head"><div class="section-kicker">${esc(c.actionPlan)}</div></div>
        <div class="ah-directory-plan-body">
          <h3>${esc(plan.title||'Untitled Action Plan')}</h3>
          <p>${esc(plan.solution||c.noValue)}</p>
          <div class="ah-directory-meta">
            <div><span>${esc(c.sector)}</span><b>${esc(ahDirectoryValue(plan.sector))}</b></div>
            <div><span>${esc(c.stage)}</span><b>${esc(ahDirectoryValue(plan.stage))}</b></div>
            <div><span>${esc(c.progress)}</span><b>${Number(plan.progress||0)}%</b></div>
            <div><span>${esc(c.sdgs)}</span><b>${esc(ahDirectorySdg(plan.sdgs))}</b></div>
          </div>
          <div class="ah-directory-progress"><i style="width:${Math.max(0,Math.min(100,Number(plan.progress||0)))}%"></i></div>
        </div>
      </section>`:'';

    content.innerHTML=`
      <div class="ah-directory-cover">
        <div class="section-kicker">${esc(c.profile)}</div>
        <h2>${esc(name)}</h2>
        <p>${esc(ahCountryLabel(country))}</p>
      </div>
      <div class="ah-directory-main">
        <div class="ah-directory-identity">
          <div class="ah-directory-avatar">
            ${avatarUrl?`<img src="${esc(avatarUrl)}" alt="${esc(name)}">`:esc(initials(name))}
          </div>
          <div class="ah-directory-name">
            <h3>${esc(name)}</h3>
            <p>${esc(subtitle)}</p>
          </div>
          <div class="ah-directory-actions">${ahDirectoryAction(plan,userId)}</div>
        </div>
        ${completed?profileFields:`<div class="ah-directory-empty">${esc(c.unavailable)}</div>`}
        ${planBlock}
        <div class="ah-directory-private">${esc(c.privacy)}</div>
      </div>`;
  }catch(e){
    console.error('ActionHub participant profile:',e);
    content.innerHTML=`<div class="ah-directory-cover">
      <div class="section-kicker">${esc(c.profile)}</div>
      <h2>${esc(c.participantProfile)}</h2>
    </div><div class="ah-directory-main"><div class="ah-directory-empty">${esc(c.loadError)}</div></div>`;
  }
}

// Patch only the Country Network rendering.
// All data loading, filters, collaboration status, and Action Plan logic remain in app.js.
const ahDirectoryBaseRenderPlans = typeof renderPlans==='function' ? renderPlans : null;
renderPlans = function(arr=sharedPlans){
  const sector=document.getElementById('sector-filter')?.value||'all';
  const search=document.getElementById('project-search')?.value.trim().toLowerCase()||'';
  const rows=(arr||[]).filter(x =>
    (selectedCountry==='all'||normalizeCountry(x.country)===selectedCountry) &&
    (sector==='all'||x.sector===sector) &&
    (!search||`${x.title} ${x.name} ${x.desc} ${x.country} ${x.sector}`.toLowerCase().includes(search))
  );

  const list=document.getElementById('plans-list');
  if(!list){
    if(ahDirectoryBaseRenderPlans) return ahDirectoryBaseRenderPlans(arr);
    return;
  }

  list.innerHTML=rows.map(x=>`
    <div class="project-row">
      <div class="project-main">
        <h3>${esc(x.title)}</h3>
        <p>${esc(typeof ahTranslated==='function'?ahTranslated(x.desc||''):(x.desc||''))}</p>
        ${typeof ahTranslationMark==='function'?ahTranslationMark(x.desc):''}
      </div>
      <div class="project-person">
        <button type="button" class="ah-participant-link" onclick="openParticipantProfile('${esc(x.ownerId)}','${esc(x.id)}')">
          ${esc(x.name)}
          <small>${esc(ahD().viewProfile)} →</small>
        </button>
      </div>
      <div class="project-country">${flag(x.country)}${esc(typeof ahCountryLabel==='function'?ahCountryLabel(x.country):normalizeCountry(x.country))}</div>
      <div><span class="sector-tag">${esc(typeof ahTranslated==='function'?ahTranslated(x.sector||''):(x.sector||''))}</span></div>
      <div class="project-progress">${Number(x.progress||0)}%</div>
      ${typeof ahConnectButton==='function'?ahConnectButton(x):''}
    </div>`).join('') || `<div class="project-row"><div class="project-main"><h3>${state.lang==='fr'?'Aucun projet correspondant':state.lang==='ko'?'일치하는 프로젝트가 없습니다':'No matching projects'}</h3><p>${state.lang==='fr'?'Essayez un autre pays, secteur ou mot-clé.':state.lang==='ko'?'다른 국가, 분야 또는 키워드를 사용해 보세요.':'Try another country, sector or keyword.'}</p></div></div>`;
};

// Keep profile modal copy in sync when language changes.
document.getElementById('language')?.addEventListener('change',()=>{
  const modal=document.getElementById('participant-profile-modal');
  if(modal && !modal.classList.contains('hidden')) closeParticipantProfile();
});

ahDirectoryStyles();
