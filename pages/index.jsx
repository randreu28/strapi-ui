import { fetcher } from "../lib/fetcher";
import JSConfetti from "js-confetti";
import { useState } from "react";

export default function Home({ landing }) {
  console.log(landing);
  const [coolButton, setcoolButton] = useState("Is Strapi cool?");

  function confeti() {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();
    setcoolButton("Yes!");
  }

  return (
    <div className="flex h-screen bg-gray-700">
      <div className="m-auto space-y-10 text-white text-center">
        <h1 className="text-5xl font-bold">{landing.title}</h1>
        <p className="max-w-lg m-auto">{landing.description}</p>
        <button
          disabled={landing.isStrapiCool ? true : false}
          className="rounded bg-red-500 px-3 py-2 duration-200 hover:bg-red-800 disabled:hover:cursor-not-allowed"
          onClick={confeti}
        >
          {coolButton}
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const landingResponse = await fetcher("/landing");
  return {
    props: {
      landing: landingResponse.data.attributes,
    },
  };
}
