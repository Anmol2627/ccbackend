import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Timer, MapPin, Plus, X, Play, Pause, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function CheckInTimer() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [setupData, setSetupData] = useState({
    destination: '',
    duration: 15,
    emergencyType: 'Medical'
  });
  
  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      // Time's up - trigger auto alert
      handleAutoAlert();
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);
  
  const handleStart = () => {
    if (!setupData.destination) {
      toast.error('Please enter a destination');
      return;
    }
    
    setTimeLeft(setupData.duration * 60);
    setIsActive(true);
    toast.success('Check-in timer started', {
      description: `You have ${setupData.duration} minutes to check in`
    });
  };
  
  const handleCheckIn = () => {
    setIsActive(false);
    setTimeLeft(0);
    toast.success('Checked in successfully!', {
      description: 'Your safety status has been updated.'
    });
    navigate('/dashboard');
  };
  
  const handleExtend = () => {
    setTimeLeft(timeLeft + (10 * 60));
    toast.info('Timer extended by 10 minutes');
  };
  
  const handleCancel = () => {
    setIsActive(false);
    setTimeLeft(0);
    toast.info('Check-in cancelled');
    navigate('/dashboard');
  };
  
  const handleAutoAlert = () => {
    toast.error('Auto-Alert Sent!', {
      description: 'You didn\'t check in. Emergency services have been notified.'
    });
    navigate('/dashboard');
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const durations = [5, 10, 15, 30, 60];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => navigate('/dashboard')}
        >
          <X className="h-4 w-4 mr-2" />
          Close
        </Button>
        
        {!isActive ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="shadow-strong">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                  <Timer className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Safety Check-in Timer</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Set a timer to auto-alert if you don't check in. Perfect for walking alone at night.
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="destination">Where are you going?</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="destination"
                      placeholder="e.g., Library parking lot"
                      value={setupData.destination}
                      onChange={(e) => setSetupData({ ...setupData, destination: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Check-in Time</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {durations.map((duration) => (
                      <Button
                        key={duration}
                        variant={setupData.duration === duration ? 'default' : 'outline'}
                        onClick={() => setSetupData({ ...setupData, duration })}
                        className="h-auto py-3 px-2"
                      >
                        <div className="text-center">
                          <div className="text-lg font-bold">{duration}</div>
                          <div className="text-xs">min</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Emergency Type (if auto-alert triggers)</Label>
                  <Select
                    value={setupData.emergencyType}
                    onValueChange={(value) => setSetupData({ ...setupData, emergencyType: value })}
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
                
                <div className="bg-muted rounded-lg p-4 text-sm">
                  <p className="font-medium mb-2">👥 Who will be notified?</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Your Trusted Circle (always)</li>
                    <li>• Nearby SafeCircle users</li>
                    <li>• Campus Security</li>
                  </ul>
                </div>
                
                <Button onClick={handleStart} className="w-full" size="lg">
                  <Play className="h-5 w-5 mr-2" />
                  Start Check-in Timer
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card className="shadow-strong">
              <CardHeader>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-warning to-destructive flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Timer className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl">Check-in Required</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <div className="text-6xl font-bold gradient-text mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <p className="text-muted-foreground">Time remaining</p>
                </div>
                
                <div className="bg-muted rounded-lg p-4 text-left">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">Destination:</span>
                  </div>
                  <p className="text-muted-foreground">{setupData.destination}</p>
                </div>
                
                {timeLeft < 120 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-warning/10 border border-warning rounded-lg p-4"
                  >
                    <p className="text-sm text-warning-foreground font-medium">
                      ⚠️ Less than 2 minutes remaining! Check in or your trusted circle will be alerted.
                    </p>
                  </motion.div>
                )}
                
                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={handleExtend} variant="outline" size="lg">
                    <Plus className="h-5 w-5 mr-2" />
                    +10 mins
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="lg">
                    <X className="h-5 w-5 mr-2" />
                    Cancel
                  </Button>
                </div>
                
                <Button onClick={handleCheckIn} className="w-full bg-success hover:bg-success/90" size="lg">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  I'm Safe - Check In
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
