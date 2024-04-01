import Link from "next/link";
import React from "react";
import { CiCoffeeCup } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-gray-100 shadow-inner mt-10">
      <nav className="flex flex-col items-center justify-between p-4 text-sm">
        <div className="flex mb-4">
          <Link href={"/"} className="flex items-center text-black">
            <CiCoffeeCup className="w-6 h-6" />
            <span className="ml-2">PUTEMARU Coffee</span>
          </Link>
        </div>
        <div className="flex gap-4 mb-4">
          <Link href="/" className="text-black hover:text-gray-700">
            ホーム
          </Link>
          <Link href="/" className="text-black hover:text-gray-700">
            会社情報
          </Link>
          <Link href="/" className="text-black hover:text-gray-700">
            お問い合わせ
          </Link>
        </div>
        <div className="text-black">
          &copy; {new Date().getFullYear()} PUTEMARU Coffee All rights reserved.
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
