import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Western Village Eye - Almost Uncivilized",
  description: "Independent journalism for Edwards, Colorado and Eagle County. Local stories, uncensored and unfiltered.",
  keywords: ["news", "Edwards Colorado", "Eagle County", "local journalism", "independent media"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Playfair+Display:wght@400;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
