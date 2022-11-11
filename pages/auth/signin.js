import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Header from "../../components/Header";
import facebook from "../../assets/facebook1.png";

export default function SignIn({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <section key={provider.name}>
          <Header />
          <article className="flex flex-col items-center mt-12">
            <figure className="w-48 h-48">
              <Image
                src={facebook}
                alt="Facebook Logo"
                width={192}
                height={192}
              />
            </figure>
            <figure className="mt-8 bg-blue-500 rounded-full p-3">
              <button
                className="text-white"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </figure>
          </article>
        </section>
      ))}
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
