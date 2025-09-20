import React, { useState } from 'react';
import { ArrowLeft, Send, Smile, Paperclip, MoreVertical, Phone, VideoIcon, Info } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';

interface FriendChatScreenProps {
  friend: any;
  onBack: () => void;
}

export function FriendChatScreen({ friend, onBack }: FriendChatScreenProps) {
  const [message, setMessage] = useState('');

  const messages = [
    {
      id: 1,
      sender: friend.name,
      message: "Hey! Want to squad up for some BGMI?",
      timestamp: "2:30 PM",
      isSent: false,
      type: "text"
    },
    {
      id: 2,
      sender: "You",
      message: "Sure! I'm free right now. What's the lobby code?",
      timestamp: "2:31 PM",
      isSent: true,
      type: "text"
    },
    {
      id: 3,
      sender: friend.name,
      message: "Room ID: 123456789. I'll invite two more players.",
      timestamp: "2:32 PM",
      isSent: false,
      type: "text"
    },
    {
      id: 4,
      sender: "You",
      message: "Perfect! Joining now 🎮",
      timestamp: "2:33 PM",
      isSent: true,
      type: "text"
    },
    {
      id: 5,
      sender: friend.name,
      message: "Great! Let's get that chicken dinner! 🏆",
      timestamp: "2:34 PM",
      isSent: false,
      type: "text"
    }
  ];

  const sendMessage = () => {
    if (message.trim()) {
      // Mock send message functionality
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Chat Header */}
      <div className="p-4 pt-6 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>

          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={friend.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {friend.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              {friend.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-card" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="font-semibold">{friend.name}</h1>
                {friend.isPremium && (
                  <Badge variant="secondary" className="text-xs">
                    PRO
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {friend.isOnline ? friend.status : friend.lastSeen}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
              <Phone size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
              <VideoIcon size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
              <Info size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.isSent ? 'justify-end' : ''}`}>
              {!msg.isSent && (
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {friend.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}

              <div className={`flex-1 max-w-xs ${msg.isSent ? 'flex justify-end' : ''}`}>
                <div className="space-y-1">
                  <div className={`px-4 py-2 rounded-2xl ${
                    msg.isSent 
                      ? 'bg-primary text-primary-foreground rounded-br-md' 
                      : 'bg-muted rounded-bl-md'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <p className={`text-xs text-muted-foreground ${msg.isSent ? 'text-right' : ''}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>

              {msg.isSent && (
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      You
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="p-3 border-t border-border bg-card/50">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button size="sm" variant="outline" className="rounded-full whitespace-nowrap">
            🎮 Invite to Game
          </Button>
          <Button size="sm" variant="outline" className="rounded-full whitespace-nowrap">
            🏆 Challenge
          </Button>
          <Button size="sm" variant="outline" className="rounded-full whitespace-nowrap">
            📊 Compare Stats
          </Button>
          <Button size="sm" variant="outline" className="rounded-full whitespace-nowrap">
            🎁 Send Gift
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