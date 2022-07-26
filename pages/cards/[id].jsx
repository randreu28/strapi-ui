/* eslint-disable @next/next/no-img-element */
import { fetcher } from "../../lib/fetcher";

export default function Id({ card }) {
  console.log(card);

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <img
            className="object-cover w-full h-64"
            src={card.image}
            alt="Article"
          />
          <div className="p-6">
            <div>
              <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400 line-clamp-1">
                {card.type}
              </span>
              <h2 className="block mt-2 text-2xl font-semibold text-gray-800 dark:text-white line-clamp-1">
                {card.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {card.description}
              </p>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  <img
                    className="object-cover h-10 w-10 rounded-full"
                    src={card.avatar}
                    alt="Avatar"
                  />
                  <a
                    href="#"
                    className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                  >
                    {card.username}
                  </a>
                </div>
                <span className="mx-1 text-sm text-gray-600 dark:text-gray-300 uppercase">
                  {card.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const card = await fetcher(`/cards/${context.params.id}/?populate=*`);

  if (!card.error) {
    const user = await fetcher(
      `/users/${card.data.attributes.user.data.id}/?populate=*`
    );

    let parsedData = {
      title: card.data.attributes.title,
      description: card.data.attributes.description,
      date: card.data.attributes.date,
      type: card.data.attributes.type.data.attributes.type,
      image: card.data.attributes.image.data.attributes.url,
      username: user.username,
      avatar: user.avatar.url,
    };
    return {
      props: {
        card: parsedData,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
