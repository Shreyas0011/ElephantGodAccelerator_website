import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MeetingModal from "@/components/MeetingModal";
import FloatingWidgets from "@/components/FloatingWidgets";
import MobileStickyBar from "@/components/MobileStickyBar";
import TechBackground from "@/components/TechBackground";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Startup Accelerator & Funding Network India | Elephant God Accelerator",
  description:
    "Led by Ramani Iyer (Co-Founder, JustDial Ltd.), Elephant God Accelerator (EGA) works as a hands-on strategic partner for early-stage and growth startups in India, offering operations scaling, sales CRM automation, and VC syndicate fundraising.",
  keywords: [
    "Startup accelerator India",
    "Startup funding India",
    "Angel investor network India",
    "Startup mentorship India",
    "Venture accelerator Bengaluru",
    "Venture accelerator India",
    "Startup growth consulting India",
  ],
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Elephant God Accelerator (EGA)",
    description: "Accelerating India's next generation of market leaders.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} h-full`} suppressHydrationWarning>
      <body className="bg-bg-dark text-gray-200 min-h-full flex flex-col antialiased relative overflow-x-hidden fancy-mesh-gradient">
        {/* Fancy background glowing orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="glow-orb glow-orb-orange top-[5%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px]" />
          <div className="glow-orb glow-orb-gold top-[25%] right-[-10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px]" />
          <div className="glow-orb glow-orb-green top-[50%] left-[-5%] w-[40vw] h-[40vw] max-w-[450px] max-h-[450px]" />
          <div className="glow-orb glow-orb-orange top-[75%] right-[-5%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px]" />
        </div>
        <TechBackground />
        <AppProvider>
          <Header />
          <main className="flex-grow relative">{children}</main>
          <Footer />
          <MeetingModal />
          <FloatingWidgets />
          <MobileStickyBar />
        </AppProvider>
      </body>
    </html>
  );
}
