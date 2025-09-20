import React, { useState } from 'react';
import { ArrowLeft, Moon, Sun, Monitor, Bell, Shield, Globe, HelpCircle, Info, Trash2, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { useTheme } from '../theme-context';

interface SettingsScreenProps {
  onBack: () => void;
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    tournamentUpdates: true,
    friendRequests: true,
    matchResults: true,
    promotions: false,
    weeklyReports: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    showOnlineStatus: true,
    allowFriendRequests: true,
    showGameStats: true
  });

  const [gameSettings, setGameSettings] = useState({
    autoJoinMatches: false,
    soundEffects: true,
    hapticFeedback: true,
    backgroundRefresh: true
  });

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrivacyToggle = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGameSettingsToggle = (key: keyof typeof gameSettings) => {
    setGameSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="p-4 pt-6 border-b border-border">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="w-10 h-10 rounded-full">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-muted-foreground text-sm">Customize your gaming experience</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Theme Settings */}
        <Card className="border-0 bg-card/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              Appearance
            </CardTitle>
            <CardDescription>Choose your preferred theme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center">
                  <Sun size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">Light Mode</p>
                  <p className="text-sm text-muted-foreground">Premium teal, coral & gold colors</p>
                </div>
              </div>
              <Switch
                checked={theme === 'light'}
                onCheckedChange={() => theme === 'dark' && toggleTheme()}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Moon size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Neon cyan, magenta & green accents</p>
                </div>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={() => theme === 'light' && toggleTheme()}
              />
            </div>

            <div className="bg-muted/50 rounded-xl p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Monitor size={16} className="text-primary" />
                <p className="font-medium text-sm">Current Theme</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {theme === 'dark' 
                  ? 'You\'re using the dark gaming theme with neon accents - perfect for late-night gaming sessions!' 
                  : 'You\'re using the light premium theme with elegant colors - great for daytime gaming!'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-0 bg-card/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} />
              Notifications
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
              </div>
              <Switch
                id="push-notifications"
                checked={notifications.pushNotifications}
                onCheckedChange={() => handleNotificationToggle('pushNotifications')}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="tournament-updates">Tournament Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified about tournament results and updates</p>
              </div>
              <Switch
                id="tournament-updates"
                checked={notifications.tournamentUpdates}
                onCheckedChange={() => handleNotificationToggle('tournamentUpdates')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="friend-requests">Friend Requests</Label>
                <p className="text-sm text-muted-foreground">Notifications when someone sends you a friend request</p>
              </div>
              <Switch
                id="friend-requests"
                checked={notifications.friendRequests}
                onCheckedChange={() => handleNotificationToggle('friendRequests')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="match-results">Match Results</Label>
                <p className="text-sm text-muted-foreground">Get notified about your match results</p>
              </div>
              <Switch
                id="match-results"
                checked={notifications.matchResults}
                onCheckedChange={() => handleNotificationToggle('matchResults')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="promotions">Promotions</Label>
                <p className="text-sm text-muted-foreground">Receive notifications about special offers</p>
              </div>
              <Switch
                id="promotions"
                checked={notifications.promotions}
                onCheckedChange={() => handleNotificationToggle('promotions')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weekly-reports">Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Get weekly summaries of your gaming activity</p>
              </div>
              <Switch
                id="weekly-reports"
                checked={notifications.weeklyReports}
                onCheckedChange={() => handleNotificationToggle('weeklyReports')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="border-0 bg-card/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={20} />
              Privacy & Security
            </CardTitle>
            <CardDescription>Control your privacy and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profile-visibility">Public Profile</Label>
                <p className="text-sm text-muted-foreground">Allow others to view your profile</p>
              </div>
              <Switch
                id="profile-visibility"
                checked={privacy.profileVisibility}
                onCheckedChange={() => handlePrivacyToggle('profileVisibility')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="online-status">Show Online Status</Label>
                <p className="text-sm text-muted-foreground">Let friends see when you're online</p>
              </div>
              <Switch
                id="online-status"
                checked={privacy.showOnlineStatus}
                onCheckedChange={() => handlePrivacyToggle('showOnlineStatus')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="friend-requests-privacy">Allow Friend Requests</Label>
                <p className="text-sm text-muted-foreground">Allow anyone to send you friend requests</p>
              </div>
              <Switch
                id="friend-requests-privacy"
                checked={privacy.allowFriendRequests}
                onCheckedChange={() => handlePrivacyToggle('allowFriendRequests')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="game-stats">Show Game Stats</Label>
                <p className="text-sm text-muted-foreground">Display your game statistics publicly</p>
              </div>
              <Switch
                id="game-stats"
                checked={privacy.showGameStats}
                onCheckedChange={() => handlePrivacyToggle('showGameStats')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Game Settings */}
        <Card className="border-0 bg-card/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe size={20} />
              Game Settings
            </CardTitle>
            <CardDescription>Customize your gaming experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-join">Auto-join Matches</Label>
                <p className="text-sm text-muted-foreground">Automatically join quick matches when available</p>
              </div>
              <Switch
                id="auto-join"
                checked={gameSettings.autoJoinMatches}
                onCheckedChange={() => handleGameSettingsToggle('autoJoinMatches')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sound-effects">Sound Effects</Label>
                <p className="text-sm text-muted-foreground">Play sound effects for app interactions</p>
              </div>
              <Switch
                id="sound-effects"
                checked={gameSettings.soundEffects}
                onCheckedChange={() => handleGameSettingsToggle('soundEffects')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="haptic-feedback">Haptic Feedback</Label>
                <p className="text-sm text-muted-foreground">Vibrate on button taps and notifications</p>
              </div>
              <Switch
                id="haptic-feedback"
                checked={gameSettings.hapticFeedback}
                onCheckedChange={() => handleGameSettingsToggle('hapticFeedback')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="background-refresh">Background Refresh</Label>
                <p className="text-sm text-muted-foreground">Update tournaments and matches in background</p>
              </div>
              <Switch
                id="background-refresh"
                checked={gameSettings.backgroundRefresh}
                onCheckedChange={() => handleGameSettingsToggle('backgroundRefresh')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Support & Information */}
        <Card className="border-0 bg-card/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle size={20} />
              Support & Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <HelpCircle size={18} />
              Help Center
            </Button>

            <Button variant="ghost" className="w-full justify-start gap-3">
              <Info size={18} />
              About Gameyo
              <Badge variant="outline" className="ml-auto text-xs">
                v2.1.0
              </Badge>
            </Button>

            <Button variant="ghost" className="w-full justify-start gap-3">
              <Download size={18} />
              Export Data
            </Button>

            <Separator className="my-2" />

            <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-500/10">
              <Trash2 size={18} />
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Data Usage Info */}
        <Card className="border-0 bg-primary/5 border-primary/20 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Shield size={16} className="text-primary" />
              <p className="font-medium text-sm">Privacy Notice</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Gameyo respects your privacy. We only collect necessary data to improve your gaming experience. 
              Your personal information is never shared with third parties without your consent.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}