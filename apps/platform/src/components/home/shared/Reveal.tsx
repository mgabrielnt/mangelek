"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children, className = "" }: {
  children: ReactNode; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (!node || preference.matches) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      if (!preference.matches) animation = node.animate([
        { opacity: .2, transform: "translateY(20px)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 600, easing: "cubic-bezier(.16,1,.3,1)" });
      observer.disconnect();
    }, { threshold: .12 });
    const stop = () => { if (preference.matches) animation?.finish(); };
    observer.observe(node);
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      animation?.cancel();
      preference.removeEventListener("change", stop);
    };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
