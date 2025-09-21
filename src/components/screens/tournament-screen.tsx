import React, { useState } from 'react';
import { Trophy, Search, Gamepad2, Wifi, WifiOff, Plus } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { getGameBackground } from '../utils/game-backgrounds';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TournamentScreenProps {
  onGameSelect: (game: string) => void;
  onCreateTournament?: () => void;
}

type TabMode = 'online' | 'offline';

interface TabConfig {
  key: TabMode;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export function TournamentScreen({ onGameSelect, onCreateTournament }: TournamentScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMode, setActiveMode] = useState<TabMode>('online');

  // Tab configuration
  const tabs: TabConfig[] = [
    {
      key: 'online',
      label: 'Online',
      icon: <Wifi size={16} />,
      color: 'text-emerald-500'
    },
    {
      key: 'offline',
      label: 'Offline',
      icon: <WifiOff size={16} />,
      color: 'text-blue-500'
    }
  ];

  // Helper function to check if icon is a URL
  const isImageUrl = (icon: string) => {
    return icon && (icon.startsWith('http') || icon.startsWith('https') || icon.startsWith('/'));
  };

  // Games data with tournament counts - updated with image URLs
  const games = [
    {
      name: "BGMI",
      fullName: "Battlegrounds Mobile India",
      onlineTournaments: 12,
      offlineTournaments: 3,
      totalPlayers: "2.5K+",
      icon: "https://i.pinimg.com/474x/8e/b6/9b/8eb69b94dea2520d716629c67f48934c.jpg",
      fallbackIcon: "🎯"
    },
    {
      name: "Free Fire",
      fullName: "Garena Free Fire",
      onlineTournaments: 8,
      offlineTournaments: 2,
      totalPlayers: "1.8K+",
      icon: "https://i.pinimg.com/736x/40/01/d9/4001d9f7fedb896b93baf041c0c33e6a.jpg",
      fallbackIcon: "🔥"
    },
    {
      name: "COD Mobile",
      fullName: "Call of Duty Mobile",
      onlineTournaments: 6,
      offlineTournaments: 4,
      totalPlayers: "1.2K+",
      icon: "https://i.pinimg.com/736x/c7/4e/5b/c74e5bf57d250c1bfc7b0d96f39f42c7.jpg",
      fallbackIcon: "⚔️"
    },
    {
      name: "Valorant",
      fullName: "Valorant",
      onlineTournaments: 4,
      offlineTournaments: 6,
      totalPlayers: "980+",
      icon: "https://i.pinimg.com/1200x/39/dc/66/39dc66a4fbaa85dcd12a49f216b60ead.jpg",
      fallbackIcon: "🎮"
    },
    {
      name: "Clash Royale",
      fullName: "Clash Royale",
      onlineTournaments: 5,
      offlineTournaments: 1,
      totalPlayers: "750+",
      icon: "https://i.pinimg.com/1200x/f0/44/83/f04483bbad609167bf64d0fd5dd7c0d8.jpg",
      fallbackIcon: "👑"
    },
    {
      name: "Brawl Stars",
      fullName: "Brawl Stars",
      onlineTournaments: 3,
      offlineTournaments: 2,
      totalPlayers: "640+",
      icon: "https://play-lh.googleusercontent.com/zD1oLEE7sS2-Zx4Yj3Bs4AYkqKw5gYWkB_ZXDG9v-CQWqGqGqGqGqGqGqGqGqGqG=s360",
      fallbackIcon: "⭐"
    },
    {
      name: "League of Legends: Wild Rift",
      fullName: "League of Legends: Wild Rift",
      onlineTournaments: 2,
      offlineTournaments: 3,
      totalPlayers: "520+",
      icon: "https://play-lh.googleusercontent.com/1Z2LsN9Vf3mT8kT8kT8kT8kT8kT8kT8kT8kT8kT8kT8kT8kT8kT8kT8kT8kT8k=s360",
      fallbackIcon: "🛡️"
    },
    {
      name: "Apex Legends Mobile",
      fullName: "Apex Legends Mobile",
      onlineTournaments: 1,
      offlineTournaments: 1,
      totalPlayers: "300+",
      icon: "https://play-lh.googleusercontent.com/2F7qSgN9b5WsZG7Y3LkT8kT8kT8kT8kT8kT8kT8kT8kT8kT8kT8kT8kT8kT8kT=s360",
      fallbackIcon: "🎪"
    }
  ];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.fullName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Filter based on active mode
    if (activeMode === 'online') {
      return game.onlineTournaments > 0;
    }
    if (activeMode === 'offline') {
      return game.offlineTournaments > 0;
    }

    return true;
  });

  // Get tournament count for current tab
  const getTabTournamentCount = (mode: TabMode) => {
    return games.reduce((sum, game) => {
      if (mode === 'online') return sum + game.onlineTournaments;
      if (mode === 'offline') return sum + game.offlineTournaments;
      return 0;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card/95 backdrop-blur-lg border-b border-border sticky top-0 z-40">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold flex items-center gap-2">
              <Trophy className="text-primary" size={24} />
              Tournaments
            </h1>
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={onCreateTournament} className="flex items-center gap-1">
                <Plus size={16} />
                Create Tournament
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Top Tabs Navigator */}
      <div className="bg-card/95 backdrop-blur-lg border-b border-border sticky top-[120px] z-30">
        <div className="flex">
          {tabs.map((tab, index) => {
            const isActive = activeMode === tab.key;
            const tournamentCount = getTabTournamentCount(tab.key);

            return (
              <button
                key={tab.key}
                onClick={() => setActiveMode(tab.key)}
                className={`
                  flex-1 flex flex-col items-center justify-center py-4 px-3 relative
                  transition-all duration-300 ease-in-out
                  ${isActive
                    ? 'text-foreground bg-background/50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                  }
                `}
              >
                {/* Active Tab Indicator */}
                {/* {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )} */}

                <div className={`flex items-center gap-2 mb-1 ${isActive ? tab.color : ''}`}>
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.label}</span>
                </div>

                {/* Bottom border for active tab */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Results Summary */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredGames.length} games available in {tabs.find(t => t.key === activeMode)?.label.toLowerCase()}
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredGames.map((game) => {
            const gameBackground = getGameBackground(game.name);
            const relevantTournamentCount = activeMode === 'online'
              ? game.onlineTournaments
              : game.offlineTournaments;

            return (
              <Card
                key={game.name}
                className="glass-card overflow-hidden relative cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                onClick={() => onGameSelect(game.name)}
              >
                {/* Background Image */}
                {gameBackground && (
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `url(${gameBackground})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />

                <CardContent className="p-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {/* Updated icon rendering with image support */}
                      {isImageUrl(game.icon) ? (
                        <ImageWithFallback
                          src={game.icon}
                          alt={`${game.name} icon`}
                          fallback={
                            <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center text-2xl">
                              {game.fallbackIcon || '🎮'}
                            </div>
                          }
                          className="w-12 h-12 rounded-lg object-cover border border-border/30 bg-muted/20"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center text-2xl">
                          {game.icon}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">{game.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">{game.fullName}</p>
                        <div className="flex items-center gap-4 mt-2">
                          {activeMode === 'offline' ? (
                            <div className="flex items-center gap-1">
                              <WifiOff size={14} className="text-blue-500" />
                              <span className="text-sm font-medium">{game.offlineTournaments}</span>
                              <span className="text-xs text-muted-foreground">offline tournaments</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Wifi size={14} className="text-emerald-500" />
                              <span className="text-sm font-medium">{game.onlineTournaments}</span>
                              <span className="text-xs text-muted-foreground">online tournaments</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Tournament Type Indicators */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                    <div className="text-xs text-muted-foreground mt-1">{game.totalPlayers} players</div>
                    <Button size="sm" variant="ghost" className="text-xs">
                      View Tournaments →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <Gamepad2 size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">No games found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <Card className="glass-card mt-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Trophy className="text-primary" size={18} />
              Tournament Overview
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-500">
                  {games.reduce((sum, game) => sum + game.onlineTournaments, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Online</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-500">
                  {games.reduce((sum, game) => sum + game.offlineTournaments, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Offline</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">
                  {games.reduce((sum, game) => sum + game.onlineTournaments + game.offlineTournaments, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}