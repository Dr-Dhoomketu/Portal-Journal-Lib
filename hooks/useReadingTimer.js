'use client';

import { useState, useEffect, useRef } from 'react';

export const useReadingTimer = (onTimeUp) => {
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    setIsActive(true);
    setTimeRemaining(60);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeRemaining(60);
    setShowLoginPrompt(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setShowLoginPrompt(true);
            setIsActive(false);
            onTimeUp?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeRemaining, onTimeUp]);

  return {
    timeRemaining,
    showLoginPrompt,
    startTimer,
    resetTimer,
    setShowLoginPrompt
  };
};
