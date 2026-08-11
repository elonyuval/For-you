import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MentosRoll from '../art/MentosRoll';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const SCROLL_LENGTH = 460; // vh

const ITEMS = [
  { text: 'לבוא יפה', note: 'אבל זה ברגיל…' },
  { text: 'חיוך' },
  { text: 'קצת סבלנות אליי' },
];

function Check() {
  return (
    <svg className="check" viewBox="0 0 28 28" aria-hidden="true">
      <circle className="check__circle" cx="14" cy="14" r="12.4" />
      <path className="check__tick" d="M8.4 14.6 L12.4 18.4 L19.8 9.9" />
    </svg>
  );
}

/**
 * Act two: the packing list, a beat of silence, and then the important part.
 */
export default function ChecklistStage() {
  const wrapRef = useRef(null);
  const sceneRef = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const q = gsap.utils.selector(scene);

    const ctx = gsap.context(() => {
      gsap.set(q('.check__tick'), { strokeDasharray: 22, strokeDashoffset: 22 });

      // Reduced motion: everything simply present, list included
      if (reduced) {
        gsap.set(q('.list__title, .list-item'), { opacity: 1, x: 0 });
        gsap.set(q('.check__tick'), { strokeDashoffset: 0 });
        gsap.set(q('.finale__lead, .finale__word, .finale__kicker'), {
          opacity: 1,
        });
        gsap.set(q('.mentos-holder'), { opacity: 1 });
        return;
      }

      gsap.set(q('.list__title'), { opacity: 0, y: 18 });
      gsap.set(q('.list-item'), { opacity: 0, x: 26 });
      gsap.set(q('.finale__word'), { scale: 0.4, transformOrigin: '50% 50%' });
      gsap.set(q('.mentos-holder'), { y: 90, rotate: 18, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      tl.to({}, { duration: 1 }, 0);

      tl.to(
        q('.list__title'),
        { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' },
        0.02
      );

      // Each line lands with its own tick
      const items = q('.list-item');
      const ticks = q('.check__tick');
      const starts = [0.12, 0.26, 0.4];

      items.forEach((item, i) => {
        tl.to(
          item,
          { opacity: 1, x: 0, duration: 0.09, ease: 'power2.out' },
          starts[i]
        );
        tl.to(
          ticks[i],
          { strokeDashoffset: 0, duration: 0.08, ease: 'power2.out' },
          starts[i] + 0.04
        );
      });

      // 0.50 → 0.62 is deliberately empty: the pause before the punchline

      tl.to(
        q('.list-block'),
        { opacity: 0, y: -26, scale: 0.97, duration: 0.08, ease: 'power2.in' },
        0.62
      );

      tl.to(
        q('.finale__lead'),
        { opacity: 1, duration: 0.07, ease: 'power2.out' },
        0.68
      );

      tl.to(
        q('.finale__word'),
        { opacity: 1, scale: 1, duration: 0.1, ease: 'back.out(1.9)' },
        0.79
      );

      tl.to(
        q('.mentos-holder'),
        { opacity: 1, y: 0, rotate: -7, duration: 0.11, ease: 'back.out(1.4)' },
        0.81
      );

      tl.to(
        q('.finale__kicker'),
        { opacity: 1, duration: 0.07, ease: 'power2.out' },
        0.9
      );
    }, scene);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      className={`stage-wrap${reduced ? ' is-static' : ''}`}
      ref={wrapRef}
      style={{ height: reduced ? 'auto' : `${SCROLL_LENGTH}vh` }}
    >
      <div className="stage">
        <div className="scene" ref={sceneRef}>
          <div className="list-scene">
            <div className="list-block">
              <h2 className="list__title">מה צריך להביא איתך:</h2>
              <ul className="list__items">
                {ITEMS.map((item) => (
                  <li className="list-item" key={item.text}>
                    <Check />
                    <span className="list-item__text">
                      {item.text}
                      {item.note && (
                        <span className="list-item__note">{item.note}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="finale">
            <p className="finale__lead">והכי חשוב!</p>
            <p className="finale__word">מנטוס.</p>
            <p className="finale__kicker">בלי מנטוס אין כניסה.</p>
            <div className="mentos-holder">
              <MentosRoll />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
