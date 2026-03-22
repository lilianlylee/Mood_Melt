import { useState } from "react";
import { useNavigate } from "react-router";
import { Smile, Meh, Frown, Heart, Zap, Cloud, Sun, Moon } from "lucide-react";
import { Button } from "../components/ui/button";

interface Mood {
  id: string;
  emoji: string;
  label: string;
  color: string;
  icon: any;
  description: string;
}

export function MoodSelect() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const moods: Mood[] = [
    {
      id: "amazing",
      emoji: "🌟",
      label: "Amazing",
      color: "from-yellow-300 to-orange-300",
      icon: Sun,
      description: "Feeling great!",
    },
    {
      id: "happy",
      emoji: "😊",
      label: "Happy",
      color: "from-green-300 to-emerald-300",
      icon: Smile,
      description: "Pretty good",
    },
    {
      id: "calm",
      emoji: "😌",
      label: "Calm",
      color: "from-blue-300 to-cyan-300",
      icon: Cloud,
      description: "Peaceful",
    },
    {
      id: "okay",
      emoji: "😐",
      label: "Okay",
      color: "from-gray-300 to-slate-300",
      icon: Meh,
      description: "Just okay",
    },
    {
      id: "tired",
      emoji: "😴",
      label: "Tired",
      color: "from-indigo-300 to-purple-300",
      icon: Moon,
      description: "Need rest",
    },
    {
      id: "stressed",
      emoji: "😰",
      label: "Stressed",
      color: "from-orange-300 to-red-300",
      icon: Zap,
      description: "Overwhelmed",
    },
    {
      id: "sad",
      emoji: "😢",
      label: "Sad",
      color: "from-blue-400 to-indigo-400",
      icon: Frown,
      description: "Feeling down",
    },
    {
      id: "anxious",
      emoji: "😖",
      label: "Anxious",
      color: "from-purple-400 to-pink-400",
      icon: Heart,
      description: "Worried",
    },
  ];

  const handleSubmit = () => {
    if (!selectedMood) return;

    // Save to localStorage
    const moodEntry = {
      mood: selectedMood,
      timestamp: new Date().toISOString(),
    };

    const existingMoods = JSON.parse(localStorage.getItem("moodHistory") || "[]");
    existingMoods.push(moodEntry);
    localStorage.setItem("moodHistory", JSON.stringify(existingMoods));

    setSubmitted(true);

    // Determine next page based on mood
    const positiveMoods = ["amazing", "happy", "calm"];
    const nextPage = positiveMoods.includes(selectedMood) ? "/journal" : "/breathing";

    setTimeout(() => {
      navigate(nextPage);
    }, 2000);
  };

  if (submitted) {
    const positiveMoods = ["amazing", "happy", "calm"];
    const isPositiveMood = selectedMood && positiveMoods.includes(selectedMood);

    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-6xl animate-bounce">
            {isPositiveMood ? "✨" : "🌸"}
          </div>
          <h2 className="text-3xl font-bold text-purple-900">
            Thank you for sharing!
          </h2>
          <p className="text-purple-700">
            Your feelings are valid. {isPositiveMood ? "Let's celebrate this moment!" : "Let's help you feel better."}
          </p>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border border-purple-200">
            <p className="text-purple-800">
              {isPositiveMood
                ? "🌟 Taking you to journal your positive thoughts... 🌟"
                : "✨ Taking you to a calming breathing exercise... ✨"
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-purple-900">
            How are you feeling?
          </h1>
          <p className="text-purple-700">
            Choose the mood that best describes how you feel right now
          </p>
        </div>

        {/* Mood Grid */}
        <div className="grid grid-cols-2 gap-4">
          {moods.map((mood) => {
            const Icon = mood.icon;
            const isSelected = selectedMood === mood.id;
            
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border-2 transition-all duration-300 hover:scale-105 ${
                  isSelected
                    ? "border-purple-500 shadow-xl ring-4 ring-purple-200"
                    : "border-purple-100 hover:border-purple-300"
                }`}
              >
                <div className="space-y-3">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${mood.color} flex items-center justify-center text-3xl shadow-lg`}>
                    {mood.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-900">{mood.label}</h3>
                    <p className="text-sm text-purple-600">{mood.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Submit Button */}
        {selectedMood && (
          <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
