import React, { useState } from 'react';
import { ArrowLeft, Search, Trophy, Users, Clock, Target, Gamepad2, Star, Filter } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface OnlineTournamentScreenProps {
  onBack: () => void;
}

export function OnlineTournamentScreen({ onBack }: OnlineTournamentScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState('all');

  const featuredTournaments = [
    {
      id: 1,
      title: "BGMI Pro Championship",
      game: "BGMI",
      gameIcon: "🎮",
      entryFee: 100,
      prizePool: "₹50,000",
      participants: "156/256",
      maxParticipants: 256,
      timeLeft: "2h 30m",
      difficulty: "Pro",
      mode: "Squad",
      status: "filling",
      featured: true
    },
    {
      id: 2,
      title: "Free Fire Lightning Cup",
      game: "Free Fire",
      gameIcon: "⚡",
      entryFee: 50,
      prizePool: "₹25,000",
      participants: "89/128",
      maxParticipants: 128,
      timeLeft: "1h 45m",
      difficulty: "Advanced",
      mode: "Solo",
      status: "filling",
      featured: true
    },
    {
      id: 3,
      title: "COD Mobile Masters",
      game: "COD Mobile",
      gameIcon: "🔫",
      entryFee: 75,
      prizePool: "₹35,000",
      participants: "67/100",
      maxParticipants: 100,
      timeLeft: "3h 15m",
      difficulty: "Expert",
      mode: "Team",
      status: "filling",
      featured: true
    }
  ];

  const upcomingTournaments = [
    {
      id: 4,
      title: "BGMI Squad Battle",
      game: "BGMI",
      gameIcon: "🎮",
      entryFee: 25,
      prizePool: "₹10,000",
      participants: "45/64",
      maxParticipants: 64,
      timeLeft: "6h 20m",
      difficulty: "Beginner",
      mode: "Squad",
      status: "upcoming"
    },
    {
      id: 5,
      title: "Free Fire Rush",
      game: "Free Fire",
      gameIcon: "⚡",
      entryFee: 30,
      prizePool: "₹8,000",
      participants: "32/64",
      maxParticipants: 64,
      timeLeft: "4h 45m",
      difficulty: "Intermediate",
      mode: "Solo",
      status: "upcoming"
    },
    {
      id: 6,
      title: "COD Mobile Blitz",
      game: "COD Mobile",
      gameIcon: "🔫",
      entryFee: 40,
      prizePool: "₹12,000",
      participants: "28/48",
      maxParticipants: 48,
      timeLeft: "5h 30m",
      difficulty: "Advanced",
      mode: "Duo",
      status: "upcoming"
    }
  ];

  const gameFilters = [
    { id: 'all', name: 'All Games', icon: '🎯' },
    { id: 'bgmi', name: 'BGMI', icon: '🎮' },
    { id: 'freefire', name: 'Free Fire', icon: '⚡' },
    { id: 'codmobile', name: 'COD Mobile', icon: '🔫' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-500 border-green-500';
      case 'Intermediate': return 'bg-blue-500/20 text-blue-500 border-blue-500';
      case 'Advanced': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500';
      case 'Expert': return 'bg-orange-500/20 text-orange-500 border-orange-500';
      case 'Pro': return 'bg-red-500/20 text-red-500 border-red-500';
      default: return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'filling': return 'bg-blue-500/20 text-blue-500';
      case 'upcoming': return 'bg-green-500/20 text-green-500';
      case 'live': return 'bg-red-500/20 text-red-500';
      default: return 'bg-muted/50 text-muted-foreground';
    }
  };

  const getProgressPercentage = (participants: string) => {
    const [current, max] = participants.split('/').map(Number);
    return (current / max) * 100;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="p-4 pt-6 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="w-10 h-10 rounded-full">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Online Tournaments</h1>
            <p className="text-muted-foreground text-sm">Compete globally from home</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tournaments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-muted/50 border-0 rounded-2xl"
          />
        </div>
      </div>

      <div className="p-4">
        {/* Game Filter Pills */}
        <div className="flex gap-2 overflow-x-auto mb-6 pb-2">
          {gameFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedGame === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGame(filter.id)}
              className="flex-shrink-0 rounded-full"
            >
              <span className="mr-2">{filter.icon}</span>
              {filter.name}
            </Button>
          ))}
        </div>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="live">Live Now</TabsTrigger>
          </TabsList>

          {/* Featured Tournaments */}
          <TabsContent value="featured" className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">🔥 Featured Online</h2>
              <Button variant="ghost" size="sm">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {featuredTournaments.map((tournament) => (
                <Card key={tournament.id} className="border-0 bg-card/50 rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 p-1">
                    <div className="bg-card rounded-xl">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl">
                              {tournament.gameIcon}
                            </div>
                            <div>
                              <h3 className="font-semibold">{tournament.title}</h3>
                              <p className="text-sm text-muted-foreground">{tournament.game}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-primary">{tournament.prizePool}</div>
                            <div className="text-xs text-muted-foreground">Prize Pool</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getDifficultyColor(tournament.difficulty)}`}
                          >
                            {tournament.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {tournament.mode}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getStatusColor(tournament.status)}`}
                          >
                            {tournament.status === 'filling' ? 'Filling Up' : 'Upcoming'}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-4 gap-3 mb-4">
                          <div className="text-center">
                            <div className="text-sm font-semibold">₹{tournament.entryFee}</div>
                            <div className="text-xs text-muted-foreground">Entry</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-semibold">{tournament.participants}</div>
                            <div className="text-xs text-muted-foreground">Players</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-semibold text-red-500">{tournament.timeLeft}</div>
                            <div className="text-xs text-muted-foreground">Starts In</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-semibold flex items-center justify-center">
                              <Trophy size={14} className="mr-1 text-yellow-500" />
                              1st
                            </div>
                            <div className="text-xs text-muted-foreground">Position</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Tournament Progress</span>
                            <span>{getProgressPercentage(tournament.participants).toFixed(0)}% Full</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${getProgressPercentage(tournament.participants)}%` }}
                            />
                          </div>
                        </div>

                        <Button className="w-full bg-primary text-primary-foreground rounded-xl">
                          Join Tournament
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Upcoming Tournaments */}
          <TabsContent value="upcoming" className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">⏰ Starting Soon</h2>
            </div>

            <div className="space-y-3">
              {upcomingTournaments.map((tournament) => (
                <Card key={tournament.id} className="border-0 bg-card/50 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl">
                        {tournament.gameIcon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{tournament.title}</h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getDifficultyColor(tournament.difficulty)}`}
                          >
                            {tournament.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{tournament.game} • {tournament.mode}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {tournament.timeLeft}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={12} />
                            {tournament.participants}
                          </span>
                          <span className="flex items-center gap-1">
                            <Trophy size={12} />
                            {tournament.prizePool}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-semibold text-primary mb-1">₹{tournament.entryFee}</div>
                        <Button size="sm" variant="outline" className="rounded-full">
                          Register
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Live Tournaments */}
          <TabsContent value="live" className="space-y-4 mt-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <Gamepad2 size={24} className="text-red-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">No Live Tournaments</h3>
              <p className="text-muted-foreground text-sm">
                Check back later for live tournament streams and matches
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}