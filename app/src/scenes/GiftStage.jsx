import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArtDefs from '../art/ArtDefs';
import Bouquet from '../art/Bouquet';
import {
  BoxShadow,
  BoxBack,
  BoxFront,
  BoxLid,
  BoxRibbon,
} from '../art/GiftBox';
import InviteCard from './InviteCard';
import { useDate } from '../state/store';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/** How much scrolling the whole unwrapping takes. */
const SCROLL_LENGTH = 520; // vh

/** Progress at which the card is fully out and the buttons go live. */
const LIVE_AT = 0.93;

export default function GiftStage() {
  const wrapRef = useRef(null);
  const sceneRef = useRef(null);
  const timelineRef = useRef(null);
  const triggerRef = useRef(null);
  const liveRef = useRef(false);

  const [live, setLive] = useState(false);
  const { stage, setStage } = useDate();
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const q = gsap.utils.selector(scene);

    const ctx = gsap.context(() => {
      /* Resting state, before a single pixel is scrolled ---------------- */
      gsap.set(q('.bloom'), { scale: 0, transformOrigin: '50% 100%' });
      gsap.set(q('.sprig'), { scale: 0, transformOrigin: '50% 100%' });
      gsap.set(q('.stems'), { scaleY: 0.2, transformOrigin: '50% 100%' });
      gsap.set(q('.wrap'), { scale: 0.88, transformOrigin: '50% 100%' });
      gsap.set(q('.bouquet'), { y: 300, transformOrigin: '50% 100%' });
      gsap.set(q('.camera'), { scale: 1.16, y: -50, svgOrigin: '200 540' });
      gsap.set(q('.card'), {
        opacity: 0,
        scale: 0.3,
        y: -360,
        rotationX: 52,
        transformPerspective: 900,
        transformOrigin: '50% 50%',
      });

      /* Reduced motion: no scrubbing, just present the finished scene --- */
      if (reduced) {
        gsap.set(q('.box-shadow, .box-back, .box-front, .box-lid, .box-ribbon'), {
          opacity: 0,
        });
        gsap.set(q('.intro, .scroll-hint'), { opacity: 0 });
        gsap.set(q('.camera'), { scale: 1, y: 0 });
        gsap.set(q('.bouquet'), { y: -56 });
        gsap.set(q('.wrap'), { scale: 1 });
        gsap.set(q('.stems'), { scaleY: 1 });
        gsap.set(q('.sprig'), { scale: 1 });
        gsap.set(q('.bloom'), { scale: 1 });
        gsap.set(q('.scrim'), { opacity: 1 });
        gsap.to(q('.card'), {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationX: 0,
          duration: 0.5,
          delay: 0.25,
          ease: 'power2.out',
        });
        liveRef.current = true;
        setLive(true);
        setStage((s) => (s === 'gift' ? 'asking' : s));
        return;
      }

      /* The one continuous, scrubbed sequence --------------------------- */
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.55,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const isLive = self.progress >= LIVE_AT;
            if (isLive !== liveRef.current) {
              liveRef.current = isLive;
              setLive(isLive);
              if (isLive) setStage((s) => (s === 'gift' ? 'asking' : s));
            }
          },
        },
      });

      timelineRef.current = tl;
      triggerRef.current = tl.scrollTrigger;

      // Spine: pins the timeline's total length to exactly 1, so every
      // position below reads as a fraction of the scroll.
      tl.to({}, { duration: 1 }, 0);

      // 1 — the invitation to scroll gets out of the way
      tl.to(q('.scroll-hint'), { opacity: 0, duration: 0.05 }, 0);
      tl.to(
        q('.intro'),
        { opacity: 0, y: -28, duration: 0.1, ease: 'power1.in' },
        0.02
      );

      // 2 — the ribbon gives way
      tl.to(
        q('.bow'),
        {
          scale: 0.28,
          rotation: 20,
          opacity: 0,
          duration: 0.13,
          transformOrigin: '50% 50%',
          ease: 'power2.in',
        },
        0.05
      );
      tl.to(
        q('.ribbon-v'),
        { y: 200, opacity: 0, duration: 0.14, ease: 'power1.in' },
        0.07
      );
      tl.to(
        q('.ribbon-h'),
        {
          scaleX: 0,
          opacity: 0,
          duration: 0.12,
          transformOrigin: '50% 50%',
          ease: 'power1.in',
        },
        0.07
      );

      // 3 — the lid lifts, then leaves
      tl.to(
        q('.box-lid'),
        {
          y: -122,
          rotation: -5,
          duration: 0.13,
          transformOrigin: '50% 100%',
          ease: 'power2.out',
        },
        0.19
      );
      tl.to(
        q('.box-lid'),
        { y: -540, rotation: -19, opacity: 0, duration: 0.09, ease: 'power2.in' },
        0.32
      );

      // 4 — the camera eases back to make room for what is coming
      tl.to(
        q('.camera'),
        { scale: 1, y: 0, duration: 0.36, ease: 'power2.inOut' },
        0.08
      );

      // 5 — the bouquet rises out of the box
      tl.to(q('.bouquet'), { y: -20, duration: 0.34, ease: 'power2.out' }, 0.28);
      tl.to(q('.wrap'), { scale: 1, duration: 0.2, ease: 'power2.out' }, 0.3);
      tl.to(
        q('.stems'),
        { scaleY: 1, duration: 0.18, ease: 'power2.out' },
        0.34
      );

      // 6 — and opens
      tl.to(
        q('.sprig'),
        { scale: 1, duration: 0.16, stagger: 0.016, ease: 'back.out(1.5)' },
        0.36
      );
      tl.to(
        q('.bloom'),
        { scale: 1, duration: 0.18, stagger: 0.019, ease: 'back.out(1.7)' },
        0.4
      );

      // 7 — the box bows out and the bouquet settles
      tl.to(
        q('.box-shadow, .box-back, .box-front'),
        { y: 62, opacity: 0, duration: 0.1, ease: 'power2.in' },
        0.6
      );
      tl.to(
        q('.bouquet'),
        { y: -56, scale: 1.03, duration: 0.22, ease: 'power2.inOut' },
        0.62
      );

      // 8 — the card is drawn out from among the flowers
      tl.to(q('.scrim'), { opacity: 1, duration: 0.18 }, 0.68);
      tl.to(
        q('.card'),
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationX: 0,
          duration: 0.22,
          ease: 'power2.out',
        },
        0.7
      );
    }, scene);

    return () => ctx.revert();
  }, [reduced, setStage]);

  /* Once she has answered, the unwrapping is history: freeze it so a stray
     scroll upward can't rewind the card out from under her. */
  useEffect(() => {
    const answered = stage !== 'gift' && stage !== 'asking';
    if (!answered) return;
    const tl = timelineRef.current;
    const st = triggerRef.current;
    if (st) st.disable(false);
    if (tl) tl.progress(1);
  }, [stage]);

  return (
    <section
      className="stage-wrap"
      ref={wrapRef}
      style={{ height: reduced ? 'var(--stage-h)' : `${SCROLL_LENGTH}vh` }}
    >
      <div className="stage">
        <div className="scene" ref={sceneRef}>
          <div className="intro">
            <h1 className="intro__title">
              הבאתי מתנה <em>לילדה הכי יפה בעולם</em>…
            </h1>
          </div>

          <svg
            className="art"
            viewBox="0 0 400 760"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <ArtDefs />

            {/* One group for the whole scene, so the "camera" can ease back
                as the bouquet needs more room */}
            <g className="camera">
              <BoxShadow />
              <BoxBack />

              <g clipPath="url(#boxReveal)">
                <g className="bouquet">
                  <g transform="translate(200 540)">
                    <Bouquet />
                  </g>
                </g>
              </g>

              <BoxFront />
              <BoxLid />
              <BoxRibbon />
            </g>
          </svg>

          <div className="scroll-hint">
            תגללי
            <span className="scroll-hint__arrow">↓</span>
          </div>

          <div className="scrim" />

          <div
            className={`card-layer${live ? ' is-live' : ''}${
              stage === 'settled' ? ' is-settled' : ''
            }`}
          >
            <InviteCard />
          </div>

          {stage === 'settled' && (
            <div className="scroll-hint scroll-hint--more">
              תגללי
              <span className="scroll-hint__arrow">↓</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
