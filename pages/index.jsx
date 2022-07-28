import { fetcher } from "../lib/fetcher";
import JSConfetti from "js-confetti";
import { useState } from "react";

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

export default function Home({ landing }) {
  console.log(landing);
  const [coolButton, setcoolButton] = useState("Cool button");

  function confeti() {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();
    setcoolButton("It works!");
  }

  return (
    <div className="m-auto space-y-10 container px-10 pb-10">
      <h1 className="text-5xl font-bold text-gray-800 dark:text-white text-center mt-10">
        {landing.title}
      </h1>
      <div className="prose dark:prose-invert max-w-none prose-blockquote:border-gray-300 prose-blue prose-li:marker:text-gray-500">
        <MDXRemote {...landing.description} />
      </div>
      <button
        disabled={landing.isStrapyCool ? false : true}
        className="flex mx-auto rounded bg-gray-800 dark:bg-white dark:text-gray-800 text-white px-3 py-2 duration-200 hover:bg-blue-500 disabled:hover:cursor-not-allowed"
        onClick={confeti}
      >
        {coolButton}
      </button>
    </div>
  );
}

export async function getServerSideProps() {
  const landingResponse = await fetcher("/landing");

  const mdxSource = await serialize(
    landingResponse.data.attributes.description
  );
  landingResponse.data.attributes.description = mdxSource;

  return {
    props: {
      landing: landingResponse.data.attributes,
    },
  };
}
