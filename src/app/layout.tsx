import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import Navbar from "@/components/navbar/navbar";

import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/toaster"




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KassbokarAI",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
        
       <StoreProvider>
       <html lang="en">
        <body>
          <Navbar />
          
          {children}
          <Toaster />
        </body>
      </html>
       </StoreProvider>
       
  </ClerkProvider>

  );
}


