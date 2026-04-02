import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Lightbulb, Send } from "lucide-react";

export function ReflectionJournal() {
  const navigate = useNavigate();
  const [journalText, setJournalText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const prompts = [
    "What can I learn from today's challenges?",
    "What's one small thing I can improve next time?",
    "How can I be kinder to myself tomorrow?",
    "What strength did I show today, even in difficulty?",
    "What support do I need to feel better?",
    "What would make tomorrow a little easier?",
  ];

  // Set the prompt once when component mounts
  useEffect(() => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(randomPrompt);
  }, []);

  const handleSubmit = () => {
    if (!journalText.trim()) return;

    // Save journal entry to localStorage
    const journalEntry = {
      text: journalText,
      type: "reflection",
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
          <div className="text-6xl animate-bounce">💪</div>
          <h2 className="text-3xl font-bold text-purple-900">
            You're stronger than you know
          </h2>
          <p className="text-purple-700">
            Every reflection is a step toward growth.
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full mb-4 shadow-lg">
            <Lightbulb className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-purple-900">
            Reflect & Grow 🌱
          </h1>
          <p className="text-purple-700">
            Let's turn today's experience into tomorrow's strength.
          </p>
        </div>

        {/* Journal Prompt */}
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-6 border border-purple-200">
          <p className="text-lg text-purple-800 font-medium text-center">
            💭 {currentPrompt}
          </p>
        </div>

        {/* Journal Input */}
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Write your thoughts here... Be honest and compassionate with yourself. 💜"
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
              <div className="text-2xl mb-2">🌱</div>
              <p className="text-sm text-purple-700">Growth takes time</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100 text-center">
              <div className="text-2xl mb-2">💪</div>
              <p className="text-sm text-purple-700">You're resilient</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100 text-center">
              <div className="text-2xl mb-2">🌟</div>
              <p className="text-sm text-purple-700">Tomorrow is new</p>
            </div>
          </div>
        </div>

        {/* Motivational Notes */}
        <div className="space-y-3">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-indigo-100">
            <p className="text-sm text-purple-800 text-center">
              💡 <strong>Remember:</strong> Every challenge is an opportunity to learn and grow stronger.
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-indigo-100">
            <p className="text-sm text-purple-800 text-center">
              🌈 <strong>Be kind to yourself:</strong> Progress isn't linear, and that's perfectly okay.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => navigate("/quotes")}
            className="bg-white hover:bg-purple-50 text-purple-600 px-6 py-6 text-lg rounded-full shadow-md hover:shadow-lg transition-all border border-purple-200"
          >
            Skip for now
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!journalText.trim()}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
