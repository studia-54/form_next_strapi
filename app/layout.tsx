import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Form for Studia 54",
  description: "Form for Studia 54",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
       <html lang="en">
        <body>
          {children}
        </body>
      </html>
  );
}
