import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "../components/ui/button";

type Phase = "inhale" | "hold" | "exhale" | "rest";

export function Breathing() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>("inhale");
  const [completedCycles, setCompletedCycles] = useState(0);

  const phaseConfig = {
    inhale: { duration: 4, text: "Breathe In", color: "from-blue-400 to-cyan-400" },
    hold: { duration: 4, text: "Hold", color: "from-purple-400 to-indigo-400" },
    exhale: { duration: 4, text: "Breathe Out", color: "from-pink-400 to-rose-400" },
    rest: { duration: 2, text: "Rest", color: "from-green-400 to-emerald-400" },
  };

  useEffect(() => {
    if (!isActive) return;

    const currentDuration = phaseConfig[phase].duration * 1000;
    
    const timer = setTimeout(() => {
      if (phase === "inhale") {
        setPhase("hold");
      } else if (phase === "hold") {
        setPhase("exhale");
      } else if (phase === "exhale") {
        setPhase("rest");
      } else {
        setPhase("inhale");
        setCompletedCycles((prev) => prev + 1);
      }
    }, currentDuration);

    return () => clearTimeout(timer);
  }, [isActive, phase]);

  const handleReset = () => {
    setIsActive(false);
    setPhase("inhale");
    setCompletedCycles(0);
  };

  const currentPhase = phaseConfig[phase];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-purple-900">
            Breathing Exercise
          </h1>
          <p className="text-purple-700">
            Follow the circle and breathe mindfully
          </p>
        </div>

        {/* Breathing Circle */}
        <div className="relative flex items-center justify-center h-80">
          <motion.div
            animate={{
              scale: phase === "inhale" || phase === "hold" ? 1.5 : 1,
            }}
            transition={{
              duration: phase === "inhale" || phase === "exhale" ? 4 : 0.5,
              ease: "easeInOut",
            }}
            className={`w-48 h-48 rounded-full bg-gradient-to-br ${currentPhase.color} shadow-2xl flex items-center justify-center`}
          >
            <div className="text-center text-white">
              <p className="text-2xl font-bold mb-2">{currentPhase.text}</p>
              <p className="text-sm opacity-90">{currentPhase.duration}s</p>
            </div>
          </motion.div>

          {/* Pulse rings */}
          {isActive && (
            <>
              <motion.div
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                className={`absolute w-48 h-48 rounded-full bg-gradient-to-br ${currentPhase.color}`}
              />
              <motion.div
                animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
                className={`absolute w-48 h-48 rounded-full bg-gradient-to-br ${currentPhase.color}`}
              />
            </>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => setIsActive(!isActive)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-6 rounded-full shadow-lg"
          >
            {isActive ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </Button>
          
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-purple-300 hover:bg-purple-50 px-6 py-6 rounded-full"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>
        </div>

        {/* Stats */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 text-center">
          <p className="text-sm text-purple-600 mb-1">Completed Cycles</p>
          <p className="text-4xl font-bold text-purple-900">{completedCycles}</p>
          <p className="text-sm text-purple-600 mt-3">
            {completedCycles > 0 && "✨ Great job! Keep going! ✨"}
            {completedCycles >= 5 && " You're doing amazing! 💜"}
          </p>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 border border-purple-200">
          <p className="text-sm text-purple-800 text-center">
            💡 <strong>Tip:</strong> Find a quiet space, sit comfortably, and focus on your breath
          </p>
        </div>
      </div>
    </div>
  );
}
