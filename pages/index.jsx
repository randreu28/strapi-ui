import { fetcher } from "../lib/fetcher";

export default function Home({ landing }) {
  return (
    <>
      <h1 className="text-8xl text-blue-500">{landing.title}</h1>
    </>
  );
}

export async function getStaticProps() {
  const landingResponse = await fetcher("/landing");
  return {
    props: {
      landing: landingResponse.data.attributes,
    },
  };
}
