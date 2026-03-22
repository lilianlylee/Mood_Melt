import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { HelpButton } from "./HelpButton";

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <HelpButton />
      <main className="pb-20">
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
}
