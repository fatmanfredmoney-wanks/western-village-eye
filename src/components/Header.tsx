"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronDown, BookOpen, Heart } from "lucide-react";

interface Edition {
  _id: string;
  editionNumber: number;
  slug: { current: string };
  volume: { volumeNumber: number; year: string };
}

interface Volume {
  _id: string;
  volumeNumber: number;
  year: string;
  editions: Edition[];
}

const CONTRIBUTE_OPTIONS = [
  { id: 'small', name: 'Small Box', price: 2, lines: 5, hasImage: false },
  { id: 'medium', name: 'Medium Box', price: 6, lines: 20, hasImage: false },
  { id: 'big', name: 'Big Box', price: 12, lines: 100, hasImage: false },
  { id: 'picture', name: 'Picture Box', price: 18, lines: 150, hasImage: true },
];

export default function Header({ volumes }: { volumes: Volume[] }) {
  const [volumeOpen, setVolumeOpen] = useState(false);
  const [editionOpen, setEditionOpen] = useState(false);
  const [selectedVolume, setSelectedVolume] = useState<Volume | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [contributeOpen, setContributeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const volumeRef = useRef<HTMLDivElement>(null);
  const editionRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const contributeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (volumeRef.current && !volumeRef.current.contains(event.target as Node)) {
        setVolumeOpen(false);
      }
      if (editionRef.current && !editionRef.current.contains(event.target as Node)) {
        setEditionOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (contributeRef.current && !contributeRef.current.contains(event.target as Node)) {
        setContributeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const timer = setTimeout(async () => {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery)}`
        );
        const data = await res.json();
        setSearchResults(data.articles || []);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleVolumeSelect = (volume: Volume) => {
    setSelectedVolume(volume);
    setVolumeOpen(false);
    setEditionOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.length > 0) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-forest text-cream border-b-4 border-brown">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight font-display">
                The Western Village Eye
              </h1>
              <p className="text-xs text-cream/70 tracking-widest uppercase">
                Almost Uncivilized
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            <div className="relative" ref={volumeRef}>
              <button
                onClick={() => setVolumeOpen(!volumeOpen)}
                className="flex items-center gap-1 px-3 py-2 bg-brown/30 hover:bg-brown/50 rounded transition-colors"
              >
                <span>Volume</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {volumeOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-cream text-brown rounded shadow-lg z-50 border-2 border-brown">
                  {volumes.map((volume) => (
                    <button
                      key={volume._id}
                      onClick={() => handleVolumeSelect(volume)}
                      className="w-full text-left px-4 py-2 hover:bg-tan transition-colors"
                    >
                      Volume {volume.volumeNumber} ({volume.year})
                    </button>
                  ))}
                  {volumes.length === 0 && (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No volumes yet
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="relative" ref={editionRef}>
              {selectedVolume && (
                <button
                  onClick={() => setEditionOpen(!editionOpen)}
                  className="flex items-center gap-1 px-3 py-2 bg-brown/30 hover:bg-brown/50 rounded transition-colors"
                >
                  <span>Edition {selectedVolume.editions[0]?.editionNumber || ""}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}
              {editionOpen && selectedVolume && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-cream text-brown rounded shadow-lg z-50 border-2 border-brown">
                  {selectedVolume.editions.map((edition) => (
                    <Link
                      key={edition._id}
                      href={`/edition/${edition.slug.current}`}
                      className="block px-4 py-2 hover:bg-tan transition-colors"
                    >
                      Edition {edition.editionNumber}
                    </Link>
                  ))}
                  {selectedVolume.editions.length === 0 && (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No editions yet
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-brown/30 rounded transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-cream text-brown rounded shadow-lg z-50 border-2 border-brown p-4">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full px-3 py-2 border border-tan rounded focus:outline-none focus:border-forest"
                    autoFocus
                  />
                  {searchResults.length > 0 && (
                    <div className="mt-2 max-h-60 overflow-y-auto">
                      {searchResults.slice(0, 5).map((result: any) => (
                        <Link
                          key={result._id}
                          href={`/edition/${result.edition?.slug?.current}`}
                          className="block px-2 py-2 hover:bg-tan transition-colors border-b border-tan/50"
                          onClick={() => setSearchOpen(false)}
                        >
                          <p className="font-bold text-sm">{result.title}</p>
                          <p className="text-xs text-gray-600">
                            {result.edition?.editionNumber && `Edition ${result.edition.editionNumber}`}
                          </p>
                        </Link>
                      ))}
                      {searchResults.length > 5 && (
                        <Link
                          href={`/search?q=${encodeURIComponent(searchQuery)}`}
                          className="block px-2 py-2 text-center text-sm text-forest hover:underline"
                          onClick={() => setSearchOpen(false)}
                        >
                          View all results
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="relative" ref={contributeRef}>
              <button
                onClick={() => setContributeOpen(!contributeOpen)}
                className="flex items-center gap-1 px-3 py-2 bg-burgundy hover:bg-burgundy/80 rounded transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span>Divulge</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {contributeOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-cream text-brown rounded shadow-lg z-50 border-2 border-brown">
                  {CONTRIBUTE_OPTIONS.map((option) => (
                    <Link
                      key={option.id}
                      href={`/contribute/${option.id}`}
                      className="block px-4 py-3 hover:bg-tan transition-colors border-b border-tan/30 last:border-b-0"
                      onClick={() => setContributeOpen(false)}
                    >
                      <div className="font-bold">{option.name}</div>
                      <div className="text-sm text-gray-600">
                        ${option.price} · {option.lines} lines {option.hasImage && '+ image'}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
