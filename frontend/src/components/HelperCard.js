import React from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { MapPin, Clock, Star, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function HelperCard({ helper, distance, eta, isArrived, onClick }) {
  const getLevelColor = (level) => {
    if (level >= 5) return 'hsl(var(--badge-gold))';
    if (level >= 4) return 'hsl(var(--badge-purple))';
    if (level >= 3) return 'hsl(var(--badge-blue))';
    if (level >= 2) return 'hsl(var(--badge-green))';
    return 'hsl(var(--badge-gray))';
  };
  
  const getLevelBadge = (level) => {
    if (level >= 5) return 'Legend';
    if (level >= 4) return 'Hero';
    if (level >= 3) return 'Guardian';
    if (level >= 2) return 'Responder';
    return 'Helper';
  };
  
  return (
    <Card
      className={cn(
        "overflow-hidden cursor-pointer hover:shadow-medium transition-all",
        isArrived && "border-success bg-success/5"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12 border-2" style={{ borderColor: getLevelColor(helper.level) }}>
              <AvatarImage src={helper.profilePic} alt={helper.name} />
              <AvatarFallback>{helper.name?.[0]}</AvatarFallback>
            </Avatar>
            {isArrived && (
              <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-0.5">
                <CheckCircle2 className="h-4 w-4 text-success-foreground" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-base">{helper.name}</h3>
                <Badge
                  variant="outline"
                  className="text-xs mt-1"
                  style={{ borderColor: getLevelColor(helper.level), color: getLevelColor(helper.level) }}
                >
                  Level {helper.level} {getLevelBadge(helper.level)}
                </Badge>
              </div>
              
              {helper.rating && (
                <div className="flex items-center gap-1 text-sm shrink-0">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-semibold">{helper.rating}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4 mt-2 text-sm">
              {distance !== undefined && (
                <div className="flex items-center gap-1 text-primary">
                  <MapPin className="h-3 w-3" />
                  <span className="font-medium">{distance}m</span>
                </div>
              )}
              
              {eta && !isArrived && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>ETA {eta}</span>
                </div>
              )}
              
              {isArrived && (
                <div className="flex items-center gap-1 text-success font-medium">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Arrived</span>
                </div>
              )}
            </div>
            
            {helper.responses !== undefined && (
              <p className="text-xs text-muted-foreground mt-1">
                {helper.responses} responses, {helper.rating?.toFixed(1)}⭐ rating
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
