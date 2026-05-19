import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Nexus — Red Inteligente",
  description: "Portal de entrada al sistema Red Inteligente. Ecosistema neural con IA y Blockchain.",
  keywords: ["ERP", "blockchain", "IA", "Nexus", "Red Inteligente"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-primary/30">
        <div className="noise-overlay" />
        <div className="fixed inset-0 neural-grid pointer-events-none opacity-40" />
        <div className="relative z-10 min-h-screen">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>

    </html>
  );
}
