import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="bg-[#f2f3f7] w-full h-full m-0 p-0 overflow-x-hidden">
      <Head>
        <title>Facebook Clone | Darirak</title>
        <meta name="author" content="Alexandru Angelescu | darirak" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      {/* Feed */}
      <Feed />
    </div>
  );
}
