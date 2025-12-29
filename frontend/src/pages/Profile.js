import React from 'react';
import { BottomNav } from '../components/BottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { BadgeDisplay } from '../components/BadgeDisplay';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { Award, TrendingUp, Target, Clock, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile() {
  const { user } = useAuth();
  
  const getLevelInfo = () => {
    const levels = [
      { level: 1, minPoints: 0, maxPoints: 99, name: 'Helper', color: 'hsl(var(--badge-gray))' },
      { level: 2, minPoints: 100, maxPoints: 299, name: 'Responder', color: 'hsl(var(--badge-green))' },
      { level: 3, minPoints: 300, maxPoints: 599, name: 'Guardian', color: 'hsl(var(--badge-blue))' },
      { level: 4, minPoints: 600, maxPoints: 999, name: 'Hero', color: 'hsl(var(--badge-purple))' },
      { level: 5, minPoints: 1000, maxPoints: 9999, name: 'Legend', color: 'hsl(var(--badge-gold))' }
    ];
    
    const currentLevel = levels.find(l => user.points >= l.minPoints && user.points <= l.maxPoints) || levels[0];
    const nextLevel = levels.find(l => l.level === currentLevel.level + 1);
    const progress = nextLevel 
      ? ((user.points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
      : 100;
    
    return { currentLevel, nextLevel, progress };
  };
  
  const { currentLevel, nextLevel, progress } = getLevelInfo();
  
  const stats = [
    { icon: Award, label: 'Total Responses', value: user?.responses || 0, color: 'text-primary' },
    { icon: TrendingUp, label: 'Points Earned', value: user?.points || 0, color: 'text-success' },
    { icon: Target, label: 'Success Rate', value: '100%', color: 'text-warning' },
    { icon: Clock, label: 'Avg Response', value: '3:24', color: 'text-accent' },
    { icon: Star, label: 'Rating', value: user?.rating?.toFixed(1) || '5.0', color: 'text-warning' },
    { icon: Users, label: 'Trusted By', value: '3', color: 'text-primary' }
  ];
  
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="relative inline-block mb-4">
              <Avatar className="h-32 w-32 border-4" style={{ borderColor: currentLevel.color }}>
                <AvatarImage src={user?.profilePic} alt={user?.name} />
                <AvatarFallback className="text-4xl">{user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div 
                className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-strong"
                style={{ background: `linear-gradient(135deg, ${currentLevel.color}, ${currentLevel.color})` }}
              >
                {user?.level}
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-1">{user?.name}</h1>
            <Badge
              variant="outline"
              className="text-base px-4 py-1"
              style={{ borderColor: currentLevel.color, color: currentLevel.color }}
            >
              Level {user?.level} {currentLevel.name}
            </Badge>
            <p className="text-sm text-muted-foreground mt-2">{user?.bio || 'Campus safety advocate'}</p>
          </motion.div>
          
          {/* Level Progress */}
          {nextLevel && (
            <Card className="mt-6 bg-card/50 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">Progress to Level {nextLevel.level} {nextLevel.name}</span>
                  <span className="font-medium">{nextLevel.minPoints - user.points} pts needed</span>
                </div>
                <Progress value={progress} className="h-3" />
              </CardContent>
            </Card>
          )}
        </div>
      </header>
      
      <main className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-medium transition-shadow">
                <CardContent className="p-4">
                  <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Badges */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Badges Earned</CardTitle>
              <Badge variant="secondary">{user?.badges?.length || 0} / 15</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <BadgeDisplay badgeIds={user?.badges} showLocked={true} size="medium" />
          </CardContent>
        </Card>
        
        {/* Trusted Circle */}
        <Card>
          <CardHeader>
            <CardTitle>Trusted Circle</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {user?.trustedCircle?.length || 0} people trust you to help in emergencies
            </p>
            <Button variant="outline" className="w-full">
              Manage Trusted Circle
            </Button>
          </CardContent>
        </Card>
      </main>
      
      <BottomNav />
    </div>
  );
}
