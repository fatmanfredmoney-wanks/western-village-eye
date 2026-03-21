import { getEditionBySlug, getVolumes } from "@/lib/sanity";
import Flipbook from "@/components/Flipbook";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Download } from "lucide-react";

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

  const epubPath = `/editions/volume-${edition.volume.volumeNumber}-edition-${edition.editionNumber}.epub`;

  return (
    <div className="min-h-screen bg-tan/30">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-forest hover:text-brown transition-colors"
          >
            ← Back to Home
          </Link>
          <a
            href={epubPath}
            download
            className="flex items-center gap-2 bg-forest text-cream px-6 py-3 rounded-lg hover:bg-brown transition-colors font-display shadow-md"
          >
            <Download className="w-5 h-5" />
            Download EPUB
          </a>
        </div>
        <Flipbook edition={edition} />
      </div>
    </div>
  );
}
