import React, { useState } from 'react';
import { 
  ArrowLeft, Trophy, Users, Clock, Target, MapPin, 
  Calendar, DollarSign, Crown, Medal, Swords, Info,
  CheckCircle, XCircle, Wifi, WifiOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { getGameBackground, getGameGradient } from '../utils/game-backgrounds';

interface TournamentDetailScreenProps {
  tournament: any;
  onBack: () => void;
}

export function TournamentDetailScreen({ tournament, onBack }: TournamentDetailScreenProps) {
  if (!tournament) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Tournament not found</p>
      </div>
    );
  }

  // Mock data for teams and matches
  const teams = [
    { id: 1, name: "Phoenix Warriors", leader: "ProGamer123", members: 4, status: "confirmed", rank: 1 },
    { id: 2, name: "Shadow Hunters", leader: "NinjaKiller", members: 4, status: "confirmed", rank: 2 },
    { id: 3, name: "Thunder Bolts", leader: "LightningFast", members: 3, status: "pending", rank: null },
    { id: 4, name: "Fire Dragons", leader: "DragonSlayer", members: 4, status: "confirmed", rank: 3 },
    { id: 5, name: "Ice Breakers", leader: "FrozenAce", members: 2, status: "pending", rank: null },
    { id: 6, name: "Steel Titans", leader: "IronWill", members: 4, status: "confirmed", rank: 4 },
  ];

  const matches = [
    {
      id: 1,
      matchNo: "M001",
      round: "Round 1",
      team1: "Phoenix Warriors",
      team2: "Thunder Bolts",
      date: "2024-01-27T15:00:00",
      status: "upcoming",
      winner: null
    },
    {
      id: 2,
      matchNo: "M002", 
      round: "Round 1",
      team1: "Shadow Hunters",
      team2: "Fire Dragons",
      date: "2024-01-27T15:30:00",
      status: "upcoming",
      winner: null
    },
    {
      id: 3,
      matchNo: "M003",
      round: "Round 1", 
      team1: "Ice Breakers",
      team2: "Steel Titans",
      date: "2024-01-27T16:00:00",
      status: "upcoming",
      winner: null
    },
    {
      id: 4,
      matchNo: "SF1",
      round: "Semi-Final",
      team1: "TBD",
      team2: "TBD", 
      date: "2024-01-27T18:00:00",
      status: "pending",
      winner: null
    },
    {
      id: 5,
      matchNo: "SF2",
      round: "Semi-Final",
      team1: "TBD",
      team2: "TBD",
      date: "2024-01-27T18:30:00", 
      status: "pending",
      winner: null
    },
    {
      id: 6,
      matchNo: "F1",
      round: "Final",
      team1: "TBD",
      team2: "TBD",
      date: "2024-01-27T20:00:00",
      status: "pending", 
      winner: null
    }
  ];

  const gameBackground = getGameBackground(tournament.game);
  const gameGradient = getGameGradient(tournament.game);
  const registrationProgress = (tournament.currentTeams / tournament.maxTeams) * 100;

  const getTimeLeft = (deadline: string) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Started";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'live': return 'bg-red-500/20 text-red-400 border-red-400/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card/95 backdrop-blur-lg border-b border-border sticky top-0 z-40">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="font-bold">{tournament.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {tournament.game}
                </Badge>
                <Badge className={getStatusColor(tournament.status)}>
                  {tournament.status}
                </Badge>
                {tournament.type === 'online' ? (
                  <Wifi size={14} className="text-primary" />
                ) : (
                  <WifiOff size={14} className="text-accent" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info" className="flex items-center gap-1">
              <Info size={16} />
              Info
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center gap-1">
              <Users size={16} />
              Teams
            </TabsTrigger>
            <TabsTrigger value="matches" className="flex items-center gap-1">
              <Swords size={16} />
              Matches
            </TabsTrigger>
          </TabsList>

          {/* Info Tab */}
          <TabsContent value="info" className="space-y-4 mt-4">
            {/* Game Image Card */}
            <Card className="glass-card overflow-hidden relative">
              {gameBackground && (
                <div 
                  className="h-48 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${gameBackground})`
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-t ${gameGradient}`} />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-bold text-white text-xl">{tournament.game}</h3>
                    <p className="text-white/80">{tournament.format}</p>
                  </div>
                </div>
              )}
            </Card>

            {/* Tournament Details */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="text-primary" size={20} />
                  Tournament Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Registration Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Registration Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {tournament.currentTeams}/{tournament.maxTeams} teams
                    </span>
                  </div>
                  <Progress value={registrationProgress} className="h-3" />
                </div>

                {/* Key Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Entry Fee</p>
                        <p className="font-medium">₹{tournament.entryFee}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy size={16} className="text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Prize Pool</p>
                        <p className="font-medium text-primary">₹{tournament.prizePool.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Max Teams</p>
                        <p className="font-medium">{tournament.maxTeams}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Registration Ends</p>
                        <p className="font-medium text-accent">{getTimeLeft(tournament.registrationDeadline)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Tournament Start</p>
                        <p className="font-medium">{new Date(tournament.startTime).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Swords size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Rounds</p>
                        <p className="font-medium">{tournament.rounds}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {tournament.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{tournament.location}</p>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-1">Organized by</p>
                  <p className="font-medium">{tournament.organizer}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Registered Teams ({teams.length})</h3>
              <Button size="sm">Join Tournament</Button>
            </div>

            {teams.map((team) => (
              <Card key={team.id} className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {team.rank && (
                        <div className="flex items-center gap-1">
                          {team.rank === 1 && <Crown className="text-yellow-500" size={20} />}
                          {team.rank === 2 && <Medal className="text-gray-400" size={20} />}
                          {team.rank === 3 && <Medal className="text-amber-600" size={20} />}
                          {team.rank > 3 && <span className="text-sm font-bold">#{team.rank}</span>}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold">{team.name}</h4>
                        <p className="text-sm text-muted-foreground">Leader: {team.leader}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-medium">{team.members}/4 members</p>
                        <Badge className={getStatusColor(team.status)} variant="outline">
                          {team.status === 'confirmed' ? (
                            <CheckCircle size={12} className="mr-1" />
                          ) : (
                            <Clock size={12} className="mr-1" />
                          )}
                          {team.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Tournament Matches</h3>
              <Badge variant="outline">{matches.length} matches</Badge>
            </div>

            {/* Group matches by round */}
            {['Round 1', 'Semi-Final', 'Final'].map((round) => {
              const roundMatches = matches.filter(match => match.round === round);
              if (roundMatches.length === 0) return null;

              return (
                <div key={round}>
                  <h4 className="font-medium text-primary mb-3">{round}</h4>
                  <div className="space-y-3">
                    {roundMatches
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((match) => (
                        <Card key={match.id} className="glass-card">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <p className="text-xs text-muted-foreground">Match</p>
                                  <p className="font-bold text-primary">{match.matchNo}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="text-right">
                                    <p className="font-medium">{match.team1}</p>
                                  </div>
                                  <div className="text-muted-foreground">vs</div>
                                  <div>
                                    <p className="font-medium">{match.team2}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">
                                  {new Date(match.date).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                <Badge className={getStatusColor(match.status)} variant="outline">
                                  {match.status}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}