import type { Metadata } from "next";
import { Newsreader, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Claude Code — Reference Guide",
    template: "%s · Claude Code Reference Guide",
  },
  description:
    "An unofficial, community-built reference guide to Claude Code: CLI usage, customization, subagents, agent teams, QA workflows, and more.",
  openGraph: {
    title: "Claude Code — Reference Guide",
    description:
      "An unofficial, community-built reference guide to Claude Code: CLI usage, customization, subagents, agent teams, QA workflows, and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code — Reference Guide",
    description:
      "An unofficial, community-built reference guide to Claude Code: CLI usage, customization, subagents, agent teams, QA workflows, and more.",
  },
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text-primary">
        {children}
      </body>
    </html>
  );
}
