import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { MapPin, Clock, Users, Star } from 'lucide-react';
import { cn } from '../lib/utils';
import { formatDistanceToNow } from 'date-fns';

export function IncidentCard({ incident, onRespond, onViewDetails, variant = 'default' }) {
  const typeColors = {
    Medical: 'bg-destructive text-destructive-foreground',
    Assault: 'bg-warning text-warning-foreground',
    Accident: 'bg-secondary text-secondary-foreground',
    Other: 'bg-muted text-muted-foreground'
  };
  
  const timeAgo = incident.timestamp
    ? formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })
    : 'Just now';
  
  return (
    <Card className="overflow-hidden hover:shadow-medium transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage src={incident.victim?.profilePic} alt={incident.victim?.name} />
            <AvatarFallback>{incident.victim?.name?.[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <h3 className="font-semibold text-base">{incident.victim?.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {timeAgo}
                </div>
              </div>
              <Badge className={cn("shrink-0", typeColors[incident.type])}>
                {incident.type}
              </Badge>
            </div>
            
            {incident.description && (
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {incident.description}
              </p>
            )}
            
            <div className="flex items-center gap-4 text-sm mb-3">
              <div className="flex items-center gap-1 text-primary">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">{incident.distance}m away</span>
              </div>
              
              {incident.respondingHelpers && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{incident.respondingHelpers.length} responding</span>
                </div>
              )}
            </div>
            
            {incident.type === 'Medical' && incident.victim && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-md p-2 mb-3">
                <p className="text-xs text-destructive font-medium">
                  ⚠️ Medical Info: {incident.victim.bloodType || 'N/A'} | 
                  Allergies: {incident.victim.allergies || 'None'}
                </p>
              </div>
            )}
            
            {onRespond && (
              <Button
                onClick={() => onRespond(incident.id)}
                className="w-full"
                size="sm"
              >
                Respond to Emergency
              </Button>
            )}
            
            {onViewDetails && (
              <Button
                onClick={() => onViewDetails(incident.id)}
                variant="outline"
                className="w-full"
                size="sm"
              >
                View Details
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
