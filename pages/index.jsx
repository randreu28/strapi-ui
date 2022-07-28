import { fetcher } from "../lib/fetcher";
import JSConfetti from "js-confetti";
import { useState } from "react";

export default function Home({ landing }) {
  console.log(landing);
  const [coolButton, setcoolButton] = useState("Cool strapi button");

  function confeti() {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();
    setcoolButton("It works!");
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto space-y-10 text-gray-800 dark:text-white text-center">
        <h1 className="text-5xl font-bold">{landing.title}</h1>
        <p className="max-w-lg m-auto">{landing.description}</p>
        <button
          disabled={landing.isStrapyCool ? false : true}
          className="rounded bg-gray-800 dark:bg-white dark:text-gray-800 text-white px-3 py-2 duration-200 hover:bg-blue-500 disabled:hover:cursor-not-allowed"
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
