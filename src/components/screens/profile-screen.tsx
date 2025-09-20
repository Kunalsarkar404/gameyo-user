import React, { useState } from 'react';
import { Edit, Settings, Award, FileText, HelpCircle, LogOut, Camera, User, Mail, Phone, Calendar, Shield, Star, Wallet, Plus, Minus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

interface ProfileScreenProps {
  onSettings?: () => void;
}

export function ProfileScreen({ onSettings }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showKYC, setShowKYC] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    username: "@johndoe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    dateOfBirth: "1995-06-15",
    avatar: null
  });

  const userStats = {
    gamesPlayed: 234,
    winRate: 68,
    totalEarnings: 12450,
    rank: "Diamond",
    level: 15
  };

  const achievements = [
    // { id: 1, title: "First Win", description: "Won your first tournament", icon: "🏆", unlocked: true },
    // { id: 2, title: "Winning Streak", description: "Won 5 games in a row", icon: "🔥", unlocked: true },
    // { id: 3, title: "Big Winner", description: "Won a tournament with ₹5000+ prize", icon: "💰", unlocked: true },
    // { id: 4, title: "Social Butterfly", description: "Added 10 friends", icon: "👥", unlocked: false },
    // { id: 5, title: "Dedication", description: "Played 100 games", icon: "🎮", unlocked: true },
    // { id: 6, title: "Marksman", description: "Achieved 80%+ win rate", icon: "🎯", unlocked: false }
  ];

  const kycStatus = {
    status: "pending", // pending, approved, rejected
    documents: {
      drivingLicense: null,
      voterID: null
    }
  };

  const walletBalance = 1247;

  if (showWallet) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={() => setShowWallet(false)}>
              <User size={20} />
            </Button>
            <h1 className="text-2xl font-bold">Wallet</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Wallet Balance */}
          <Card className="glass-card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">Total Balance</p>
                <p className="text-4xl font-bold">₹{walletBalance.toLocaleString()}</p>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-primary text-primary-foreground">
                  <Plus size={16} className="mr-2" />
                  Add Money
                </Button>
                <Button variant="outline" className="flex-1">
                  <Minus size={16} className="mr-2" />
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Plus size={16} className="text-blue-500" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Add Money</p>
                  <p className="text-xs text-muted-foreground">UPI, Cards, Net Banking</p>
                </div>
              </Button>

              <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                  <Minus size={16} className="text-green-500" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Withdraw Money</p>
                  <p className="text-xs text-muted-foreground">To bank account or UPI</p>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Plus size={16} className="text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Tournament Win</p>
                    <p className="text-xs text-muted-foreground">BGMI Championship</p>
                  </div>
                </div>
                <p className="font-bold text-green-500">+₹500</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center">
                    <Minus size={16} className="text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Tournament Entry</p>
                    <p className="text-xs text-muted-foreground">Free Fire Battle</p>
                  </div>
                </div>
                <p className="font-bold text-red-500">-₹50</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <Plus size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Wallet Deposit</p>
                    <p className="text-xs text-muted-foreground">UPI Payment</p>
                  </div>
                </div>
                <p className="font-bold text-blue-500">+₹1,000</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showKYC) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={() => setShowKYC(false)}>
              <User size={20} />
            </Button>
            <h1 className="text-2xl font-bold">KYC Verification</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* KYC Status */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} />
                Verification Status
              </CardTitle>
              <CardDescription>
                Complete KYC to unlock higher withdrawal limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  kycStatus.status === 'approved' ? 'bg-green-500' :
                  kycStatus.status === 'pending' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} />
                <span className="capitalize font-medium">{kycStatus.status}</span>
                <Badge variant="outline" className={
                  kycStatus.status === 'approved' ? 'text-green-600 border-green-600/20' :
                  kycStatus.status === 'pending' ? 'text-yellow-600 border-yellow-600/20' :
                  'text-red-600 border-red-600/20'
                }>
                  {kycStatus.status === 'approved' ? 'Verified' :
                   kycStatus.status === 'pending' ? 'Under Review' :
                   'Rejected'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                Please upload any one of the following documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Driving License</Label>
                <div className="border border-dashed border-border rounded-lg p-6 text-center">
                  <FileText size={32} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload or drag and drop
                  </p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Voter ID</Label>
                <div className="border border-dashed border-border rounded-lg p-6 text-center">
                  <FileText size={32} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload or drag and drop
                  </p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
              </div>

              <Button className="w-full bg-primary text-primary-foreground">
                Submit for Verification
              </Button>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>KYC Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">Withdraw up to ₹1,00,000 per day</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">Priority customer support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">Faster withdrawal processing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">Access to premium tournaments</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditing(false)} className="bg-primary text-primary-foreground">
                Save
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Profile Picture */}
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profileData.avatar || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                >
                  <Camera size={16} />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Click the camera icon to change your profile picture
              </p>
            </CardContent>
          </Card>

          {/* Profile Information */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button variant="ghost" size="icon" onClick={onSettings}>
            <Settings size={20} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Card */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={profileData.avatar || undefined} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{profileData.name}</h2>
                <p className="text-muted-foreground">{profileData.username}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-primary/10 text-primary">
                    Level {userStats.level}
                  </Badge>
                  <Badge variant="outline">
                    {userStats.rank}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit size={16} className="mr-1" />
                Edit
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{userStats.gamesPlayed}</p>
                <p className="text-sm text-muted-foreground">Games</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{userStats.winRate}%</p>
                <p className="text-sm text-muted-foreground">Win Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">₹{userStats.totalEarnings.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Balance Card */}
        <Card className="glass-card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Wallet Balance</p>
                <p className="text-2xl font-bold">₹{walletBalance.toLocaleString()}</p>
              </div>
              <Button 
                size="sm" 
                className="bg-primary text-primary-foreground"
                onClick={() => setShowWallet(true)}
              >
                <Wallet size={16} className="mr-2" />
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award size={20} />
              Achievements
            </CardTitle>
            <CardDescription>Your gaming milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg border ${
                    achievement.unlocked
                      ? 'bg-primary/5 border-primary/20'
                      : 'bg-muted/5 border-muted'
                  }`}
                >
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <h4 className={`font-medium text-sm ${
                    achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => setShowKYC(true)}
            >
              <Shield size={18} />
              KYC Verification
              <Badge
                variant="outline"
                className={`ml-auto text-xs ${
                  kycStatus.status === 'approved' ? 'text-green-600 border-green-600/20' :
                  kycStatus.status === 'pending' ? 'text-yellow-600 border-yellow-600/20' :
                  'text-red-600 border-red-600/20'
                }`}
              >
                {kycStatus.status}
              </Badge>
            </Button>

            <Button variant="ghost" className="w-full justify-start gap-3" onClick={onSettings}>
              <Settings size={18} />
              Settings
            </Button>

            <Button variant="ghost" className="w-full justify-start gap-3">
              <HelpCircle size={18} />
              Help & Support
            </Button>

            <Button variant="ghost" className="w-full justify-start gap-3">
              <FileText size={18} />
              Terms & Conditions
            </Button>

            <Separator className="my-2" />

            <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-500/10">
              <LogOut size={18} />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}