import React, { useEffect, useState } from "react";

import dots from "../assets/dots.png";
import heart from "../assets/heart.png";
import like from "../assets/like.png";
import { BiLike, BiSmile } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import share from "../assets/share.png";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineCamera, AiOutlineGif } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import Image from "next/image";
import Moment from "react-moment";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useSession, signIn, signOut } from "next-auth/react";
import bluelike from "../assets/25like.png";
import blacklike from "../assets/2unlike.png";
import nouser from "../assets/nouser.png";

const Post = ({ id, username, userImg, caption, timestamp, img }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  //When Likes update in the db update the likes in the app as well
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  //Checking if user liked already
  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  //When clicked once add like to fb
  //When double clicked delete like from db
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session?.user?.name,
      });
    }
  };

  //When Comments update in db update them in the app as well
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  //Send the comments to db
  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session?.user?.name,
      image: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white rounded-[1rem] px-5 py-4 mt-4">
      {/* Header */}
      <section className="flex items-center justify-between">
        <article className="flex items-center ">
          <figure className="w-12 h-12">
            <img src={userImg} className="rounded-full" />
          </figure>
          <div className="ml-3">
            <p className="font-bold ">{username}</p>
            <article className="flex">
              <p className="text-xs">
                <Moment fromNow>{timestamp?.toDate()}</Moment> &#8226;{" "}
              </p>
              <BiWorld className="ml-1 shrink-0" />
            </article>
          </div>
        </article>
        <figure className="w-10 h-10">
          <Image src={dots} alt="Dots" width={40} height={40} />
        </figure>
      </section>
      {/* Input */}
      <article className="my-3  ">
        <p>{caption}</p>
      </article>
      {/* Image */}
      <figure className="-mx-5">
        <img src={img} />
      </figure>
      {/* Number of Likes + Buttons */}
      <div className="">
        <section className="flex justify-between text-[#8e8d8d] mt-1">
          <article className="flex items-center ">
            <figure className=" w-[1.1rem] h-[1.1rem]">
              <Image src={like} alt="Like" width={17.6} height={17.6} />
            </figure>
            <figure className="ml-[2px] w-5 h-5">
              <Image src={heart} alt="Heart" width={28} height={28} />
            </figure>
            <p className="pl-2 whitespace-nowrap  text-[15px] sm:text-[16px]">
              {` Mark Zuckerberg and ${likes.length} others`}
            </p>
          </article>
          <p className="whitespace-nowrap text-[15px] sm:text-[16px]">
            {`${comments.length} Comments`}
          </p>
        </section>

        <figure className="border-b my-2"></figure>
        <section className="flex justify-between mx-6">
          <article className="flex items-center" onClick={likePost}>
            <img
              src={hasLiked ? bluelike.src : blacklike.src}
              className="w-6 h-6"
            />
            <p className="pl-2 text-[18px]">Like</p>
          </article>
          <article className="flex items-center">
            <FaRegCommentAlt className="w-5 h-5" />
            <p className="pl-2 text-[18px]">Comment</p>
          </article>
          <article className="flex items-center">
            <figure className="w-6 h-6">
              <Image src={share} alt="Share" width={24} height={24} />
            </figure>
            <p className="pl-2 text-[18px] ">Share</p>
          </article>
        </section>
        <figure className="border-b my-2"></figure>
      </div>

      {/* Comment Section*/}
      <div className="max-h-60  overflow-y-auto  ">
        <section className="flex justify-between text-[#8e8d8d]  ">
          <p>{`See ${comments.length} previous comments`}</p>
          <article className="flex items-center">
            <p>Most Relevant</p>
            <RiArrowDownSLine />
          </article>
        </section>
        <section className=" ">
          {/* First Comment */}
          {comments.map((comment) => (
            <section key={comment.id} className="">
              <article className="flex items-center mt-3">
                <figure className="w-10 h-10">
                  <img src={comment.data().image} className="rounded-full" />
                </figure>
                <p className="ml-2 font-bold truncate ... md:overflow-visible">
                  {comment.data().username}
                </p>
                <p className="ml-2 truncate ... md:overflow-visible">
                  {comment.data().comment}
                </p>
              </article>
              <article className="ml-[3rem] flex -mt-1.5 ">
                <p className="mr-2">Like </p>
                <p>Reply </p>
              </article>
            </section>
          ))}
        </section>
      </div>
      {/* Input*/}
      <section className="flex items-center mt-4">
        <figure className=" w-10 h-10 shrink-0">
          <img
            src={session ? session?.user?.image : nouser.src}
            className="rounded-full"
            alt="Profile Picture or No User"
          />
        </figure>
        <article className="w-full ml-2 bg-[#f2f3f7] rounded-full flex items-center relative">
          <input
            type="text"
            placeholder="Write a comment "
            className="outline-0  p-2 rounded-full w-full bg-[#f2f3f7]"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <figure className="flex absolute right-[4.5rem] space-x-2 text-[#8e8d8d]">
            <BiSmile />
            <AiOutlineCamera />
            <AiOutlineGif />
          </figure>

          <figure className="mr-4 bg-blue-400 text-white rounded-full">
            <button className="font-bold  px-2 " onClick={sendComment}>
              Post
            </button>
          </figure>
        </article>
      </section>
    </div>
  );
};

export default Post;
