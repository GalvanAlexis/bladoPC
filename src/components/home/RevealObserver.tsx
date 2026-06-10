"use client";

import { useEffect } from 'react';

export default function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Optional: unobserve after revealing so it only animates once
            // observer.unobserve(entry.target);
          } else {
            // Remove to animate again if scrolling up
            entry.target.classList.remove('in-view');
          }
        });
      },
      {
        threshold: 0.1, // Dispara cuando el 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px', // Opcional: dispara un poco antes de llegar al fondo
      }
    );

    const revealElements = document.querySelectorAll('.reveal, .reveal-fade');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return null;
}
