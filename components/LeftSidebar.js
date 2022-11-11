import React from "react";

import { MdHome, MdGroups } from "react-icons/md";
import { BsCart3, BsPeopleFill, BsCalendar2Fill } from "react-icons/bs";
import { FiFlag } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import {
  AiOutlineDesktop,
  AiOutlineLogout,
  AiFillClockCircle,
} from "react-icons/ai";
import Image from "next/image";

import { useSession, signIn, signOut } from "next-auth/react";
import nouser from "../assets/nouser.png";

const LeftSidebar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="w-[10rem] hidden sm:block">
      <section className="flex flex-col pt-4 pl-7 sm:pt-12">
        <article
          className="flex items-center cursor-pointer"
          onClick={() => {
            if (status === "authenticated") {
              signOut({ callbackUrl: "/auth/signin" });
            } else {
            }
          }}
        >
          <AiOutlineLogout className="w-9 h-9 shrink-0" />
          <p className="ml-2 font-bold whitespace-nowrap">
            {session ? "Log Out" : "Not Logged In"}
          </p>
        </article>
        <article
          className="flex items-center mt-4 cursor-pointer"
          onClick={() => {
            if (status === "unauthenticated") {
              signIn();
            } else {
            }
          }}
        >
          <figure className="w-9 h-9 shrink-0">
            <img
              src={session ? session?.user?.image : nouser.src}
              className="rounded-full"
              alt="Profile Picture or No User"
            />
          </figure>
          <p className="ml-2 font-bold whitespace-nowrap truncate ... lg:overflow-visible">
            {session ? session?.user?.name : "Log In Here"}
          </p>
        </article>
        <div className="border-b my-4"></div>
        <section className="space-y-6 ">
          <article className="flex items-center">
            <AiOutlineDesktop className="w-8 h-8" />
            <p className="ml-2 font-bold">Watch</p>
          </article>
          <article className="flex items-center">
            <FiFlag className="w-8 h-8" />
            <p className="ml-2 font-bold">Pages</p>
          </article>
          <article className="flex items-center">
            <BsPeopleFill className="w-8 h-8" />
            <p className="ml-2 font-bold">Friends</p>
          </article>
          <article className="flex items-center">
            <MdGroups className="w-8 h-8" />
            <p className="ml-2 font-bold">Groups</p>
          </article>
          <article className="flex items-center">
            <BsCart3 className="w-8 h-8" />
            <p className="ml-2 font-bold">Marketplace</p>
          </article>
          <article className="flex items-center">
            <BsCalendar2Fill className="w-7 h-7" />
            <p className="ml-2 font-bold">Events</p>
          </article>
          <article className="flex items-center">
            <AiFillClockCircle className="w-8 h-8" />
            <p className="ml-2 font-bold">Memories</p>
          </article>
          <article className="flex items-center">
            <RiArrowDownSLine className="w-8 h-8" />
            <p className="ml-2">See More</p>
          </article>
        </section>
      </section>
    </div>
  );
};

export default LeftSidebar;
