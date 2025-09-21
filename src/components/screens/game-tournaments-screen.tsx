import React, { useState } from 'react';
import {
  ArrowLeft, Trophy, Users, Clock, Target, MapPin,
  Wifi, WifiOff, Filter, Search, Calendar, DollarSign
} from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import { getGameBackground, getGameGradient } from '../utils/game-backgrounds';

interface GameTournamentsScreenProps {
  game: string;
  onBack: () => void;
  onTournamentSelect: (tournament: any) => void;
}

export function GameTournamentsScreen({ game, onBack, onTournamentSelect }: GameTournamentsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, online, offline

  // Mock tournament data for the selected game
  const tournaments = [
    {
      id: 1,
      title: `${game} Pro Championship`,
      game: game,
      type: "online",
      status: "open",
      maxTeams: 64,
      currentTeams: 45,
      entryFee: 500,
      prizePool: 50000,
      registrationDeadline: "2024-01-25T18:00:00",
      startTime: "2024-01-27T15:00:00",
      format: "Squad Elimination",
      organizer: "GameYo Pro",
      featured: true,
      rounds: 4
    },
    {
      id: 2,
      title: `${game} Weekly Arena`,
      game: game,
      type: "online",
      status: "open",
      maxTeams: 32,
      currentTeams: 28,
      entryFee: 200,
      prizePool: 15000,
      registrationDeadline: "2024-01-24T20:00:00",
      startTime: "2024-01-26T19:00:00",
      format: "Battle Royale",
      organizer: "Arena Masters",
      featured: false,
      rounds: 3
    },
    {
      id: 3,
      title: `${game} Elite Cup`,
      game: game,
      type: "offline",
      status: "full",
      maxTeams: 16,
      currentTeams: 16,
      entryFee: 1000,
      prizePool: 75000,
      registrationDeadline: "2024-01-23T18:00:00",
      startTime: "2024-01-25T10:00:00",
      format: "LAN Tournament",
      organizer: "Elite Gaming Hub",
      featured: true,
      location: "Mumbai Gaming Arena",
      rounds: 5
    },
    {
      id: 4,
      title: `${game} Beginners League`,
      game: game,
      type: "online",
      status: "upcoming",
      maxTeams: 128,
      currentTeams: 67,
      entryFee: 100,
      prizePool: 8000,
      registrationDeadline: "2024-01-28T18:00:00",
      startTime: "2024-01-30T16:00:00",
      format: "Elimination",
      organizer: "Newbie Gaming",
      featured: false,
      rounds: 6
    },
    {
      id: 5,
      title: `${game} City Championship`,
      game: game,
      type: "offline",
      status: "open",
      maxTeams: 24,
      currentTeams: 18,
      entryFee: 750,
      prizePool: 40000,
      registrationDeadline: "2024-01-26T18:00:00",
      startTime: "2024-01-28T14:00:00",
      format: "Local LAN",
      organizer: "City Gamers",
      featured: false,
      location: "Delhi Gaming Center",
      rounds: 4
    }
  ];

  const getTimeLeft = (deadline: string) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'full': return 'bg-red-500/20 text-red-400 border-red-400/30';
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.organizer.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'online') return tournament.type === 'online';
    if (filterType === 'offline') return tournament.type === 'offline';

    return true;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card/95 backdrop-blur-lg border-b border-border sticky top-0 z-40">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="font-bold">{game} Tournaments</h1>
              <p className="text-sm text-muted-foreground">
                {filteredTournaments.length} tournaments available
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'all', label: 'All', icon: null },
              { id: 'online', label: 'Online', icon: Wifi },
              { id: 'offline', label: 'Offline', icon: WifiOff }
            ].map((filter) => {
              const Icon = filter.icon;
              return (
                <Button
                  key={filter.id}
                  variant={filterType === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType(filter.id)}
                  className="whitespace-nowrap flex items-center gap-1"
                >
                  {Icon && <Icon size={14} />}
                  {filter.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tournaments List */}
      <div className="p-4 space-y-4">
        {filteredTournaments.map((tournament) => {
          const gameBackground = getGameBackground(tournament.game);
          const gameGradient = getGameGradient(tournament.game);
          const registrationProgress = (tournament.currentTeams / tournament.maxTeams) * 100;

          return (
            <Card
              key={tournament.id}
              className="glass-card overflow-hidden relative cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => onTournamentSelect(tournament)}
            >
              {/* Background */}
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
              <div className={`absolute inset-0 bg-gradient-to-br ${gameGradient}`} />

              <CardContent className="p-4 relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-foreground">{tournament.title}</h3>
                      {tournament.featured && (
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">
                          Featured
                        </Badge>
                      )}
                      <Badge className={getStatusColor(tournament.status)}>
                        {tournament.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1">
                        {tournament.type === 'online' ? <Wifi size={14} /> : <WifiOff size={14} />}
                        {tournament.type}
                      </span>
                      <Badge variant="outline" className="text-xs bg-background/50">
                        {tournament.format}
                      </Badge>
                      {tournament.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {tournament.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Prize Pool</p>
                    <p className="font-bold text-primary">₹{tournament.prizePool.toLocaleString()}</p>
                  </div>
                </div>

                {/* Registration Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Team Slots</span>
                    <span className="text-sm font-medium">
                      {tournament.currentTeams}/{tournament.maxTeams}
                    </span>
                  </div>
                  <Progress value={registrationProgress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Target size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Entry Fee</p>
                      <p className="text-sm font-medium">₹{tournament.entryFee}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Rounds</p>
                      <p className="text-sm font-medium">{tournament.rounds}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Registration Ends</p>
                      <p className="text-sm font-medium text-accent">
                        {getTimeLeft(tournament.registrationDeadline)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Starts</p>
                      <p className="text-sm font-medium">
                        {new Date(tournament.startTime).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/30">
                  <div className="text-sm text-muted-foreground">
                    By {tournament.organizer}
                  </div>
                  <Button
                    size="sm"
                    disabled={tournament.status === 'full'}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {tournament.status === 'full' ? 'Full' : 'View Details'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredTournaments.length === 0 && (
          <div className="text-center py-12">
            <Trophy size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">No tournaments found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}