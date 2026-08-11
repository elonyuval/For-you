import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArtDefs from '../art/ArtDefs';
import Bouquet from '../art/Bouquet';
import Petals from '../fx/Petals';
import { useDate } from '../state/store';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { WHATSAPP_NUMBER, whatsappLink } from '../config';

gsap.registerPlugin(ScrollTrigger);

/** The closing summary, and the little curtain call behind it. */
export default function FinalScene() {
  const { time } = useDate();
  const reduced = useReducedMotion();

  const sectionRef = useRef(null);
  const summaryRef = useRef(null);
  const curtainRef = useRef(null);
  const [closing, setClosing] = useState(false);

  useLayoutEffect(() => {
    const el = summaryRef.current;
    if (!el) return undefined;

    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 62%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const handleClose = () => {
    setClosing(true);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      const root = curtainRef.current;
      if (!root) return;
      const art = root.querySelector('.curtain__art');
      const panel = root.querySelector('.curtain__panel');

      if (reduced) {
        gsap.set(root, { opacity: 1 });
        gsap.set(panel, { opacity: 1 });
        return;
      }

      const tl = gsap.timeline();
      tl.to(root, { opacity: 1, duration: 0.45, ease: 'power2.out' })
        .fromTo(
          art,
          { y: '42%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1.1, ease: 'power3.out' },
          0.1
        )
        .fromTo(
          panel,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          0.6
        );
    });
  };

  return (
    <>
      <section className="closing" ref={sectionRef}>
        <div className="summary" ref={summaryRef}>
          <h2 className="summary__title">קבענו ❤️</h2>

          {/* Explicit row — the order of "שישי" and the time never depends
              on bidi resolution */}
          <p className="summary__when">
            <span>שישי</span>
            <span className="summary__sep" aria-hidden="true" />
            <bdi>{time}</bdi>
          </p>

          <p className="summary__lines">
            אני דואג לכל השאר.
            <br />
            אה… ובלי איחורים.
          </p>

          <button
            type="button"
            className="btn btn--yes summary__cta"
            onClick={handleClose}
          >
            קבענו ❤️
          </button>
        </div>
      </section>

      {closing && (
        <div className="curtain" ref={curtainRef}>
          <Petals run count={reduced ? 12 : 34} duration={reduced ? 1200 : 3400} />

          <svg
            className="curtain__art"
            viewBox="46 132 308 462"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden="true"
          >
            <ArtDefs />
            <g transform="translate(200 540)">
              <Bouquet />
            </g>
          </svg>

          <div className="curtain__panel">
            {/* The smiley has to be isolated as LTR, or bidi mirrors the
                bracket and turns it into a frown */}
            <p className="curtain__note">
              נתראה בשישי{' '}
              <bdi dir="ltr">:)</bdi>
            </p>

            {/* Without this he never learns which time she picked — the
                choice lives only in her browser. Hidden if unconfigured. */}
            {WHATSAPP_NUMBER && (
              <a
                className="btn btn--yes curtain__send"
                href={whatsappLink(time)}
                target="_blank"
                rel="noopener noreferrer"
              >
                לשלוח לו שקבענו ❤️
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
