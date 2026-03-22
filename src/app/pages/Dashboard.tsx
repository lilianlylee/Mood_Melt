import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar, TrendingUp, Award, BookHeart } from "lucide-react";

interface MoodEntry {
  mood: string;
  timestamp: string;
}

interface JournalEntry {
  text: string;
  timestamp: string;
}

export function Dashboard() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("moodHistory") || "[]");
    setMoodHistory(history);

    const journals = JSON.parse(localStorage.getItem("journalEntries") || "[]");
    setJournalEntries(journals);

    // Calculate streak (simplified - count consecutive days)
    const uniqueDays = new Set(
      history.map((entry: MoodEntry) =>
        format(parseISO(entry.timestamp), "yyyy-MM-dd")
      )
    );
    setStreak(uniqueDays.size);
  }, []);

  const moodEmojis: Record<string, string> = {
    amazing: "🌟",
    happy: "😊",
    calm: "😌",
    okay: "😐",
    tired: "😴",
    stressed: "😰",
    sad: "😢",
    anxious: "😖",
  };

  const totalEntries = moodHistory.length;

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-purple-900">
            Your Journey
          </h1>
          <p className="text-purple-700">
            Track your emotional wellness over time
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5" />
              <p className="text-sm opacity-90">Check-ins</p>
            </div>
            <p className="text-4xl font-bold">{totalEntries}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <p className="text-sm opacity-90">Day Streak</p>
            </div>
            <p className="text-4xl font-bold">{streak}</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-6 shadow-lg text-white col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <BookHeart className="w-5 h-5" />
              <p className="text-sm opacity-90">Journal Entries</p>
            </div>
            <p className="text-4xl font-bold">{journalEntries.length}</p>
          </div>
        </div>

        {/* Achievements */}
        {totalEntries >= 5 && (
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 border-2 border-yellow-300 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-md">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-yellow-900 text-lg">
                  🎉 Achievement Unlocked!
                </h3>
                <p className="text-yellow-800">
                  {totalEntries >= 10
                    ? "Wellness Champion - 10+ check-ins!"
                    : "Getting Started - 5+ check-ins!"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Journal Entries */}
        {journalEntries.length > 0 && (
          <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 rounded-2xl p-6 shadow-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-4">
              <BookHeart className="w-6 h-6 text-orange-600" />
              <h3 className="font-bold text-purple-900 text-xl">
                Your Positive Reflections
              </h3>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {[...journalEntries].reverse().slice(0, 5).map((entry, index) => (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200 shadow-sm"
                >
                  <p className="text-purple-900 leading-relaxed mb-2">
                    "{entry.text}"
                  </p>
                  <div className="flex items-center gap-2 text-xs text-purple-600">
                    <span>✨</span>
                    <span>{format(parseISO(entry.timestamp), "MMM d, yyyy")}</span>
                    <span>•</span>
                    <span>{format(parseISO(entry.timestamp), "h:mm a")}</span>
                  </div>
                </div>
              ))}
            </div>

            {journalEntries.length > 5 && (
              <p className="text-sm text-purple-600 text-center mt-4">
                Showing latest 5 of {journalEntries.length} entries
              </p>
            )}
          </div>
        )}

        {/* Recent Mood History */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100">
          <h3 className="font-bold text-purple-900 text-xl mb-4">
            Recent Check-ins
          </h3>
          
          {moodHistory.length === 0 ? (
            <div className="text-center py-8 text-purple-600">
              <p>No mood entries yet.</p>
              <p className="text-sm mt-2">
                Start tracking by checking in with your mood! 💜
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {[...moodHistory].reverse().slice(0, 10).map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{moodEmojis[entry.mood]}</span>
                    <div>
                      <p className="font-semibold text-purple-900 capitalize">
                        {entry.mood}
                      </p>
                      <p className="text-sm text-purple-600">
                        {format(parseISO(entry.timestamp), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-purple-500">
                    {format(parseISO(entry.timestamp), "h:mm a")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Encouragement */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border border-purple-200 text-center">
          <p className="text-purple-800 font-medium">
            {totalEntries === 0 && "✨ Begin your wellness journey today! ✨"}
            {totalEntries > 0 && totalEntries < 5 && "✨ You're building a healthy habit! Keep it up! ✨"}
            {totalEntries >= 5 && totalEntries < 10 && "✨ Amazing progress! You're taking care of yourself! ✨"}
            {totalEntries >= 10 && "✨ You're a wellness superstar! Keep shining! ✨"}
          </p>
        </div>

        {/* Info */}
        <div className="text-center text-sm text-purple-600">
          <p>💡 Regular check-ins help you understand your emotional patterns</p>
        </div>
      </div>
    </div>
  );
}
