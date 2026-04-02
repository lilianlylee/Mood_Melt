import { useNavigate } from "react-router";
import { Sparkles, Heart, Wind, Sun } from "lucide-react";
import { Button } from "../components/ui/button";

export function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Heart,
      title: "Track Your Mood",
      description: "Check in with your feelings",
      color: "from-pink-400 to-rose-400",
      path: "/mood",
    },
    {
      icon: Wind,
      title: "Breathe & Relax",
      description: "Guided breathing exercises",
      color: "from-blue-400 to-cyan-400",
      path: "/breathing",
    },
    {
      icon: Sun,
      title: "Outdoor Activities",
      description: "Get outside and explore",
      color: "from-orange-400 to-yellow-400",
      path: "/outdoor",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full shadow-lg animate-pulse">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Mood Melt
          </h1>

          <p className="text-sm text-purple-800 italic">
            Lilian Lee & Talia Zhang
          </p>

          <p className="text-lg text-purple-700">
            Your safe space for emotional wellness 💜
          </p>
        </div>

        {/* Welcome Message */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100">
          <p className="text-purple-800">
            Take a moment for yourself. You deserve to feel
            calm, supported, and understood.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.path}
                onClick={() => navigate(feature.path)}
                className="w-full bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-md border border-purple-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-semibold text-purple-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-purple-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Encouragement */}
        <div className="pt-4">
          <p className="text-sm text-purple-600 italic">
            ✨ Small steps lead to big changes ✨
          </p>
        </div>
      </div>
    </div>
  );
}