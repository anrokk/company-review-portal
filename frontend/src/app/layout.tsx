import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransitionWrapper from "@/components/framer-motion/PageTransitionWrapper";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Intereview",
  description: "A platform for users to review companies and share their experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-gray-200 antialiased flex flex-col min-h-screen`}>
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto px-6 sm:px-12">
            <PageTransitionWrapper>
              {children}
            </PageTransitionWrapper>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
