"use client";
import { FC, useState } from "react";
import Button from "./Button";
import Link from "next/link";
import { User } from "@/lib/types/user";
import logoutAction from "@/actions/auth/logout";
import { useCookies } from "next-client-cookies";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Navbar: FC<User> = ({ email, name }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const cookies = useCookies();
  const router = useRouter();
  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen flex flex-wrap items-center justify-between">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-2">
          <Link href="/home">
            <div className="m-12 flex items-center justify-center">
              <p className="text-3xl text-red-600">Movies</p>
              <p className="text-2xl font-semibold mt-[0.3rem]">Crud</p>
            </div>
          </Link>
        </div>
        <ul className="font-medium flex space-x-8 mt-0 border-0 bg-white p-4">
          <li>
            <div className="relative pt-1">
              <div className="relative mt-1">
                logged in as {name ? name : email}
              </div>
            </div>
          </li>
          <li>
            <Button
              onClick={async () => {
                setLoading(true);
                const result = await logoutAction();
                if (result.isOk) {
                  toast.success("Logout successful");
                  cookies.remove("accessToken");
                  cookies.remove("refreshToken");
                  router.replace("/auth/login");
                } else {
                  const error = result.error;
                  console.log(error);
                  toast.error(error.message);
                }
                setLoading(false);
              }}
              isLoading={loading}
              className="p-4 bg-red-500"
              size="small"
            >
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
