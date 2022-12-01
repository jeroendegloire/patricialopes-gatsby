import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";

export const previewClient = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  withCredentials: true,
});

export const productionClient = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
});

const client =
  process.env.NODE_ENV == "development" ? previewClient : productionClient;

const builder = imageUrlBuilder(client);

export default builder;
