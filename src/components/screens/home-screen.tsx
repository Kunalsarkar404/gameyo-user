import React from 'react';
import { Bell, Search, Trophy, Users, Zap, Target, Crown, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { getGameBackground, getGameGradient } from '../utils/game-backgrounds';

interface HomeScreenProps {
  onQuickMatch?: () => void;
  onOnlineMatches?: () => void;
  onOfflineMatches?: () => void;
  onCreateMatch?: () => void;
  onTournamentSelect?: (tournament: any) => void;
  onViewAllTournaments?: () => void;
  onGameSelect?: (game: string) => void;
}

export function HomeScreen({ onQuickMatch, onOnlineMatches, onOfflineMatches, onCreateMatch, onTournamentSelect, onViewAllTournaments, onGameSelect }: HomeScreenProps) {
  const promoImages = [
    "https://images.unsplash.com/photo-1675310854573-c5c8e4089426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjB0b3VybmFtZW50JTIwZXNwb3J0c3xlbnwxfHx8fDE3NTc5NTg3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1559984430-c12e199879b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBnYW1pbmclMjBjb250cm9sbGVyfGVufDF8fHx8MTc1ODAwMDQzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  // Helper function to check if icon is a URL
  const isImageUrl = (icon: string) => {
    return icon && (icon.startsWith('http') || icon.startsWith('https') || icon.startsWith('/'));
  };

  const featuredTournaments = [
    {
      id: 1,
      title: "BGMI Pro Championship",
      game: "BGMI",
      entryFee: 500,
      prizePool: 50000,
      maxTeams: 64,
      currentTeams: 45,
      mode: "Squad Elimination",
      timeLeft: "2h 30m",
      type: "online",
      status: "open",
      featured: true,
      registrationDeadline: "2024-01-25T18:00:00",
      startTime: "2024-01-27T15:00:00",
      organizer: "GameYo Pro",
      rounds: 4
    },
    {
      id: 2,
      title: "Free Fire Elite Cup",
      game: "Free Fire",
      entryFee: 1000,
      prizePool: 75000,
      maxTeams: 16,
      currentTeams: 16,
      mode: "LAN Tournament",
      timeLeft: "Live Now",
      type: "offline",
      status: "full",
      featured: true,
      registrationDeadline: "2024-01-23T18:00:00",
      startTime: "2024-01-25T10:00:00",
      organizer: "Elite Gaming Hub",
      location: "Mumbai Gaming Arena",
      rounds: 5
    },
    {
      id: 3,
      title: "COD Mobile Weekly Arena",
      game: "COD Mobile",
      entryFee: 200,
      prizePool: 15000,
      maxTeams: 32,
      currentTeams: 28,
      mode: "Battle Royale",
      timeLeft: "4h 15m",
      type: "online",
      status: "open",
      featured: false,
      registrationDeadline: "2024-01-24T20:00:00",
      startTime: "2024-01-26T19:00:00",
      organizer: "Arena Masters",
      rounds: 3
    },
    {
      id: 4,
      title: "Valorant Championship Series",
      game: "Valorant",
      entryFee: 750,
      prizePool: 100000,
      maxTeams: 24,
      currentTeams: 22,
      mode: "5v5 Tactical",
      timeLeft: "1d 6h",
      type: "offline",
      status: "open",
      featured: true,
      registrationDeadline: "2024-01-26T18:00:00",
      startTime: "2024-01-28T14:00:00",
      organizer: "Valorant India",
      location: "Delhi Gaming Arena",
      rounds: 6
    }
  ];

  const quickActions = [
    { icon: Trophy, label: "Quick Match", color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
    { icon: Target, label: "Create Match", color: "text-purple-500", bgColor: "bg-purple-500/10" },
    { icon: Users, label: "Find Friends", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  ];

  const registeredMatches = [
    {
      id: 1,
      title: "BGMI Championship",
      game: "BGMI",
      mode: "Squad",
      status: "upcoming",
      startTime: "2h 30m",
      entryFee: "₹50",
      position: "Confirmed"
    },
    {
      id: 2,
      title: "Free Fire Weekly",
      game: "Free Fire",
      mode: "Solo",
      status: "live",
      startTime: "Live Now",
      entryFee: "₹25",
      position: "Playing"
    },
    {
      id: 3,
      title: "COD Mobile Arena",
      game: "COD Mobile",
      mode: "Team",
      status: "upcoming",
      startTime: "1d 4h",
      entryFee: "₹75",
      position: "Confirmed"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Good Evening!</h1>
            <p className="text-muted-foreground">Ready to dominate?</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Promo Banners */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Featured Promotions</h2>
          <div className="flex gap-3 overflow-x-auto">
            {promoImages.map((image, index) => (
              <div key={index} className="flex-shrink-0 w-80 h-40 rounded-lg overflow-hidden relative">
                <ImageWithFallback
                  src={image}
                  alt={`Promotion ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-sm font-medium">Win Big This Weekend!</p>
                  <p className="text-xs opacity-90">Join tournament now</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Tournament Highlight */}
        {featuredTournaments.find(t => t.status === 'live') && (
          <Card className="glass-card overflow-hidden relative border-2 border-red-500/50 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10" />
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <div>
                    <h3 className="font-semibold text-red-500">🔴 LIVE TOURNAMENT</h3>
                    <p className="text-sm text-muted-foreground">
                      {featuredTournaments.find(t => t.status === 'live')?.title}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => onTournamentSelect?.(featuredTournaments.find(t => t.status === 'live'))}
                >
                  Watch Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Popular Games */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              Popular Games
            </h2>
            <Button variant="ghost" size="sm" onClick={onViewAllTournaments}>
              View All
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[
              { name: "BGMI", icon: "https://i.pinimg.com/474x/8e/b6/9b/8eb69b94dea2520d716629c67f48934c.jpg", fallbackIcon: "🎯", tournaments: 15, color: "from-purple-500/20 to-gray-500/20", gradient: "from-blue-500 to-cyan-500" },
              { name: "Free Fire", icon: "https://i.pinimg.com/736x/40/01/d9/4001d9f7fedb896b93baf041c0c33e6a.jpg", fallbackIcon: "🔥", tournaments: 10, color: "from-purple-500/20 to-gray-500/20", gradient: "from-orange-500 to-red-500" },
              { name: "COD Mobile", icon: "https://i.pinimg.com/736x/c7/4e/5b/c74e5bf57d250c1bfc7b0d96f39f42c7.jpg", fallbackIcon: "⚔️", tournaments: 8, color: "from-purple-500/20 to-gray-500/20", gradient: "from-purple-500 to-pink-500" },
              { name: "Valorant", icon: "https://i.pinimg.com/1200x/39/dc/66/39dc66a4fbaa85dcd12a49f216b60ead.jpg", fallbackIcon: "🎮", tournaments: 6, color: "from-purple-500/20 to-gray-500/20", gradient: "from-green-500 to-teal-500" },
              { name: "CS2", icon: "https://i.pinimg.com/736x/3c/1e/87/3c1e871625f3c31c9b7d10ed179205e9.jpg", fallbackIcon: "💀", tournaments: 4, color: "from-purple-500/20 to-gray-500/20", gradient: "from-gray-500 to-slate-500" }
            ].map((game, index) => (
              <Card
                key={index}
                className={`flex-shrink-0 w-32 cursor-pointer hover:scale-105 transition-all duration-200 border-0 bg-gradient-to-br ${game.color} relative overflow-hidden group`}
                onClick={() => onGameSelect?.(game.name)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <CardContent className="p-4 text-center relative z-10">
                  {/* Centered icon container */}
                  <div className="mb-2 flex justify-center items-center transform group-hover:scale-110 transition-transform duration-200">
                    {isImageUrl(game.icon) ? (
                      <ImageWithFallback
                        src={game.icon}
                        alt={`${game.name} icon`}
                        fallback={
                          <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center text-2xl">
                            {game.fallbackIcon || '🎮'}
                          </div>
                        }
                        className="w-12 h-12 rounded-lg object-cover border border-border/30 bg-muted/20 mx-auto"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center text-2xl">
                        {game.icon}
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium text-sm mb-1">{game.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {game.tournaments} active
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tournament Categories */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Match Categories</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card
              className="border-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-200"
              onClick={onOnlineMatches}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="font-semibold mb-1">Online Matches</h3>
                <p className="text-sm text-muted-foreground mb-3">Compete globally from home</p>
                <Badge variant="outline" className="text-xs border-blue-500 text-blue-500">
                  24 Active
                </Badge>
              </CardContent>
            </Card>

            <Card
              className="border-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-200"
              onClick={onOfflineMatches}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="font-semibold mb-1">Offline Matches</h3>
                <p className="text-sm text-muted-foreground mb-3">Battle in person, win big</p>
                <Badge variant="outline" className="text-xs border-orange-500 text-orange-500">
                  8 Near You
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Registered Matches */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">My Registered Matches</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {registeredMatches.map((match) => (
              <Card key={match.id} className="glass-card flex-shrink-0 w-72 hover:shadow-lg transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{match.title}</h3>
                        <Badge
                          variant={match.status === 'live' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {match.status === 'live' ? 'LIVE' : match.mode}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{match.game}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Entry</p>
                      <p className="text-sm font-bold text-primary">{match.entryFee}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-muted-foreground" />
                        <span className={`text-xs font-medium ${match.status === 'live' ? 'text-red-500' : 'text-accent'}`}>
                          {match.startTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-muted-foreground" />
                        <span className="text-xs font-medium text-green-500">
                          {match.position}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant={match.status === 'live' ? 'default' : 'outline'}>
                      {match.status === 'live' ? 'Join Now' : 'View'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Tournaments */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Trophy className="text-primary" size={20} />
              Featured Tournaments
            </h2>
            <Button variant="ghost" size="sm" onClick={onViewAllTournaments}>
              View All
            </Button>
          </div>

          {/* Featured Tournament Cards */}
          <div className="space-y-3">
            {featuredTournaments.slice(0, 3).map((tournament) => {
              const gameBackground = getGameBackground(tournament.game);
              const gameGradient = getGameGradient(tournament.game);
              const registrationProgress = (tournament.currentTeams / tournament.maxTeams) * 100;

              const getStatusColor = (status: string) => {
                switch (status) {
                  case 'open': return 'bg-green-500/20 text-green-400 border-green-400/30';
                  case 'full': return 'bg-red-500/20 text-red-400 border-red-400/30';
                  case 'live': return 'bg-red-500/20 text-red-400 border-red-400/30';
                  default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
                }
              };

              return (
                <Card
                  key={tournament.id}
                  className="glass-card hover:shadow-lg transition-all duration-200 overflow-hidden relative cursor-pointer hover:scale-[1.02]"
                  onClick={() => onTournamentSelect?.(tournament)}
                >
                  {/* Game Background Image */}
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
                  {/* Game Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gameGradient}`} />

                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="font-semibold text-foreground">{tournament.title}</h3>
                          {tournament.featured && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30 text-xs">
                              Featured
                            </Badge>
                          )}
                          <Badge className={`${getStatusColor(tournament.status)} text-xs`}>
                            {tournament.status === 'live' ? 'LIVE' : tournament.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1">
                            {tournament.type === 'online' ? '🌐' : '📍'}
                            {tournament.type}
                          </span>
                          <Badge variant="outline" className="text-xs bg-background/50">
                            {tournament.mode}
                          </Badge>
                          {tournament.location && (
                            <span className="text-xs">{tournament.location}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Prize Pool</p>
                        <p className="font-bold text-primary text-lg">₹{tournament.prizePool.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Registration Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Registration Progress</span>
                        <span className="text-xs font-medium">
                          {tournament.currentTeams}/{tournament.maxTeams} teams
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                          style={{ width: `${Math.min(registrationProgress, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Entry Fee</p>
                          <p className="text-sm font-medium">₹{tournament.entryFee}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Rounds</p>
                          <p className="text-sm font-medium">{tournament.rounds}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">
                            {tournament.status === 'live' ? 'Status' : 'Registration Ends'}
                          </p>
                          <p className={`text-sm font-medium ${tournament.status === 'live' ? 'text-red-500' : 'text-accent'}`}>
                            {tournament.timeLeft}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        disabled={tournament.status === 'full'}
                        className={`${tournament.status === 'live' ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'} text-white`}
                      >
                        {tournament.status === 'full' ? 'Full' : tournament.status === 'live' ? 'Watch Live' : 'View Details'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Tournament Stats */}
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-primary">
                    {featuredTournaments.filter(t => t.status === 'open').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Open Tournaments</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-accent">
                    ₹{featuredTournaments.reduce((sum, t) => sum + t.prizePool, 0).toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Prize Pool</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}