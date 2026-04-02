import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { MoodSelect } from "./pages/MoodSelect";
import { Breathing } from "./pages/Breathing";
import { Sounds } from "./pages/Sounds";
import { Dashboard } from "./pages/Dashboard";
import { Journal } from "./pages/Journal";
import { ReflectionJournal } from "./pages/ReflectionJournal";
import { Quotes } from "./pages/Quotes";
import { OutdoorActivities } from "./pages/OutdoorActivities";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "mood", element: <MoodSelect /> },
      { path: "breathing", element: <Breathing /> },
      { path: "sounds", element: <Sounds /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "journal", element: <Journal /> },
      { path: "reflection", element: <ReflectionJournal /> },
      { path: "quotes", element: <Quotes /> },
      { path: "outdoor", element: <OutdoorActivities /> },
    ],
  },
]);