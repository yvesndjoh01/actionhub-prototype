// ACTIONHUB PARTICIPANT PROFILE V1 - 2026-08-21
// Loads after app.js. Adds private profile completion + authenticated avatar support.

let ahProfileData={
  organization:'',professional_title:'',city:'',focus_area:'',interests:'',languages:'',linkedin_url:'',bio:'',avatar_path:'',profile_completed:false,date_of_birth:''
};
let ahProfileAvatarUrl='';
let ahProfilePromptedForUser='';
let ahProfileLoading=false;

const AH_PROFILE_COPY={
  en:{
    kicker:'PARTICIPANT PROFILE',title:'Complete your ActionHub profile',intro:'Build a useful profile for the programme network. Your exact date of birth is private and is not shown to other participants.',
    photo:'Profile photo',photoHint:'JPG, PNG or WebP · max 5 MB',name:'Full name',country:'Country',dob:'Date of birth',dobPrivate:'Private — not shown in the Country Network',city:'City',org:'Organisation / company',job:'Professional title / role',focus:'Focus area',langs:'Languages',interests:'Collaboration interests',linkedin:'LinkedIn profile',bio:'Short bio',save:'Save profile',saving:'Saving…',signout:'Sign out',saved:'Profile saved.',edit:'Edit profile',complete:'Complete profile',required:'Please add your city, professional title, focus area and short bio.',badPhoto:'Please choose a JPG, PNG or WebP image under 5 MB.',badLinkedin:'Please enter a valid LinkedIn URL beginning with https://',uploadFail:'Your photo could not be uploaded. Please try again.',saveFail:'Your profile could not be saved. Please try again.'
  },
  fr:{
    kicker:'PROFIL PARTICIPANT',title:'Complétez votre profil ActionHub',intro:"Créez un profil utile pour le réseau du programme. Votre date de naissance exacte reste privée et n'est pas visible par les autres participants.",
    photo:'Photo de profil',photoHint:'JPG, PNG ou WebP · 5 Mo max.',name:'Nom complet',country:'Pays',dob:'Date de naissance',dobPrivate:'Privée — non affichée dans le réseau des pays',city:'Ville',org:'Organisation / entreprise',job:'Fonction / titre professionnel',focus:"Domaine d'intérêt",langs:'Langues',interests:'Intérêts de collaboration',linkedin:'Profil LinkedIn',bio:'Courte biographie',save:'Enregistrer le profil',saving:'Enregistrement…',signout:'Se déconnecter',saved:'Profil enregistré.',edit:'Modifier le profil',complete:'Compléter le profil',required:'Ajoutez votre ville, votre fonction, votre domaine et une courte biographie.',badPhoto:'Choisissez une image JPG, PNG ou WebP de moins de 5 Mo.',badLinkedin:'Saisissez une URL LinkedIn valide commençant par https://',uploadFail:"La photo n'a pas pu être importée. Réessayez.",saveFail:"Le profil n'a pas pu être enregistré. Réessayez."
  },
  ko:{
    kicker:'참가자 프로필',title:'ActionHub 프로필 완성',intro:'프로그램 네트워크에서 활용할 수 있는 프로필을 작성하세요. 정확한 생년월일은 비공개이며 다른 참가자에게 표시되지 않습니다.',
    photo:'프로필 사진',photoHint:'JPG, PNG 또는 WebP · 최대 5MB',name:'성명',country:'국가',dob:'생년월일',dobPrivate:'비공개 — 국가 네트워크에 표시되지 않음',city:'도시',org:'기관 / 회사',job:'직책 / 역할',focus:'관심 분야',langs:'언어',interests:'협업 관심사',linkedin:'LinkedIn 프로필',bio:'짧은 소개',save:'프로필 저장',saving:'저장 중…',signout:'로그아웃',saved:'프로필이 저장되었습니다.',edit:'프로필 편집',complete:'프로필 완성',required:'도시, 직책, 관심 분야와 짧은 소개를 입력해 주세요.',badPhoto:'5MB 이하의 JPG, PNG 또는 WebP 이미지를 선택해 주세요.',badLinkedin:'https:// 로 시작하는 올바른 LinkedIn URL을 입력해 주세요.',uploadFail:'사진을 업로드하지 못했습니다. 다시 시도해 주세요.',saveFail:'프로필을 저장하지 못했습니다. 다시 시도해 주세요.'
  }
};
function ahP(){return AH_PROFILE_COPY[state?.lang]||AH_PROFILE_COPY.en;}

function ahAddProfileStyles(){
  if(document.getElementById('ah-profile-styles'))return;
  const style=document.createElement('style');
  style.id='ah-profile-styles';
  style.textContent=`
    .avatar.ah-has-photo{overflow:hidden;padding:0;background:#eef6fd}
    .avatar.ah-has-photo img{width:100%;height:100%;object-fit:cover;display:block;border-radius:50%}
    .ah-profile-card{width:min(760px,calc(100vw - 28px));max-height:90vh;overflow:auto}
    .ah-profile-head{display:flex;gap:20px;align-items:flex-start;margin:8px 0 22px}
    .ah-profile-photo{width:112px;flex:0 0 112px;text-align:center}
    .ah-profile-photo-preview{width:96px;height:96px;border-radius:50%;border:1px solid #c9d8e6;background:#eef5fb;margin:0 auto 8px;display:grid;place-items:center;overflow:hidden;font-size:26px;font-weight:700;color:#0b5ea8}
    .ah-profile-photo-preview img{width:100%;height:100%;object-fit:cover}
    .ah-profile-photo input{width:100%;font-size:11px}
    .ah-profile-photo small{display:block;margin-top:5px;color:#64748b;font-size:10px}
    .ah-profile-summary{padding-top:8px}.ah-profile-summary h2{margin:0 0 7px}.ah-profile-summary p{margin:0;color:#5b6b7d;line-height:1.5}
    .ah-profile-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .ah-profile-grid label{display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:700;color:#334155}
    .ah-profile-grid input,.ah-profile-grid textarea{width:100%;box-sizing:border-box;border:1px solid #cbd8e5;background:#fff;padding:11px 12px;font:inherit;color:#0f2740}
    .ah-profile-grid textarea{min-height:92px;resize:vertical}.ah-profile-grid .full{grid-column:1/-1}
    .ah-profile-grid input[readonly]{background:#f4f7fa;color:#66788a}
    .ah-profile-private{font-size:10px;color:#64748b;font-weight:400}
    .ah-profile-actions{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:20px;padding-top:16px;border-top:1px solid #e0e8ef}
    .ah-profile-completion{font-size:11px;color:#496174}.ah-profile-completion b{color:#0b5ea8}
    @media(max-width:650px){.ah-profile-head{flex-direction:column}.ah-profile-photo{width:auto;flex:auto}.ah-profile-grid{grid-template-columns:1fr}.ah-profile-grid .full{grid-column:auto}.ah-profile-actions{flex-direction:column-reverse;align-items:stretch}}
  `;
  document.head.appendChild(style);
}

function ahEnsureProfileModal(){
  ahAddProfileStyles();
  let modal=document.getElementById('profile-modal');
  if(modal)return modal;
  modal=document.createElement('div');
  modal.id='profile-modal';
  modal.className='modal hidden';
  modal.innerHTML=`<div class="modal-card ah-profile-card">
    <button class="modal-close" type="button" onclick="closeProfile()">×</button>
    <div class="section-kicker" id="ah-profile-kicker"></div>
    <div class="ah-profile-head">
      <div class="ah-profile-photo">
        <div class="ah-profile-photo-preview" id="ah-profile-photo-preview"></div>
        <input id="ah-profile-photo" type="file" accept="image/jpeg,image/png,image/webp">
        <small id="ah-profile-photo-hint"></small>
      </div>
      <div class="ah-profile-summary"><h2 id="ah-profile-title"></h2><p id="ah-profile-intro"></p></div>
    </div>
    <form id="ah-profile-form" onsubmit="event.preventDefault();saveProfile()">
      <div class="ah-profile-grid">
        <label><span id="ah-profile-name-label"></span><input id="ah-profile-name" readonly></label>
        <label><span id="ah-profile-country-label"></span><input id="ah-profile-country" readonly></label>
        <label><span id="ah-profile-dob-label"></span><input id="ah-profile-dob" type="date"><small class="ah-profile-private" id="ah-profile-dob-private"></small></label>
        <label><span id="ah-profile-city-label"></span><input id="ah-profile-city" maxlength="120"></label>
        <label><span id="ah-profile-org-label"></span><input id="ah-profile-org" maxlength="180"></label>
        <label><span id="ah-profile-job-label"></span><input id="ah-profile-job" maxlength="180"></label>
        <label><span id="ah-profile-focus-label"></span><input id="ah-profile-focus" maxlength="180"></label>
        <label><span id="ah-profile-langs-label"></span><input id="ah-profile-langs" maxlength="220" placeholder="English, Français"></label>
        <label class="full"><span id="ah-profile-interests-label"></span><input id="ah-profile-interests" maxlength="300"></label>
        <label class="full"><span id="ah-profile-linkedin-label"></span><input id="ah-profile-linkedin" type="url" maxlength="300" placeholder="https://www.linkedin.com/in/..."></label>
        <label class="full"><span id="ah-profile-bio-label"></span><textarea id="ah-profile-bio" maxlength="800"></textarea></label>
      </div>
      <div class="ah-profile-actions">
        <button type="button" class="btn subtle" id="ah-profile-signout" onclick="closeProfile();realSignOut()"></button>
        <div style="display:flex;gap:12px;align-items:center"><span class="ah-profile-completion" id="ah-profile-completion"></span><button class="btn solid" type="submit" id="ah-profile-save"></button></div>
      </div>
    </form>
  </div>`;
  document.body.appendChild(modal);
  return modal;
}

function ahProfileField(id){return document.getElementById(id);}
function ahProfileCompletion(){
  const required=[ahProfileData.city,ahProfileData.professional_title,ahProfileData.focus_area,ahProfileData.bio];
  return Math.round(required.filter(x=>String(x||'').trim()).length/required.length*100);
}
function ahRenderProfileModal(){
  const modal=ahEnsureProfileModal();
  const c=ahP();
  const map={
    'ah-profile-kicker':c.kicker,'ah-profile-title':c.title,'ah-profile-intro':c.intro,'ah-profile-photo-hint':c.photoHint,
    'ah-profile-name-label':c.name,'ah-profile-country-label':c.country,'ah-profile-dob-label':c.dob,'ah-profile-dob-private':c.dobPrivate,
    'ah-profile-city-label':c.city,'ah-profile-org-label':c.org,'ah-profile-job-label':c.job,'ah-profile-focus-label':c.focus,
    'ah-profile-langs-label':c.langs,'ah-profile-interests-label':c.interests,'ah-profile-linkedin-label':c.linkedin,'ah-profile-bio-label':c.bio,
    'ah-profile-save':c.save,'ah-profile-signout':c.signout
  };
  Object.entries(map).forEach(([id,text])=>{const el=ahProfileField(id);if(el)el.textContent=text;});
  ahProfileField('ah-profile-name').value=state?.user?.name||'';
  ahProfileField('ah-profile-country').value=typeof ahCountryLabel==='function'?ahCountryLabel(state?.user?.country||''):state?.user?.country||'';
  ahProfileField('ah-profile-dob').value=ahProfileData.date_of_birth||'';
  ahProfileField('ah-profile-city').value=ahProfileData.city||'';
  ahProfileField('ah-profile-org').value=ahProfileData.organization||'';
  ahProfileField('ah-profile-job').value=ahProfileData.professional_title||'';
  ahProfileField('ah-profile-focus').value=ahProfileData.focus_area||'';
  ahProfileField('ah-profile-langs').value=ahProfileData.languages||'';
  ahProfileField('ah-profile-interests').value=ahProfileData.interests||'';
  ahProfileField('ah-profile-linkedin').value=ahProfileData.linkedin_url||'';
  ahProfileField('ah-profile-bio').value=ahProfileData.bio||'';
  ahProfileField('ah-profile-completion').innerHTML=`<b>${ahProfileCompletion()}%</b> profile`;
  const preview=ahProfileField('ah-profile-photo-preview');
  preview.innerHTML=ahProfileAvatarUrl?`<img src="${esc(ahProfileAvatarUrl)}" alt="">`:esc(initials(state?.user?.name||'Participant'));
  return modal;
}
function openProfile(){
  if(!currentSessionUser){if(typeof ahOriginalOpenLogin==='function')ahOriginalOpenLogin();return;}
  const modal=ahRenderProfileModal();modal.classList.remove('hidden');
}
function closeProfile(){const m=document.getElementById('profile-modal');if(m)m.classList.add('hidden');}

async function ahLoadProfileData(){
  if(!currentSessionUser||ahProfileLoading)return;
  ahProfileLoading=true;
  try{
    const {data:profile,error}=await sb.from('profiles')
      .select('organization,bio,professional_title,city,focus_area,interests,languages,linkedin_url,avatar_path,profile_completed')
      .eq('id',currentSessionUser.id).single();
    if(error)throw error;
    const {data:privateRow,error:privateError}=await sb.from('profile_private').select('date_of_birth').eq('user_id',currentSessionUser.id).maybeSingle();
    if(privateError)console.warn('ActionHub private profile:',privateError);
    ahProfileData={...ahProfileData,...(profile||{}),date_of_birth:privateRow?.date_of_birth||''};
    ahProfileAvatarUrl='';
    if(ahProfileData.avatar_path){
      const {data:signed,error:signedError}=await sb.storage.from('avatars').createSignedUrl(ahProfileData.avatar_path,3600);
      if(!signedError)ahProfileAvatarUrl=signed?.signedUrl||'';
    }
    ahApplyProfileToHeader();
    if(!ahProfileData.profile_completed&&ahProfilePromptedForUser!==currentSessionUser.id){
      ahProfilePromptedForUser=currentSessionUser.id;
      setTimeout(()=>openProfile(),450);
    }
  }catch(e){console.warn('ActionHub profile load:',e);}finally{ahProfileLoading=false;}
}

function ahApplyProfileToHeader(){
  const avatar=document.getElementById('avatar');
  if(!avatar)return;
  if(currentSessionUser&&ahProfileAvatarUrl){avatar.classList.add('ah-has-photo');avatar.innerHTML=`<img src="${esc(ahProfileAvatarUrl)}" alt="${esc(state?.user?.name||'Participant')}">`;}
  else{avatar.classList.remove('ah-has-photo');if(currentSessionUser)avatar.textContent=initials(state?.user?.name||'Participant');}
}

async function ahUploadAvatar(file){
  if(!file)return ahProfileData.avatar_path||'';
  const c=ahP();
  if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>5*1024*1024){throw new Error(c.badPhoto);}
  const ext=file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg';
  const path=`${currentSessionUser.id}/avatar-${Date.now()}.${ext}`;
  const {error}=await sb.storage.from('avatars').upload(path,file,{cacheControl:'3600',upsert:false});
  if(error)throw new Error(c.uploadFail);
  const old=ahProfileData.avatar_path;
  if(old&&old!==path){sb.storage.from('avatars').remove([old]).catch(()=>{});}
  return path;
}

async function saveProfile(){
  if(!currentSessionUser)return;
  const c=ahP();
  const city=ahProfileField('ah-profile-city').value.trim();
  const organization=ahProfileField('ah-profile-org').value.trim();
  const professional_title=ahProfileField('ah-profile-job').value.trim();
  const focus_area=ahProfileField('ah-profile-focus').value.trim();
  const languages=ahProfileField('ah-profile-langs').value.trim();
  const interests=ahProfileField('ah-profile-interests').value.trim();
  const linkedin_url=ahProfileField('ah-profile-linkedin').value.trim();
  const bio=ahProfileField('ah-profile-bio').value.trim();
  const date_of_birth=ahProfileField('ah-profile-dob').value||null;
  if(!city||!professional_title||!focus_area||!bio){alert(c.required);return;}
  if(linkedin_url&&(!linkedin_url.startsWith('https://')||!linkedin_url.toLowerCase().includes('linkedin.com/'))){alert(c.badLinkedin);return;}
  const save=ahProfileField('ah-profile-save'),oldText=save.textContent;save.disabled=true;save.textContent=c.saving;
  try{
    const file=ahProfileField('ah-profile-photo').files[0];
    const avatar_path=await ahUploadAvatar(file);
    const {error}=await sb.from('profiles').update({organization,professional_title,city,focus_area,interests,languages,linkedin_url,bio,avatar_path,profile_completed:true,updated_at:new Date().toISOString()}).eq('id',currentSessionUser.id);
    if(error)throw error;
    const {error:privateError}=await sb.from('profile_private').upsert({user_id:currentSessionUser.id,date_of_birth,updated_at:new Date().toISOString()},{onConflict:'user_id'});
    if(privateError)throw privateError;
    ahProfileData={...ahProfileData,organization,professional_title,city,focus_area,interests,languages,linkedin_url,bio,avatar_path,profile_completed:true,date_of_birth:date_of_birth||''};
    if(avatar_path){const {data:signed}=await sb.storage.from('avatars').createSignedUrl(avatar_path,3600);ahProfileAvatarUrl=signed?.signedUrl||ahProfileAvatarUrl;}
    if(state?.user)state.user.organization=organization;
    ahApplyProfileToHeader();
    closeProfile();
    alert(c.saved);
  }catch(e){console.error('ActionHub save profile:',e);alert(e?.message||c.saveFail);}finally{save.disabled=false;save.textContent=oldText||c.save;}
}

// Signed-out profile chip keeps opening authentication. Signed-in chip opens profile.
const ahOriginalOpenLogin=typeof openLogin==='function'?openLogin:null;
openLogin=function(){if(currentSessionUser)return openProfile();if(ahOriginalOpenLogin)return ahOriginalOpenLogin();};

// Preserve the existing resilient user renderer, then overlay the photo.
const ahProfileBaseRenderUser=typeof renderUser==='function'?renderUser:null;
if(ahProfileBaseRenderUser){
  renderUser=function(){const r=ahProfileBaseRenderUser();setTimeout(()=>ahApplyProfileToHeader(),0);return r;};
}

// Preserve current session synchronization and load the extended profile afterward.
const ahProfileBaseSyncSession=typeof syncSession==='function'?syncSession:null;
if(ahProfileBaseSyncSession){
  syncSession=async function(session){const r=await ahProfileBaseSyncSession(session);if(session?.user)await ahLoadProfileData();else{ahProfileAvatarUrl='';ahProfileData={organization:'',professional_title:'',city:'',focus_area:'',interests:'',languages:'',linkedin_url:'',bio:'',avatar_path:'',profile_completed:false,date_of_birth:''};}return r;};
}

// Refresh profile labels when interface language changes.
const ahProfileLanguage=document.getElementById('language');
if(ahProfileLanguage){ahProfileLanguage.addEventListener('change',()=>{if(!document.getElementById('profile-modal')?.classList.contains('hidden'))ahRenderProfileModal();});}

// Initialize for an already-restored Supabase session.
(async()=>{
  ahEnsureProfileModal();
  if(hasSupabase&&sb){
    try{const {data:{session}}=await sb.auth.getSession();if(session?.user){currentSessionUser=session.user;await ahLoadProfileData();}}catch(e){console.warn('ActionHub profile init:',e);}
  }
})();

// ACTIONHUB PARTICIPANT PROFILE V2 - live validation + instant photo preview
let ahProfileLocalPreviewUrl='';

function ahProfileRequiredValuesFromForm(){
  return {
    city: ahProfileField('ah-profile-city')?.value.trim()||'',
    professional_title: ahProfileField('ah-profile-job')?.value.trim()||'',
    focus_area: ahProfileField('ah-profile-focus')?.value.trim()||'',
    bio: ahProfileField('ah-profile-bio')?.value.trim()||''
  };
}

function ahProfileLiveCompletion(){
  const values=ahProfileRequiredValuesFromForm();
  const total=Object.keys(values).length;
  const done=Object.values(values).filter(Boolean).length;
  return Math.round(done/total*100);
}

function ahUpdateProfileCompletion(){
  const el=ahProfileField('ah-profile-completion');
  if(el)el.innerHTML=`<b>${ahProfileLiveCompletion()}%</b> profile`;
}

function ahClearProfileValidation(){
  ['ah-profile-city','ah-profile-job','ah-profile-focus','ah-profile-bio'].forEach(id=>{
    const el=ahProfileField(id);
    if(el){el.classList.remove('ah-profile-missing');el.removeAttribute('aria-invalid');}
  });
}

function ahMarkMissingProfileFields(){
  ahClearProfileValidation();
  const fields={
    city:'ah-profile-city',
    professional_title:'ah-profile-job',
    focus_area:'ah-profile-focus',
    bio:'ah-profile-bio'
  };
  const values=ahProfileRequiredValuesFromForm();
  const missing=[];
  Object.entries(fields).forEach(([key,id])=>{
    if(!values[key]){
      missing.push(id);
      const el=ahProfileField(id);
      if(el){el.classList.add('ah-profile-missing');el.setAttribute('aria-invalid','true');}
    }
  });
  if(missing.length){
    const first=ahProfileField(missing[0]);
    if(first){first.focus();first.scrollIntoView({behavior:'smooth',block:'center'});}
  }
  return missing.length;
}

function ahPreviewSelectedPhoto(file){
  const preview=ahProfileField('ah-profile-photo-preview');
  const hint=ahProfileField('ah-profile-photo-hint');
  const c=ahP();
  if(!preview)return;
  if(!file){
    if(ahProfileLocalPreviewUrl){URL.revokeObjectURL(ahProfileLocalPreviewUrl);ahProfileLocalPreviewUrl='';}
    preview.innerHTML=ahProfileAvatarUrl?`<img src="${esc(ahProfileAvatarUrl)}" alt="">`:esc(initials(state?.user?.name||'Participant'));
    if(hint)hint.textContent=c.photoHint;
    return;
  }
  if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>5*1024*1024){
    ahProfileField('ah-profile-photo').value='';
    alert(c.badPhoto);
    ahPreviewSelectedPhoto(null);
    return;
  }
  if(ahProfileLocalPreviewUrl)URL.revokeObjectURL(ahProfileLocalPreviewUrl);
  ahProfileLocalPreviewUrl=URL.createObjectURL(file);
  preview.innerHTML=`<img src="${esc(ahProfileLocalPreviewUrl)}" alt="${esc(state?.user?.name||'Participant')}">`;
  if(hint)hint.textContent=state?.lang==='fr'?"Photo sélectionnée — elle sera importée lorsque vous enregistrerez le profil.":state?.lang==='ko'?"사진 선택됨 — 프로필을 저장할 때 업로드됩니다.":"Photo selected — it will upload when you save the profile.";
}

function ahBindProfileV2Events(){
  ahAddProfileStyles();
  const style=document.getElementById('ah-profile-styles');
  if(style&&!style.textContent.includes('.ah-profile-missing')){
    style.textContent+=`.ah-profile-grid .ah-profile-missing{border-color:#b42318!important;box-shadow:0 0 0 2px rgba(180,35,24,.08);background:#fff8f7}.ah-profile-grid .ah-profile-missing:focus{outline:2px solid rgba(180,35,24,.18);outline-offset:1px}`;
  }
  ['ah-profile-city','ah-profile-job','ah-profile-focus','ah-profile-bio'].forEach(id=>{
    const el=ahProfileField(id);
    if(el&&!el.dataset.ahProfileV2Bound){
      el.dataset.ahProfileV2Bound='1';
      el.addEventListener('input',()=>{el.classList.remove('ah-profile-missing');el.removeAttribute('aria-invalid');ahUpdateProfileCompletion();});
    }
  });
  const photo=ahProfileField('ah-profile-photo');
  if(photo&&!photo.dataset.ahProfileV2Bound){
    photo.dataset.ahProfileV2Bound='1';
    photo.addEventListener('change',()=>ahPreviewSelectedPhoto(photo.files?.[0]||null));
  }
  ahUpdateProfileCompletion();
}

const ahProfileBaseRenderModalV1=ahRenderProfileModal;
ahRenderProfileModal=function(){
  const modal=ahProfileBaseRenderModalV1();
  setTimeout(()=>{ahBindProfileV2Events();ahUpdateProfileCompletion();},0);
  return modal;
};

const ahProfileBaseOpenProfileV1=openProfile;
openProfile=function(){
  const result=ahProfileBaseOpenProfileV1();
  setTimeout(()=>{ahBindProfileV2Events();ahUpdateProfileCompletion();},0);
  return result;
};

saveProfile=async function(){
  if(!currentSessionUser)return;
  const c=ahP();
  const city=ahProfileField('ah-profile-city').value.trim();
  const organization=ahProfileField('ah-profile-org').value.trim();
  const professional_title=ahProfileField('ah-profile-job').value.trim();
  const focus_area=ahProfileField('ah-profile-focus').value.trim();
  const languages=ahProfileField('ah-profile-langs').value.trim();
  const interests=ahProfileField('ah-profile-interests').value.trim();
  const linkedin_url=ahProfileField('ah-profile-linkedin').value.trim();
  const bio=ahProfileField('ah-profile-bio').value.trim();
  const date_of_birth=ahProfileField('ah-profile-dob').value||null;

  if(ahMarkMissingProfileFields()){
    alert(c.required);
    ahUpdateProfileCompletion();
    return;
  }
  if(linkedin_url&&(!linkedin_url.startsWith('https://')||!linkedin_url.toLowerCase().includes('linkedin.com/'))){
    ahProfileField('ah-profile-linkedin')?.focus();
    alert(c.badLinkedin);
    return;
  }

  const save=ahProfileField('ah-profile-save'),oldText=save.textContent;
  save.disabled=true;save.textContent=c.saving;
  try{
    const file=ahProfileField('ah-profile-photo').files[0];
    const avatar_path=await ahUploadAvatar(file);
    const {error}=await sb.from('profiles').update({organization,professional_title,city,focus_area,interests,languages,linkedin_url,bio,avatar_path,profile_completed:true,updated_at:new Date().toISOString()}).eq('id',currentSessionUser.id);
    if(error)throw error;
    const {error:privateError}=await sb.from('profile_private').upsert({user_id:currentSessionUser.id,date_of_birth,updated_at:new Date().toISOString()},{onConflict:'user_id'});
    if(privateError)throw privateError;

    ahProfileData={...ahProfileData,organization,professional_title,city,focus_area,interests,languages,linkedin_url,bio,avatar_path,profile_completed:true,date_of_birth:date_of_birth||''};
    if(avatar_path){
      const {data:signed,error:signedError}=await sb.storage.from('avatars').createSignedUrl(avatar_path,3600);
      if(signedError)console.warn('ActionHub avatar signed URL:',signedError);
      else ahProfileAvatarUrl=signed?.signedUrl||ahProfileAvatarUrl;
    }
    if(state?.user)state.user.organization=organization;
    if(ahProfileLocalPreviewUrl){URL.revokeObjectURL(ahProfileLocalPreviewUrl);ahProfileLocalPreviewUrl='';}
    ahApplyProfileToHeader();
    closeProfile();
    alert(c.saved);
  }catch(e){
    console.error('ActionHub save profile:',e);
    alert(e?.message||c.saveFail);
  }finally{
    save.disabled=false;save.textContent=oldText||c.save;
  }
};

setTimeout(()=>ahBindProfileV2Events(),0);
