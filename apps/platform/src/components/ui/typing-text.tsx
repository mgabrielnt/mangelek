"use client";

import { useEffect, useRef, useState } from "react";

type TypingTextProps = {
  text: string;
  speed?: number;
  delay?: number;
};

export function TypingText({ text, speed = 45, delay = 0 }: TypingTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setStarted(true);
      observer.disconnect();
    }, { threshold: 0.45 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLength(text.length);
      return;
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = setTimeout(() => {
      const type = (next: number) => {
        setLength(next);
        if (next < text.length) timer = setTimeout(() => type(next + 1), speed);
      };
      type(1);
    }, delay);
    return () => {
      clearTimeout(start);
      if (timer) clearTimeout(timer);
    };
  }, [started, text, speed, delay]);

  const done = length >= text.length;
  return <span ref={rootRef} className="typingText" aria-label={text}>
    <span className="typingGhost" aria-hidden>{text}</span>
    <span className="typingValue" aria-hidden>{text.slice(0, length)}{!done && <i className="typingCursor" />}</span>
  </span>;
}
