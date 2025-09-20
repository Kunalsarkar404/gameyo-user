import React, { useState } from 'react';
import { ArrowLeft, Plus, Calendar, Clock, Users, Trophy, MapPin, Share2, Copy, Check, Globe, Gamepad2, DollarSign, Target, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';

interface CreateMatchScreenProps {
  onBack: () => void;
}

export function CreateMatchScreen({ onBack }: CreateMatchScreenProps) {
  const [matchType, setMatchType] = useState<'online' | 'offline'>('online');
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1);
  
  const [matchData, setMatchData] = useState({
    title: '',
    game: '',
    description: '',
    entryFee: '',
    isFreeEntry: false,
    prizePool: '',
    maxParticipants: '',
    gameMode: '',
    rules: '',
    startDate: '',
    startTime: '',
    registrationDeadline: '',
    isPrivate: false,
    requireApproval: false,
    // Online specific
    roomCode: '',
    discordLink: '',
    streamLink: '',
    // Offline specific
    venue: '',
    address: '',
    coordinates: { lat: '', lng: '' },
    contactNumber: '',
    amenities: [] as string[]
  });

  const games = [
    'BGMI / PUBG Mobile',
    'Free Fire',
    'Call of Duty Mobile',
    'Clash Royale',
    'Brawl Stars',
    'VALORANT Mobile',
    'Apex Legends Mobile',
    'League of Legends: Wild Rift'
  ];

  const gameModes = {
    'BGMI / PUBG Mobile': ['Solo', 'Duo', 'Squad', 'Custom Room'],
    'Free Fire': ['Solo', 'Duo', 'Squad', 'Clash Squad'],
    'Call of Duty Mobile': ['Solo', 'Duo', 'Squad', 'Battle Royale'],
    'Clash Royale': ['1v1', 'Match', 'Draft'],
    'Brawl Stars': ['Solo', 'Duo', '3v3', 'Special Events'],
    'VALORANT Mobile': ['Unrated', 'Competitive', 'Spike Rush'],
    'Apex Legends Mobile': ['Solo', 'Duo', 'Squad'],
    'League of Legends: Wild Rift': ['5v5 Ranked', '5v5 Normal', 'ARAM']
  };

  const offlineAmenities = [
    'Free WiFi',
    'Gaming Chairs',
    'Air Conditioning',
    'Food & Beverages',
    'Parking Available',
    'Security',
    'Live Streaming Setup',
    'Prize Distribution Ceremony'
  ];

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setMatchData(prev => ({ ...prev, [field]: value }));
  };

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    handleInputChange('roomCode', code);
    toast.success('Room code generated!');
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(`${type} copied to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const getLocationFromMap = () => {
    // Mock function - in real app would integrate with Google Maps API
    handleInputChange('coordinates', { lat: '28.6139', lng: '77.2090' });
    toast.success('Location selected from map!');
  };

  const createMatch = () => {
    if (!matchData.title || !matchData.game || (!matchData.isFreeEntry && !matchData.entryFee)) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Mock match creation
    toast.success(`${matchType === 'online' ? 'Online' : 'Offline'} match created successfully!`);
    onBack();
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= stepNum ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            {stepNum}
          </div>
          {stepNum < 3 && (
            <div className={`w-8 h-0.5 mx-2 ${
              step > stepNum ? 'bg-primary' : 'bg-muted'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings size={20} />
            Basic Information
          </CardTitle>
          <CardDescription>Set up your match details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Match Title *</Label>
            <Input
              id="title"
              placeholder="e.g., BGMI Squad Championship"
              value={matchData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="game">Game *</Label>
            <Select value={matchData.game} onValueChange={(value) => handleInputChange('game', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a game" />
              </SelectTrigger>
              <SelectContent>
                {games.map((game) => (
                  <SelectItem key={game} value={game}>{game}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {matchData.game && (
            <div className="space-y-2">
              <Label htmlFor="gameMode">Game Mode *</Label>
              <Select value={matchData.gameMode} onValueChange={(value) => handleInputChange('gameMode', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select game mode" />
                </SelectTrigger>
                <SelectContent>
                  {gameModes[matchData.game as keyof typeof gameModes]?.map((mode) => (
                    <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your match..."
              rows={3}
              value={matchData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign size={20} />
            Match Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Free Entry Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <Label htmlFor="freeEntry">Free Entry Match</Label>
              <p className="text-sm text-muted-foreground">Create a match with no entry fee</p>
            </div>
            <Switch
              id="freeEntry"
              checked={matchData.isFreeEntry}
              onCheckedChange={(checked) => {
                handleInputChange('isFreeEntry', checked);
                if (checked) {
                  handleInputChange('entryFee', '0');
                } else {
                  handleInputChange('entryFee', '');
                }
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="entryFee">Entry Fee (₹) *</Label>
              <Input
                id="entryFee"
                type="number"
                placeholder={matchData.isFreeEntry ? "Free Entry" : "50"}
                value={matchData.isFreeEntry ? "0" : matchData.entryFee}
                onChange={(e) => handleInputChange('entryFee', e.target.value)}
                disabled={matchData.isFreeEntry}
                className={matchData.isFreeEntry ? "bg-muted" : ""}
              />
              {matchData.isFreeEntry && (
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span>✓</span>
                  Free match - no entry fee required
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="prizePool">Prize Pool (₹)</Label>
              <Input
                id="prizePool"
                type="number"
                placeholder={matchData.isFreeEntry ? "Enter prize amount" : "Auto-calculated"}
                value={matchData.prizePool}
                onChange={(e) => handleInputChange('prizePool', e.target.value)}
              />
              {matchData.isFreeEntry && (
                <p className="text-xs text-muted-foreground">
                  For free matches, you can set a custom prize pool
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxParticipants">Max Participants</Label>
            <Select value={matchData.maxParticipants} onValueChange={(value) => handleInputChange('maxParticipants', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="16">16 Players</SelectItem>
                <SelectItem value="32">32 Players</SelectItem>
                <SelectItem value="64">64 Players</SelectItem>
                <SelectItem value="128">128 Players</SelectItem>
                <SelectItem value="256">256 Players</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="private">Private Match</Label>
              <p className="text-sm text-muted-foreground">Only invited players can join</p>
            </div>
            <Switch
              id="private"
              checked={matchData.isPrivate}
              onCheckedChange={(checked) => handleInputChange('isPrivate', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="approval">Require Approval</Label>
              <p className="text-sm text-muted-foreground">Manually approve participants</p>
            </div>
            <Switch
              id="approval"
              checked={matchData.requireApproval}
              onCheckedChange={(checked) => handleInputChange('requireApproval', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderScheduleAndLocation = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar size={20} />
            Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={matchData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time *</Label>
              <Input
                id="startTime"
                type="time"
                value={matchData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="registrationDeadline">Registration Deadline</Label>
            <Input
              id="registrationDeadline"
              type="datetime-local"
              value={matchData.registrationDeadline}
              onChange={(e) => handleInputChange('registrationDeadline', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {matchType === 'online' ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe size={20} />
              Online Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="roomCode">Room Code</Label>
              <div className="flex gap-2">
                <Input
                  id="roomCode"
                  placeholder="Generate or enter manually"
                  value={matchData.roomCode}
                  onChange={(e) => handleInputChange('roomCode', e.target.value)}
                />
                <Button onClick={generateRoomCode} variant="outline">
                  Generate
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discordLink">Discord Server (Optional)</Label>
              <Input
                id="discordLink"
                placeholder="https://discord.gg/..."
                value={matchData.discordLink}
                onChange={(e) => handleInputChange('discordLink', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="streamLink">Live Stream Link (Optional)</Label>
              <Input
                id="streamLink"
                placeholder="https://youtube.com/... or https://twitch.tv/..."
                value={matchData.streamLink}
                onChange={(e) => handleInputChange('streamLink', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin size={20} />
              Venue Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="venue">Venue Name *</Label>
              <Input
                id="venue"
                placeholder="e.g., Gaming Lounge XYZ"
                value={matchData.venue}
                onChange={(e) => handleInputChange('venue', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Full Address *</Label>
              <Textarea
                id="address"
                placeholder="Enter complete address with landmarks"
                rows={3}
                value={matchData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Location on Map</Label>
              <div className="border border-border rounded-lg p-4 bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Select Location</p>
                    <p className="text-sm text-muted-foreground">
                      {matchData.coordinates.lat ? 
                        `Lat: ${matchData.coordinates.lat}, Lng: ${matchData.coordinates.lng}` : 
                        'No location selected'
                      }
                    </p>
                  </div>
                  <Button onClick={getLocationFromMap} variant="outline">
                    <MapPin size={16} className="mr-2" />
                    Select on Map
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number *</Label>
              <Input
                id="contactNumber"
                type="tel"
                placeholder="+91 98765 43210"
                value={matchData.contactNumber}
                onChange={(e) => handleInputChange('contactNumber', e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label>Available Amenities</Label>
              <div className="grid grid-cols-2 gap-2">
                {offlineAmenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={amenity}
                      checked={matchData.amenities.includes(amenity)}
                      onChange={(e) => {
                        const amenities = e.target.checked
                          ? [...matchData.amenities, amenity]
                          : matchData.amenities.filter(a => a !== amenity);
                        handleInputChange('amenities', amenities);
                      }}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderReviewAndShare = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy size={20} />
            Match Preview
          </CardTitle>
          <CardDescription>Review your match details before publishing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{matchData.title || 'Match Title'}</h3>
              <Badge variant={matchType === 'online' ? 'default' : 'secondary'}>
                {matchType === 'online' ? 'Online' : 'Offline'}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Game</p>
                <p className="font-medium">{matchData.game || 'Not selected'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Mode</p>
                <p className="font-medium">{matchData.gameMode || 'Not selected'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Entry Fee</p>
                <p className="font-medium">₹{matchData.entryFee || '0'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Max Players</p>
                <p className="font-medium">{matchData.maxParticipants || 'Unlimited'}</p>
              </div>
            </div>

            {matchData.description && (
              <div>
                <p className="text-muted-foreground text-sm">Description</p>
                <p className="text-sm">{matchData.description}</p>
              </div>
            )}

            <Separator />

            {matchType === 'online' ? (
              <div className="space-y-2">
                <h4 className="font-medium">Online Details</h4>
                {matchData.roomCode && (
                  <div className="flex items-center justify-between bg-background rounded p-2">
                    <span className="text-sm">Room Code: <code className="bg-muted px-1 rounded">{matchData.roomCode}</code></span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(matchData.roomCode, 'Room code')}
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </div>
                )}
                {matchData.discordLink && (
                  <p className="text-sm">Discord: {matchData.discordLink}</p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <h4 className="font-medium">Venue Details</h4>
                <p className="text-sm">{matchData.venue}</p>
                <p className="text-sm text-muted-foreground">{matchData.address}</p>
                {matchData.contactNumber && (
                  <p className="text-sm">Contact: {matchData.contactNumber}</p>
                )}
                {matchData.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {matchData.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 size={20} />
            Share Match
          </CardTitle>
          <CardDescription>Share your match with friends and players</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Match Link</Label>
            <div className="flex gap-2">
              <Input
                value="https://gameyo.app/match/abc123"
                readOnly
                className="bg-muted"
              />
              <Button
                variant="outline"
                onClick={() => copyToClipboard('https://gameyo.app/match/abc123', 'Match link')}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="gap-2">
              <span>📱</span>
              Share via WhatsApp
            </Button>
            <Button variant="outline" className="gap-2">
              <span>📧</span>
              Share via Email
            </Button>
            <Button variant="outline" className="gap-2">
              <span>📋</span>
              Copy Details
            </Button>
            <Button variant="outline" className="gap-2">
              <span>📸</span>
              Generate QR Code
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="p-4 pt-6 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="w-10 h-10 rounded-full">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Create Match</h1>
            <p className="text-muted-foreground text-sm">Set up your custom gaming match</p>
          </div>
        </div>

        {/* Match Type Selector */}
        <Tabs value={matchType} onValueChange={(value) => setMatchType(value as 'online' | 'offline')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="online" className="gap-2">
              <Globe size={16} />
              Online
            </TabsTrigger>
            <TabsTrigger value="offline" className="gap-2">
              <MapPin size={16} />
              Offline
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="p-4">
        {renderStepIndicator()}

        {step === 1 && renderBasicInfo()}
        {step === 2 && renderScheduleAndLocation()}
        {step === 3 && renderReviewAndShare()}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={step === 1}
            className="w-24"
          >
            Previous
          </Button>
          
          {step < 3 ? (
            <Button onClick={nextStep} className="w-24">
              Next
            </Button>
          ) : (
            <Button onClick={createMatch} className="bg-primary text-primary-foreground">
              Create Match
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}