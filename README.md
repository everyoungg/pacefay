# SAFE PAY — Consumer Safety UX Prototype

모바일 금융앱 형태로 구성한 소비자 생체정보 안전 UX 프로토타입입니다.

## GitHub Pages로 공개하기

이 버전은 Next.js/Vercel이 필요 없는 정적 웹사이트입니다.

1. GitHub 저장소의 루트에 `index.html`, `style.css`, `script.js`를 업로드합니다.
2. GitHub → Settings → Pages → Deploy from a branch → `main` / `/ (root)`를 선택합니다.
3. 저장하면 `https://everyoungg.github.io/pacefay/` 형태의 공개 링크로 접근할 수 있습니다.
4. 카메라 기능은 HTTPS 환경에서 브라우저 권한을 허용해야 작동합니다.

## Prototype note

카메라 화면은 실제 카메라 스트림을 표시하며, 브라우저에서 얼굴 검출 모델을 이용해 얼굴이 화면에 들어오면 등록 완료 화면으로 전환합니다. 실제 얼굴 특징이나 생체정보를 서버에 저장하거나 전송하지 않습니다. 모델 로딩이 불가능한 환경에서는 데모용 fallback 흐름으로 전환됩니다.
