import React, { useState } from 'react';
import { Search, MessageCircle, Users, UserPlus, Gamepad2, Hash, User, Settings, Crown, Check, X } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AddFriendsScreen } from './add-friends-screen';
import { GroupChatScreen } from './group-chat-screen';
import { FriendChatScreen } from './friend-chat-screen';

export function FriendsScreen() {
  const [activeTab, setActiveTab] = useState('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddFriends, setShowAddFriends] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const friends = [
    {
      id: 1,
      name: "GameMaster Pro",
      username: "@gamemaster",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      level: 28,
      currentGame: "BGMI",
      isPremium: false,
      lastSeen: null,
      status: "In Match"
    },
    {
      id: 2,
      name: "SnipeKing",
      username: "@snipeking",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      level: 35,
      currentGame: "Free Fire",
      isPremium: true,
      lastSeen: null,
      status: "Online"
    },
    {
      id: 3,
      name: "EliteGamer",
      username: "@elitegamer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      level: 22,
      currentGame: null,
      isPremium: false,
      lastSeen: "2 hours ago",
      status: "Offline"
    },
    {
      id: 4,
      name: "ProShooter",
      username: "@proshooter",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      level: 41,
      currentGame: "COD Mobile",
      isPremium: true,
      lastSeen: null,
      status: "In Lobby"
    }
  ];

  const friendRequests = [
    {
      id: 1,
      name: "NewGamer123",
      username: "@newgamer123",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      level: 15,
      mutualFriends: 3,
      requestTime: "2 hours ago",
      isPremium: false
    },
    {
      id: 2,
      name: "SkillMaster",
      username: "@skillmaster",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      level: 32,
      mutualFriends: 7,
      requestTime: "1 day ago",
      isPremium: true
    }
  ];

  const gameGroups = [
    {
      id: 1,
      name: "BGMI Squad Masters",
      game: "BGMI",
      description: "Elite BGMI players looking for squad mates and scrimmages",
      members: 1247,
      onlineMembers: 342,
      category: "Battle Royale",
      icon: "🔫",
      isJoined: true,
      lastActivity: "2 min ago",
      level: "Advanced",
      tags: ["Squad", "Competitive", "Scrims"]
    },
    {
      id: 2,
      name: "Free Fire Legends",
      game: "Free Fire",
      description: "Join the ultimate Free Fire community for ranked matches",
      members: 2156,
      onlineMembers: 523,
      category: "Battle Royale",
      icon: "🔥",
      isJoined: false,
      lastActivity: "5 min ago",
      level: "All Levels",
      tags: ["Ranked", "Events", "Tournaments"]
    },
    {
      id: 3,
      name: "COD Mobile Warriors",
      game: "Call of Duty Mobile",
      description: "Hardcore COD Mobile players for MP and BR matches",
      members: 892,
      onlineMembers: 178,
      category: "FPS",
      icon: "💀",
      isJoined: true,
      lastActivity: "1 min ago",
      level: "Intermediate",
      tags: ["Multiplayer", "BR", "Ranked"]
    },
    {
      id: 4,
      name: "Clash Royale Arena",
      game: "Clash Royale",
      description: "Strategic players unite! Deck sharing and friendly battles",
      members: 634,
      onlineMembers: 89,
      category: "Strategy",
      icon: "👑",
      isJoined: false,
      lastActivity: "10 min ago",
      level: "All Levels",
      tags: ["Strategy", "Decks", "Friendly"]
    },
    {
      id: 5,
      name: "Brawl Stars Brawlers",
      game: "Brawl Stars",
      description: "Fast-paced action with fellow brawlers, events and tips",
      members: 756,
      onlineMembers: 134,
      category: "MOBA",
      icon: "⭐",
      isJoined: false,
      lastActivity: "3 min ago",
      level: "Beginner",
      tags: ["Events", "Tips", "Team"]
    },
    {
      id: 6,
      name: "VALORANT Mobile Squad",
      game: "VALORANT Mobile",
      description: "Tactical FPS enthusiasts preparing for VALORANT Mobile",
      members: 423,
      onlineMembers: 67,
      category: "FPS",
      icon: "🎯",
      isJoined: true,
      lastActivity: "15 min ago",
      level: "Advanced",
      tags: ["Tactical", "Competitive", "Beta"]
    }
  ];

  const getFilteredFriends = () => {
    return friends.filter(friend =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getOnlineFriends = () => {
    return friends.filter(friend => friend.isOnline);
  };

  const getFilteredGroups = () => {
    return gameGroups.filter(group =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getMyGroups = () => {
    return gameGroups.filter(group => group.isJoined);
  };

  const tabs = [
    { id: 'friends', label: 'Friends', count: friends.length },
    { id: 'online', label: 'Online', count: getOnlineFriends().length },
    { id: 'groups', label: 'Groups', count: getMyGroups().length },
    { id: 'requests', label: 'Requests', count: friendRequests.length }
  ];

  const joinGroup = (groupId) => {
    // Mock join functionality
    console.log('Joining group:', groupId);
  };

  const leaveGroup = (groupId) => {
    // Mock leave functionality  
    console.log('Leaving group:', groupId);
  };

  const acceptFriendRequest = (requestId) => {
    // Mock accept friend request
    console.log('Accepting friend request:', requestId);
  };

  const declineFriendRequest = (requestId) => {
    // Mock decline friend request
    console.log('Declining friend request:', requestId);
  };

  const startChat = (friend) => {
    setSelectedFriend(friend);
  };

  if (showAddFriends) {
    return <AddFriendsScreen onBack={() => setShowAddFriends(false)} />;
  }

  if (selectedGroup) {
    return <GroupChatScreen group={selectedGroup} onBack={() => setSelectedGroup(null)} />;
  }

  if (selectedFriend) {
    return <FriendChatScreen friend={selectedFriend} onBack={() => setSelectedFriend(null)} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Add Friends Button */}
      <div className="p-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Friends & Groups</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowAddFriends(true)}
            className="w-10 h-10 rounded-full"
          >
            <UserPlus size={20} />
          </Button>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={activeTab === 'groups' ? 'Search game groups...' : 'Search friends...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-muted/50 border-0 rounded-2xl"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-4 mb-6">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4">
        {/* Friends Tab Content */}
        {activeTab === 'friends' && (
          <>
            {/* Add Friends Card */}
            <Card className="mb-6 border-0 rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-primary via-accent to-primary/80 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">Find New Friends</h3>
                    <p className="text-white/90 text-sm">Connect with other gamers</p>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-full px-6"
                    onClick={() => setShowAddFriends(true)}
                  >
                    <UserPlus size={16} className="mr-2" />
                    Add Friends
                  </Button>
                </div>
              </div>
            </Card>

            {/* Friends List */}
            <div className="space-y-3">
              {getFilteredFriends().map((friend) => (
                <Card key={friend.id} className="border-0 bg-card/50 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar with Online Status */}
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={friend.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {friend.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        {friend.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                        )}
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{friend.name}</h3>
                          {friend.isPremium && (
                            <Crown size={16} className="text-yellow-500" />
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">{friend.username}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-muted-foreground text-xs">Lvl {friend.level}</span>
                          {friend.currentGame && (
                            <Badge 
                              variant="outline" 
                              className="text-xs border-green-500 text-green-500 bg-green-500/10"
                            >
                              {friend.currentGame}
                            </Badge>
                          )}
                          <span className="text-muted-foreground text-xs">{friend.status}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-10 h-10 rounded-full"
                          onClick={() => startChat(friend)}
                        >
                          <MessageCircle size={18} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Online Friends Tab Content */}
        {activeTab === 'online' && (
          <div className="space-y-3">
            {getOnlineFriends().map((friend) => (
              <Card key={friend.id} className="border-0 bg-card/50 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {friend.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{friend.name}</h3>
                        {friend.isPremium && (
                          <Crown size={16} className="text-yellow-500" />
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">{friend.username}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-muted-foreground text-xs">Lvl {friend.level}</span>
                        {friend.currentGame && (
                          <Badge 
                            variant="outline" 
                            className="text-xs border-green-500 text-green-500 bg-green-500/10"
                          >
                            {friend.currentGame}
                          </Badge>
                        )}
                        <span className="text-green-500 text-xs">{friend.status}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-10 h-10 rounded-full"
                        onClick={() => startChat(friend)}
                      >
                        <MessageCircle size={18} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Friend Requests Tab Content */}
        {activeTab === 'requests' && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">PENDING REQUESTS</h3>
            {friendRequests.map((request) => (
              <Card key={request.id} className="border-0 bg-card/50 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={request.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {request.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{request.name}</h3>
                        {request.isPremium && (
                          <Crown size={16} className="text-yellow-500" />
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">{request.username}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-muted-foreground text-xs">Lvl {request.level}</span>
                        <span className="text-muted-foreground text-xs">
                          {request.mutualFriends} mutual friends
                        </span>
                        <span className="text-muted-foreground text-xs">{request.requestTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-10 h-10 rounded-full p-0"
                        onClick={() => declineFriendRequest(request.id)}
                      >
                        <X size={16} />
                      </Button>
                      <Button 
                        size="sm" 
                        className="w-10 h-10 rounded-full p-0 bg-primary text-primary-foreground"
                        onClick={() => acceptFriendRequest(request.id)}
                      >
                        <Check size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {friendRequests.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center mb-4">
                  <Users size={24} className="text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No Friend Requests</h3>
                <p className="text-muted-foreground text-sm">
                  You don't have any pending friend requests right now.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Groups Tab Content */}
        {activeTab === 'groups' && (
          <>
            {/* Create Group Card */}
            <Card className="mb-6 border-0 rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-primary via-accent to-primary/80 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">Create Your Group</h3>
                    <p className="text-white/90 text-sm">Start your own gaming community</p>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-full px-6"
                  >
                    <UserPlus size={16} className="mr-2" />
                    Create
                  </Button>
                </div>
              </div>
            </Card>

            {/* Game Groups List */}
            <div className="space-y-4">
              {getMyGroups().map((group) => (
            <Card key={group.id} className="border-0 bg-card/50 rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Group Icon */}
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center text-2xl">
                        {group.icon}
                      </div>
                      {group.isJoined && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <User size={12} className="text-white" />
                        </div>
                      )}
                    </div>

                    {/* Group Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg mb-1">{group.name}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{group.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {group.level}
                        </Badge>
                      </div>

                      {/* Group Stats */}
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Users size={14} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {group.members.toLocaleString()} members
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-sm text-muted-foreground">
                            {group.onlineMembers} online
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {group.lastActivity}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex items-center gap-2 mb-3">
                        {group.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-border">
                    {group.isJoined ? (
                      <>
                        <Button 
                          className="flex-1 bg-primary text-primary-foreground rounded-2xl"
                          onClick={() => setSelectedGroup(group)}
                        >
                          <MessageCircle size={16} className="mr-2" />
                          Open Chat
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="w-10 h-10 rounded-full"
                          onClick={() => leaveGroup(group.id)}
                        >
                          <Settings size={16} />
                        </Button>
                      </>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="flex-1 rounded-2xl"
                        onClick={() => joinGroup(group.id)}
                      >
                        <UserPlus size={16} className="mr-2" />
                        Join Group
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
              ))}
            </div>

            {/* Empty State for Groups */}
            {getMyGroups().length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center mb-4">
                  <Gamepad2 size={24} className="text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No Groups Joined</h3>
                <p className="text-muted-foreground text-sm">
                  Join some game groups to connect with other players!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}