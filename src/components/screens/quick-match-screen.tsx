import React, { useState } from 'react';
import { ArrowLeft, Zap, Trophy, Users, Clock, Target, Gamepad2, Crown, Star } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';

interface QuickMatchScreenProps {
  onBack: () => void;
}

export function QuickMatchScreen({ onBack }: QuickMatchScreenProps) {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const gameModes = [
    {
      id: 'battle-royale',
      name: 'Battle Royale',
      icon: Target,
      description: '100 players, last man standing',
      entryFee: 50,
      prize: '₹2,500',
      duration: '15-20 min',
      players: '1v99',
      difficulty: 'Medium'
    },
    {
      id: 'team-deathmatch',
      name: 'Team Deathmatch',
      icon: Users,
      description: '4v4 intense combat',
      entryFee: 25,
      prize: '₹800',
      duration: '8-10 min',
      players: '4v4',
      difficulty: 'Easy'
    },
    {
      id: 'ranked-match',
      name: 'Ranked Match',
      icon: Crown,
      description: 'Competitive ranked gameplay',
      entryFee: 100,
      prize: '₹5,000',
      duration: '20-25 min',
      players: 'Solo',
      difficulty: 'Hard'
    },
    {
      id: 'lightning-round',
      name: 'Lightning Round',
      icon: Zap,
      description: 'Fast-paced quick matches',
      entryFee: 10,
      prize: '₹200',
      duration: '3-5 min',
      players: '1v1',
      difficulty: 'Easy'
    }
  ];

  const activeMatches = [
    {
      id: 1,
      title: 'Pro Championship',
      game: 'BGMI',
      players: 47,
      maxPlayers: 100,
      timeLeft: '2m 30s',
      prize: '₹10,000',
      status: 'filling'
    },
    {
      id: 2,
      title: 'Quick Clash',
      game: 'Free Fire',
      players: 8,
      maxPlayers: 8,
      timeLeft: '30s',
      prize: '₹500',
      status: 'starting'
    },
    {
      id: 3,
      title: 'Elite Battle',
      game: 'COD Mobile',
      players: 12,
      maxPlayers: 16,
      timeLeft: '1m 15s',
      prize: '₹2,000',
      status: 'filling'
    }
  ];

  const recentPlayers = [
    {
      id: 1,
      name: 'ProGamer123',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      level: 45,
      winRate: 78,
      isOnline: true
    },
    {
      id: 2,
      name: 'SkillMaster',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b5b07d60?w=150&h=150&fit=crop&crop=face',
      level: 52,
      winRate: 82,
      isOnline: true
    },
    {
      id: 3,
      name: 'EliteSniper',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      level: 38,
      winRate: 71,
      isOnline: false
    }
  ];

  const handleQuickMatch = (mode: any) => {
    setSelectedMode(mode.id);
    setIsSearching(true);
    // Simulate match finding
    setTimeout(() => {
      setIsSearching(false);
      // Would navigate to match lobby/game
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-500 border-green-500';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500';
      case 'Hard': return 'bg-red-500/20 text-red-500 border-red-500';
      default: return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'filling': return 'bg-blue-500/20 text-blue-500';
      case 'starting': return 'bg-green-500/20 text-green-500';
      default: return 'bg-muted/50 text-muted-foreground';
    }
  };

  if (isSearching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <div className="w-full h-full border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Gamepad2 size={40} className="text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Finding Match</h2>
          <p className="text-muted-foreground mb-6">Searching for opponents...</p>
          <Progress value={65} className="w-64 mx-auto mb-4" />
          <Button variant="outline" onClick={() => setIsSearching(false)}>
            Cancel Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="p-4 pt-6 border-b border-border">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="w-10 h-10 rounded-full">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Quick Match</h1>
            <p className="text-muted-foreground text-sm">Find instant gaming matches</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Game Modes */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Choose Game Mode</h2>
          <div className="grid grid-cols-1 gap-3">
            {gameModes.map((mode) => {
              const IconComponent = mode.icon;
              return (
                <Card 
                  key={mode.id} 
                  className="border-0 bg-card/50 rounded-2xl cursor-pointer hover:bg-card/80 transition-all duration-200"
                  onClick={() => handleQuickMatch(mode)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <IconComponent size={24} className="text-primary" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{mode.name}</h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getDifficultyColor(mode.difficulty)}`}
                          >
                            {mode.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{mode.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {mode.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={12} />
                            {mode.players}
                          </span>
                          <span className="flex items-center gap-1">
                            <Trophy size={12} />
                            {mode.prize}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-semibold text-primary mb-1">₹{mode.entryFee}</div>
                        <div className="text-xs text-muted-foreground">Entry Fee</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Active Matches */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Join Active Matches</h2>
          <div className="space-y-3">
            {activeMatches.map((match) => (
              <Card key={match.id} className="border-0 bg-card/50 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{match.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {match.game}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getStatusColor(match.status)}`}
                        >
                          {match.status === 'filling' ? 'Filling Up' : 'Starting Soon'}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-primary">{match.prize}</div>
                      <div className="text-xs text-muted-foreground">Prize Pool</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Players</span>
                        <span>{match.players}/{match.maxPlayers}</span>
                      </div>
                      <Progress value={(match.players / match.maxPlayers) * 100} className="h-2" />
                    </div>
                    <div className="ml-4 text-center">
                      <div className="text-sm font-semibold text-red-500">{match.timeLeft}</div>
                      <div className="text-xs text-muted-foreground">Remaining</div>
                    </div>
                  </div>

                  <Button className="w-full bg-primary text-primary-foreground rounded-xl">
                    Join Match
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Players */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Recent Players</h2>
          <div className="space-y-3">
            {recentPlayers.map((player) => (
              <Card key={player.id} className="border-0 bg-card/50 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {player.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      {player.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold">{player.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>Lvl {player.level}</span>
                        <span className="flex items-center gap-1">
                          <Star size={10} className="text-yellow-500" />
                          {player.winRate}% win rate
                        </span>
                      </div>
                    </div>

                    <Button size="sm" variant="outline" className="rounded-full px-6">
                      Challenge
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}