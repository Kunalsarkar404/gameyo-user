import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, Calendar, Users, Trophy, Navigation, Clock, Star } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface OfflineMatchScreenProps {
  onBack: () => void;
}

export function OfflineMatchScreen({ onBack }: OfflineMatchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');

  const nearbyMatches = [
    {
      id: 1,
      title: "Mumbai Gaming Championship",
      game: "BGMI",
      gameIcon: "🎮",
      venue: "Phoenix MarketCity",
      location: "Mumbai, Maharashtra",
      distance: "2.3 km",
      date: "Dec 25, 2024",
      time: "10:00 AM",
      entryFee: 500,
      prizePool: "₹1,00,000",
      participants: "32/64",
      maxParticipants: 64,
      organizer: "ESports Mumbai",
      difficulty: "Pro",
      mode: "Squad",
      featured: true,
      verified: true
    },
    {
      id: 2,
      title: "Delhi Free Fire Arena",
      game: "Free Fire",
      gameIcon: "⚡",
      venue: "Select City Walk",
      location: "Delhi, NCR",
      distance: "1.8 km",
      date: "Dec 28, 2024",
      time: "2:00 PM",
      entryFee: 300,
      prizePool: "₹75,000",
      participants: "28/48",
      maxParticipants: 48,
      organizer: "Delhi Gaming Hub",
      difficulty: "Advanced",
      mode: "Solo",
      featured: true,
      verified: true
    },
    {
      id: 3,
      title: "Bangalore COD Masters",
      game: "COD Mobile",
      gameIcon: "🔫",
      venue: "UB City Mall",
      location: "Bangalore, Karnataka",
      distance: "5.7 km",
      date: "Jan 2, 2025",
      time: "11:00 AM",
      entryFee: 400,
      prizePool: "₹80,000",
      participants: "18/32",
      maxParticipants: 32,
      organizer: "South Gaming League",
      difficulty: "Expert",
      mode: "Team",
      featured: true,
      verified: false
    }
  ];

  const upcomingEvents = [
    {
      id: 4,
      title: "Kolkata Gaming Fest",
      game: "BGMI",
      gameIcon: "🎮",
      venue: "Quest Mall",
      location: "Kolkata, West Bengal",
      distance: "12.5 km",
      date: "Jan 5, 2025",
      time: "9:00 AM",
      entryFee: 250,
      prizePool: "₹50,000",
      participants: "15/40",
      maxParticipants: 40,
      organizer: "East India Gaming",
      difficulty: "Intermediate",
      mode: "Duo"
    },
    {
      id: 5,
      title: "Chennai Mobile Championship",
      game: "Free Fire",
      gameIcon: "⚡",
      venue: "Express Avenue",
      location: "Chennai, Tamil Nadu",
      distance: "8.2 km",
      date: "Jan 8, 2025",
      time: "3:00 PM",
      entryFee: 200,
      prizePool: "₹40,000",
      participants: "22/50",
      maxParticipants: 50,
      organizer: "Tamil Gaming Association",
      difficulty: "Beginner",
      mode: "Squad"
    }
  ];

  const cityFilters = [
    { id: 'all', name: 'All Cities', icon: '🌍' },
    { id: 'mumbai', name: 'Mumbai', icon: '🏙️' },
    { id: 'delhi', name: 'Delhi', icon: '🏛️' },
    { id: 'bangalore', name: 'Bangalore', icon: '🌆' },
    { id: 'hyderabad', name: 'Hyderabad', icon: '🏗️' }
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
            <h1 className="text-2xl font-semibold">Offline Matches</h1>
            <p className="text-muted-foreground text-sm">Battle in person, win big prizes</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search venues, cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-muted/50 border-0 rounded-2xl"
          />
        </div>
      </div>

      <div className="p-4">
        {/* Location Permission Banner */}
        <Card className="mb-6 border-0 rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Navigation size={24} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Enable Location</h3>
                  <p className="text-sm text-muted-foreground">Find matches near you</p>
                </div>
              </div>
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6">
                Allow
              </Button>
            </div>
          </div>
        </Card>

        {/* City Filter Pills */}
        <div className="flex gap-2 overflow-x-auto mb-6 pb-2">
          {cityFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedCity === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCity(filter.id)}
              className="flex-shrink-0 rounded-full"
            >
              <span className="mr-2">{filter.icon}</span>
              {filter.name}
            </Button>
          ))}
        </div>

        <Tabs defaultValue="nearby" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          {/* Nearby Matches */}
          <TabsContent value="nearby" className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">📍 Near You</h2>
              <Button variant="ghost" size="sm">
                <MapPin size={16} className="mr-2" />
                Map View
              </Button>
            </div>

            <div className="space-y-4">
              {nearbyMatches.map((match) => (
                <Card key={match.id} className="border-0 bg-card/50 rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 p-1">
                    <div className="bg-card rounded-xl">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl">
                              {match.gameIcon}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{match.title}</h3>
                                {match.verified && (
                                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{match.game}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-primary">{match.prizePool}</div>
                            <div className="text-xs text-muted-foreground">Prize Pool</div>
                          </div>
                        </div>

                        {/* Location & Date */}
                        <div className="bg-muted/50 rounded-xl p-3 mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin size={16} className="text-primary" />
                            <div>
                              <p className="font-medium text-sm">{match.venue}</p>
                              <p className="text-xs text-muted-foreground">{match.location} • {match.distance} away</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-accent" />
                            <div>
                              <p className="font-medium text-sm">{match.date}</p>
                              <p className="text-xs text-muted-foreground">{match.time}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getDifficultyColor(match.difficulty)}`}
                          >
                            {match.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {match.mode}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            by {match.organizer}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="text-center">
                            <div className="text-sm font-semibold">₹{match.entryFee}</div>
                            <div className="text-xs text-muted-foreground">Entry Fee</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-semibold">{match.participants}</div>
                            <div className="text-xs text-muted-foreground">Registered</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-semibold flex items-center justify-center">
                              <Star size={14} className="mr-1 text-yellow-500" />
                              4.8
                            </div>
                            <div className="text-xs text-muted-foreground">Venue Rating</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Registration Progress</span>
                            <span>{getProgressPercentage(match.participants).toFixed(0)}% Full</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${getProgressPercentage(match.participants)}%` }}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Button variant="outline" className="rounded-xl">
                            <MapPin size={16} className="mr-2" />
                            Directions
                          </Button>
                          <Button className="bg-primary text-primary-foreground rounded-xl">
                            Register Now
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Upcoming Events */}
          <TabsContent value="upcoming" className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">🗓️ Coming Soon</h2>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((match) => (
                <Card key={match.id} className="border-0 bg-card/50 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl">
                        {match.gameIcon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{match.title}</h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getDifficultyColor(match.difficulty)}`}
                          >
                            {match.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{match.location}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {match.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={12} />
                            {match.participants}
                          </span>
                          <span className="flex items-center gap-1">
                            <Trophy size={12} />
                            {match.prizePool}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-semibold text-primary mb-1">₹{match.entryFee}</div>
                        <Button size="sm" variant="outline" className="rounded-full">
                          Notify Me
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Past Events */}
          <TabsContent value="past" className="space-y-4 mt-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center mb-4">
                <Trophy size={24} className="text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">No Past Events</h3>
              <p className="text-muted-foreground text-sm">
                Your match history will appear here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}