import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Sparkles, Send } from "lucide-react";

export function Journal() {
  const navigate = useNavigate();
  const [journalText, setJournalText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const prompts = [
    "What made you smile today?",
    "What are you grateful for right now?",
    "What's something amazing that happened?",
    "Who or what brought you joy today?",
    "What's going well in your life?",
  ];

  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

  const handleSubmit = () => {
    if (!journalText.trim()) return;

    // Save journal entry to localStorage
    const journalEntry = {
      text: journalText,
      timestamp: new Date().toISOString(),
    };

    const existingEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
    existingEntries.push(journalEntry);
    localStorage.setItem("journalEntries", JSON.stringify(existingEntries));

    setSubmitted(true);

    setTimeout(() => {
      navigate("/quotes");
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-6xl animate-bounce">✨</div>
          <h2 className="text-3xl font-bold text-purple-900">
            Beautiful reflection!
          </h2>
          <p className="text-purple-700">
            Keep celebrating the good moments in your life.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-300 to-pink-300 rounded-full mb-4 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-purple-900">
            Celebrate What's Good! 🌟
          </h1>
          <p className="text-purple-700">
            You're feeling good! Let's capture this positive moment.
          </p>
        </div>

        {/* Journal Prompt */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border border-purple-200">
          <p className="text-lg text-purple-800 font-medium text-center">
            💭 {randomPrompt}
          </p>
        </div>

        {/* Journal Input */}
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Write your thoughts here... Let your happiness flow! ✨"
              className="w-full h-64 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none resize-none text-purple-900 placeholder-purple-400 shadow-md transition-all"
              maxLength={500}
            />
            <div className="absolute bottom-4 right-4 text-sm text-purple-500">
              {journalText.length}/500
            </div>
          </div>

          {/* Encouragement Messages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100 text-center">
              <div className="text-2xl mb-2">🌈</div>
              <p className="text-sm text-purple-700">Keep shining!</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100 text-center">
              <div className="text-2xl mb-2">💖</div>
              <p className="text-sm text-purple-700">You're amazing</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100 text-center">
              <div className="text-2xl mb-2">⭐</div>
              <p className="text-sm text-purple-700">Stay positive</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => navigate("/")}
            className="bg-white hover:bg-purple-50 text-purple-600 px-6 py-6 text-lg rounded-full shadow-md hover:shadow-lg transition-all border border-purple-200"
          >
            Skip for now
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!journalText.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
