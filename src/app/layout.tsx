import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Parvulapps",
  description:
    "Aplicación interna LBNSF para evaluar aprendizajes de estudiantes de Ed. Parvularia",
};

const client = getQueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: refactor this, extract the query client provider into its own client component
  return (
    <html lang="es">
      <UserProvider>
        <body className={`${inter.className} min-h-screen h-screen`}>
          <QueryClientProvider client={client}>{children}</QueryClientProvider>
        </body>
      </UserProvider>
    </html>
  );
}
