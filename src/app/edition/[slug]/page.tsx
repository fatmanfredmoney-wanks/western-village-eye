import { getEditionBySlug, getVolumes } from "@/lib/sanity";
import Flipbook from "@/components/Flipbook";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditionPage({ params }: Props) {
  const { slug } = await params;
  const edition = await getEditionBySlug(slug);
  const volumes = await getVolumes();

  if (!edition) {
    notFound();
  }

  return <Flipbook edition={edition} />;
}
