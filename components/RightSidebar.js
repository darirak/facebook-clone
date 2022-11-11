import React from "react";

import darirak from "../assets/img/darirak.png";
import doge from "../assets/img/shibainu.png";
import elon from "../assets/img/elonmusk.png";
import harambe from "../assets/img/harambe1.png";
import pitbull from "../assets/img/pitbull1.png";
import shakira from "../assets/img/shakira.png";
import takeda from "../assets/img/takeda1.png";
import trump from "../assets/img/trump.png";

import { BsFillCameraVideoFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import dots from "../assets/dots.png";
import Image from "next/image";

const RightSidebar = () => {
  const profiles = [
    { name: "Darirak", photo: darirak },
    { name: "Donald Trump", photo: trump },
    { name: "Elon Musk", photo: elon },
    { name: "Harambe", photo: harambe },
    { name: "Pitbull", photo: pitbull },
    { name: "Shakira", photo: shakira },
    { name: "Shiba Inu", photo: doge },
    { name: "Takeda N.", photo: takeda },
  ];
  return (
    <div className="hidden lg:block pt-4 sm:pt-8 pr-7">
      <section className="flex items-center ">
        <p className="pr-4 font-bold">Contacts</p>
        <article className="flex items-center space-x-2">
          <BsFillCameraVideoFill />
          <FiSearch />
          <figure className="w-7 h-7">
            <Image src={dots} alt="empty" width={28} height={28} />
          </figure>
        </article>
      </section>
      <section className="space-y-4 mt-4">
        {profiles.map((profile) => (
          <article key={profile.name} className="flex items-center">
            <figure className="relative w-12 h-12 flex  ">
              <img
                src={profile.photo.src}
                className="object-cover rounded-full"
                alt="Profile Photo"
              />
              <figure className="absolute w-3.5 h-3.5 bg-green-500 rounded-full bottom-0 right-0.5 border-2 border-white"></figure>
            </figure>
            <p className="pl-3 font-semibold">{profile.name}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default RightSidebar;
