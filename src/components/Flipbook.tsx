"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Copy, Check, Download } from "lucide-react";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[600px] bg-cream">
      <p className="text-brown">Loading flipbook...</p>
    </div>
  ),
});

interface Article {
  _id: string;
  title: string;
  author: string;
  excerpt?: string;
  content?: any;
  slug: { current: string };
}

interface Edition {
  _id: string;
  editionNumber: number;
  volume: { volumeNumber: number; year: string };
  coverImage?: any;
  articles: Article[];
}

function BlockContent({ blocks }: { blocks: any[] }) {
  if (!blocks) return null;

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        if (block._type === "block") {
          const TextComponent = block.style === "h1" ? "h1" : block.style === "h2" ? "h2" : block.style === "h3" ? "h3" : block.style === "blockquote" ? "blockquote" : "p";
          const className = block.style === "h1" ? "text-3xl font-bold mb-4" : block.style === "h2" ? "text-2xl font-bold mb-3" : block.style === "h3" ? "text-xl font-bold mb-2" : block.style === "blockquote" ? "border-l-4 border-forest pl-4 italic my-4" : "mb-2";
          
          return (
            <TextComponent key={i} className={className}>
              {block.children?.map((child: any, j: number) => child.text).join("") || ""}
            </TextComponent>
          );
        }
        return null;
      })}
    </div>
  );
}

function SocialShare({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
      >
        Facebook
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm"
      >
        X
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors text-sm"
      >
        LinkedIn
      </a>
      <button
        onClick={handleCopy}
        className="p-2 bg-forest text-white rounded hover:bg-brown transition-colors flex items-center gap-1 text-sm"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

export default function Flipbook({ edition }: { edition: Edition }) {
  const epubPath = `/editions/volume-${edition.volume.volumeNumber}-edition-${edition.editionNumber}.epub`;
  const [currentPage, setCurrentPage] = useState(0);
  const flipBookRef = useRef<any>(null);

  const handlePageChange = (e: any) => {
    setCurrentPage(e.data);
  };

  const goToPage = (pageIndex: number) => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipTo(pageIndex);
    }
  };

  const coverPage = (
    <div className="flipbook-page-inner flex flex-col justify-center items-center bg-brown text-cream relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={`/editions/volume-${edition.volume.volumeNumber}-edition-${edition.editionNumber}-cover.png`}
          alt="Cover"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );

  const tocPage = (
    <div className="flipbook-page-inner flex flex-col justify-center items-center text-center p-8">
      <div className="rough-border p-8 bg-cream">
        <h1 className="text-4xl font-bold mb-2 font-display">Volume {edition.volume.volumeNumber}</h1>
        <h2 className="text-2xl mb-4">Edition {edition.editionNumber}</h2>
        <p className="text-sm text-gray-600 mb-8">{edition.volume.year}</p>
        <div className="border-t border-brown pt-4">
          <h3 className="text-lg font-bold mb-4">Table of Contents</h3>
          <ul className="space-y-3 text-left">
            {edition.articles.map((article, index) => (
              <li key={article._id}>
                <button
                  onClick={() => goToPage(index + 2)}
                  className="hover:text-forest hover:underline text-left"
                >
                  <span className="font-bold">{index + 1}.</span> {article.title}
                </button>
                {article.author && (
                  <p className="text-xs text-gray-500 ml-4">by {article.author}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const articlePages = edition.articles.map((article) => (
    <div key={article._id} className="flipbook-page">
      <div className="flipbook-page-inner">
        <h2 className="text-2xl font-bold mb-2 font-display">{article.title}</h2>
        {article.author && (
          <p className="text-sm text-gray-600 mb-4">by {article.author}</p>
        )}
        <div className="flex-1 overflow-hidden">
          {article.content ? (
            <div className="text-sm leading-relaxed">
              <BlockContent blocks={article.content} />
            </div>
          ) : article.excerpt ? (
            <p className="text-sm leading-relaxed">{article.excerpt}</p>
          ) : (
            <p className="text-sm text-gray-500 italic">Content coming soon...</p>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-tan text-xs text-gray-500 flex justify-between">
          <span>Volume {edition.volume.volumeNumber}, Edition {edition.editionNumber}</span>
          <span>{edition.volume.year}</span>
        </div>
      </div>
    </div>
  ));

  const backCover = (
    <div className="flipbook-page-inner flex flex-col justify-center items-center text-center p-8 bg-forest text-cream">
      <h2 className="text-3xl font-bold mb-4 font-display">The Western Village Eye</h2>
      <p className="text-lg mb-4">Almost Uncivilized</p>
      <p className="text-sm opacity-70 mb-8">
        Independent journalism from Edwards, Colorado
      </p>
      <SocialShare 
        title={`Volume ${edition.volume.volumeNumber}, Edition ${edition.editionNumber} - The Western Village Eye`} 
        url={typeof window !== 'undefined' ? window.location.href : ''} 
      />
    </div>
  );

  const pages = [coverPage, tocPage, ...articlePages, backCover];

  return (
    <div className="min-h-screen bg-tan/30 paper-texture">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-forest hover:text-brown transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <a
              href={epubPath}
              download
              className="flex items-center gap-2 bg-forest text-cream px-4 py-2 rounded-lg hover:bg-brown transition-colors text-sm shadow-md"
            >
              <Download className="w-4 h-4" />
              Download EPUB
            </a>
            <div className="text-sm text-gray-600">
              Page {currentPage + 1} of {pages.length}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          {/* @ts-ignore - react-pageflip types are incomplete */}
          <HTMLFlipBook
            ref={flipBookRef}
            width={500}
            height={700}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={handlePageChange}
            className="shadow-2xl"
          >
            {pages.map((page, i) => (
              <div key={i} className="flipbook-page">
                {page}
              </div>
            ))}
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
}
