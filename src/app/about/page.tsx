import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getVolumes } from "@/lib/sanity";

export const revalidate = 60;

export default async function AboutPage() {
  const volumes = await getVolumes();

  return (
    <div className="min-h-screen flex flex-col">
      <Header volumes={volumes} />
      
      <main className="flex-1 bg-cream paper-texture">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <Link
            href="/"
            className="flex items-center gap-2 text-forest hover:text-brown mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="rough-border bg-white p-8">
            <h1 className="text-4xl font-bold mb-6 font-display">
              About The Western Village Eye
            </h1>
            
            <div className="prose prose-lg">
              <p className="mb-6">
                <strong>Almost Uncivilized.</strong>
              </p>
              
              <p className="mb-6">
                The Western Village Eye is an independent publication serving 
                Edwards, Colorado and the greater Eagle County community.
              </p>

              <p className="mb-6">
                We believe in honest, uncensored journalism. In a world where 
                many local papers have been consolidated, bought out, or influenced 
                by corporate interests, we remain committed to telling the stories 
                that matter to our community — without the bias.
              </p>

              <p className="mb-6">
                Our mission is simple: provide accurate, fair, and independent 
                coverage of local events, government, business, and culture. 
                We report without a political agenda, focusing instead on the 
                facts and the people behind them.
              </p>

              <p className="mb-6">
                Based in the mountain town of Edwards, Colorado, we understand 
                the unique character of our community — its independence, its 
                rugged spirit, and its commitment to liberty.
              </p>

              <hr className="my-8 border-tan" />

              <h2 className="text-2xl font-bold mb-4 font-display">Our Values</h2>
              
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Truth</strong> — We report facts, not opinions</li>
                <li><strong>Independence</strong> — We answer to our readers, not advertisers</li>
                <li><strong>Community</strong> — We are of this place, and for this place</li>
                <li><strong>Transparency</strong> — We disclose our sources and methods</li>
              </ul>

              <p className="text-sm text-gray-600 mt-8">
                The Western Village Eye — Almost Uncivilized.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
