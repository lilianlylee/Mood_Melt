import { Link, useLocation } from "react-router";
import { Home, Heart, Wind, Music, BarChart3, Sun } from "lucide-react";

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/mood", icon: Heart, label: "Mood" },
    { path: "/breathing", icon: Wind, label: "Breathe" },
    { path: "/sounds", icon: Music, label: "Sounds" },
    { path: "/outdoor", icon: Sun, label: "Outdoor" },
    { path: "/dashboard", icon: BarChart3, label: "Track" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-purple-100 shadow-lg">
      <div className="flex justify-around items-center max-w-2xl mx-auto px-4 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "text-purple-600 bg-purple-50"
                  : "text-gray-500 hover:text-purple-500 hover:bg-purple-50/50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
