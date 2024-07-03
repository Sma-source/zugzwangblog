import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import SessionProvider from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    template: "%s | TechnoGatsby",
    default: "TechnoGatsby",
  },
  description:
    " Plongez dans les sujets brûlants qui façonnent le paysage géopolitique actuel, des relations internationales aux conflits régionaux, en passant par les enjeux économiques mondiaux.",
  openGraph: {
    title: "TechnoGatsby",
    description:
      " Plongez dans les sujets brûlants qui façonnent le paysage géopolitique actuel, des relations internationales aux conflits régionaux, en passant par les enjeux économiques mondiaux.",
    url: "http://localhost:3000",
    siteName: "TechnoGatsby",
    type: "website",
  },

  keywords: ["géo politique", "stratégie", "blog politique"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="max-w-7xl mx-auto lg:py-10 space-y-10 p-5 lg:p-0">
            <Navbar />
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <SessionProvider />
      </body>
    </html>
  );
}
