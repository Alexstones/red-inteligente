import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oculum — Red Inteligente",
  description: "Portal de entrada al sistema Red Inteligente. ERP modular con IA y Blockchain.",
  keywords: ["ERP", "blockchain", "IA", "multi-tenant", "Red Inteligente"],
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
