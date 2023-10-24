"use client";
import { Navbar } from "@/components/ui/Navbar";
import { FC } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-screen flex flex-col">
      <div className="-m-10 fixed w-full z-10">
        <Navbar />
      </div>
      <div className="mt-20">{children}</div>
    </div>
  );
};

export default Layout;
