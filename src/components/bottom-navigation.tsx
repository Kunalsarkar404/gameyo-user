import React from 'react';
import { Home, Trophy, Users, User, Swords } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {

  const tabs = [
    { id: 'home', icon: Home },
    { id: 'matches', icon: Swords },
    { id: 'tournaments', icon: Trophy },
    { id: 'friends', icon: Users },
    { id: 'profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center justify-center p-3 transition-all duration-200 ${
                tab.id === 'tournaments' 
                  ? `${isActive ? 'text-primary scale-125' : 'text-muted-foreground hover:text-foreground'} ${isActive ? 'bg-primary/10 rounded-full' : ''}` 
                  : isActive 
                    ? 'text-primary scale-110' 
                    : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className={`relative ${isActive ? 'neon-glow' : ''}`}>
                <Icon size={tab.id === 'tournaments' ? 26 : 22} className={isActive ? 'drop-shadow-lg' : ''} />
                {isActive && (
                  <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm -z-10" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}