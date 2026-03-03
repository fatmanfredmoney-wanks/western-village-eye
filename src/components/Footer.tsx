import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brown text-cream border-t-4 border-forest">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">The Western Village Eye</h3>
            <p className="text-sm text-cream/70">
              Almost Uncivilized. Independent journalism from Edwards, Colorado
              and Eagle County.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-sage transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-sage transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contribute/small" className="hover:text-sage transition-colors">
                  Divulge
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <p className="text-sm text-cream/70">
              Independent. Unbiased. Almost Uncivilized.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-cream/20 text-center text-xs text-cream/50">
          © {new Date().getFullYear()} The Western Village Eye. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
