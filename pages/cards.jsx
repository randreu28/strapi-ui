import Link from "next/link";
import { fetcher } from "../lib/fetcher";

export default function Cards({ cards }) {
  console.log(cards);

  return (
    <div className="p-10 space-y-8 flex flex-col">
      <h1 className="text-center text-5xl font-bold dark:text-white">
        List of all cards
      </h1>
      {cards.map((card) => {
        return (
          <li key={card.id} className="dark:text-white">
            <Link href={"/cards/" + card.id}>
              <a className="underline text-blue-500 rounded text-xl">
                {card.attributes.title}
              </a>
            </Link>
          </li>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetcher("/cards");
  return {
    props: {
      cards: res.data,
    },
  };
}
