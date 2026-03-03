import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getVolumes, searchContent } from "@/lib/sanity";

export const revalidate = 60;

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q || "";
  const volumes = await getVolumes();
  
  let results: any[] = [];
  if (query) {
    try {
      const searchResults = await searchContent(query);
      results = searchResults.articles || [];
    } catch (error) {
      console.error("Search error:", error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header volumes={volumes} />
      
      <main className="flex-1 bg-cream paper-texture">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link
            href="/"
            className="flex items-center gap-2 text-forest hover:text-brown mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="rough-border bg-white p-6">
            <div className="flex items-center gap-2 mb-6">
              <Search className="w-6 h-6 text-forest" />
              <h1 className="text-2xl font-bold">
                {query ? `Results for "${query}"` : "Search"}
              </h1>
            </div>

            {query && results.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-6">
                  Found {results.length} result{results.length !== 1 ? "s" : ""}
                </p>
                {results.map((article: any) => (
                  <Link
                    key={article._id}
                    href={`/edition/${article.edition?.slug?.current}`}
                    className="block p-4 border border-tan hover:bg-tan/30 transition-colors"
                  >
                    <h3 className="font-bold text-lg mb-1">{article.title}</h3>
                    {article.author && (
                      <p className="text-sm text-gray-600 mb-2">
                        by {article.author}
                      </p>
                    )}
                    {article.excerpt && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                    <p className="text-xs text-forest mt-2">
                      {article.edition?.volume?.volumeNumber && `Volume ${article.edition.volume.volumeNumber}, `}
                      {article.edition?.editionNumber && `Edition ${article.edition.editionNumber}`}
                    </p>
                  </Link>
                ))}
              </div>
            ) : query ? (
              <p className="text-gray-600">
                No results found for "{query}". Try different keywords.
              </p>
            ) : (
              <p className="text-gray-600">
                Enter a search term above to find articles.
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
