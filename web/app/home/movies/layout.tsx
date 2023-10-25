"use client";
import { Navbar } from "@/components/ui/Navbar";
import { User } from "@/lib/types/user";
import { Loader } from "lucide-react";
import { FC, useEffect, useState } from "react";
import getUserAction from "@/actions/user/details";
import toast from "react-hot-toast";
import { useCookies } from "next-client-cookies";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>();
  const cookies = useCookies();
  useEffect(() => {
    async function getUser() {
      const result = await getUserAction();
      if (result.isErr) {
        toast.error(result.error.message);
      } else {
        const data = result.value;
        if (data.newAccessToken) {
          cookies.set("accessToken", data.newAccessToken);
        }
        setUser(data);
      }
    }
    getUser();
  }, []);
  if (!user) {
    return (
      <div className="mt-36 flex items-center justify-center">
        <Loader className="mr-2 h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-screen flex flex-col">
      <div className="-m-10 fixed w-full z-10">
        <Navbar email={user.email} name={user.name} />
      </div>
      <div className="mt-20">{children}</div>
    </div>
  );
};

export default Layout;
