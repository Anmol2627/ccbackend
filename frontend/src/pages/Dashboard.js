import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { BottomNav } from '../components/BottomNav';
import { SOSButton } from '../components/SOSButton';
import { IncidentCard } from '../components/IncidentCard';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { mockIncidents, badges } from '../data/mockData';
import { AlertTriangle, Timer, Award, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { sendSOSNotification } = useNotification();
  const [showSOSDialog, setShowSOSDialog] = useState(false);
  const [sosData, setSOSData] = useState({
    type: 'Medical',
    description: '',
    silent: false,
    notifyCampusSecurity: true,
    notifyPolice: false,
    notifyAmbulance: false,
    notifyTrustedCircle: true
  });
  const [activeIncidents] = useState(mockIncidents.filter(i => i.status === 'active'));
  const [checkInActive, setCheckInActive] = useState(false);
  
  const handleSOSPress = () => {
    setShowSOSDialog(true);
  };
  
  const handleSendSOS = () => {
    // Create incident
    const newIncident = {
      id: `incident${Date.now()}`,
      type: sosData.type,
      victim: user,
      location: { lat: 37.7749, lng: -122.4194, address: 'Current Location' },
      distance: 0,
      description: sosData.description,
      timestamp: new Date().toISOString(),
      status: 'active',
      respondingHelpers: [],
      arrivedHelpers: [],
      emergencyServicesNotified: [],
      chatMessages: []
    };
    
    toast.success('SOS Alert Sent!', {
      description: 'Nearby helpers and your trusted circle have been notified.'
    });
    
    setShowSOSDialog(false);
    navigate(`/sos-active/${newIncident.id}`);
  };
  
  const handleRespondToIncident = (incidentId) => {
    navigate(`/helper-response/${incidentId}`);
  };
  
  const getLevelInfo = () => {
    const levels = [
      { level: 1, minPoints: 0, maxPoints: 99, name: 'Helper', color: 'hsl(var(--badge-gray))' },
      { level: 2, minPoints: 100, maxPoints: 299, name: 'Responder', color: 'hsl(var(--badge-green))' },
      { level: 3, minPoints: 300, maxPoints: 599, name: 'Guardian', color: 'hsl(var(--badge-blue))' },
      { level: 4, minPoints: 600, maxPoints: 999, name: 'Hero', color: 'hsl(var(--badge-purple))' },
      { level: 5, minPoints: 1000, maxPoints: 9999, name: 'Legend', color: 'hsl(var(--badge-gold))' }
    ];
    
    const currentLevel = levels.find(l => user.points >= l.minPoints && user.points <= l.maxPoints) || levels[0];
    const nextLevel = levels.find(l => l.level === currentLevel.level + 1);
    const progress = nextLevel 
      ? ((user.points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
      : 100;
    
    return { currentLevel, nextLevel, progress };
  };
  
  const { currentLevel, nextLevel, progress } = getLevelInfo();
  const recentBadges = badges.filter(b => user.badges?.includes(b.id)).slice(0, 3);
  
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                {new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening'},
              </h1>
              <p className="text-xl font-semibold gradient-text">{user?.name}!</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/check-in')}
            >
              <Timer className="h-4 w-4 mr-2" />
              Start Check-in
            </Button>
          </div>
          
          {checkInActive && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-warning/20 border border-warning rounded-lg p-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-2 text-warning-foreground">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Check-in required in 12:34</span>
              </div>
              <Button size="sm" variant="outline">
                I'm Safe
              </Button>
            </motion.div>
          )}
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <Card className="bg-card/50 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Award className="h-4 w-4" />
                  <span className="text-xs">Level</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold" style={{ color: currentLevel.color }}>
                    {user?.level}
                  </span>
                  <span className="text-sm text-muted-foreground">{currentLevel.name}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs">Points</span>
                </div>
                <div className="text-2xl font-bold">{user?.points || 0}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur">
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground mb-1">Responses</div>
                <div className="text-2xl font-bold">{user?.responses || 0}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur">
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground mb-1">Rank</div>
                <div className="text-2xl font-bold">#5</div>
              </CardContent>
            </Card>
          </div>
          
          {/* Level Progress */}
          {nextLevel && (
            <Card className="mt-3 bg-card/50 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">Progress to Level {nextLevel.level}</span>
                  <span className="font-medium">{nextLevel.minPoints - user.points} pts to go</span>
                </div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-8">
        {/* SOS Button */}
        <div className="flex flex-col items-center mb-12">
          <SOSButton onPress={handleSOSPress} size="large" />
        </div>
        
        {/* Active Incidents */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Active Alerts Nearby
            </h2>
            {activeIncidents.length > 0 && (
              <Badge variant="destructive">{activeIncidents.length}</Badge>
            )}
          </div>
          
          {activeIncidents.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">✅</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">Your campus is safe right now</h3>
                <p className="text-sm text-muted-foreground">No active emergencies in your area</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {activeIncidents.map(incident => (
                <IncidentCard
                  key={incident.id}
                  incident={incident}
                  onRespond={handleRespondToIncident}
                />
              ))}
            </div>
          )}
        </section>
        
        {/* Recent Achievements */}
        {recentBadges.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recent Achievements</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/profile')}>
                View all
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {recentBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <h4 className="text-sm font-semibold">{badge.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>
      
      {/* SOS Dialog */}
      <Dialog open={showSOSDialog} onOpenChange={setShowSOSDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Send Emergency Alert</DialogTitle>
            <DialogDescription>
              Nearby helpers and your trusted circle will be notified immediately
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Emergency Type</label>
              <Select
                value={sosData.type}
                onValueChange={(value) => setSOSData({ ...sosData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medical">❤️ Medical</SelectItem>
                  <SelectItem value="Assault">🚨 Assault</SelectItem>
                  <SelectItem value="Accident">🚗 Accident</SelectItem>
                  <SelectItem value="Other">⚠️ Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description (Optional)</label>
              <Textarea
                placeholder="Briefly describe the situation..."
                value={sosData.description}
                onChange={(e) => setSOSData({ ...sosData, description: e.target.value })}
                rows={2}
              />
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowSOSDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendSOS} className="bg-destructive hover:bg-destructive/90">
              Send Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <BottomNav />
    </div>
  );
}
