import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

const TIMES = ['22:00', '22:30', '23:00', '23:30'];

/**
 * Four big, thumb-sized time slots. Picking one dissolves the rest and hands
 * the choice up to the store.
 */
export default function TimePicker({ onPick }) {
  const gridRef = useRef(null);
  const [picked, setPicked] = useState(null);
  const reduced = useReducedMotion();

  const choose = (time, e) => {
    if (picked) return;
    setPicked(time);

    const chosen = e.currentTarget;
    const others = Array.from(gridRef.current.children).filter(
      (el) => el !== chosen
    );

    if (reduced) {
      gsap.set(others, { opacity: 0 });
      gsap.delayedCall(0.35, () => onPick(time));
      return;
    }

    const tl = gsap.timeline({ onComplete: () => onPick(time) });

    tl.to(chosen, {
      scale: 1.06,
      duration: 0.18,
      ease: 'power2.out',
    })
      .to(
        others,
        {
          opacity: 0,
          scale: 0.9,
          y: 6,
          duration: 0.34,
          stagger: 0.05,
          ease: 'power2.inOut',
        },
        0.06
      )
      .to(chosen, { scale: 1, duration: 0.22, ease: 'power2.inOut' }, '>-0.1')
      .to(gridRef.current, { opacity: 0, duration: 0.28, ease: 'power1.in' }, '>+0.25');
  };

  return (
    <div className="picker">
      <h2 className="picker__title">באיזו שעה לאסוף אותך?</h2>

      <div className="picker__grid" ref={gridRef}>
        {TIMES.map((t) => (
          <button
            key={t}
            type="button"
            className={`time-btn${picked === t ? ' is-picked' : ''}`}
            onClick={(e) => choose(t, e)}
            aria-pressed={picked === t}
          >
            <bdi>{t}</bdi>
          </button>
        ))}
      </div>
    </div>
  );
}
