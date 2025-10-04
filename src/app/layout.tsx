import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, SUSE } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";

const suse = SUSE({
  weight: '400',
  subsets: ['latin'],
})
export const metadata: Metadata = {
  title: "Safayet Hossan Safin",
  description: "safayet hossan safin portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${suse.className} `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
