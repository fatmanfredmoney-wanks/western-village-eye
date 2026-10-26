"use client";

// Every EPUB download goes through this page so that each download is
// recorded as a page view (/download/volume-X-edition-Y) in Vercel Analytics.

import { use, useEffect } from "react";
import Link from "next/link";
import { Download } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function DownloadPage({ params }: Props) {
  const { slug } = use(params);
  const match = /^volume-(\d+)-edition-(\d+)$/.exec(slug);
  const isValid = match !== null;
  const fileUrl = `/editions/${slug}.epub`;

  useEffect(() => {
    if (!isValid) return;
    // Short delay so the analytics page view is sent before the file starts downloading.
    const timer = setTimeout(() => {
      window.location.href = fileUrl;
    }, 800);
    return () => clearTimeout(timer);
  }, [isValid, fileUrl]);

  if (!match) {
    return (
      <div className="min-h-screen bg-cream paper-texture flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Edition not found</h1>
          <Link href="/" className="text-forest hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const [, volume, edition] = match;

  return (
    <div className="min-h-screen bg-cream paper-texture flex items-center justify-center">
      <div className="rough-border bg-white p-8 max-w-md mx-4 text-center">
        <Download className="w-10 h-10 text-forest mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2 font-display">
          Volume {volume}, Edition {edition}
        </h1>
        <p className="text-gray-600 mb-6">Your EPUB download should start in a moment.</p>
        <p className="text-sm text-gray-500 mb-6">
          Not starting?{" "}
          <a href={fileUrl} download className="text-forest hover:underline">
            Click here to download
          </a>
        </p>
        <Link
          href={`/edition/${slug}`}
          className="inline-block bg-forest text-cream px-6 py-2 rounded hover:bg-brown transition-colors"
        >
          Read Online
        </Link>
      </div>
    </div>
  );
}
