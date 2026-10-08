 "use client";

import { useState } from "react";

type Mode = "intro" | "dark" | "safe" | "diagnosis";

export default function Home() {
  const [mode, setMode] = useState<Mode>("intro");
  const [consent, setConsent] = useState<"yes" | "no" | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const go = (next: Mode) => {
    setMode(next);
    setShowInfo(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <header className="nav">
        <button className="brand" onClick={() => go("intro")}>
          SAFE<span>PAY</span>
        </button>
        <nav>
          <button className={mode === "dark" ? "active" : ""} onClick={() => go("dark")}>기존 UX</button>
          <button className={mode === "safe" ? "active" : ""} onClick={() => go("safe")}>안전한 UX</button>
          <button className={mode === "diagnosis" ? "active" : ""} onClick={() => go("diagnosis")}>UX 진단</button>
        </nav>
      </header>

      {mode === "intro" && (
        <>
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">CONSUMER SAFETY PROJECT · 2026</p>
              <h1>편리함 뒤에 숨은 선택,<br /><strong>이제 소비자가 결정합니다.</strong></h1>
              <p className="hero-desc">
                생체정보는 비밀번호와 다릅니다.<br />
                한 번 제공하면 되돌릴 수 없는 정보이기에<br />
                가입 과정에서도 소비자의 선택권이 먼저 보장되어야 합니다.
              </p>
              <div className="hero-actions">
                <button className="primary" onClick={() => go("dark")}>가입 화면 체험하기 <span>→</span></button>
                <button className="secondary" onClick={() => go("diagnosis")}>해결책 먼저 보기</button>
              </div>
            </div>
            <div className="phone">
              <div className="phone-top"></div>
              <div className="face-icon">☺</div>
              <div className="scan-line"></div>
              <div className="phone-text">FACE<br /><b>PAY</b></div>
            </div>
          </section>

          <section className="section">
            <p className="eyebrow">WHY IT MATTERS</p>
            <h2>생체정보는 <span>바꿀 수 없는</span> 정보입니다.</h2>
            <div className="cards">
              <InfoCard num="01" title="비밀번호" text="유출되면 변경할 수 있습니다." />
              <InfoCard num="02" title="안면 생체정보" text="유출되어도 얼굴 자체를 변경할 수 없습니다." />
              <InfoCard num="03" title="소비자 선택권" text="편리함보다 먼저, 무엇에 동의하는지 알 수 있어야 합니다." />
            </div>
          </section>

          <section className="quote-section">
            <p>소비자 중심 UX의 기준</p>
            <blockquote>
              “편리함을 제공하되,<br /><b>선택을 대신하지 않는다.</b>”
            </blockquote>
          </section>
        </>
      )}

      {mode === "dark" && (
        <section className="experience">
          <StepBadge text="BEFORE · DARK PATTERN" />
          <h1>페이스페이 가입</h1>
          <p className="sub">얼굴로 간편하게 결제하세요.</p>

          <div className="warning-banner">
            <span>⚠</span>
            <div><b>이 화면에는 다크패턴이 포함되어 있습니다.</b><br />사용자가 무심코 생체정보 제공에 동의하도록 유도하는 구조를 체험해보세요.</div>
          </div>

          <div className="mock-card dark-card">
            <div className="mock-head">
              <div className="face-mini">☺</div>
              <div><b>Face Pay</b><small>간편결제 등록</small></div>
            </div>
            <div className="mock-copy">얼굴을 등록하면<br /><b>더 빠르고 편리하게</b> 결제할 수 있어요.</div>

            <label className="fake-check checked"><span>✓</span> 얼굴 생체정보 수집·이용에 동의합니다.</label>
            <label className="fake-check checked"><span>✓</span> 개인정보 제3자 제공에 동의합니다.</label>

            <button className="dark-cta" onClick={() => go("safe")}>동의하고 인증하기</button>
            <button className="tiny-link" onClick={() => setShowInfo(true)}>다른 방법으로 인증하기</button>

            {showInfo && (
              <div className="revealed">다른 인증 방법을 선택할 수 있지만, 시각적으로 작게 배치되어 있습니다.</div>
            )}
          </div>

          <div className="diagnosis-grid">
            <DiagnosisItem bad title="선택권의 불균형" text="생체인증 버튼을 더 눈에 띄게 배치" />
            <DiagnosisItem bad title="사전 선택된 동의" text="사용자가 직접 판단하기 전에 동의가 활성화됨" />
            <DiagnosisItem bad title="정보 비대칭" text="수집 목적·보관·제공 정보가 눈에 잘 띄지 않음" />
          </div>

          <button className="next-button" onClick={() => go("safe")}>같은 상황을 안전하게 바꿔보기 →</button>
        </section>
      )}

      {mode === "safe" && (
        <section className="experience">
          <StepBadge text="AFTER · CONSUMER-CENTERED UX" />
          <h1>페이스페이 가입</h1>
          <p className="sub">편리함과 선택권을 함께 제공합니다.</p>

          <div className="success-banner">
            <span>✓</span>
            <div><b>소비자 중심 UX로 개선했습니다.</b><br />어떤 정보를 왜 제공하는지 확인한 뒤 직접 선택할 수 있습니다.</div>
          </div>

          <div className="mock-card safe-card">
            <div className="mock-head">
              <div className="face-mini safe">☺</div>
              <div><b>Face Pay</b><small>안전한 결제 등록</small></div>
            </div>

            <div className="info-box">
              <div className="info-title">안면 생체정보를 이용합니다.</div>
              <p>결제 본인확인을 위해 얼굴 정보를 사용합니다.</p>
              <button onClick={() => setShowInfo(!showInfo)}>수집·이용 정보 자세히 보기 {showInfo ? "⌃" : "⌄"}</button>
              {showInfo && (
                <div className="details">
                  <p><b>수집 목적</b> 결제 본인확인</p>
                  <p><b>이용 목적</b> 얼굴 기반 인증</p>
                  <p><b>제공 여부</b> 제3자 제공 여부를 명확히 고지</p>
                  <p><b>선택권</b> 동의하지 않아도 다른 인증 방법 이용 가능</p>
                </div>
              )}
            </div>

            <div className="choice-title">안면 생체정보 제공에 동의하시겠습니까?</div>
            <div className="choice-row">
              <button className={consent === "yes" ? "choice selected" : "choice"} onClick={() => setConsent("yes")}>
                <span className="radio">{consent === "yes" ? "●" : "○"}</span>
                동의합니다
              </button>
              <button className={consent === "no" ? "choice selected" : "choice"} onClick={() => setConsent("no")}>
                <span className="radio">{consent === "no" ? "●" : "○"}</span>
                동의하지 않습니다
              </button>
            </div>

            <button className="safe-cta" disabled={!consent}>
              {consent === "yes" ? "얼굴 인증 시작하기" : consent === "no" ? "다른 인증 방법 선택하기" : "선택 후 계속하기"}
            </button>
            <button className="equal-link" onClick={() => alert("다른 인증 방법: 비밀번호 / 카드 인증 / 1회용 인증번호")}>다른 인증 방법도 동일하게 이용할 수 있어요</button>
          </div>

          <div className="principles">
            <Principle icon="01" title="선택권 보장" text="어떤 선택도 미리 활성화하지 않습니다." />
            <Principle icon="02" title="정보의 명확성" text="수집 목적과 이용 내용을 선택 전에 보여줍니다." />
            <Principle icon="03" title="대체 수단 제공" text="동의하지 않아도 동일한 서비스 이용이 가능합니다." />
          </div>

          <button className="next-button" onClick={() => go("diagnosis")}>UX 진단 결과 보기 →</button>
        </section>
      )}

      {mode === "diagnosis" && (
        <section className="experience diagnosis-page">
          <StepBadge text="SAFE UX CHECK" />
          <h1>소비자 중심 UX 진단</h1>
          <p className="sub">이 화면은 소비자의 자율적인 선택을 방해하지 않습니다.</p>

          <div className="score-card">
            <div>
              <span className="score-label">DARK PATTERN RISK</span>
              <div className="score">LOW</div>
            </div>
            <div className="score-circle">✓</div>
          </div>

          <div className="check-list">
            <Check title="선택권 균형" desc="생체인증과 대체 인증 방법을 동등하게 안내" />
            <Check title="사전 선택 방지" desc="동의 항목을 기본값으로 선택하지 않음" />
            <Check title="중요 정보 가독성" desc="수집 목적과 이용 정보를 선택 전에 제공" />
            <Check title="대체 인증 제공" desc="생체정보에 동의하지 않아도 서비스 이용 가능" />
            <Check title="소비자 이해 지원" desc="복잡한 약관 대신 핵심 내용을 먼저 설명" />
          </div>

          <div className="final-message">
            <p>CONSUMER SAFETY PRINCIPLE</p>
            <h2>비밀번호는 유출되면<br /><span>바꾸면 그만이지만,</span></h2>
            <h2>안면 생체 데이터는<br /><strong>평생 바꿀 수 없는<br />비가역적 개인 자산입니다.</strong></h2>
          </div>

          <button className="next-button" onClick={() => go("intro")}>처음으로 돌아가기 ↗</button>
        </section>
      )}

      <footer>
        <div>SAFE<span>PAY</span> · Consumer Safety UX Prototype</div>
        <div>생체정보를 제공할지 결정하는 권리는 소비자에게 있어야 합니다.</div>
      </footer>
    </main>
  );
}

function InfoCard({ num, title, text }: { num: string; title: string; text: string }) {
  return <div className="info-card"><span>{num}</span><h3>{title}</h3><p>{text}</p></div>;
}

function StepBadge({ text }: { text: string }) {
  return <div className="step-badge">{text}</div>;
}

function DiagnosisItem({ bad, title, text }: { bad?: boolean; title: string; text: string }) {
  return <div className={bad ? "diagnosis-item bad" : "diagnosis-item"}><span>{bad ? "!" : "✓"}</span><div><b>{title}</b><p>{text}</p></div></div>;
}

function Principle({ icon, title, text }: { icon: string; title: string; text: string }) {
  return <div className="principle"><span>{icon}</span><div><b>{title}</b><p>{text}</p></div></div>;
}

function Check({ title, desc }: { title: string; desc: string }) {
  return <div className="check"><span>✓</span><div><b>{title}</b><p>{desc}</p></div><em>SAFE</em></div>;
}
