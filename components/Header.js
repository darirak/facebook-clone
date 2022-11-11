import Image from "next/image";
import React from "react";
import facebook from "../assets/facebook1.png";
import nouser from "../assets/nouser.png";

import { MdHome } from "react-icons/md";
import { FiPlayCircle, FiFlag } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { GrGroup, GrAppsRounded } from "react-icons/gr";
import { FaBell } from "react-icons/fa";
import { AiOutlineMessage, AiOutlineLogout } from "react-icons/ai";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session);
  return (
    <div className="p-4 flex items-center justify-between border-b lg:px-10">
      {/* LeftSide */}
      <section className="flex items-center mr-2">
        <figure
          className="w-10 h-10 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image src={facebook} alt="Facebook Logo" width={40} height={40} />
        </figure>
        <article className="ml-2">
          <input
            type="text"
            placeholder="Search Facebook"
            className="outline-0 bg-[#f2f3f7] p-2 rounded-full pl-4 hidden sm:block"
          />
        </article>
      </section>
      {/* Middle */}
      <section className="flex items-center space-x-7">
        <MdHome className="w-9 h-9" />
        <FiFlag className="w-7 h-7" />
        <FiPlayCircle className="w-7 h-7" />
        <BsCart3 className="w-7 h-7" />
        <GrGroup className="w-7 h-7" />
      </section>
      {/* RightSide */}
      <section className="flex space-x-6 items-center md:ml-7">
        <article className="md:flex space-x-6 hidden">
          <GrAppsRounded className="w-7 h-7" />
          <AiOutlineMessage className="w-7 h-7" />
          <FaBell className="w-7 h-7" />
        </article>
        <figure
          className="w-10 h-10 cursor-pointer"
          onClick={() => {
            if (status === "unauthenticated") {
              signIn();
            } else {
            }
          }}
        >
          <img
            src={session ? session?.user?.image : nouser.src}
            className="rounded-full"
            alt="Profile Picture or No User"
          />
        </figure>
        <article
          className="lg:flex space-x-6 hidden cursor-pointer"
          onClick={() => {
            if (status === "authenticated") {
              signOut({ callbackUrl: "/auth/signin" });
            } else {
            }
          }}
        >
          <AiOutlineLogout className="w-7 h-7" />
        </article>
      </section>
    </div>
  );
};

export default Header;
