import Link from "next/link";
import { BookOpen, Download } from "lucide-react";
import { getVolumes } from "@/lib/sanity";

export const revalidate = 60;

export default async function VolumesPage() {
  let volumes: any[] = [];

  try {
    volumes = await getVolumes();
  } catch (error) {
    console.error("Error fetching volumes:", error);
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold font-display mb-2 text-brown">
          Volumes
        </h1>
        <p className="text-gray-600 mb-10 text-lg">
          All editions of The Western Village Eye — read online or download as EPUB.
        </p>

        {volumes.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-forest mx-auto mb-4" />
            <p className="text-gray-600">No volumes available yet.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {volumes.map((volume: any) => (
              <div key={volume._id} className="rough-border bg-white p-6">
                <h2 className="text-2xl font-bold font-display text-brown mb-1">
                  Volume {volume.volumeNumber}
                  <span className="text-base font-normal text-gray-500 ml-3">
                    {volume.year}
                  </span>
                </h2>
                {volume.description && (
                  <p className="text-gray-600 mb-6">{volume.description}</p>
                )}

                {volume.editions && volume.editions.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {volume.editions.map((edition: any) => {
                      const epubPath = `/editions/volume-${volume.volumeNumber}-edition-${edition.editionNumber}.epub`;
                      return (
                        <div
                          key={edition._id}
                          className="border-2 border-tan bg-tan/20 rounded p-4 flex flex-col gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <BookOpen className="w-8 h-8 text-forest flex-shrink-0" />
                            <div>
                              <p className="font-bold text-brown">
                                Edition {edition.editionNumber}
                              </p>
                              {edition.publishedDate && (
                                <p className="text-xs text-gray-500">
                                  {new Date(edition.publishedDate).toLocaleDateString(
                                    "en-US",
                                    { year: "numeric", month: "long", day: "numeric" }
                                  )}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2 mt-1">
                            <Link
                              href={`/edition/${edition.slug.current}`}
                              className="flex-1 text-center bg-forest text-cream px-4 py-2 rounded hover:bg-brown transition-colors text-sm font-medium"
                            >
                              Read Online
                            </Link>
                            <a
                              href={epubPath}
                              download
                              className="flex items-center gap-1 bg-tan text-brown border-2 border-brown px-4 py-2 rounded hover:bg-brown hover:text-cream transition-colors text-sm font-medium"
                            >
                              <Download className="w-4 h-4" />
                              EPUB
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No editions yet.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
