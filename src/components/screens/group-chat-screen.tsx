import React, { useState } from 'react';
import { ArrowLeft, Send, Smile, Paperclip, MoreVertical, Users, Search, Hash, Phone, VideoIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';

interface GroupChatScreenProps {
  group: any;
  onBack: () => void;
}

export function GroupChatScreen({ group, onBack }: GroupChatScreenProps) {
  const [message, setMessage] = useState('');
  const [showMembers, setShowMembers] = useState(false);

  const messages = [
    {
      id: 1,
      user: "GameMaster Pro",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      message: "Anyone up for a squad match? Need 2 more players",
      timestamp: "2:30 PM",
      isOnline: true,
      type: "text"
    },
    {
      id: 2,
      user: "SnipeKing",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      message: "I'm in! What's the lobby code?",
      timestamp: "2:31 PM",
      isOnline: true,
      type: "text"
    },
    {
      id: 3,
      user: "EliteGamer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      message: "Room ID: 123456789",
      timestamp: "2:32 PM",
      isOnline: false,
      type: "text"
    },
    {
      id: 4,
      user: "ProShooter",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      message: "Joining now! Let's get that chicken dinner 🐔",
      timestamp: "2:33 PM",
      isOnline: true,
      type: "text"
    },
    {
      id: 5,
      user: "System",
      avatar: null,
      message: "EliteGamer created a new match room",
      timestamp: "2:35 PM",
      isOnline: false,
      type: "system"
    }
  ];

  const activeMembers = [
    {
      id: 1,
      name: "GameMaster Pro",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      role: "Admin",
      level: 28
    },
    {
      id: 2,
      name: "SnipeKing",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      role: "Moderator",
      level: 35
    },
    {
      id: 3,
      name: "EliteGamer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      role: "Member",
      level: 22
    },
    {
      id: 4,
      name: "ProShooter",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      role: "Member", 
      level: 41
    }
  ];

  const sendMessage = () => {
    if (message.trim()) {
      // Mock send message functionality
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  if (showMembers) {
    return (
      <div className="min-h-screen bg-background">
        {/* Members Header */}
        <div className="p-4 pt-6 border-b border-border bg-card">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" onClick={() => setShowMembers(false)}>
              <ArrowLeft size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Group Members</h1>
              <p className="text-sm text-muted-foreground">{group.members.toLocaleString()} members • {group.onlineMembers} online</p>
            </div>
          </div>

          {/* Search Members */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              className="pl-10 bg-muted/50 border-0 rounded-2xl"
            />
          </div>
        </div>

        {/* Members List */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {activeMembers.map((member) => (
              <Card key={member.id} className="border-0 bg-card/50 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {member.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      {member.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{member.name}</h3>
                        <Badge 
                          variant={member.role === 'Admin' ? 'default' : member.role === 'Moderator' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {member.role}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground text-sm">Level {member.level}</span>
                        {member.isOnline ? (
                          <span className="text-green-500 text-sm">Online</span>
                        ) : (
                          <span className="text-muted-foreground text-sm">Offline</span>
                        )}
                      </div>
                    </div>

                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Chat Header */}
      <div className="p-4 pt-6 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>

          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center text-lg">
              {group.icon}
            </div>
            <div className="flex-1">
              <h1 className="font-semibold text-lg">{group.name}</h1>
              <p className="text-sm text-muted-foreground">{group.onlineMembers} online</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
              <Phone size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
              <VideoIcon size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-10 h-10 rounded-full"
              onClick={() => setShowMembers(true)}
            >
              <Users size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.type === 'system' ? 'justify-center' : ''}`}>
              {msg.type === 'system' ? (
                <div className="bg-muted/50 px-3 py-2 rounded-full">
                  <p className="text-sm text-muted-foreground text-center">{msg.message}</p>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {msg.user.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {msg.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-card" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{msg.user}</span>
                      <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                    </div>
                    <div className="bg-muted/50 px-3 py-2 rounded-2xl rounded-tl-md">
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="p-3 border-t border-border bg-card/50">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button size="sm" variant="outline" className="rounded-full whitespace-nowrap">
            <Hash size={14} className="mr-1" />
            Start Match
          </Button>
          <Button size="sm" variant="outline" className="rounded-full whitespace-nowrap">
            🏆 Tournament
          </Button>
          <Button size="sm" variant="outline" className="rounded-full whitespace-nowrap">
            📊 Stats
          </Button>
          <Button size="sm" variant="outline" className="rounded-full whitespace-nowrap">
            🎮 Looking for Group
          </Button>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
            <Paperclip size={18} />
          </Button>

          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="pr-12 bg-muted/50 border-0 rounded-2xl"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full"
            >
              <Smile size={16} />
            </Button>
          </div>

          <Button 
            onClick={sendMessage}
            disabled={!message.trim()}
            className="w-10 h-10 rounded-full bg-primary text-primary-foreground"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}