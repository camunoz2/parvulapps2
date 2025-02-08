import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] })

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
    <html lang="es">
      <UserProvider>
        <body className={`${inter.className} min-h-screen h-screen`}>
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
