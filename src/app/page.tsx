import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { getLatestEdition, getEditions, urlFor } from "@/lib/sanity";

export const revalidate = 60;

export default async function Home() {
  let latestEdition: any = null;
  let editions: any[] = [];

  try {
    latestEdition = await getLatestEdition();
    editions = await getEditions();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        <section className="bg-brown text-cream py-16 paper-texture">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4 font-display">
              The Western Village Eye
            </h1>
            <p className="text-xl mb-8 text-cream/80">Almost Uncivilized</p>
            <p className="max-w-2xl text-lg">
              Opinions and thoughts from and for Eagle County, Colorado.
            </p>
          </div>
        </section>

        {latestEdition ? (
          <section className="py-12 bg-cream">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-6 h-6 text-forest" />
                <h2 className="text-2xl font-bold">Latest Edition</h2>
              </div>
              
              <div className="rough-border bg-white p-6 flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="relative w-full h-80 rough-border bg-tan">
                    <Image
                      src={
                        latestEdition.coverImage
                          ? urlFor(latestEdition.coverImage).url()
                          : `/editions/volume-${latestEdition.volume.volumeNumber}-edition-${latestEdition.editionNumber}-cover.png`
                      }
                      alt={`Edition ${latestEdition.editionNumber}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 flex flex-col justify-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Volume {latestEdition.volume.volumeNumber} • Edition {latestEdition.editionNumber}
                  </p>
                  <h3 className="text-3xl font-bold mb-4 font-display">
                    Read the Latest Issue
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Flip through the pages, browse the table of contents, 
                    or jump directly to articles that interest you.
                  </p>
                  <Link
                    href={`/edition/${latestEdition.slug.current}`}
                    className="inline-flex items-center gap-2 bg-forest text-cream px-6 py-3 rounded hover:bg-brown transition-colors w-fit"
                  >
                    Read Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="py-12 bg-cream">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <BookOpen className="w-16 h-16 text-forest mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
              <p className="text-gray-600">
                The first edition of The Western Village Eye is on its way.
              </p>
            </div>
          </section>
        )}

        {editions.length > 1 && (
          <section className="py-12 bg-tan/30">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Previous Editions</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {editions.slice(1, 4).map((edition: any) => (
                  <Link
                    key={edition._id}
                    href={`/edition/${edition.slug.current}`}
                    className="block bg-white rough-border hover:shadow-lg transition-shadow"
                  >
                    <div className="h-40 bg-tan relative">
                      {edition.coverImage ? (
                        <Image
                          src={urlFor(edition.coverImage).url()}
                          alt={`Edition ${edition.editionNumber}`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <BookOpen className="w-12 h-12 text-forest" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600">
                        Volume {edition.volume.volumeNumber} • Edition {edition.editionNumber}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
