import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/app/ui/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Parvulapps",
  description:
    "Aplicación interna LBNSF para evaluar aprendizajes de estudiantes de Ed. Parvularia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={inter.className}>
          <Navigation />
          <main className="container mx-auto flex min-h-screen flex-col items-center justify-between p-24">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
