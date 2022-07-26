export async function fetcher(url, options = {}) {
  let response;
  if (!options) {
    response = await fetch(process.env.NEXT_PUBLIC_STRAPI_URL + "/api" + url);
  } else {
    response = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_URL + "/api" + url,
      options
    );
  }
  const data = await response.json();
  return data;
}
