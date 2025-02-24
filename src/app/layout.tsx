import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { TanstackProvider } from "@/providers/tanstack-provider";

const geistSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  weight: "400",
  variable: "--font-dm-mono",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | FleeDCA",
    default: "FleeDCA - Track Your Investment Buckets",
  },
  description:
    "Smart investment tracking and dollar-cost averaging management platform",
  openGraph: {
    title: "FleeDCA",
    description:
      "Smart investment tracking and dollar-cost averaging management platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${dmMono.variable} antialiased`}>
        <TanstackProvider>
          {children}
          <Toaster />
        </TanstackProvider>
      </body>
    </html>
  );
}
