import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Shield, Users, Award, Zap, Heart, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  const features = [
    {
      icon: Zap,
      title: 'Instant SOS',
      description: 'Long-press emergency button to alert nearby helpers instantly'
    },
    {
      icon: MapPin,
      title: 'Real-time Location',
      description: 'Live GPS tracking connects victims with the closest helpers'
    },
    {
      icon: Users,
      title: 'Trusted Circle',
      description: 'Select 3-5 people who always get notified during emergencies'
    },
    {
      icon: Heart,
      title: 'Medical Info',
      description: 'Share critical medical data instantly with first responders'
    },
    {
      icon: Shield,
      title: 'Check-In Timer',
      description: 'Auto-alert if you don\'t check in when walking alone'
    },
    {
      icon: Award,
      title: 'Earn Rewards',
      description: 'Gain badges and points for helping your campus community'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">SafeCircle</span>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            Your Campus.
            <br />
            <span className="gradient-text">Your Safety Network.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with your campus community for instant help during emergencies.
            Real-time alerts, trusted responders, and gamified safety.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link to="/signup">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link to="/login">I Have an Account</Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold gradient-text">2,500+</div>
              <div className="text-sm text-muted-foreground mt-1">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text">350+</div>
              <div className="text-sm text-muted-foreground mt-1">Incidents Resolved</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text">&lt;3min</div>
              <div className="text-sm text-muted-foreground mt-1">Avg Response</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Stay Safe</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for campus communities with features that make a real difference
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-medium transition-all">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How SafeCircle Works</h2>
          <p className="text-lg text-muted-foreground">Simple, fast, and effective</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '1',
              title: 'Hold SOS Button',
              description: 'Press and hold the emergency button for 2 seconds to activate'
            },
            {
              step: '2',
              title: 'Nearby Helpers Notified',
              description: 'Everyone within your alert radius gets instant notification with your location'
            },
            {
              step: '3',
              title: 'Get Help Fast',
              description: 'Track helpers in real-time, chat with them, and stay safe until help arrives'
            }
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-glow">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-2xl p-12 text-center border border-primary/20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Join SafeCircle?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students making their campus safer, one response at a time.
          </p>
          <Button asChild size="lg" className="text-lg">
            <Link to="/signup">Create Your Free Account</Link>
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold gradient-text">SafeCircle</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 SafeCircle. Making campuses safer together.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
