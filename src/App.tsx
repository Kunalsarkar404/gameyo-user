import React, { useState } from "react";
import { ThemeProvider } from "./components/theme-context";
import { BottomNavigation } from "./components/bottom-navigation";
import { SplashScreen } from "./components/screens/splash-screen";
import { LoginScreen } from "./components/screens/login-screen";
import { SignupScreen } from "./components/screens/signup-screen";
import { HomeScreen } from "./components/screens/home-screen";
import { MatchScreen } from "./components/screens/match-screen";
import { FriendsScreen } from "./components/screens/friends-screen";
import { ProfileScreen } from "./components/screens/profile-screen";
import { OnlineMatchScreen } from "./components/screens/online-match-screen";
import { OfflineMatchScreen } from "./components/screens/offline-match-screen";
import { SettingsScreen } from "./components/screens/settings-screen";
import { CreateMatchScreen } from "./components/screens/create-match-screen";
import { TournamentScreen } from "./components/screens/tournament-screen";
import { GameTournamentsScreen } from "./components/screens/game-tournaments-screen";
import { TournamentDetailScreen } from "./components/screens/tournament-detail-screen";

type AppState =
  | "splash"
  | "login"
  | "signup"
  | "app"
  | "online-matches"
  | "offline-matches"
  | "settings"
  | "create-match"
  | "game-tournaments"
  | "tournament-detail";

type AppTab =
  | "home"
  | "matches"
  | "tournaments"
  | "friends"
  | "profile";

export default function App() {
  const [appState, setAppState] = useState<AppState>("splash");
  const [activeTab, setActiveTab] = useState<AppTab>("home");
  const [matchFilter, setMatchFilter] = useState<string>("all");
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [selectedTournament, setSelectedTournament] = useState<any>(null);

  // Auth handlers
  const handleSplashComplete = () => setAppState("login");
  const handleLogin = () => setAppState("app");
  const handleSignup = () => setAppState("app");
  const handleShowSignup = () => setAppState("signup");
  const handleShowLogin = () => setAppState("login");

  // Navigation handlers
  const handleQuickMatch = () => {
    setMatchFilter("online");
    setActiveTab("matches");
  };

  const handleOnlineMatches = () => setAppState("online-matches");
  const handleOfflineMatches = () => setAppState("offline-matches");
  const handleBackFromMatches = () => setAppState("app");
  const handleSettings = () => setAppState("settings");
  const handleBackFromSettings = () => setAppState("app");
  const handleCreateMatch = () => setAppState("create-match");
  const handleBackFromCreateMatch = () => setAppState("app");
  
  // Tournament navigation handlers
  const handleGameSelect = (game: string) => {
    setSelectedGame(game);
    setAppState("game-tournaments");
  };
  const handleTournamentSelect = (tournament: any) => {
    setSelectedTournament(tournament);
    setAppState("tournament-detail");
  };
  const handleBackFromGameTournaments = () => setAppState("app");
  const handleBackFromTournamentDetail = () => setAppState("game-tournaments");

  const handleTabChange = (tab: string) => {
    if (activeTab === "matches" && tab !== "matches") {
      setMatchFilter("all");
    }
    setActiveTab(tab as AppTab);
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen
            onQuickMatch={handleQuickMatch}
            onOnlineMatches={handleOnlineMatches}
            onOfflineMatches={handleOfflineMatches}
            onCreateMatch={handleCreateMatch}
            onTournamentSelect={handleTournamentSelect}
            onViewAllTournaments={() => setActiveTab("tournaments")}
          />
        );
      case "matches":
        return <MatchScreen initialFilter={matchFilter} />;
      case "tournaments":
        return <TournamentScreen onGameSelect={handleGameSelect} />;
      case "friends":
        return <FriendsScreen />;
      case "profile":
        return <ProfileScreen onSettings={handleSettings} />;
      default:
        return (
          <HomeScreen
            onQuickMatch={handleQuickMatch}
            onOnlineMatches={handleOnlineMatches}
            onOfflineMatches={handleOfflineMatches}
            onCreateMatch={handleCreateMatch}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {appState === "splash" && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}

        {appState === "login" && (
          <LoginScreen
            onLogin={handleLogin}
            onSignup={handleShowSignup}
          />
        )}

        {appState === "signup" && (
          <SignupScreen
            onSignup={handleSignup}
            onLogin={handleShowLogin}
          />
        )}

        {appState === "app" && (
          <>
            {renderMainContent()}
            <BottomNavigation
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </>
        )}

        {appState === "online-matches" && (
          <OnlineMatchScreen onBack={handleBackFromMatches} />
        )}

        {appState === "offline-matches" && (
          <OfflineMatchScreen onBack={handleBackFromMatches} />
        )}

        {appState === "settings" && (
          <SettingsScreen onBack={handleBackFromSettings} />
        )}

        {appState === "create-match" && (
          <CreateMatchScreen onBack={handleBackFromCreateMatch} />
        )}

        {appState === "game-tournaments" && (
          <GameTournamentsScreen 
            game={selectedGame}
            onBack={handleBackFromGameTournaments}
            onTournamentSelect={handleTournamentSelect}
          />
        )}

        {appState === "tournament-detail" && (
          <TournamentDetailScreen 
            tournament={selectedTournament}
            onBack={handleBackFromTournamentDetail}
          />
        )}
      </div>
    </ThemeProvider>
  );
}