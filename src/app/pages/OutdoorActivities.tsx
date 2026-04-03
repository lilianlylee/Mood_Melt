import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import {
  Sun,
  Trees,
  Heart,
  Users,
  Plus,
  Check,
  Home,
  Timer,
  Smile,
  Sparkles
} from "lucide-react";

interface Activity {
  id: string;
  name: string;
  minutes: number;
  date: string;
}

interface ActivitySuggestion {
  name: string;
  icon: string;
  description: string;
}

export function OutdoorActivities() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showTracker, setShowTracker] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [minutes, setMinutes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const activitySuggestions: ActivitySuggestion[] = [
    {
      name: "Take a walk in nature",
      icon: "🌳",
      description: "Fresh air and movement work wonders"
    },
    {
      name: "Meet a friend for coffee",
      icon: "☕",
      description: "Real conversations matter"
    },
    {
      name: "Visit a park or garden",
      icon: "🌸",
      description: "Connect with nature"
    },
    {
      name: "Play a sport or exercise",
      icon: "⚽",
      description: "Move your body, lift your mood"
    },
    {
      name: "Read a book outside",
      icon: "📖",
      description: "Enjoy stories in fresh air"
    },
    {
      name: "Have a picnic",
      icon: "🧺",
      description: "Eat mindfully outdoors"
    },
    {
      name: "Go for a bike ride",
      icon: "🚴",
      description: "Explore your neighborhood"
    },
    {
      name: "Practice outdoor yoga",
      icon: "🧘",
      description: "Breathe and stretch in nature"
    },
    {
      name: "Stargaze at night",
      icon: "⭐",
      description: "Appreciate the beauty above"
    },
    {
      name: "Garden or plant something",
      icon: "🌱",
      description: "Nurture growth, feel grounded"
    },
    {
      name: "Join a local group activity",
      icon: "👥",
      description: "Build community connections"
    },
    {
      name: "Volunteer in your community",
      icon: "🤝",
      description: "Help others, help yourself"
    },
  ];

  useEffect(() => {
    // Load activities from localStorage
    const saved = localStorage.getItem("outdoorActivities");
    if (saved) {
      setActivities(JSON.parse(saved));
    }
  }, []);

  const handleAddActivity = () => {
    if (!selectedActivity || !minutes || parseInt(minutes) <= 0) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
      name: selectedActivity,
      minutes: parseInt(minutes),
      date: new Date().toISOString(),
    };

    const updatedActivities = [newActivity, ...activities];
    setActivities(updatedActivities);
    localStorage.setItem("outdoorActivities", JSON.stringify(updatedActivities));

    setShowSuccess(true);
    setSelectedActivity("");
    setMinutes("");

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleActivityClick = (activityName: string) => {
    setSelectedActivity(activityName);
    setShowTracker(true);
    // Scroll to tracker section
    setTimeout(() => {
      document.getElementById("activity-tracker")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const totalMinutes = activities.reduce((sum, activity) => sum + activity.minutes, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  const recentActivities = activities.slice(0, 5);

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-blue-400 rounded-full mb-4 shadow-lg">
            <Sun className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-purple-900">
            Step Outside, Feel Better 🌞
          </h1>
          <p className="text-purple-700 text-lg max-w-2xl mx-auto">
            Real connections and outdoor activities boost your mental health more than any screen can.
            Let's make time for what truly matters.
          </p>
        </div>

        {/* Why Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 border-2 border-green-200 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-green-600" />
            <h2 className="text-2xl font-bold text-purple-900">
              Why It Matters
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🧠</div>
              <div>
                <h3 className="font-bold text-purple-900 mb-1">Reduces stress & anxiety</h3>
                <p className="text-purple-700 text-sm">Nature and movement calm your nervous system</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">💪</div>
              <div>
                <h3 className="font-bold text-purple-900 mb-1">Boosts mood naturally</h3>
                <p className="text-purple-700 text-sm">Sunlight increases serotonin production</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">❤️</div>
              <div>
                <h3 className="font-bold text-purple-900 mb-1">Builds real connections</h3>
                <p className="text-purple-700 text-sm">Face-to-face time strengthens relationships</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">😴</div>
              <div>
                <h3 className="font-bold text-purple-900 mb-1">Improves sleep quality</h3>
                <p className="text-purple-700 text-sm">Physical activity helps you rest better</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Tracker Stats */}
        {activities.length > 0 && (
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-xl font-bold">Your Amazing Progress! 🎉</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">{activities.length}</div>
                <div className="text-sm opacity-90">Activities</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">
                  {totalHours > 0 ? `${totalHours}h ${remainingMinutes}m` : `${totalMinutes}m`}
                </div>
                <div className="text-sm opacity-90">Total Time</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center col-span-2 md:col-span-1">
                <div className="text-3xl font-bold">💪</div>
                <div className="text-sm opacity-90">Keep Going!</div>
              </div>
            </div>
          </div>
        )}

        {/* Activity Suggestions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-purple-900 flex items-center gap-2">
              <Trees className="w-7 h-7 text-green-600" />
              Screen-Free Activities
            </h2>
            <Button
              onClick={() => setShowTracker(!showTracker)}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Track Activity
            </Button>
          </div>

          {/* Activity Tracker Form */}
          {showTracker && (
            <div id="activity-tracker" className="bg-white border-2 border-green-200 rounded-2xl p-6 space-y-4 animate-in slide-in-from-top duration-300">
              <h3 className="font-bold text-purple-900 text-lg">Log Your Activity 📝</h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    What did you do?
                  </label>
                  <select
                    value={selectedActivity}
                    onChange={(e) => setSelectedActivity(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-purple-200 focus:border-green-400 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                  >
                    <option value="">Choose an activity...</option>
                    {activitySuggestions.map((activity) => (
                      <option key={activity.name} value={activity.name}>
                        {activity.icon} {activity.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    How many minutes?
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    placeholder="e.g., 30"
                    className="w-full p-3 rounded-xl border-2 border-purple-200 focus:border-green-400 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAddActivity}
                    disabled={!selectedActivity || !minutes || parseInt(minutes) <= 0}
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Save Activity
                  </Button>
                  <Button
                    onClick={() => setShowTracker(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3 rounded-xl transition-all"
                  >
                    Cancel
                  </Button>
                </div>
              </div>

              {showSuccess && (
                <div className="bg-green-100 border border-green-300 rounded-xl p-4 text-center animate-in fade-in duration-300">
                  <div className="text-3xl mb-2">🎉</div>
                  <p className="text-green-800 font-medium">
                    Amazing! You're building healthier habits!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Activity Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activitySuggestions.map((activity) => (
              <div
                key={activity.name}
                onClick={() => handleActivityClick(activity.name)}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-purple-100 hover:border-green-300 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {activity.icon}
                </div>
                <h3 className="font-bold text-purple-900 mb-2">{activity.name}</h3>
                <p className="text-purple-600 text-sm">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities Log */}
        {recentActivities.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-purple-900 flex items-center gap-2">
              <Timer className="w-7 h-7 text-blue-600" />
              Your Recent Activities
            </h2>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white border border-purple-200 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                      <Check className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-purple-900">{activity.name}</h3>
                      <p className="text-sm text-purple-600">
                        {new Date(activity.date).toLocaleDateString()} at{" "}
                        {new Date(activity.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {activity.minutes}
                    </div>
                    <div className="text-xs text-purple-600">minutes</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Encouragement Section */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200 space-y-4">
          <div className="flex items-center gap-3">
            <Smile className="w-8 h-8 text-orange-600" />
            <h2 className="text-2xl font-bold text-purple-900">
              Remember
            </h2>
          </div>
          <div className="space-y-3 text-purple-800">
            <p className="flex items-start gap-2">
              <span className="text-xl">🌟</span>
              <span>Even 10-15 minutes outside can make a huge difference in how you feel</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">💚</span>
              <span>Real connections with people and nature heal us in ways screens cannot</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">🌈</span>
              <span>Every small step counts - be proud of yourself for trying!</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
