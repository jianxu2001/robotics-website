import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.scr-robotics.com"),
  title: "SCR Robot | Palletizing Robots & Industrial Automation Systems",
  description:
    "South China Robotics Technology (Guangzhou) Co., Ltd. builds industrial robots, palletizing robots, depalletizing systems, stamping automation, and conveyor automation lines for overseas manufacturers.",
  keywords: [
    "South China Robotics Technology Guangzhou",
    "SCR Robot",
    "ECR series robot",
    "SCH series robot",
    "SAR series robot",
    "SCR series palletizing robot",
    "SRL series robot",
    "STC stamping robot",
    "ER six axis robot",
    "palletizing robot",
    "depalletizing robot",
    "stamping automation",
    "machine tending robot",
    "3D vision bag breaking",
    "industrial automation systems",
    "robotic palletizer",
    "conveyor systems",
    "factory automation",
  ],
  openGraph: {
    title: "SCR Robot | Industrial Automation Systems",
    description:
      "Turnkey palletizing, depalletizing, conveyor, and robotic automation systems for global factories.",
    images: ["/images/bejing1%20(1).jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
