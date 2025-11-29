import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { MainDashboard } from "./components/MainDashboard";
import { CorridorAnalysis } from "./components/CorridorAnalysis";
import { BikeLaneDesigner } from "./components/BikeLaneDesigner";
import { ScenarioComparison } from "./components/ScenarioComparison";
import { ReportGeneration } from "./components/ReportGeneration";
import { Toaster } from "./components/ui/sonner";
import { NetworkProvider } from "./context/NetworkContext";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [previousScreen, setPreviousScreen] =
    useState("dashboard");

  const handleNavigate = (screen: string) => {
    setPreviousScreen(activeScreen);
    setActiveScreen(screen);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <NetworkProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar
          activeScreen={activeScreen}
          onNavigate={handleNavigate}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-auto">
            {activeScreen === "dashboard" && <MainDashboard />}
            {activeScreen === "corridor" && (
              <CorridorAnalysis
                onShowScenario={() =>
                  handleNavigate("scenario")
                }
              />
            )}
            {activeScreen === "bike" && (
              <BikeLaneDesigner
                onGenerateReport={() =>
                  handleNavigate("reports")
                }
              />
            )}
            {activeScreen === "scenario" && (
              <ScenarioComparison
                onSelectOption={() => handleNavigate("reports")}
              />
            )}
            {activeScreen === "reports" && (
              <ReportGeneration
                onBack={() => handleNavigate(previousScreen)}
              />
            )}
          </main>
        </div>
      </div>
      <Toaster />
    </NetworkProvider>
  );
}