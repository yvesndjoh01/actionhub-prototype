// ACTIONHUB ADMISSION CONTROL V1 - 2026-08-22
// Load LAST, after directory.js.

const AH_ADMISSION_COPY = {
  en: {
    pendingKicker:'ACCOUNT REQUEST RECEIVED',
    pendingTitle:'Your ActionHub access is awaiting approval.',
    pendingBody:'Your account has been created successfully. Your country coordinator must approve your participation before you can enter the ActionHub workspace.',
    pendingCountry:'Approval route', pendingStatus:'Current status',
    pendingValue:'Pending coordinator approval',
    rejectedKicker:'ACCOUNT ACCESS',
    rejectedTitle:'Your ActionHub access request was not approved.',
    rejectedBody:'Please contact your country coordinator if you believe this needs to be reviewed.',
    suspendedTitle:'Your ActionHub access is currently suspended.',
    suspendedBody:'Please contact the programme team or your country coordinator for assistance.',
    signout:'Sign out', refresh:'Check approval status', checking:'Checking…',
    coordKicker:'PARTICIPANT ADMISSION',
    coordTitle:'Pending participant requests',
    coordBody:'Approve only verified programme participants from your assigned country. You can still view Action Plans across all five countries below.',
    noPending:'No participant requests are waiting for approval.',
    applicant:'Applicant', email:'Email', country:'Country', organization:'Organisation',
    requested:'Requested', approve:'Approve', reject:'Reject',
    rejectPrompt:'Optional reason for rejection:',
    approved:'Participant approved.', rejected:'Participant request rejected.',
    error:'The request could not be completed. Please try again.'
  },
  fr: {
    pendingKicker:'DEMANDE DE COMPTE REÇUE',
    pendingTitle:"Votre accès à ActionHub est en attente d'approbation.",
    pendingBody:"Votre compte a été créé avec succès. Le coordinateur de votre pays doit approuver votre participation avant l'accès à l'espace ActionHub.",
    pendingCountry:"Circuit d'approbation", pendingStatus:'Statut actuel',
    pendingValue:"En attente de l'approbation du coordinateur",
    rejectedKicker:'ACCÈS AU COMPTE',
    rejectedTitle:"Votre demande d'accès à ActionHub n'a pas été approuvée.",
    rejectedBody:'Contactez le coordinateur de votre pays si vous pensez que la demande doit être réexaminée.',
    suspendedTitle:'Votre accès à ActionHub est actuellement suspendu.',
    suspendedBody:"Contactez l'équipe du programme ou votre coordinateur national.",
    signout:'Se déconnecter', refresh:"Vérifier l'approbation", checking:'Vérification…',
    coordKicker:'ADMISSION DES PARTICIPANTS',
    coordTitle:'Demandes de participants en attente',
    coordBody:"Approuvez uniquement les participants vérifiés de votre pays. Vous pouvez toujours consulter les plans d'action des cinq pays ci-dessous.",
    noPending:"Aucune demande de participant n'est en attente.",
    applicant:'Candidat', email:'E-mail', country:'Pays', organization:'Organisation',
    requested:'Demandé le', approve:'Approuver', reject:'Rejeter',
    rejectPrompt:'Motif facultatif du rejet :',
    approved:'Participant approuvé.', rejected:'Demande rejetée.',
    error:"La demande n'a pas pu être traitée. Réessayez."
  },
  ko: {
    pendingKicker:'계정 요청 접수',
    pendingTitle:'ActionHub 접근 승인을 기다리고 있습니다.',
    pendingBody:'계정이 성공적으로 생성되었습니다. ActionHub 워크스페이스에 들어가기 전에 해당 국가 코디네이터의 승인이 필요합니다.',
    pendingCountry:'승인 경로', pendingStatus:'현재 상태',
    pendingValue:'국가 코디네이터 승인 대기',
    rejectedKicker:'계정 접근',
    rejectedTitle:'ActionHub 접근 요청이 승인되지 않았습니다.',
    rejectedBody:'재검토가 필요하다고 생각되면 해당 국가 코디네이터에게 문의하세요.',
    suspendedTitle:'ActionHub 접근이 현재 일시 중지되었습니다.',
    suspendedBody:'프로그램 팀 또는 국가 코디네이터에게 문의하세요.',
    signout:'로그아웃', refresh:'승인 상태 확인', checking:'확인 중…',
    coordKicker:'참가자 승인',
    coordTitle:'승인 대기 참가자',
    coordBody:'배정된 국가의 검증된 프로그램 참가자만 승인하세요. 아래에서 5개국 전체 실행계획을 계속 볼 수 있습니다.',
    noPending:'승인을 기다리는 참가자 요청이 없습니다.',
    applicant:'신청자', email:'이메일', country:'국가', organization:'기관',
    requested:'요청일', approve:'승인', reject:'거절',
    rejectPrompt:'거절 사유(선택):',
    approved:'참가자가 승인되었습니다.', rejected:'참가자 요청이 거절되었습니다.',
    error:'요청을 처리하지 못했습니다. 다시 시도해 주세요.'
  }
};
function ahAdmissionCopy(){ return AH_ADMISSION_COPY[state?.lang] || AH_ADMISSION_COPY.en; }

let ahAdmissionProfile=null;

function ahAdmissionStyles(){
  if(document.getElementById('ah-admission-styles')) return;
  const style=document.createElement('style');
  style.id='ah-admission-styles';
  style.textContent=`
    body:not(.ah-admission-approved) .app{display:none!important}
    body.ah-admission-approved .app{display:block}
    .ah-admission-screen{min-height:100vh;background:#f3f6f9;color:#173751;display:flex;flex-direction:column;font-family:inherit}
    .ah-admission-top{height:78px;background:#fff;border-bottom:1px solid #d7e1e9;display:flex;align-items:center;justify-content:space-between;padding:0 5vw}
    .ah-admission-brand{display:flex;align-items:center;gap:12px}
    .ah-admission-brand img{width:38px;height:38px}
    .ah-admission-brand strong{display:block;color:#0b3152;font-size:18px}
    .ah-admission-brand strong em{font-style:normal;color:#0072bc}
    .ah-admission-brand small{display:block;color:#708294;margin-top:2px}
    .ah-admission-main{flex:1;display:grid;place-items:center;padding:50px 18px;background:radial-gradient(circle at 80% 10%,rgba(0,114,188,.09),transparent 26%),linear-gradient(180deg,#f8fafc,#eef3f7)}
    .ah-admission-card{width:min(680px,100%);background:white;border:1px solid #d3dee7;box-shadow:0 16px 46px rgba(18,48,75,.09);padding:34px}
    .ah-admission-kicker{color:#0072bc;font-size:11px;font-weight:800;letter-spacing:.11em;margin-bottom:10px}
    .ah-admission-card h1{font-size:30px;line-height:1.17;margin:0 0 14px;color:#0b3152}
    .ah-admission-card>p{color:#596f81;line-height:1.65;margin:0 0 24px}
    .ah-admission-status{display:grid;grid-template-columns:1fr 1fr;border:1px solid #dbe4eb;background:#f8fafc}
    .ah-admission-status>div{padding:16px 18px}
    .ah-admission-status>div+div{border-left:1px solid #dbe4eb}
    .ah-admission-status span{display:block;color:#768899;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.07em;margin-bottom:5px}
    .ah-admission-status b{color:#173751;font-size:13px}
    .ah-admission-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:24px;flex-wrap:wrap}
    .ah-admission-note{margin-top:18px;padding:11px 13px;border-left:3px solid #0072bc;background:#f5f9fc;color:#647789;font-size:11px;line-height:1.5}
    .ah-coord-admission{margin:0 0 24px;border:1px solid #cbd9e5;background:#fff}
    .ah-coord-admission-head{padding:18px 20px;border-bottom:1px solid #dde6ed;display:flex;justify-content:space-between;gap:16px;align-items:flex-start}
    .ah-coord-admission-head .section-kicker{margin-bottom:6px}
    .ah-coord-admission-head h2{margin:0 0 5px;font-size:20px;color:#123653}
    .ah-coord-admission-head p{margin:0;color:#65798c;line-height:1.5;font-size:12px;max-width:700px}
    .ah-coord-badge{white-space:nowrap;border:1px solid #bad1e4;background:#f3f9fd;color:#075c9c;padding:7px 10px;font-size:10px;font-weight:800}
    .ah-coord-table-head,.ah-coord-row{display:grid;grid-template-columns:1.3fr 1.35fr .75fr 1fr .72fr 1fr;gap:12px;align-items:center;padding:12px 18px}
    .ah-coord-table-head{background:#f5f8fa;color:#708294;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.06em}
    .ah-coord-row{border-top:1px solid #e5ebf0;font-size:12px;color:#29475f}
    .ah-coord-row strong{color:#123653}
    .ah-coord-actions{display:flex;gap:6px;justify-content:flex-end}
    .ah-coord-actions button{border:1px solid #acc2d4;background:#fff;color:#0d568d;padding:7px 9px;font:inherit;font-weight:700;cursor:pointer}
    .ah-coord-actions button.approve{background:#006fba;border-color:#006fba;color:#fff}
    .ah-coord-empty{padding:22px 18px;color:#667b8e}
    @media(max-width:860px){.ah-coord-table-head{display:none}.ah-coord-row{grid-template-columns:1fr 1fr}.ah-coord-actions{grid-column:1/-1;justify-content:flex-start}}
    @media(max-width:580px){.ah-admission-card{padding:24px 20px}.ah-admission-status{grid-template-columns:1fr}.ah-admission-status>div+div{border-left:0;border-top:1px solid #dbe4eb}.ah-coord-row{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);
}

function ahRemoveAdmissionScreen(){ document.getElementById('ah-admission-screen')?.remove(); }

function ahRenderAdmissionScreen(status,profile){
  ahAdmissionStyles();
  document.body.classList.remove('ah-admission-approved','ah-authenticated');
  document.body.classList.add('ah-admission-blocked');
  document.getElementById('ah-access-gate')?.remove();

  let screen=document.getElementById('ah-admission-screen');
  if(!screen){
    screen=document.createElement('section');
    screen.id='ah-admission-screen';
    screen.className='ah-admission-screen';
    document.body.insertBefore(screen,document.body.firstChild);
  }

  const c=ahAdmissionCopy();
  let kicker=c.pendingKicker,title=c.pendingTitle,body=c.pendingBody,statusText=c.pendingValue;
  if(status==='rejected'){kicker=c.rejectedKicker;title=c.rejectedTitle;body=c.rejectedBody;statusText='Rejected';}
  if(status==='suspended'){kicker=c.rejectedKicker;title=c.suspendedTitle;body=c.suspendedBody;statusText='Suspended';}

  screen.innerHTML=`
    <header class="ah-admission-top">
      <div class="ah-admission-brand">
        <img src="assets/actionhub-mark.svg" alt="">
        <span><strong><em>KOICA</em> ActionHub</strong><small>Youth Leaders Program · West Africa 2026–2027</small></span>
      </div>
    </header>
    <main class="ah-admission-main">
      <section class="ah-admission-card">
        <div class="ah-admission-kicker">${esc(kicker)}</div>
        <h1>${esc(title)}</h1>
        <p>${esc(body)}</p>
        <div class="ah-admission-status">
          <div><span>${esc(c.pendingCountry)}</span><b>${esc(profile?.country||'—')} coordinator</b></div>
          <div><span>${esc(c.pendingStatus)}</span><b>${esc(statusText)}</b></div>
        </div>
        <div class="ah-admission-note">${esc(profile?.full_name||'Participant')} · ${esc(profile?.country||'')}</div>
        <div class="ah-admission-actions">
          <button class="btn subtle" type="button" onclick="ahAdmissionRefresh()">${esc(c.refresh)}</button>
          <button class="btn solid" type="button" onclick="realSignOut()">${esc(c.signout)}</button>
        </div>
      </section>
    </main>`;
}

async function ahGetOwnAdmissionProfile(){
  if(!currentSessionUser) return null;
  const {data,error}=await sb.from('profiles')
    .select('id,full_name,country,role,approval_status,organization')
    .eq('id',currentSessionUser.id).single();
  if(error){ console.warn('ActionHub admission profile:',error); return null; }
  return data;
}

async function ahAdmissionApplySession(session){
  currentSessionUser=session?.user||null;

  if(!currentSessionUser){
    ahAdmissionProfile=null;
    document.body.classList.remove('ah-admission-approved','ah-admission-blocked');
    ahRemoveAdmissionScreen();
    if(typeof ahAccessApplySession==='function'){
      try{ ahAccessApplySession(session); }catch(_e){}
    }
    return;
  }

  const profile=await ahGetOwnAdmissionProfile();
  ahAdmissionProfile=profile;
  const status=profile?.approval_status||'pending';

  if(status==='approved'){
    document.body.classList.add('ah-admission-approved','ah-authenticated');
    document.body.classList.remove('ah-admission-blocked','ah-guest');
    ahRemoveAdmissionScreen();
    document.getElementById('ah-access-gate')?.remove();

    try{ if(typeof syncSession==='function') await syncSession(session); }
    catch(e){ console.warn('ActionHub approved session sync:',e); }

    if(profile?.role==='coordinator'||profile?.role==='admin'){
      setTimeout(()=>ahCoordinatorAdmissionLoad().catch(e=>console.warn(e)),200);
    }
    return;
  }

  ahRenderAdmissionScreen(status,profile);
}

async function ahAdmissionRefresh(){
  const c=ahAdmissionCopy();
  const refresh=document.querySelector('#ah-admission-screen .ah-admission-actions button');
  const old=refresh?.textContent;
  if(refresh){refresh.disabled=true;refresh.textContent=c.checking;}
  try{
    const {data:{session}}=await sb.auth.getSession();
    await ahAdmissionApplySession(session);
  }finally{
    if(refresh && document.body.contains(refresh)){refresh.disabled=false;refresh.textContent=old||c.refresh;}
  }
}

function ahEnsureCoordinatorAdmissionPanel(){
  ahAdmissionStyles();
  let panel=document.getElementById('ah-coord-admission');
  if(panel) return panel;
  panel=document.createElement('section');
  panel.id='ah-coord-admission';
  panel.className='ah-coord-admission';
  panel.innerHTML=`<div class="ah-coord-admission-head"></div><div class="ah-coord-admission-body"></div>`;
  const anchor=document.querySelector('#coordinator .oversight-strip') || document.querySelector('#coordinator .page-intro');
  if(anchor) anchor.insertAdjacentElement('beforebegin',panel);
  else document.getElementById('coordinator')?.prepend(panel);
  return panel;
}

async function ahCoordinatorAdmissionLoad(){
  if(!currentSessionUser || !state?.user || !['coordinator','admin'].includes(state.user.role)) return;
  const panel=ahEnsureCoordinatorAdmissionPanel();
  const c=ahAdmissionCopy();
  const {data,error}=await sb.rpc('list_pending_participants');
  if(error){
    console.warn('ActionHub pending applicants:',error);
    panel.querySelector('.ah-coord-admission-body').innerHTML=`<div class="ah-coord-empty">${esc(c.error)}</div>`;
    return;
  }
  ahRenderPendingApplicants(data||[]);
}

function ahRenderPendingApplicants(rows){
  const c=ahAdmissionCopy();
  const panel=ahEnsureCoordinatorAdmissionPanel();
  panel.querySelector('.ah-coord-admission-head').innerHTML=`
    <div><div class="section-kicker">${esc(c.coordKicker)}</div><h2>${esc(c.coordTitle)}</h2><p>${esc(c.coordBody)}</p></div>
    <span class="ah-coord-badge">${esc(state.user.country)} · ${rows.length} pending</span>`;

  const body=panel.querySelector('.ah-coord-admission-body');
  if(!rows.length){
    body.innerHTML=`<div class="ah-coord-empty">${esc(c.noPending)}</div>`;
    return;
  }

  body.innerHTML=`
    <div class="ah-coord-table-head"><span>${esc(c.applicant)}</span><span>${esc(c.email)}</span><span>${esc(c.country)}</span><span>${esc(c.organization)}</span><span>${esc(c.requested)}</span><span></span></div>
    ${rows.map(r=>`<div class="ah-coord-row">
      <div><strong>${esc(r.full_name||'Participant')}</strong></div>
      <div>${esc(r.email||'')}</div>
      <div>${esc(r.country||'')}</div>
      <div>${esc(r.organization||'—')}</div>
      <div>${esc(String(r.created_at||'').slice(0,10))}</div>
      <div class="ah-coord-actions">
        <button class="approve" type="button" onclick="ahReviewApplicant('${esc(r.id)}','approved')">${esc(c.approve)}</button>
        <button type="button" onclick="ahReviewApplicant('${esc(r.id)}','rejected')">${esc(c.reject)}</button>
      </div>
    </div>`).join('')}`;
}

async function ahReviewApplicant(userId,decision){
  const c=ahAdmissionCopy();
  let reason=null;
  if(decision==='rejected'){
    reason=window.prompt(c.rejectPrompt,'');
    if(reason===null) return;
  }
  try{
    const {error}=await sb.rpc('review_participant_access',{
      target_user_id:userId,
      decision,
      reason:reason||null
    });
    if(error) throw error;
    alert(decision==='approved'?c.approved:c.rejected);
    await ahCoordinatorAdmissionLoad();
  }catch(e){
    console.error('ActionHub participant review:',e);
    alert(c.error);
  }
}

const ahAdmissionBaseShowView=typeof showView==='function'?showView:null;
if(ahAdmissionBaseShowView){
  showView=function(id){
    const result=ahAdmissionBaseShowView(id);
    if(id==='coordinator' && currentSessionUser && state?.user && ['coordinator','admin'].includes(state.user.role)){
      setTimeout(()=>ahCoordinatorAdmissionLoad().catch(e=>console.warn(e)),60);
    }
    return result;
  };
}

document.getElementById('language')?.addEventListener('change',()=>{
  if(ahAdmissionProfile && ahAdmissionProfile.approval_status!=='approved'){
    ahRenderAdmissionScreen(ahAdmissionProfile.approval_status,ahAdmissionProfile);
  }
  if(state?.user && ['coordinator','admin'].includes(state.user.role)){
    ahCoordinatorAdmissionLoad().catch(()=>{});
  }
});

(async()=>{
  ahAdmissionStyles();
  if(!hasSupabase||!sb) return;
  const {data:{session}}=await sb.auth.getSession();
  await ahAdmissionApplySession(session);
  sb.auth.onAuthStateChange((_event,nextSession)=>{
    setTimeout(()=>ahAdmissionApplySession(nextSession).catch(e=>console.warn('ActionHub admission state:',e)),0);
  });
})();
