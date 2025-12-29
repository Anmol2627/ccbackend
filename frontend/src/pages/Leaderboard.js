import React, { useState } from 'react';
import { BottomNav } from '../components/BottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Trophy, TrendingUp, TrendingDown, Medal } from 'lucide-react';
import { leaderboardData } from '../data/mockData';
import { motion } from 'framer-motion';

export default function Leaderboard() {
  const [period, setPeriod] = useState('week');
  
  const getPodiumClass = (rank) => {
    if (rank === 1) return 'h-32 bg-gradient-to-br from-yellow-400 to-yellow-600';
    if (rank === 2) return 'h-24 bg-gradient-to-br from-gray-300 to-gray-500';
    if (rank === 3) return 'h-20 bg-gradient-to-br from-amber-600 to-amber-800';
  };
  
  const topThree = leaderboardData.slice(0, 3).sort((a, b) => {
    if (a.rank === 1) return -1;
    if (b.rank === 1) return 1;
    return a.rank - b.rank;
  });
  
  const reorderedTopThree = [topThree[1], topThree[0], topThree[2]];
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Leaderboard</h1>
              <p className="text-sm text-muted-foreground">Campus top responders</p>
            </div>
          </div>
          
          <Tabs value={period} onValueChange={setPeriod} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
              <TabsTrigger value="all">All Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>
      
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Podium */}
        <div className="mb-8">
          <div className="flex items-end justify-center gap-4 mb-6">
            {reorderedTopThree.map((entry, index) => (
              <motion.div
                key={entry.user.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center"
              >
                <Avatar className="h-16 w-16 mb-2 border-4" style={{
                  borderColor: entry.rank === 1 ? '#FFD700' : entry.rank === 2 ? '#C0C0C0' : '#CD7F32'
                }}>
                  <AvatarImage src={entry.user.profilePic} alt={entry.user.name} />
                  <AvatarFallback>{entry.user.name[0]}</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-sm mb-1">{entry.user.name}</p>
                <p className="text-xs text-muted-foreground mb-2">{entry.points} pts</p>
                <div className={`${getPodiumClass(entry.rank)} w-20 rounded-t-lg flex items-center justify-center text-white font-bold text-2xl`}>
                  {entry.rank}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Rankings List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">All Rankings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {leaderboardData.map((entry, index) => (
              <motion.div
                key={entry.user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-medium transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 text-center font-bold text-lg">
                        #{entry.rank}
                      </div>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={entry.user.profilePic} alt={entry.user.name} />
                        <AvatarFallback>{entry.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{entry.user.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {entry.responses} responses
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{entry.points}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                      {entry.change !== '0' && (
                        <div className="flex items-center">
                          {entry.change.startsWith('+') ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                          <span className="text-xs ml-1">{entry.change}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </main>
      
      <BottomNav />
    </div>
  );
}
