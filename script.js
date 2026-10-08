const app = document.getElementById('app');
const cameraModal = document.getElementById('cameraModal');
const video = document.getElementById('camera');
const cameraTitle = document.getElementById('cameraTitle');
const cameraSub = document.getElementById('cameraSub');
const cameraStatus = document.getElementById('cameraStatus');
const progressBar = document.getElementById('progressBar');
const toast = document.getElementById('toast');
let stream = null;
let recognitionTimer = null;

function home(){
  app.innerHTML = `
    <section class="home-top">
      <p class="greeting">SAFE PAY</p>
      <h1 class="home-title">더 빠르고 간편한<br>결제를 시작해보세요.</h1>
      <div class="balance-card">
        <div class="balance-label">SAFE PAY 이용 가능 금액</div>
        <div class="balance-value">₩ 154,280,000</div>
        <div class="balance-sub">안전한 결제를 위한 가상 화면입니다.</div>
      </div>
      <div class="quick-row">
        <div class="quick"><span class="q-icon">⌁</span><small>송금</small></div>
        <div class="quick"><span class="q-icon">▣</span><small>결제</small></div>
        <div class="quick"><span class="q-icon">＋</span><small>충전</small></div>
        <div class="quick"><span class="q-icon">⋯</span><small>전체</small></div>
      </div>
      <div class="face-card">
        <div class="face-card-top"><div class="face-card-title">SAFE PAY 얼굴결제</div><div class="face-card-badge">간편결제</div></div>
        <p class="face-card-desc">얼굴을 등록하면 결제할 때마다<br>더 빠르게 본인확인을 할 수 있어요.</p>
        <button class="face-join" id="joinFromHome">세이프페이 가입하기</button>
      </div>
      <div class="notice">
        <div class="notice-title">SAFE PAY 안내</div>
        <div class="notice-item"><span class="notice-dot"></span><p>얼굴 등록은 본인확인을 위한 절차입니다.</p></div>
        <div class="notice-item"><span class="notice-dot"></span><p>가입 전 수집·이용 내용을 확인할 수 있습니다.</p></div>
      </div>
    </section>`;
  document.getElementById('joinFromHome').onclick = register;
}

function register(){
  app.innerHTML = `
    <section class="register-screen">
      <button class="back" id="backHome">‹</button>
      <h1 class="register-title">세이프페이 가입하기</h1>
      <p class="register-desc">얼굴을 등록하면 결제할 때 간편하게<br>본인확인을 할 수 있어요.</p>
      <div class="register-card">
        <div class="register-icon">⌾</div>
        <h2>얼굴 정보를 등록합니다.</h2>
        <p>결제 본인확인을 위해 얼굴의 특징 정보를 이용합니다.</p>
        <div class="data-row">
          <div class="data-row-title">등록 정보</div>
          <p>안면 생체정보 · 결제 본인확인</p>
        </div>
        <div class="data-row retention-row">
          <div class="data-row-title">보관 및 파기</div>
          <p>등록된 얼굴 데이터는 <strong>3개월 후 파기</strong>됩니다.</p>
          <span class="retention-note">3개월 후 연장 또는 파기 알림이 발송됩니다.</span>
        </div>
        <button class="join-btn" id="startFace">세이프페이 가입하기</button>
      </div>
      <div class="join-note">카메라 접근 권한이 필요합니다.</div>
    </section>`;
  document.getElementById('backHome').onclick = home;
  document.getElementById('startFace').onclick = startCamera;
}

async function startCamera(){
  cameraModal.classList.remove('hidden');
  cameraTitle.textContent = '얼굴을 인식하고 있어요';
  cameraSub.textContent = '얼굴이 원 안에 오도록 휴대폰을 바라봐 주세요.';
  cameraStatus.innerHTML = '<span class="dot"></span> 얼굴 인식 중';
  progressBar.style.width = '0%';
  try{
    stream = await navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:{ideal:720},height:{ideal:960}},audio:false});
    video.srcObject = stream;
    await video.play();
    startFaceDetection();
  }catch(err){
    cameraTitle.textContent = '카메라 접근이 필요해요';
    cameraSub.textContent = '브라우저의 카메라 권한을 허용한 뒤 다시 시도해 주세요.';
    cameraStatus.innerHTML = '<span class="dot"></span> 카메라 대기 중';
    showToast('카메라 권한을 허용해 주세요.');
  }
}

async function startFaceDetection(){
  try{
    cameraTitle.textContent = '얼굴을 인식하고 있어요';
    cameraSub.textContent = '얼굴이 원 안에 오도록 휴대폰을 바라봐 주세요.';
    await faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights/');
  }catch(err){
    // 모델을 불러오지 못하는 환경에서도 카메라 UX를 시연할 수 있도록
    // 짧은 프로토타입 타이머로 완료 화면을 보여줍니다.
    startPrototypeFallback();
    return;
  }

  let stableFrames = 0;
  const started = Date.now();
  clearInterval(recognitionTimer);
  recognitionTimer = setInterval(async()=>{
    if(!video.videoWidth) return;
    try{
      const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({inputSize:224,scoreThreshold:0.5}));
      if(detection){
        stableFrames += 1;
        const pct = Math.min(100, Math.round(stableFrames / 8 * 100));
        progressBar.style.width = pct + '%';
        cameraStatus.innerHTML = '<span class="dot"></span> 얼굴 확인 중';
        if(stableFrames >= 8){
          clearInterval(recognitionTimer);
          completeRegistration();
        }
      }else{
        stableFrames = Math.max(0, stableFrames - 1);
        cameraStatus.innerHTML = '<span class="dot"></span> 얼굴을 찾는 중';
        if(Date.now() - started > 12000){
          cameraSub.textContent = '얼굴을 원 안에 맞추면 자동으로 등록됩니다.';
        }
      }
    }catch(err){
      // 일시적인 검출 오류는 다음 프레임에서 다시 시도
    }
  }, 160);
}

function startPrototypeFallback(){
  clearInterval(recognitionTimer);
  let progress = 0;
  recognitionTimer = setInterval(()=>{
    progress += 5;
    progressBar.style.width = progress + '%';
    if(progress >= 100){
      clearInterval(recognitionTimer);
      completeRegistration();
    }
  },100);
}

function completeRegistration(){
  cameraTitle.textContent = '얼굴이 등록되었습니다.';
  cameraSub.textContent = 'SAFE PAY 얼굴결제 등록이 완료되었습니다.';
  cameraStatus.innerHTML = '<span class="dot"></span> 등록 완료';
  document.getElementById('scanBar').style.display = 'none';
  setTimeout(()=>{
    closeCamera();
    showComplete();
  },800);
}

function closeCamera(){
  clearInterval(recognitionTimer);
  if(stream){stream.getTracks().forEach(t=>t.stop());stream=null;}
  video.srcObject = null;
  cameraModal.classList.add('hidden');
  document.getElementById('scanBar').style.display = '';
}

function showComplete(){
  app.innerHTML = `
    <section class="complete-screen">
      <div class="complete-icon">✓</div>
      <h1>얼굴이 등록되었습니다.</h1>
      <p>이제 SAFE PAY에서 얼굴을 이용해<br>간편하게 본인확인을 할 수 있어요.</p>
      <button class="primary-full" id="confirmComplete">확인</button>
    </section>`;
  document.getElementById('confirmComplete').onclick = showFinal;
}

function showFinal(){
  app.innerHTML = `
    <section class="final-screen">
      <div class="final-label">CONSUMER SAFETY PRINCIPLE</div>
      <h1>비밀번호는 유출되면<br><span>바꾸면 그만이지만,</span><br><br>안면 생체 데이터는<br><strong>평생 바꿀 수 없는<br>비가역적 개인 자산입니다.</strong></h1>
      <div class="final-line"></div>
      <div class="final-note">생체정보를 제공할지 결정하는 권리는<br>소비자에게 있어야 합니다.</div>
    </section>`;
}

function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2200);
}

document.getElementById('brandBtn').onclick = home;
document.getElementById('helpBtn').onclick = ()=>showToast('SAFE PAY 소비자 안전 UX 프로토타입');
document.getElementById('closeCamera').onclick = closeCamera;
document.getElementById('cameraCancel').onclick = closeCamera;
window.addEventListener('beforeunload',()=>{if(stream)stream.getTracks().forEach(t=>t.stop())});
home();
