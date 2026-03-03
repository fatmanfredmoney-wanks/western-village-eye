"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Wallet, Check, Loader2 } from "lucide-react";

const CONTRIBUTE_TIERS = {
  small: { id: 'small', name: 'Small Box', price: 2, lines: 5, hasImage: false },
  medium: { id: 'medium', name: 'Medium Box', price: 6, lines: 20, hasImage: false },
  big: { id: 'big', name: 'Big Box', price: 12, lines: 100, hasImage: false },
  picture: { id: 'picture', name: 'Picture Box', price: 18, lines: 150, hasImage: true },
};

type Props = {
  params: Promise<{ tier: string }>;
};

export default function ContributePage({ params }: Props) {
  const { tier } = use(params);
  const tierInfo = CONTRIBUTE_TIERS[tier as keyof typeof CONTRIBUTE_TIERS];
  const router = useRouter();
  
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!tierInfo) {
    return (
      <div className="min-h-screen bg-cream paper-texture flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid contribution tier</h1>
          <Link href="/" className="text-forest hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }
    if (content.split('\n').filter(line => line.trim()).length > tierInfo.lines) {
      setError(`Content exceeds ${tierInfo.lines} lines`);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('tier', tier);
      formData.append('content', content);
      formData.append('paymentMethod', paymentMethod);
      if (image) {
        formData.append('image', image);
      }

      const res = await fetch('/api/contribute', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to submit');

      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream paper-texture flex items-center justify-center">
        <div className="rough-border bg-white p-8 max-w-md mx-4 text-center">
          <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-cream" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Thank You!</h1>
          <p className="text-gray-600 mb-6">
            Your contribution has been submitted. Once payment is confirmed, it will appear in the next edition.
          </p>
          <Link
            href="/"
            className="inline-block bg-forest text-cream px-6 py-2 rounded hover:bg-brown transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream paper-texture">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-forest hover:text-brown mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="rough-border bg-white p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 font-display">{tierInfo.name}</h1>
            <p className="text-2xl font-bold text-forest">${tierInfo.price} USD</p>
            <p className="text-gray-600">{tierInfo.lines} lines of text {tierInfo.hasImage && '+ 1 image'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-bold mb-2">Your Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`Write your content here... (${tierInfo.lines} lines max)`}
                className="w-full h-48 px-3 py-2 border border-tan rounded focus:outline-none focus:border-forest resize-none font-mono text-sm"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                {content.split('\n').filter(line => line.trim()).length} / {tierInfo.lines} lines used
              </p>
            </div>

            {tierInfo.hasImage && (
              <div>
                <label className="block font-bold mb-2">Add Image (optional)</label>
                <div className="border-2 border-dashed border-tan rounded-lg p-4 text-center">
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto" />
                      <button
                        type="button"
                        onClick={() => { setImage(null); setImagePreview(null); }}
                        className="absolute top-2 right-2 bg-burgundy text-white rounded-full p-1"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Click to upload image</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            )}

            <div>
              <label className="block font-bold mb-2">Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    paymentMethod === 'stripe' 
                      ? 'border-forest bg-forest/10' 
                      : 'border-tan hover:border-forest'
                  }`}
                >
                  <div className="font-bold">Credit Card</div>
                  <div className="text-sm text-gray-600">via Stripe</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    paymentMethod === 'crypto' 
                      ? 'border-forest bg-forest/10' 
                      : 'border-tan hover:border-forest'
                  }`}
                >
                  <div className="font-bold">Cryptocurrency</div>
                  <div className="text-sm text-gray-600">BTC, LTC, XMR, KAS</div>
                </button>
              </div>
              {error && (
                <p className="text-burgundy text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-forest text-cream py-3 rounded font-bold hover:bg-brown transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  Pay ${tierInfo.price} & Submit
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
