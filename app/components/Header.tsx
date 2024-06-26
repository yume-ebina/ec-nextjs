import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../lib/next-auth/options";
import { PiCatLight } from "react-icons/pi";
import { CiCoffeeCup } from "react-icons/ci";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => (
  <Link
    href={href}
    className="flex items-center text-black hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium group"
  >
    {children}
  </Link>
);

const Header = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user;

  return (
    <header className="bg-gray-100 shadow-lg">
      <nav className="flex items-center justify-between p-4">
        <Link
          href={"/"}
          className="text-xl font-bold flex items-center text-black"
        >
          <CiCoffeeCup className="w-8 h-8" />
          <span className="ml-2">PUTEMARU Coffee</span>
        </Link>

        {/* 検索フィールド(ダミー) */}
        <div className="flex-grow mx-4 max-w-md">
          <input
            type="text"
            placeholder="検索"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1">
          <NavLink href="/">
            <span className="ml-0.5 transition-transform duration-100 hover:scale-110">
              ホーム
            </span>
          </NavLink>
          <NavLink href={user ? "/profile" : "/api/auth/signin"}>
            <span className="transition-transform duration-100 hover:scale-110">
              {user ? "プロフィール" : "ログイン"}
            </span>
          </NavLink>
          {user && (
            <NavLink href={"/api/auth/signout"}>
              <span className="transition-transform duration-100 hover:scale-110">
                ログアウト
              </span>
            </NavLink>
          )}
          {user ? (
            <Link
              href={`/profile`}
              className="rounded-full overflow-hidden border border-gray-100"
            >
              <Image
                width={40}
                height={40}
                alt="profile_icon"
                src={user?.image || "/default_icon.png"}
                className="rounded-full"
              />
            </Link>
          ) : (
            <Image
              width={40}
              height={40}
              alt="profile_icon"
              src={"/default_icon.png"}
              className="rounded-full"
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
