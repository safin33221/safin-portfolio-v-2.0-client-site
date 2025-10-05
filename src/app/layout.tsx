import type { Metadata } from "next";
import { SUSE } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import AuthProvider from "@/provider/AuthProvider";
import { Toaster } from "sonner";


const suse = SUSE({
  weight: '400',
  subsets: ['latin'],
})
export const metadata: Metadata = {
  title: "Safayet Hossan Safin | Full Stack Developer ",
  description: "Explore the portfolio of Safayet Hossan Safin, a passionate full stack developer specializing in modern web technologies, projects, and professional experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${suse.className}  `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster/>
          <AuthProvider>

            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
