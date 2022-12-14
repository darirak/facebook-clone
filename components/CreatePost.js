import Image from "next/image";
import React, { useRef, useState } from "react";
import camera from "../assets/camera.png";
import photos from "../assets/photos.png";
import smile from "../assets/smile.png";
import { useSession, signIn, signOut } from "next-auth/react";
import { db, storage } from "../firebase";
import nouser from "../assets/nouser.png";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
const CreatePost = () => {
  const { data: session } = useSession();
  const captionRef = useRef(null);
  console.log(captionRef);
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);
  console.log(image);
  const [loading, setLoading] = useState(false);

  //Create data post and add it to the collection
  const uploadPost = async () => {
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      profileImg: session?.user?.image,
      username: session?.user?.name,
      caption: captionRef.current.value,
      timestamp: serverTimestamp(),
    });
    //Path for the image
    const imagePath = ref(storage, `posts/${docRef.id}/image`);

    //Upload image to that adress
    //Then with the snapshot declare the download URL
    await uploadString(imagePath, image, "data_url").then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imagePath);
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadURL,
      });
    });
    setImage("");
    setLoading(false);
    captionRef.current.value = null;
  };

  //Add the image to state
  const addImageToState = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  };

  return (
    <div className="w-screen sm:w-full ">
      <section className="max-w-[25rem] sm:max-w-[33rem] mx-auto  sm:px-2 bg-white rounded-[1rem] ">
        <section className=" mt-8 flex items-center w-full p-3 pt-4 ">
          <article className="w-12 h-12 shrink-0">
            <img
              src={session ? session?.user?.image : nouser.src}
              className="rounded-full"
              alt="Profile Picture or No User"
            />
          </article>
          <article className="flex items-center ml-3 w-full  ">
            <input
              type="text"
              placeholder={`What's on your mind, ${
                session?.user?.name
                  ? session?.user?.name
                  : "Mysterious Traveler"
              } ?`}
              className="outline-0 bg-[#f2f3f7] p-1 rounded-full pl-3 w-full h-12 truncate"
              ref={captionRef}
            />
          </article>

          <article
            className="flex items-center bg-blue-500 px-3 rounded-full h-10 ml-4"
            onClick={uploadPost}
          >
            <button className="font-bold text-white">
              {loading ? "Loading" : "Post"}
            </button>
          </article>
        </section>

        <section className="">
          {image ? (
            <article className="" onClick={() => setImage("")}>
              <img src={image} className="p-4" alt="" />
            </article>
          ) : (
            ""
          )}
        </section>

        <figure
          className="
        border-b mb-4 mt-2"
        ></figure>
        <section className="flex justify-between px-3 sm:mx-9 pb-3">
          <article className="flex items-center">
            <figure className="w-7 h-7">
              <Image src={camera} alt="Camera" width={28} height={28} />
            </figure>
            <p className="pl-2  whitespace-nowrap text-[14px]">Live Video</p>
          </article>

          <article
            className="flex items-center"
            onClick={() => imageRef.current.click()}
          >
            <figure className="w-7 h-7">
              <Image src={photos} alt="Photos" width={28} height={28} />
              <input
                type="file"
                className="hidden"
                ref={imageRef}
                onChange={addImageToState}
              />
            </figure>
            <p className="pl-2 font-bold text-[14px] cursor-pointer">
              Photo/Video
            </p>
          </article>

          <article className="flex items-center">
            <figure className="w-7 h-7">
              <Image src={smile} alt="Smile" width={28} height={28} />
            </figure>
            <p className="pl-2   text-[14px]">Feeling/Activity</p>
          </article>
        </section>
      </section>
    </div>
  );
};

export default CreatePost;
