import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import {
  Heart,
  Sparkles,
  RefreshCw,
  Home,
  ArrowRight,
} from "lucide-react";

interface Quote {
  text: string;
  author: string;
  emoji: string;
}

export function Quotes() {
  const navigate = useNavigate();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const quotes: Quote[] = [
    {
      text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
      author: "A.A. Milne",
      emoji: "💪",
    },
    {
      text: "Every day may not be good, but there's something good in every day.",
      author: "Alice Morse Earle",
      emoji: "🌟",
    },
    {
      text: "You are enough just as you are.",
      author: "Meghan Markle",
      emoji: "✨",
    },
    {
      text: "Difficult roads often lead to beautiful destinations.",
      author: "Zig Ziglar",
      emoji: "🌈",
    },
    {
      text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
      author: "Unknown",
      emoji: "💖",
    },
    {
      text: "You've been assigned this mountain to show others it can be moved.",
      author: "Mel Robbins",
      emoji: "⛰️",
    },
    {
      text: "It's okay to not be okay. What's important is to keep going.",
      author: "Unknown",
      emoji: "🌸",
    },
    {
      text: "You are worthy of love, kindness, and respect - especially from yourself.",
      author: "Unknown",
      emoji: "🦋",
    },
    {
      text: "Small steps in the right direction can turn out to be the biggest steps of your life.",
      author: "Unknown",
      emoji: "👣",
    },
    {
      text: "You don't have to be perfect to be amazing.",
      author: "Unknown",
      emoji: "💫",
    },
    {
      text: "Your feelings are valid. You matter. You are important.",
      author: "Unknown",
      emoji: "💝",
    },
    {
      text: "Taking care of yourself is productive. Rest is not lazy.",
      author: "Unknown",
      emoji: "🌺",
    },
  ];

  const currentQuote = quotes[currentQuoteIndex];

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  useEffect(() => {
    // Randomly select a starting quote
    setCurrentQuoteIndex(
      Math.floor(Math.random() * quotes.length),
    );
  }, []);

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mb-4 shadow-lg animate-pulse">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-purple-900">
            You've Got This! 💜
          </h1>
          <p className="text-purple-700">
            Here's some encouragement to brighten your day
          </p>
        </div>

        {/* Quote Card */}
        <div className="relative space-y-6">
          <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-3xl p-8 md:p-12 shadow-xl border-2 border-purple-300 space-y-6">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 text-4xl opacity-20">
              <Sparkles className="w-12 h-12 text-purple-500" />
            </div>

            {/* Quote emoji */}
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">
                {currentQuote.emoji}
              </div>
            </div>

            {/* Quote text */}
            <blockquote className="text-center space-y-4">
              <p className="text-xl md:text-2xl font-medium text-purple-900 leading-relaxed">
                "{currentQuote.text}"
              </p>
              <footer className="text-purple-600 font-medium">
                — {currentQuote.author}
              </footer>
            </blockquote>
          </div>

          {/* Another Quote Button - Right under the quote */}
          <div className="flex justify-center">
            <Button
              onClick={handleNextQuote}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-5 h-5" />
              Another Quote
            </Button>
          </div>
        </div>

        {/* Encouragement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-md cursor-default">
            <div className="text-3xl mb-3">🌟</div>
            <h3 className="font-bold text-purple-900 mb-2">
              Remember
            </h3>
            <p className="text-purple-700 text-sm">
              You're doing better than you think. Progress isn't
              always visible, but it's happening.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-md cursor-default">
            <div className="text-3xl mb-3">💪</div>
            <h3 className="font-bold text-purple-900 mb-2">
              You're Strong
            </h3>
            <p className="text-purple-700 text-sm">
              Every challenge you face is making you stronger.
              Keep believing in yourself.
            </p>
          </div>
        </div>

        {/* Call to Action - Outdoor Activities */}
        <div className="bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 rounded-3xl p-8 border-2 border-green-300 space-y-4 shadow-xl cursor-default">
          <div className="text-center space-y-3">
            <div className="text-5xl mb-2">🌳✨</div>
            <h2 className="text-2xl font-bold text-purple-900">
              Ready for the Next Step?
            </h2>
            <p className="text-purple-700 text-lg">
              Real healing happens when we connect with nature
              and people, not screens. Let's help you build
              healthier habits!
            </p>
            <Button
              onClick={() => navigate("/outdoor")}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-10 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mx-auto mt-4 cursor-pointer"
            >
              Explore Outdoor Activities
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => navigate("/")}
            className="bg-white hover:bg-purple-50 text-purple-600 px-8 py-6 text-lg rounded-full shadow-md hover:shadow-lg transition-all border border-purple-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
        </div>

        {/* Bottom message */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border border-purple-200 text-center cursor-default">
          <p className="text-purple-800">
            ✨ Remember: It's okay to ask for help. You're never
            alone. ✨
          </p>
        </div>
      </div>
    </div>
  );
}