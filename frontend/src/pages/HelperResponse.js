import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { HelperCard } from '../components/HelperCard';
import { ChatInterface } from '../components/ChatInterface';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Navigation, Phone, CheckCircle2, Heart, AlertTriangle } from 'lucide-react';
import { mockIncidents, mockUsers } from '../data/mockData';
import { toast } from 'sonner';
import 'leaflet/dist/leaflet.css';

export default function HelperResponse() {
  const { incidentId } = useParams();
  const navigate = useNavigate();
  const [arrived, setArrived] = useState(false);
  const incident = mockIncidents[0];
  
  const respondingHelpers = mockUsers.filter(u => 
    incident.respondingHelpers?.includes(u.id)
  );
  
  const handleMarkArrived = () => {
    setArrived(true);
    toast.success('Marked as arrived', {
      description: 'Victim has been notified.'
    });
  };
  
  const handleCancelResponse = () => {
    toast.info('Response cancelled');
    navigate('/dashboard');
  };
  
  const handleGetDirections = () => {
    toast.info('Opening maps...');
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Map */}
      <div className="h-96 relative">
        <MapContainer
          center={[incident.location.lat, incident.location.lng]}
          zoom={15}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <Marker position={[incident.location.lat, incident.location.lng]}>
            <Popup>Victim Location</Popup>
          </Marker>
        </MapContainer>
        
        {/* Floating Info Panel */}
        <div className="absolute top-4 left-4 right-4 z-[1000]">
          <Card className="shadow-strong">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <Badge className="bg-destructive text-destructive-foreground mb-2">
                    {incident.type} Emergency
                  </Badge>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-semibold text-primary">{incident.distance}m away</span>
                    <span className="text-muted-foreground">ETA 4 mins</span>
                    <span className="text-muted-foreground">{respondingHelpers.length} helpers</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-6 space-y-4">
        {/* Medical Info */}
        {incident.type === 'Medical' && incident.victim && (
          <Card className="border-destructive bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="h-5 w-5 text-destructive" />
                Quick Access Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Blood Type</p>
                  <p className="font-semibold">{incident.victim.bloodType || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Allergies</p>
                  <p className="font-semibold">{incident.victim.allergies || 'None'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Medications</p>
                  <p className="font-semibold">{incident.victim.medications || 'None'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Conditions</p>
                  <p className="font-semibold">{incident.victim.medicalConditions || 'None'}</p>
                </div>
              </div>
              <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded text-sm text-warning-foreground">
                <AlertTriangle className="h-4 w-4 inline mr-1" />
                Check for medical alert bracelet/necklace
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Other Helpers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Other Helpers Responding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {respondingHelpers.slice(0, 3).map(helper => (
              <HelperCard key={helper.id} helper={helper} distance={incident.distance} />
            ))}
          </CardContent>
        </Card>
        
        {/* Chat */}
        <ChatInterface incident={incident} className="max-w-full" />
        
        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 sticky bottom-4">
          <Button
            size="lg"
            variant="outline"
            onClick={handleGetDirections}
            className="h-auto py-4"
          >
            <Navigation className="h-5 w-5 mr-2" />
            Directions
          </Button>
          {!arrived ? (
            <Button
              size="lg"
              onClick={handleMarkArrived}
              className="h-auto py-4 bg-success hover:bg-success/90"
            >
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Mark Arrived
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={handleCancelResponse}
              variant="outline"
              className="h-auto py-4"
            >
              Done
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
