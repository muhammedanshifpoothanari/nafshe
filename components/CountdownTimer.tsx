'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  endTime: Date | number;
  onComplete?: () => void;
  compact?: boolean;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({
  endTime,
  onComplete,
  compact = false,
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const targetTime = new Date(endTime).getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setIsCompleted(true);
        onComplete?.();
        clearInterval(interval);
        return;
      }

      setTimeRemaining({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, onComplete]);

  if (isCompleted) {
    return (
      <div className="inline-flex items-center gap-2 text-sm font-semibold text-destructive">
        <Clock className="w-4 h-4" />
        Sale Ended
      </div>
    );
  }

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400">
        <Clock className="w-3 h-3" />
        {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Clock className="w-5 h-5 text-accent" />
      <div className="flex gap-3">
        {/* Days */}
        {timeRemaining.days > 0 && (
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {String(timeRemaining.days).padStart(2, '0')}
            </div>
            <div className="text-xs text-muted-foreground font-medium">Days</div>
          </div>
        )}

        {/* Hours */}
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {String(timeRemaining.hours).padStart(2, '0')}
          </div>
          <div className="text-xs text-muted-foreground font-medium">Hours</div>
        </div>

        {/* Minutes */}
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {String(timeRemaining.minutes).padStart(2, '0')}
          </div>
          <div className="text-xs text-muted-foreground font-medium">Mins</div>
        </div>

        {/* Seconds */}
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">
            {String(timeRemaining.seconds).padStart(2, '0')}
          </div>
          <div className="text-xs text-muted-foreground font-medium">Secs</div>
        </div>
      </div>
    </div>
  );
}
