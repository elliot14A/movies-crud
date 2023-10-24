import { FC } from "react";
import Button from "./Button";
import Link from "next/link";
import { DEFAULT_PICTURE_URL } from "@/lib/constants";
import Image from "next/image";

export const Navbar: FC = () => {
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
            <Button className="p-4" size="small">
              Upgrade
            </Button>
          </li>
          <li>
            <Link href="/home/profile">
              <div className="relative pt-1">
                <div className="relative w-8 h-8">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    src={DEFAULT_PICTURE_URL}
                    alt="profile picture"
                    className="rounded-full"
                  />
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
