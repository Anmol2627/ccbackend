export const mockUsers = [
  {
    id: 'user1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    level: 3,
    points: 450,
    responses: 12,
    badges: ['First Responder', 'Community Guardian'],
    profileComplete: true
  },
  {
    id: 'user2',
    name: 'Mike Ross',
    email: 'mike@example.com',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    level: 5,
    points: 1200,
    responses: 28,
    badges: ['Hero', 'Speedster', 'Medic'],
    profileComplete: true
  },
  {
    id: 'user3',
    name: 'Jessica Li',
    email: 'jessica@example.com',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    level: 2,
    points: 150,
    responses: 5,
    badges: [],
    profileComplete: true
  }
];

export const mockIncidents = [
  {
    id: 'incident1',
    type: 'Medical',
    victim: mockUsers[2],
    location: { lat: 37.7749, lng: -122.4194, address: 'Central Library' },
    distance: 150,
    description: 'Fainted near the entrance',
    timestamp: new Date().toISOString(),
    status: 'active',
    respondingHelpers: ['user1', 'user2'],
    arrivedHelpers: [],
    emergencyServicesNotified: ['ambulance'],
    chatMessages: []
  },
  {
    id: 'incident2',
    type: 'Assault',
    victim: { ...mockUsers[0], id: 'user_victim' }, // Sarah as victim in this scenario
    location: { lat: 37.7849, lng: -122.4094, address: 'Parking Lot B' },
    distance: 400,
    description: 'Suspicious person following me',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    status: 'active',
    respondingHelpers: ['user2'],
    arrivedHelpers: [],
    emergencyServicesNotified: ['police'],
    chatMessages: []
  }
];

export const mockHistory = [
  {
    id: 'hist1',
    role: 'helper',
    type: 'Medical',
    victim: mockUsers[2],
    location: { lat: 37.7749, lng: -122.4194 },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    pointsEarned: 50,
    status: 'resolved',
    helpers: [mockUsers[0], mockUsers[1]]
  },
  {
    id: 'hist2',
    role: 'victim',
    type: 'Safety Check',
    victim: mockUsers[0],
    location: { lat: 37.7749, lng: -122.4194 },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    pointsEarned: 0,
    status: 'resolved',
    helpers: [mockUsers[1]]
  }
];

export const badges = [
  {
    id: 'first_responder',
    name: 'First Responder',
    description: 'Responded to your first incident',
    icon: '🚑',
    points: 50,
    requirement: 'Respond to 1 incident'
  },
  {
    id: 'community_guardian',
    name: 'Community Guardian',
    description: 'Completed 10 incident responses',
    icon: '🛡️',
    points: 200,
    requirement: 'Respond to 10 incidents'
  },
  {
    id: 'hero',
    name: 'Hero',
    description: 'Saved a life or prevented serious harm',
    icon: '🦸',
    points: 500,
    requirement: 'Awarded by community vote'
  },
  {
    id: 'speedster',
    name: 'Speedster',
    description: 'Arrived at scene in under 2 minutes',
    icon: '⚡',
    points: 100,
    requirement: 'Arrival time < 2 mins'
  },
  {
    id: 'medic',
    name: 'Medic',
    description: 'Provided first aid assistance',
    icon: '🩹',
    points: 150,
    requirement: 'Verified medical assistance'
  }
];

export const leaderboardData = [
  {
    rank: 1,
    user: mockUsers[1], // Mike
    points: 1200,
    change: 'up'
  },
  {
    rank: 2,
    user: mockUsers[0], // Sarah
    points: 450,
    change: 'down'
  },
  {
    rank: 3,
    user: mockUsers[2], // Jessica
    points: 150,
    change: 'same'
  },
  {
    rank: 4,
    user: { ...mockUsers[0], id: 'user4', name: 'Alex T', points: 120, profilePic: undefined },
    points: 120,
    change: 'up'
  },
  {
    rank: 5,
    user: { ...mockUsers[0], id: 'user5', name: 'Sam W', points: 90, profilePic: undefined },
    points: 90,
    change: 'same'
  }
];
