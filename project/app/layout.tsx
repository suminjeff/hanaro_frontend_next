import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import AuthContext from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "나만의 레시피",
  description: "나만의 레시피를 만들어보자",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <NavBar />
          {children}
          <Footer />
        </AuthContext>
      </body>
    </html>
  );
}
