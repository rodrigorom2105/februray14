
"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export function HeartBackground() {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: number; delay: string; duration: string }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 25 + 10,
      delay: `${Math.random() * 8}s`,
      duration: `${Math.random() * 4 + 6}s`
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-white">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-float text-primary/30"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </div>
      ))}
    </div>
  );
}
