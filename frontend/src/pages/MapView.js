import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { BottomNav } from '../components/BottomNav';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { mockIncidents } from '../data/mockData';
import 'leaflet/dist/leaflet.css';

export default function MapView() {
  const { user } = useAuth();
  const center = [37.7749, -122.4194];
  const alertRadius = user?.preferences?.alertRadius || 1000;
  
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-card border-b border-border p-4 z-10">
        <h1 className="text-xl font-bold">Live Map</h1>
        <p className="text-sm text-muted-foreground">Active incidents and your alert radius</p>
      </header>
      
      <div className="flex-1 relative">
        <MapContainer
          center={center}
          zoom={14}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          
          {/* User location with radius */}
          <Circle
            center={center}
            radius={alertRadius}
            pathOptions={{ color: 'hsl(var(--primary))', fillColor: 'hsl(var(--primary))', fillOpacity: 0.1 }}
          />
          
          <Marker position={center}>
            <Popup>
              <div className="text-center">
                <strong>Your Location</strong>
                <br />
                <span className="text-xs">Alert radius: {alertRadius}m</span>
              </div>
            </Popup>
          </Marker>
          
          {/* Active incidents */}
          {mockIncidents.map(incident => (
            <Marker
              key={incident.id}
              position={[incident.location.lat, incident.location.lng]}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <Badge className="mb-2">{incident.type}</Badge>
                  <p className="text-sm font-semibold">{incident.victim.name}</p>
                  <p className="text-xs text-muted-foreground">{incident.distance}m away</p>
                  <Button size="sm" className="w-full mt-2">Respond</Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Legend */}
        <Card className="absolute bottom-20 left-4 right-4 z-[1000] shadow-strong">
          <CardContent className="p-4">
            <div className="flex items-center justify-around text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span>You</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <span>Emergency</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span>Helper</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <BottomNav />
    </div>
  );
}
