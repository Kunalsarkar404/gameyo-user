import React, { useState } from 'react';
import { Search, ArrowLeft, UserPlus, QrCode, Scan, Phone, Copy, Users, Gamepad2, Hash, Settings, Crown } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface AddFriendsScreenProps {
  onBack: () => void;
}

export function AddFriendsScreen({ onBack }: AddFriendsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('search');
  const [groupName, setGroupName] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  const games = [
    { id: 'bgmi', name: 'BGMI', icon: '🔫' },
    { id: 'freefire', name: 'Free Fire', icon: '🔥' },
    { id: 'codm', name: 'Call of Duty Mobile', icon: '💀' },
    { id: 'clash-royale', name: 'Clash Royale', icon: '👑' },
    { id: 'brawl-stars', name: 'Brawl Stars', icon: '⭐' },
    { id: 'valorant', name: 'VALORANT Mobile', icon: '🎯' }
  ];

  const suggestions = [
    {
      id: 1,
      name: "ProGamer123",
      username: "@progamer123",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 12,
      reason: "Plays similar games",
      isOnline: true
    },
    {
      id: 2,
      name: "GamingQueen",
      username: "@gamingqueen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b5b07d60?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 8,
      reason: "From your contacts",
      isOnline: false
    },
    {
      id: 3,
      name: "ElitePlayer",
      username: "@eliteplayer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 15,
      reason: "Top player in your region",
      isOnline: true
    },
    {
      id: 4,
      name: "SkillMaster",
      username: "@skillmaster",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 6,
      reason: "Recently joined",
      isOnline: true
    }
  ];

  const searchResults = [
    {
      id: 5,
      name: "GameLord99",
      username: "@gamelord99",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      level: 42,
      isVerified: true,
      isOnline: false
    },
    {
      id: 6,
      name: "NinjaGamer",
      username: "@ninjagamer",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      level: 38,
      isVerified: false,
      isOnline: true
    }
  ];

  const contacts = [
    {
      id: 7,
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
      isOnGameyo: false
    },
    {
      id: 8,
      name: "Priya Singh",
      phone: "+91 98765 43211",
      isOnGameyo: true,
      username: "@priyasingh"
    },
    {
      id: 9,
      name: "Amit Kumar",
      phone: "+91 98765 43212",
      isOnGameyo: false
    }
  ];

  const myGameyoId = "GAMEYO123456";

  const handleCopyId = () => {
    navigator.clipboard.writeText(myGameyoId);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="p-4 pt-6 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="w-10 h-10 rounded-full">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold">Create & Discover</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="create">Create Group</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="invite">Invite Friends</TabsTrigger>
          </TabsList>

          {/* Search Friends Tab */}
          <TabsContent value="search" className="space-y-4 mt-6">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by username or Gameyo ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-muted/50 border-0 rounded-2xl"
              />
            </div>

            {searchQuery && (
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">SEARCH RESULTS</h3>
                {searchResults.map((user) => (
                  <Card key={user.id} className="border-0 bg-card/50 rounded-2xl">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {user.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          {user.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{user.name}</h3>
                            {user.isVerified && (
                              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full" />
                              </div>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">{user.username}</p>
                          <span className="text-muted-foreground text-xs">Lvl {user.level}</span>
                        </div>

                        <Button size="sm" className="bg-primary text-primary-foreground rounded-full px-6">
                          <UserPlus size={16} className="mr-2" />
                          Add Friend
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!searchQuery && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center mb-4">
                  <Search size={24} className="text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Find Friends</h3>
                <p className="text-muted-foreground text-sm">
                  Search for friends by their username or Gameyo ID
                </p>
              </div>
            )}

            {/* People You May Know */}
            <div className="mt-8">
              <h3 className="font-semibold text-sm text-muted-foreground mb-4">PEOPLE YOU MAY KNOW</h3>
              <div className="space-y-3">
                {suggestions.map((user) => (
                  <Card key={user.id} className="border-0 bg-card/50 rounded-2xl">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {user.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          {user.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{user.name}</h3>
                          <p className="text-muted-foreground text-sm">{user.username}</p>
                          <p className="text-muted-foreground text-xs">
                            {user.mutualFriends} mutual friends • {user.reason}
                          </p>
                        </div>

                        <Button size="sm" className="bg-primary text-primary-foreground rounded-full px-6">
                          <UserPlus size={16} className="mr-2" />
                          Add Friend
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Create Group Tab */}
          <TabsContent value="create" className="space-y-6 mt-6">
            <Card className="border-0 bg-card/50 rounded-3xl">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-4">
                    <Gamepad2 size={32} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Create Your Gaming Group</h3>
                  <p className="text-muted-foreground text-sm">
                    Start your own community for your favorite game
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Group Name</label>
                    <Input
                      placeholder="e.g., BGMI Champions League"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      className="bg-muted/50 border-0 rounded-2xl"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Game</label>
                    <div className="grid grid-cols-2 gap-3">
                      {games.map((game) => (
                        <button
                          key={game.id}
                          onClick={() => setSelectedGame(game.id)}
                          className={`p-3 rounded-2xl border transition-all duration-200 ${
                            selectedGame === game.id
                              ? 'border-primary bg-primary/10'
                              : 'border-border bg-muted/50 hover:bg-muted'
                          }`}
                        >
                          <div className="text-2xl mb-1">{game.icon}</div>
                          <div className="font-medium text-sm">{game.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description (Optional)</label>
                    <textarea
                      placeholder="Describe your group's purpose and rules..."
                      value={groupDescription}
                      onChange={(e) => setGroupDescription(e.target.value)}
                      rows={3}
                      className="w-full p-3 bg-muted/50 border-0 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <Button 
                    className="w-full h-12 bg-primary text-primary-foreground rounded-2xl"
                    disabled={!groupName || !selectedGame}
                  >
                    <Users size={18} className="mr-2" />
                    Create Group
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-4 mt-6">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Discover gaming groups and communities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-muted/50 border-0 rounded-2xl"
              />
            </div>

            {searchQuery && (
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">TRENDING GROUPS</h3>
                {searchResults.map((user) => (
                  <Card key={user.id} className="border-0 bg-card/50 rounded-2xl">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {user.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          {user.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{user.name}</h3>
                            {user.isVerified && (
                              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full" />
                              </div>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">{user.username}</p>
                          <span className="text-muted-foreground text-xs">Lvl {user.level}</span>
                        </div>

                        <Button size="sm" className="bg-primary text-primary-foreground rounded-full px-6">
                          <UserPlus size={16} className="mr-2" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!searchQuery && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center mb-4">
                  <Search size={24} className="text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Discover Communities</h3>
                <p className="text-muted-foreground text-sm">
                  Search for gaming groups and communities to join
                </p>
              </div>
            )}
          </TabsContent>

          {/* Invite Friends Tab */}
          <TabsContent value="invite" className="space-y-4 mt-6">
            {/* QR Code Section */}
            <div className="text-center mb-6">
              <div className="w-48 h-48 mx-auto bg-white rounded-3xl p-6 mb-6">
                <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                  <QrCode size={120} className="text-white" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">My Gameyo QR</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Let others scan this code to add you as a friend
              </p>

              {/* Gameyo ID */}
              <Card className="border-0 bg-card/50 rounded-2xl mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Your Gameyo ID</p>
                      <p className="font-semibold">{myGameyoId}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleCopyId}>
                      <Copy size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full bg-primary text-primary-foreground h-12 rounded-2xl mb-6">
                <Scan size={20} className="mr-2" />
                Scan QR Code
              </Button>
            </div>

            <h3 className="font-semibold text-sm text-muted-foreground">YOUR CONTACTS</h3>
            <div className="flex items-center justify-between mb-4">
              <span></span>
              <Button variant="ghost" size="sm" className="text-primary">
                <Phone size={16} className="mr-2" />
                Sync Contacts
              </Button>
            </div>
            
            <div className="space-y-3">
              {contacts.map((contact) => (
                <Card key={contact.id} className="border-0 bg-card/50 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {contact.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">{contact.name}</h3>
                          {contact.isOnGameyo ? (
                            <p className="text-muted-foreground text-sm">{contact.username}</p>
                          ) : (
                            <p className="text-muted-foreground text-sm">{contact.phone}</p>
                          )}
                        </div>
                      </div>

                      {contact.isOnGameyo ? (
                        <Button size="sm" className="bg-primary text-primary-foreground rounded-full px-6">
                          <UserPlus size={16} className="mr-2" />
                          Add
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="rounded-full px-6">
                          Invite
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Invite Banner */}
            <Card className="mb-6 border-0 rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-primary via-accent to-primary/80 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">Invite More Friends</h3>
                    <p className="text-white/90 text-sm">Get ₹100 for each friend who joins</p>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-full px-6"
                  >
                    <Users size={16} className="mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* QR Code Tab */}
          <TabsContent value="qr" className="space-y-6 mt-6">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto bg-white rounded-3xl p-6 mb-6">
                <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                  <QrCode size={120} className="text-white" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">My Gameyo QR</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Let others scan this code to add you as a friend
              </p>

              {/* Gameyo ID */}
              <Card className="border-0 bg-card/50 rounded-2xl mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Your Gameyo ID</p>
                      <p className="font-semibold">{myGameyoId}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleCopyId}>
                      <Copy size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full bg-primary text-primary-foreground h-12 rounded-2xl">
                <Scan size={20} className="mr-2" />
                Scan QR Code
              </Button>
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-muted-foreground">YOUR CONTACTS</h3>
              <Button variant="ghost" size="sm" className="text-primary">
                <Phone size={16} className="mr-2" />
                Sync Contacts
              </Button>
            </div>

            <div className="space-y-3">
              {contacts.map((contact) => (
                <Card key={contact.id} className="border-0 bg-card/50 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {contact.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">{contact.name}</h3>
                          {contact.isOnGameyo ? (
                            <p className="text-muted-foreground text-sm">{contact.username}</p>
                          ) : (
                            <p className="text-muted-foreground text-sm">{contact.phone}</p>
                          )}
                        </div>
                      </div>

                      {contact.isOnGameyo ? (
                        <Button size="sm" className="bg-primary text-primary-foreground rounded-full px-6">
                          <UserPlus size={16} className="mr-2" />
                          Add
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="rounded-full px-6">
                          Invite
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Invite Banner */}
            <Card className="mb-6 border-0 rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-primary via-accent to-primary/80 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">Invite More Friends</h3>
                    <p className="text-white/90 text-sm">Get ₹100 for each friend who joins</p>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-full px-6"
                  >
                    <Users size={16} className="mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}