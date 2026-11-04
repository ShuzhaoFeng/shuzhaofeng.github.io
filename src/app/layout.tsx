import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import ActivityWidget from "./components/ActivityWidget";
import I18nProvider from "./i18n-provider";
import { sharedMetadata } from "./site-metadata";
import { getAllPosts } from "./blog/posts";

export const metadata: Metadata = sharedMetadata;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read on the server at build time: the navigation shows Blog only when a
  // post exists, as empty sections stay hidden.
  const hasPosts = getAllPosts().length > 0;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <NavBar hasPosts={hasPosts} />
          {children}
          <ActivityWidget />
        </I18nProvider>
      </body>
    </html>
  );
}
