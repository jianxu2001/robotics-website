import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.scr-robot.com"),
  title: "SCR Robot | Industrial Robot Automation Supplier",
  description:
    "SCR Robot supplies palletizing robots, depalletizing systems, stamping automation, machine tending cells, and conveyor automation for factories worldwide.",
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
    title: "SCR Robot | Industrial Robot Automation Supplier",
    description:
      "Palletizing, depalletizing, stamping, tending, and conveyor automation systems for factory projects worldwide.",
    images: ["/images/bejing1%20(1).jpg"],
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-144.png", sizes: "144x144", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
