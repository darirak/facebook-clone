import React from "react";

import elon1 from "../assets/img/elonmusk.png";
import elon2 from "../assets/img/elonmusk2.png";
import takeda1 from "../assets/img/takeda1.png";
import takeda2 from "../assets/img/takeda2.png";
import harambe1 from "../assets/img/harambe1.png";
import harambe2 from "../assets/img/harambe2.png";
import pitbull1 from "../assets/img/pitbull1.png";
import pitbull2 from "../assets/img/pitbull2.png";
import darirak1 from "../assets/img/darirak1.png";
import darirak2 from "../assets/img/darirak2.png";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

const Stories = () => {
  const stories = [
    //TODO Replace them with something else
    { profile: darirak1, background: darirak2, uid: "1" },
    { profile: elon1, background: elon2, uid: "2" },
    { profile: harambe1, background: harambe2, uid: "3" },
    { profile: takeda1, background: takeda2, uid: "4" },
  ];
  const { data: session } = useSession();
  return (
    <div className="flex items-center w-screen sm:w-full h-36 mx-2 mt-4 sm:mt-8">
      <section className="w-full flex justify-between space-x-1 sm:space-x-4 p-1 px-2 py-3 mx-auto max-w-[25rem] sm:max-w-[33rem] bg-white rounded-[1rem] ">
        {/* My story */}
        <article
          key={"mystory"}
          className="relative flex  w-[4.4rem] h-32  sm:w-24 sm:h-40 rounded-[1rem] "
        >
          <figure className="flex">
            <img
              src={session ? session?.user?.image : pitbull2.src}
              className="flex object-cover rounded-[1rem]"
              alt="My Story"
            />
            <figure className="flex absolute top-1 left-1 w-9 h-9 p-1 bg-blue-500 rounded-full">
              <img
                src={session ? session?.user?.image : pitbull1.src}
                className="rounded-full object-cover"
                alt="My Story"
              />
            </figure>
          </figure>
        </article>

        {/* Other Stories */}
        {stories.map((story) => (
          <article
            key={story.uid}
            className="relative flex w-[4.4rem] h-32 sm:w-24 sm:h-40 rounded-[1rem]"
          >
            <figure className="flex">
              <Image
                src={story.background}
                alt="Story BG Image"
                className="flex object-cover rounded-[1rem]"
              />
              <figure className="flex absolute top-1 left-1 w-9 h-9 p-1 bg-blue-500 rounded-full">
                <Image
                  src={story.profile}
                  alt="Story Profile Image"
                  className="rounded-full object-cover"
                />
              </figure>
            </figure>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Stories;
