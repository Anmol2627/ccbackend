import React, { useState } from 'react';
import { BottomNav } from '../components/BottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { mockHistory } from '../data/mockData';
import { Calendar, MapPin, Clock, Star, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

export default function IncidentHistory() {
  const [filter, setFilter] = useState('all');
  
  const typeColors = {
    Medical: 'bg-destructive text-destructive-foreground',
    Assault: 'bg-warning text-warning-foreground',
    Accident: 'bg-secondary text-secondary-foreground',
    Other: 'bg-muted text-muted-foreground'
  };
  
  const filteredHistory = mockHistory.filter(h => {
    if (filter === 'all') return true;
    return h.role === filter;
  });
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-1">Incident History</h1>
          <p className="text-sm text-muted-foreground">Your past emergencies and responses</p>
          
          <Tabs value={filter} onValueChange={setFilter} className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="victim">As Victim</TabsTrigger>
              <TabsTrigger value="helper">As Helper</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>
      
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Statistics Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">15</p>
              <p className="text-xs text-muted-foreground">Total Incidents</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">As Victim</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">As Helper</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">3:24</p>
              <p className="text-xs text-muted-foreground">Avg Response</p>
            </CardContent>
          </Card>
        </div>
        
        {/* History List */}
        <div className="space-y-3">
          {filteredHistory.map((incident, index) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {incident.role === 'helper' ? (
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={incident.victim.profilePic} alt={incident.victim.name} />
                        <AvatarFallback>{incident.victim.name[0]}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl">🆘</span>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="font-semibold">
                            {incident.role === 'helper' 
                              ? `Helped ${incident.victim.name}`
                              : 'You needed help'
                            }
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })}
                          </div>
                        </div>
                        <Badge className={typeColors[incident.type]}>
                          {incident.type}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        {incident.location.address}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Response: {incident.responseTime}</span>
                        </div>
                        {incident.role === 'helper' && (
                          <>
                            <div className="flex items-center gap-1 text-warning">
                              <Star className="h-3 w-3 fill-warning" />
                              <span>{incident.rating}.0</span>
                            </div>
                            <div className="flex items-center gap-1 text-success">
                              <TrendingUp className="h-3 w-3" />
                              <span>+{incident.pointsEarned} pts</span>
                            </div>
                          </>
                        )}
                      </div>
                      
                      {incident.role === 'victim' && incident.helpers && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">Helped by:</span>
                          <div className="flex -space-x-2">
                            {incident.helpers.map((helper, i) => (
                              <Avatar key={i} className="h-6 w-6 border-2 border-background">
                                <AvatarImage src={helper.profilePic} alt={helper.name} />
                                <AvatarFallback className="text-xs">{helper.name[0]}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}
