import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Slider } from '../components/ui/slider';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Shield, Volume2, LogOut, User } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useAuth();
  const [preferences, setPreferences] = useState(user?.preferences || {
    receiveAlerts: { medical: true, assault: true, accident: true, other: true },
    alertRadius: 1000,
    silentMode: false
  });
  
  const handleSave = () => {
    updateUser({ preferences });
    toast.success('Settings saved successfully');
  };
  
  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully');
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your preferences</p>
        </div>
      </header>
      
      <main className="max-w-screen-xl mx-auto px-4 py-6 space-y-4">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-base font-semibold mb-3 block">Receive Alerts For:</Label>
              <div className="space-y-3">
                {Object.entries(preferences.receiveAlerts).map(([type, enabled]) => (
                  <div key={type} className="flex items-center justify-between p-3 rounded-lg border">
                    <Label htmlFor={`alert-${type}`} className="capitalize cursor-pointer">
                      {type} Emergencies
                    </Label>
                    <Switch
                      id={`alert-${type}`}
                      checked={enabled}
                      onCheckedChange={(checked) =>
                        setPreferences({
                          ...preferences,
                          receiveAlerts: { ...preferences.receiveAlerts, [type]: checked }
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Alert Radius: {preferences.alertRadius}m
              </Label>
              <Slider
                value={[preferences.alertRadius]}
                onValueChange={(value) => setPreferences({ ...preferences, alertRadius: value[0] })}
                min={500}
                max={2000}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>500m</span>
                <span>2000m</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Sound Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Sound Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <Label htmlFor="silentMode" className="cursor-pointer">Silent Mode</Label>
                <p className="text-sm text-muted-foreground">Vibrate only, no sound for alerts</p>
              </div>
              <Switch
                id="silentMode"
                checked={preferences.silentMode}
                onCheckedChange={(checked) => setPreferences({ ...preferences, silentMode: checked })}
              />
            </div>
            
            <div>
              <Label>Alert Sound</Label>
              <Select defaultValue="default">
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Alert</SelectItem>
                  <SelectItem value="urgent">Urgent Alert</SelectItem>
                  <SelectItem value="gentle">Gentle Alert</SelectItem>
                  <SelectItem value="loud">Loud Alert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        {/* Safety Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Safety Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <Label>Shake to Alert</Label>
                <p className="text-sm text-muted-foreground">Shake phone 3 times to send SOS</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <Label>Silent Alert Mode</Label>
                <p className="text-sm text-muted-foreground">Enable secret SOS patterns</p>
              </div>
              <Switch defaultChecked={false} />
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <Label>Emergency Calculator</Label>
                <p className="text-sm text-muted-foreground">Type 9-1-1= to send silent alert</p>
              </div>
              <Switch defaultChecked={false} />
            </div>
          </CardContent>
        </Card>
        
        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Privacy Policy
            </Button>
            <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </CardContent>
        </Card>
        
        {/* Save Button */}
        <Button onClick={handleSave} className="w-full" size="lg">
          Save Changes
        </Button>
      </main>
      
      <BottomNav />
    </div>
  );
}
