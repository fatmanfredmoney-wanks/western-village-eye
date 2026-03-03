import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "osrppxu6";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function getVolumes() {
  return client.fetch(
    `*[_type == "volume"] | order(volumeNumber desc) {
      _id,
      volumeNumber,
      year,
      description,
      "editions": *[_type == "edition" && references(^._id)] | order(editionNumber desc) {
        _id,
        editionNumber,
        publishedDate,
        coverImage,
        slug
      }
    }`
  );
}

export async function getEditions() {
  return client.fetch(
    `*[_type == "edition"] | order(publishedDate desc) {
      _id,
      editionNumber,
      publishedDate,
      coverImage,
      slug,
      "volume": volume->{volumeNumber, year},
      "articles": articles[]->{
        _id,
        title,
        author,
        slug,
        featuredImage,
        excerpt
      }
    }`
  );
}

export async function getEditionBySlug(slug: string) {
  return client.fetch(
    `*[_type == "edition" && slug.current == $slug][0] {
      _id,
      editionNumber,
      publishedDate,
      coverImage,
      slug,
      "volume": volume->{volumeNumber, year},
      "articles": articles[]->{
        _id,
        title,
        author,
        slug,
        featuredImage,
        excerpt,
        content
      }
    }`,
    { slug }
  );
}

export async function getLatestEdition() {
  return client.fetch(
    `*[_type == "edition"] | order(publishedDate desc)[0] {
      _id,
      editionNumber,
      publishedDate,
      coverImage,
      slug,
      "volume": volume->{volumeNumber, year}
    }`
  );
}

export async function searchContent(query: string) {
  const searchQuery = query.toLowerCase();
  return client.fetch(
    `*[_type == "article" && (title match $searchQuery || pt::text(content) match $searchQuery)] | order(_createdAt desc) [0...20] {
      _id,
      title,
      author,
      slug,
      excerpt,
      featuredImage,
      "edition": *[_type == "edition" && references(^._id)][0] {
        slug,
        editionNumber,
        "volume": volume->{volumeNumber}
      }
    }`,
    { searchQuery: `*${searchQuery}*` }
  );
}

export async function getArticleBySlug(editionSlug: string, articleSlug: string) {
  return client.fetch(
    `*[_type == "article" && slug.current == $articleSlug][0] {
      _id,
      title,
      author,
      slug,
      featuredImage,
      content,
      "edition": *[_type == "edition" && references(^._id)][0] {
        slug,
        editionNumber,
        "volume": volume->{volumeNumber}
      }
    }`,
    { articleSlug }
  );
}
