
"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export function HeartBackground() {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: number; delay: string; duration: string }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 10,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 3 + 4}s`
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-float text-primary/20"
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
