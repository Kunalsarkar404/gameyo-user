import React, { useState } from 'react';
import { Trophy, Search, Gamepad2, Wifi, WifiOff } from 'lucide-react';
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
}

export function TournamentScreen({ onGameSelect }: TournamentScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  // Games data with tournament counts
  const games = [
    {
      name: "BGMI",
      fullName: "Battlegrounds Mobile India",
      onlineTournaments: 12,
      offlineTournaments: 3,
      totalPlayers: "2.5K+",
      icon: "🎯"
    },
    {
      name: "Free Fire",
      fullName: "Garena Free Fire",
      onlineTournaments: 8,
      offlineTournaments: 2,
      totalPlayers: "1.8K+",
      icon: "🔥"
    },
    {
      name: "COD Mobile",
      fullName: "Call of Duty Mobile",
      onlineTournaments: 6,
      offlineTournaments: 4,
      totalPlayers: "1.2K+",
      icon: "⚔️"
    },
    {
      name: "Valorant",
      fullName: "Valorant",
      onlineTournaments: 4,
      offlineTournaments: 6,
      totalPlayers: "980+",
      icon: "🎮"
    },
    {
      name: "Clash Royale",
      fullName: "Clash Royale",
      onlineTournaments: 5,
      offlineTournaments: 1,
      totalPlayers: "750+",
      icon: "👑"
    },
    {
      name: "Brawl Stars",
      fullName: "Brawl Stars",
      onlineTournaments: 3,
      offlineTournaments: 2,
      totalPlayers: "640+",
      icon: "⭐"
    },
    {
      name: "League of Legends: Wild Rift",
      fullName: "League of Legends: Wild Rift",
      onlineTournaments: 2,
      offlineTournaments: 3,
      totalPlayers: "520+",
      icon: "🛡️"
    },
    {
      name: "Apex Legends Mobile",
      fullName: "Apex Legends Mobile",
      onlineTournaments: 1,
      offlineTournaments: 1,
      totalPlayers: "300+",
      icon: "🎪"
    }
  ];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    // If online only filter is on, only show games with online tournaments
    if (showOnlineOnly) {
      return game.onlineTournaments > 0;
    }
    
    return true;
  });

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
            <Badge variant="outline" className="flex items-center gap-1">
              <Gamepad2 size={14} />
              {games.length} Games
            </Badge>
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

          {/* Online/Offline Toggle */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="online-mode"
                checked={showOnlineOnly}
                onCheckedChange={setShowOnlineOnly}
              />
              <Label htmlFor="online-mode" className="flex items-center gap-2">
                {showOnlineOnly ? (
                  <>
                    <Wifi size={16} className="text-primary" />
                    Online Only
                  </>
                ) : (
                  <>
                    <Gamepad2 size={16} />
                    All Tournaments
                  </>
                )}
              </Label>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredGames.length} games available
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4">
          {filteredGames.map((game) => {
            const gameBackground = getGameBackground(game.name);
            const totalTournaments = game.onlineTournaments + game.offlineTournaments;
            
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
                      <div className="text-3xl">{game.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">{game.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">{game.fullName}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Wifi size={14} className="text-primary" />
                            <span className="text-sm font-medium">{game.onlineTournaments}</span>
                            <span className="text-xs text-muted-foreground">online</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <WifiOff size={14} className="text-accent" />
                            <span className="text-sm font-medium">{game.offlineTournaments}</span>
                            <span className="text-xs text-muted-foreground">offline</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{totalTournaments}</div>
                      <div className="text-xs text-muted-foreground">tournaments</div>
                      <div className="text-xs text-muted-foreground mt-1">{game.totalPlayers} players</div>
                    </div>
                  </div>

                  {/* Tournament Type Indicators */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                    <div className="flex gap-2">
                      {game.onlineTournaments > 0 && (
                        <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                          <Wifi size={10} className="mr-1" />
                          Online Available
                        </Badge>
                      )}
                      {game.offlineTournaments > 0 && (
                        <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/30">
                          <WifiOff size={10} className="mr-1" />
                          Offline Available
                        </Badge>
                      )}
                    </div>
                    
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
                <div className="text-lg font-bold text-primary">
                  {games.reduce((sum, game) => sum + game.onlineTournaments, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Online</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-accent">
                  {games.reduce((sum, game) => sum + game.offlineTournaments, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Offline</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-tertiary">
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