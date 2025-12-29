import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [watching, setWatching] = useState(false);

  // Mock location for demo (San Francisco coordinates)
  const mockLocation = {
    lat: 37.7749 + (Math.random() - 0.5) * 0.01,
    lng: -122.4194 + (Math.random() - 0.5) * 0.01,
    accuracy: 10
  };

  useEffect(() => {
    // Simulate getting location
    setLocation(mockLocation);
  }, []);

  const getCurrentLocation = () => {
    return new Promise((resolve) => {
      // Simulate async location fetch
      setTimeout(() => {
        const newLocation = {
          lat: 37.7749 + (Math.random() - 0.5) * 0.01,
          lng: -122.4194 + (Math.random() - 0.5) * 0.01,
          accuracy: 10
        };
        setLocation(newLocation);
        resolve(newLocation);
      }, 100);
    });
  };

  const startWatching = () => {
    setWatching(true);
    // Simulate location updates every 5 seconds
    const interval = setInterval(() => {
      getCurrentLocation();
    }, 5000);
    return () => clearInterval(interval);
  };

  const stopWatching = () => {
    setWatching(false);
  };

  const value = {
    location,
    error,
    watching,
    getCurrentLocation,
    startWatching,
    stopWatching
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}
