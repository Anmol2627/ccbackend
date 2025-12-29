import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export function SOSButton({ onPress, size = 'large' }) {
  const [pressing, setPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  let pressTimer = null;
  let progressInterval = null;
  
  const HOLD_DURATION = 2000; // 2 seconds
  
  const handlePressStart = () => {
    setPressing(true);
    setHolding(true);
    setProgress(0);
    
    // Progress animation
    progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (HOLD_DURATION / 50));
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 50);
    
    // Trigger after hold duration
    pressTimer = setTimeout(() => {
      handleActivate();
    }, HOLD_DURATION);
  };
  
  const handlePressEnd = () => {
    setPressing(false);
    setHolding(false);
    setProgress(0);
    if (pressTimer) clearTimeout(pressTimer);
    if (progressInterval) clearInterval(progressInterval);
  };
  
  const handleActivate = () => {
    handlePressEnd();
    if (onPress) onPress();
    // Vibrate if supported
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  };
  
  const buttonSize = size === 'large' ? 'w-52 h-52' : 'w-32 h-32';
  const textSize = size === 'large' ? 'text-xl' : 'text-base';
  
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        className={cn(
          buttonSize,
          "relative rounded-full bg-destructive text-destructive-foreground",
          "font-bold uppercase tracking-wider",
          "flex flex-col items-center justify-center",
          "transition-all active:scale-95",
          !pressing && "sos-pulse shadow-emergency",
          pressing && "scale-95"
        )}
        whileTap={{ scale: 0.9 }}
      >
        {/* Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeOpacity="0.3"
          />
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 48} ${2 * Math.PI * 48}`}
            strokeDashoffset={2 * Math.PI * 48 * (1 - progress / 100)}
            className="transition-all duration-75"
          />
        </svg>
        
        <div className="relative z-10 flex flex-col items-center">
          <span className={cn(textSize, "font-bold")}>SOS</span>
          <span className="text-xs mt-1 opacity-90">
            {holding ? 'Hold...' : 'Hold for help'}
          </span>
        </div>
      </motion.button>
      
      {holding && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-muted-foreground"
        >
          Hold for {(2 - (progress / 50)).toFixed(1)}s to activate
        </motion.p>
      )}
    </div>
  );
}
