"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";

type Effect = "up" | "left" | "right" | "zoom";

type Props = {
  children: ReactNode;
  id?: string;
  className?: string;
  from?: Effect;
  delay?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

// Where an element rests while off screen. `side` is 1 when it sits below the viewport and -1 when
// it has scrolled off the top, so "up" always travels toward the centre of the screen.
const hidden = (effect: Effect, side: 1 | -1) =>
  ({
    up: { opacity: 0, y: 32 * side },
    left: { opacity: 0, x: -44 },
    right: { opacity: 0, x: 44 },
    zoom: { opacity: 0, scale: 0.94, y: 16 * side },
  })[effect];

/**
 * Animates content in whenever it enters the viewport and back out when it leaves,
 * so it replays scrolling down and scrolling up.
 */
export function Reveal({ children, id, className, from = "up", delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(false);
  const [side, setSide] = useState<1 | -1>(1);

  return (
    <motion.div
      id={id}
      className={className}
      initial={false}
      animate={shown ? { opacity: 1, x: 0, y: 0, scale: 1 } : reduce ? { opacity: 0 } : hidden(from, side)}
      transition={
        shown
          ? { duration: reduce ? 0.2 : 0.75, delay, ease: EASE }
          : { duration: 0.35, ease: EASE } // leave quickly, with no stagger delay
      }
      viewport={{ amount: 0.15 }}
      onViewportEnter={() => setShown(true)}
      onViewportLeave={(entry) => {
        if (entry) setSide(entry.boundingClientRect.top < 0 ? -1 : 1);
        setShown(false);
      }}
    >
      {children}
    </motion.div>
  );
}
