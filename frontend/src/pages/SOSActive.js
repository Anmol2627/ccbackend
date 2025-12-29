import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { HelperCard } from '../components/HelperCard';
import { ChatInterface } from '../components/ChatInterface';
import { MapPin, Clock, Phone, CheckCircle2, Users } from 'lucide-react';
import { mockIncidents, mockUsers } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

export default function SOSActive() {
  const { incidentId } = useParams();
  const navigate = useNavigate();
  const incident = mockIncidents[0];
  
  const respondingHelpers = mockUsers.filter(u => 
    incident.respondingHelpers?.includes(u.id)
  );
  
  const handleMarkSafe = () => {
    toast.success('Marked as safe!', {
      description: 'Your helpers have been notified.'
    });
    navigate('/dashboard');
  };
  
  const handleCall911 = () => {
    toast.info('Opening phone dialer...');
  };
  
  const timeActive = incident.timestamp
    ? formatDistanceToNow(new Date(incident.timestamp))
    : '3 mins';
  
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-destructive/10 border-b border-destructive/20 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center animate-pulse">
                <span className="text-2xl">🚨</span>
              </div>
              <div>
                <Badge className="bg-destructive text-destructive-foreground mb-1">
                  {incident.type} Emergency
                </Badge>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Alert active for {timeActive}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Emergency Services Status */}
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base">Emergency Services Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span>📞 Campus Security notified - ETA 5 mins</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span>🚑 Ambulance dispatched - ETA 8 mins</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span>👥 Trusted Circle notified</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Helpers Responding */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Helpers Responding
              </span>
              <Badge variant="secondary">{respondingHelpers.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {respondingHelpers.map(helper => (
              <HelperCard
                key={helper.id}
                helper={helper}
                distance={Math.floor(Math.random() * 500 + 100)}
                eta="2-4 mins"
              />
            ))}
          </CardContent>
        </Card>
        
        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Your Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{incident.location.address}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Lat: {incident.location.lat.toFixed(4)}, Lng: {incident.location.lng.toFixed(4)}
            </p>
          </CardContent>
        </Card>
        
        {/* Chat */}
        <ChatInterface incident={incident} />
        
        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            size="lg"
            variant="outline"
            onClick={handleCall911}
            className="h-auto py-4"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call 911
          </Button>
          <Button
            size="lg"
            onClick={handleMarkSafe}
            className="h-auto py-4 bg-success hover:bg-success/90"
          >
            <CheckCircle2 className="h-5 w-5 mr-2" />
            I'm Safe Now
          </Button>
        </div>
      </main>
    </div>
  );
}
