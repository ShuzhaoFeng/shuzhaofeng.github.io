import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import ActivityWidget from "./components/ActivityWidget";
import I18nProvider from "./i18n-provider";
import ThemeProvider from "./theme-provider";
import { themeInitializationScript } from "./theme";
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
  // post exists, as empty sections stay hidden, and the browser metadata sync
  // tells post pages from 404 pages under `/blog/`.
  const postNames = getAllPosts().map((post) => post.name);
  const hasPosts = postNames.length > 0;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <I18nProvider postNames={postNames}>
            <NavBar hasPosts={hasPosts} />
            {children}
            <ActivityWidget />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
