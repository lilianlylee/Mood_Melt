import { useState } from "react";
import { Cloud, Waves, Leaf, Coffee, Music2, Volume2, VolumeX } from "lucide-react";
import { Button } from "../components/ui/button";

interface Sound {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  emoji: string;
}

export function Sounds() {
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const sounds: Sound[] = [
    {
      id: "rain",
      name: "Rainfall",
      icon: Cloud,
      color: "from-blue-400 to-indigo-400",
      description: "Gentle rain sounds",
      emoji: "🌧️",
    },
    {
      id: "ocean",
      name: "Ocean Waves",
      icon: Waves,
      color: "from-cyan-400 to-blue-400",
      description: "Calming ocean waves",
      emoji: "🌊",
    },
    {
      id: "forest",
      name: "Forest",
      icon: Leaf,
      color: "from-green-400 to-emerald-400",
      description: "Birds and rustling leaves",
      emoji: "🌲",
    },
    {
      id: "cafe",
      name: "Café Ambience",
      icon: Coffee,
      color: "from-amber-400 to-orange-400",
      description: "Cozy coffee shop sounds",
      emoji: "☕",
    },
    {
      id: "piano",
      name: "Piano",
      icon: Music2,
      color: "from-purple-400 to-pink-400",
      description: "Soft piano melodies",
      emoji: "🎹",
    },
  ];

  const toggleSound = (soundId: string) => {
    if (activeSound === soundId) {
      setActiveSound(null);
    } else {
      setActiveSound(soundId);
    }
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-purple-900">
            Calming Sounds
          </h1>
          <p className="text-purple-700">
            Choose a peaceful soundscape to help you relax
          </p>
        </div>

        {/* Currently Playing */}
        {activeSound && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 shadow-xl text-white text-center animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Volume2 className="w-6 h-6 animate-pulse" />
              <p className="text-lg font-semibold">Now Playing</p>
            </div>
            <p className="text-3xl mb-1">
              {sounds.find((s) => s.id === activeSound)?.emoji}
            </p>
            <p className="text-xl">
              {sounds.find((s) => s.id === activeSound)?.name}
            </p>
          </div>
        )}

        {/* Sound Cards */}
        <div className="space-y-4">
          {sounds.map((sound) => {
            const Icon = sound.icon;
            const isActive = activeSound === sound.id;

            return (
              <button
                key={sound.id}
                onClick={() => toggleSound(sound.id)}
                className={`w-full bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border-2 transition-all duration-300 hover:scale-[1.02] ${
                  isActive
                    ? "border-purple-500 shadow-xl ring-4 ring-purple-200"
                    : "border-purple-100 hover:border-purple-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${sound.color} flex items-center justify-center shadow-lg ${isActive ? "animate-pulse" : ""}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-purple-900 text-lg">
                        {sound.name}
                      </h3>
                      <span className="text-xl">{sound.emoji}</span>
                    </div>
                    <p className="text-sm text-purple-600">{sound.description}</p>
                  </div>

                  {isActive ? (
                    <VolumeX className="w-6 h-6 text-purple-600" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-purple-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border border-purple-200">
          <h3 className="font-semibold text-purple-900 mb-2 text-center">
            🎧 Sound Therapy Benefits
          </h3>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>✨ Reduces stress and anxiety</li>
            <li>✨ Improves focus and concentration</li>
            <li>✨ Promotes better sleep</li>
            <li>✨ Creates a peaceful environment</li>
          </ul>
        </div>

        {/* Note */}
        <div className="text-center">
          <p className="text-sm text-purple-600 italic">
            💡 Use headphones for the best experience
          </p>
          <p className="text-xs text-purple-500 mt-2">
            (This is a demo - actual audio playback would be added in production)
          </p>
        </div>
      </div>
    </div>
  );
}
