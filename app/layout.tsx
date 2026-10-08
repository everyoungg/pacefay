import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAFE PAY — 소비자 중심 생체정보 보호",
  description: "다크패턴 없는 안전한 생체인증 UX 프로토타입"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
