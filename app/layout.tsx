import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryClientProviderComponent from "@/providers/QueryClientProviderComponent";
import { AuthProvider } from "@/providers/AuthProvider";
import ReduxProvider from "@/providers/ReduxProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trackr | High-velocity Project Management",
  description: "Manage projects with precision. The new standard for high-performance teams.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>       
    <QueryClientProviderComponent>
      <ReduxProvider>

<AuthProvider>
        {children}
</AuthProvider>
      </ReduxProvider>
          <Toaster />
    </QueryClientProviderComponent>
      </body>
    </html>
  );
}
