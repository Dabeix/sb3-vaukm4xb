import React, { useState, useEffect } from 'react';

interface Bubble {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
  swayAmount: number;
  scale: number;
  startPosition: number;
}

export const Bubbles: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const createBubble = (startPosition = -1): Bubble => ({
    id: Math.random(),
    size: Math.random() * 100 + 60,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 10 + 15,
    opacity: Math.random() * 0.5 + 0.3,
    swayAmount: Math.random() * 80 + 40,
    scale: Math.random() * 0.8 + 0.6,
    startPosition: startPosition
  });

  useEffect(() => {
    // Create initial bubbles distributed across the screen
    const initialBubbles = Array.from({ length: 50 }, () => 
      createBubble(Math.random() * 100)
    );
    setBubbles(initialBubbles);

    // Add new bubbles periodically
    const interval = setInterval(() => {
      setBubbles(currentBubbles => {
        const newBubbles = Array.from({ length: 5 }, () => createBubble());
        return [...currentBubbles.slice(-45), ...newBubbles];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    >
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble absolute rounded-full pointer-events-none"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: bubble.startPosition >= 0 ? `${bubble.startPosition}%` : `-${bubble.size}px`,
            opacity: bubble.opacity,
            transform: `scale(${bubble.scale})`,
            animation: `
              float-up ${bubble.duration}s linear ${bubble.delay}s infinite,
              sway ${bubble.duration / 2}s ease-in-out ${bubble.delay}s infinite alternate,
              pulse ${Math.random() * 4 + 3}s ease-in-out ${bubble.delay}s infinite alternate
            `,
            '--sway-amount': `${bubble.swayAmount}px`,
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            perspective: '1000px',
            transform: 'translateZ(0)',
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};