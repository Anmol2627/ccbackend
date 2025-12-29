import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Shield, User, Heart, Users, Bell, Check, X, Plus, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockUsers } from '../data/mockData';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { user, completeProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    bio: '',
    bloodType: '',
    allergies: '',
    medications: '',
    medicalConditions: '',
    emergencyContacts: [{ name: '', relationship: '', phone: '' }],
    trustedCircle: [],
    preferences: {
      receiveAlerts: { medical: true, assault: true, accident: true, other: true },
      alertRadius: 1000,
      silentMode: false
    }
  });
  
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;
  
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const [searchQuery, setSearchQuery] = useState('');
  const availableUsers = mockUsers.filter(u => 
    u.id !== user?.id && 
    !formData.trustedCircle.includes(u.id) &&
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleNext = () => {
    // Validation for each step
    if (step === 3 && formData.emergencyContacts.filter(c => c.name && c.phone).length === 0) {
      toast.error('Please add at least one emergency contact');
      return;
    }
    
    if (step === 4 && formData.trustedCircle.length < 3) {
      toast.error('Please select at least 3 trusted circle members');
      return;
    }
    
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };
  
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };
  
  const handleComplete = () => {
    completeProfile(formData);
    toast.success('Profile complete!', {
      description: 'You\'re all set up and ready to go.'
    });
    navigate('/dashboard');
  };
  
  const addEmergencyContact = () => {
    if (formData.emergencyContacts.length < 5) {
      setFormData({
        ...formData,
        emergencyContacts: [...formData.emergencyContacts, { name: '', relationship: '', phone: '' }]
      });
    }
  };
  
  const removeEmergencyContact = (index) => {
    setFormData({
      ...formData,
      emergencyContacts: formData.emergencyContacts.filter((_, i) => i !== index)
    });
  };
  
  const updateEmergencyContact = (index, field, value) => {
    const updated = [...formData.emergencyContacts];
    updated[index][field] = value;
    setFormData({ ...formData, emergencyContacts: updated });
  };
  
  const toggleTrustedMember = (userId) => {
    if (formData.trustedCircle.includes(userId)) {
      setFormData({
        ...formData,
        trustedCircle: formData.trustedCircle.filter(id => id !== userId)
      });
    } else if (formData.trustedCircle.length < 5) {
      setFormData({
        ...formData,
        trustedCircle: [...formData.trustedCircle, userId]
      });
    } else {
      toast.error('Maximum 5 trusted circle members');
    }
  };
  
  const stepIcons = [User, Heart, Users, Users, Bell];
  const StepIcon = stepIcons[step - 1];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-strong">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <StepIcon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle>Profile Setup</CardTitle>
                  <CardDescription>Step {step} of {totalSteps}</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="text-lg px-4 py-2">
                {progress.toFixed(0)}%
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 1: Basic Info */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-primary">
                        <AvatarImage src={user?.profilePic} alt={user?.name} />
                        <AvatarFallback className="text-2xl">{user?.name?.[0]}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-2xl font-bold">{user?.name}</h3>
                      <p className="text-muted-foreground">{user?.email}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio (Optional)</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us a little about yourself..."
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>
                )}
                
                {/* Step 2: Medical Info */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">Medical Information</h3>
                      <p className="text-muted-foreground">
                        This info helps responders provide better emergency care
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select
                        value={formData.bloodType}
                        onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea
                        id="allergies"
                        placeholder="e.g., Penicillin, Peanuts, Latex"
                        value={formData.allergies}
                        onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="medications">Current Medications</Label>
                      <Textarea
                        id="medications"
                        placeholder="e.g., Insulin, Albuterol inhaler"
                        value={formData.medications}
                        onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="medicalConditions">Medical Conditions</Label>
                      <Textarea
                        id="medicalConditions"
                        placeholder="e.g., Type 1 Diabetes, Asthma"
                        value={formData.medicalConditions}
                        onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                        rows={2}
                      />
                    </div>
                  </div>
                )}
                
                {/* Step 3: Emergency Contacts */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">Emergency Contacts</h3>
                      <p className="text-muted-foreground">
                        Add 1-5 people to contact during emergencies
                      </p>
                    </div>
                    
                    {formData.emergencyContacts.map((contact, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 space-y-3">
                            <Input
                              placeholder="Name"
                              value={contact.name}
                              onChange={(e) => updateEmergencyContact(index, 'name', e.target.value)}
                            />
                            <Input
                              placeholder="Relationship (e.g., Mother, Friend)"
                              value={contact.relationship}
                              onChange={(e) => updateEmergencyContact(index, 'relationship', e.target.value)}
                            />
                            <Input
                              placeholder="Phone Number"
                              type="tel"
                              value={contact.phone}
                              onChange={(e) => updateEmergencyContact(index, 'phone', e.target.value)}
                            />
                          </div>
                          {formData.emergencyContacts.length > 1 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeEmergencyContact(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                    
                    {formData.emergencyContacts.length < 5 && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={addEmergencyContact}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Contact
                      </Button>
                    )}
                  </div>
                )}
                
                {/* Step 4: Trusted Circle */}
                {step === 4 && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">Trusted Circle</h3>
                      <p className="text-muted-foreground mb-4">
                        Select 3-5 people who will ALWAYS be notified of your emergencies
                      </p>
                      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm">
                        <Shield className="h-4 w-4" />
                        {formData.trustedCircle.length} of 5 selected
                      </div>
                    </div>
                    
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                      {availableUsers.map(availableUser => (
                        <Card
                          key={availableUser.id}
                          className={`p-4 cursor-pointer transition-all ${
                            formData.trustedCircle.includes(availableUser.id)
                              ? 'border-primary bg-primary/5'
                              : 'hover:border-primary/50'
                          }`}
                          onClick={() => toggleTrustedMember(availableUser.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={availableUser.profilePic} alt={availableUser.name} />
                              <AvatarFallback>{availableUser.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-semibold">{availableUser.name}</h4>
                              <p className="text-sm text-muted-foreground">{availableUser.bio}</p>
                            </div>
                            {formData.trustedCircle.includes(availableUser.id) && (
                              <Check className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Step 5: Notification Preferences */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">Notification Preferences</h3>
                      <p className="text-muted-foreground">
                        Customize when and how you receive alerts
                      </p>
                    </div>
                    
                    <div>
                      <Label className="text-base font-semibold mb-3 block">Receive Alerts For:</Label>
                      <div className="space-y-3">
                        {Object.entries(formData.preferences.receiveAlerts).map(([type, enabled]) => (
                          <div key={type} className="flex items-center justify-between p-3 rounded-lg border">
                            <Label htmlFor={type} className="capitalize cursor-pointer">
                              {type} Emergencies
                            </Label>
                            <Switch
                              id={type}
                              checked={enabled}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  preferences: {
                                    ...formData.preferences,
                                    receiveAlerts: {
                                      ...formData.preferences.receiveAlerts,
                                      [type]: checked
                                    }
                                  }
                                })
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-base font-semibold mb-3 block">
                        Alert Radius: {formData.preferences.alertRadius}m
                      </Label>
                      <Slider
                        value={[formData.preferences.alertRadius]}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            preferences: { ...formData.preferences, alertRadius: value[0] }
                          })
                        }
                        min={500}
                        max={2000}
                        step={100}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>500m</span>
                        <span>2000m</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <Label htmlFor="silentMode" className="cursor-pointer">Silent Mode</Label>
                        <p className="text-sm text-muted-foreground">Vibrate only, no sound</p>
                      </div>
                      <Switch
                        id="silentMode"
                        checked={formData.preferences.silentMode}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            preferences: { ...formData.preferences, silentMode: checked }
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  Back
                </Button>
              )}
              <Button onClick={handleNext} className="flex-1">
                {step === totalSteps ? 'Complete' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
