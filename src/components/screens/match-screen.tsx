import React, { useState, useEffect } from 'react';
import { Filter, Search, Trophy, Users, Clock, MapPin, Target, Plus } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { getGameBackground, getGameGradient } from '../utils/game-backgrounds';

interface MatchScreenProps {
  initialFilter?: string;
  onCreateMatch?: () => void;
}

export function MatchScreen({ initialFilter = 'all', onCreateMatch }: MatchScreenProps) {
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');

  // Update filter when initialFilter prop changes
  useEffect(() => {
    setActiveFilter(initialFilter);
  }, [initialFilter]);

  const matches = [
    {
      id: 1,
      title: "BGMI Championship Series",
      game: "BGMI",
      platform: "Mobile",
      type: "Online",
      mode: "Squad",
      entryFee: "₹100",
      prizePool: "₹25,000",
      participants: "156/256",
      startTime: "2024-01-20T18:00:00",
      organizer: "GameYo Official",
      commission: "5%",
      status: "open",
      featured: true
    },
    {
      id: 2,
      title: "Free Fire Clash Royale",
      game: "Free Fire",
      platform: "Mobile",
      type: "Online",
      mode: "Solo",
      entryFee: "₹50",
      prizePool: "₹10,000",
      participants: "89/128",
      startTime: "2024-01-19T20:00:00",
      organizer: "Pro Gamers Club",
      commission: "8%",
      status: "open",
      featured: false
    },
    {
      id: 3,
      title: "COD Mobile Match",
      game: "COD Mobile",
      platform: "Mobile",
      type: "Online",
      mode: "Team",
      entryFee: "₹75",
      prizePool: "₹15,000",
      participants: "67/100",
      startTime: "2024-01-21T19:30:00",
      organizer: "Elite Gaming",
      commission: "6%",
      status: "open",
      featured: true
    },
    {
      id: 4,
      title: "Valorant PC Championship",
      game: "Valorant",
      platform: "PC",
      type: "Offline",
      mode: "Team",
      entryFee: "₹200",
      prizePool: "₹50,000",
      participants: "24/32",
      startTime: "2024-01-25T10:00:00",
      organizer: "Mumbai Gaming Hub",
      commission: "10%",
      status: "open",
      featured: true
    }
  ];

  const myMatches = {
    upcoming: [
      {
        id: 1,
        title: "BGMI Solo Rush",
        startTime: "2024-01-20T15:00:00",
        entryFee: "₹25",
        status: "confirmed"
      }
    ],
    ongoing: [],
    completed: [
      {
        id: 2,
        title: "Free Fire Weekly",
        endTime: "2024-01-15T21:00:00",
        result: "2nd Place",
        earning: "₹500"
      }
    ]
  };

  const getTimeLeft = (startTime: string) => {
    const start = new Date(startTime);
    const now = new Date();
    const diff = start.getTime() - now.getTime();

    if (diff <= 0) return "Started";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }

    return `${hours}h ${minutes}m`;
  };

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.game.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'featured') return matchesSearch && match.featured;
    if (activeFilter === 'mobile') return matchesSearch && match.platform === 'Mobile';
    if (activeFilter === 'pc') return matchesSearch && match.platform === 'PC';
    if (activeFilter === 'online') return matchesSearch && match.type === 'Online';
    if (activeFilter === 'offline') return matchesSearch && match.type === 'Offline';

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Matches</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Filter size={20} />
            </Button>
            <Button size="sm" onClick={onCreateMatch} className="flex items-center gap-1">
              <Plus size={16} />
              Create Match
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search matches, games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto">
          {[
            { id: 'all', label: 'All' },
            { id: 'featured', label: 'Featured' },
            { id: 'mobile', label: 'Mobile' },
            { id: 'pc', label: 'PC' },
            { id: 'online', label: 'Online' },
            { id: 'offline', label: 'Offline' }
          ].map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className="whitespace-nowrap"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="my-matches">My Matches</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4 mt-4">
            {filteredMatches.map((match) => {
              const gameBackground = getGameBackground(match.game);
              const gameGradient = getGameGradient(match.game);

              return (
                <Card key={match.id} className="glass-card hover:shadow-lg transition-all duration-200 overflow-hidden relative">
                  {/* Game Background Image */}
                  {gameBackground && (
                    <div
                      className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${gameBackground})` }}
                    />
                  )}
                  {/* Game Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gameGradient}`} />

                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{match.title}</h3>
                          {match.featured && (
                            <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{match.game}</span>
                          <Badge variant="outline" className="text-xs">
                            {match.platform}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {match.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Prize Pool</p>
                        <p className="font-bold text-primary">{match.prizePool}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <Target size={16} className="text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Entry Fee</p>
                          <p className="text-sm font-medium">{match.entryFee}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Players</p>
                          <p className="text-sm font-medium">{match.participants}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Starts In</p>
                          <p className="text-sm font-medium text-accent">{getTimeLeft(match.startTime)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy size={16} className="text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Mode</p>
                          <p className="text-sm font-medium">{match.mode}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        By {match.organizer}
                      </div>
                      <Button size="sm" className="bg-primary text-primary-foreground">
                        Join Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="my-matches" className="space-y-4 mt-4">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-3 mt-4">
                {myMatches.upcoming.map((match) => (
                  <Card key={match.id} className="glass-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{match.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Starts in {getTimeLeft(match.startTime)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{match.entryFee}</p>
                          <Badge variant="outline" className="text-xs">
                            {match.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="ongoing" className="space-y-3 mt-4">
                <div className="text-center py-8">
                  <Trophy size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No ongoing matches</p>
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-3 mt-4">
                {myMatches.completed.map((match) => (
                  <Card key={match.id} className="glass-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{match.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Result: {match.result}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-500">
                            +{match.earning}
                          </p>
                          <p className="text-xs text-muted-foreground">Earned</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}