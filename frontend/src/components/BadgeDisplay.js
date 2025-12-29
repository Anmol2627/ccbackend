import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';
import { badges } from '../data/mockData';
import { motion } from 'framer-motion';

export function BadgeDisplay({ badgeIds, size = 'medium', showLocked = false, maxDisplay = null }) {
  const userBadges = badges.filter(b => badgeIds?.includes(b.id));
  const lockedBadges = showLocked ? badges.filter(b => !badgeIds?.includes(b.id)) : [];
  
  const allBadges = [...userBadges, ...lockedBadges];
  const displayBadges = maxDisplay ? allBadges.slice(0, maxDisplay) : allBadges;
  
  const sizeClasses = {
    small: 'w-10 h-10 text-xl',
    medium: 'w-16 h-16 text-3xl',
    large: 'w-24 h-24 text-5xl'
  };
  
  return (
    <div className="flex flex-wrap gap-3">
      {displayBadges.map((badge, index) => {
        const isLocked = !badgeIds?.includes(badge.id);
        
        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card
              className={cn(
                "overflow-hidden cursor-pointer hover:shadow-medium transition-all",
                isLocked && "opacity-30 grayscale"
              )}
            >
              <CardContent className="p-4 flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "rounded-full flex items-center justify-center",
                    "bg-gradient-to-br from-primary/10 to-accent/10",
                    sizeClasses[size]
                  )}
                >
                  {badge.icon}
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-sm">{badge.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{badge.description}</p>
                  {isLocked && showLocked && (
                    <p className="text-xs text-muted-foreground mt-1 italic">
                      {badge.requirement}
                    </p>
                  )}
                  {!isLocked && (
                    <Badge variant="secondary" className="mt-2 text-xs">
                      +{badge.points} pts
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
