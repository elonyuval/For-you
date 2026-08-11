import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { readSafeAreaInsets, viewportSize } from '../lib/viewport';

const LABELS = [
  'לא',
  'בטוחה?',
  'תחשבי על זה שוב 🤨',
  'נו מה יש לך להפסיד?',
  'טוב, ניסיון אחרון 😂',
];

const MAX_DODGES = 4;
const EDGE_PAD = 10;
const YES_CLEARANCE = 18;

/**
 * The "no" button.
 *
 * It runs away four times — always landing fully inside the viewport, always
 * clear of "yes" — and then gives up and offers a real, gentle way out.
 *
 * Once loose it is portalled to <body>: the card it started in carries a 3D
 * transform, which would otherwise make position:fixed resolve against the
 * card instead of the viewport.
 */
export default function NoButton({ yesRef, onDecline, reduced }) {
  const btnRef = useRef(null);
  const handoffRef = useRef(null); // where it was standing when it broke loose
  const pointerRef = useRef({ x: 0, y: 0 });
  const lastPointerRef = useRef(0);
  const dodgedAtRef = useRef(0);

  const [loose, setLoose] = useState(false);
  const [dodges, setDodges] = useState(0);

  /** Where the button is allowed to land, in viewport pixels. */
  const getBounds = useCallback((w, h) => {
    const inset = readSafeAreaInsets();
    const { width, height } = viewportSize();
    return {
      minX: inset.left + EDGE_PAD,
      maxX: Math.max(inset.left + EDGE_PAD, width - inset.right - EDGE_PAD - w),
      minY: inset.top + EDGE_PAD,
      maxY: Math.max(inset.top + EDGE_PAD, height - inset.bottom - EDGE_PAD - h),
    };
  }, []);

  const yesZone = useCallback(() => {
    const el = yesRef?.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      left: r.left - YES_CLEARANCE,
      right: r.right + YES_CLEARANCE,
      top: r.top - YES_CLEARANCE,
      bottom: r.bottom + YES_CLEARANCE,
      cx: r.left + r.width / 2,
      cy: r.top + r.height / 2,
    };
  }, [yesRef]);

  const pickSpot = useCallback(
    (w, h, fromX, fromY) => {
      const b = getBounds(w, h);
      const zone = yesZone();

      const clearsYes = (x, y) =>
        !zone ||
        x + w < zone.left ||
        x > zone.right ||
        y + h < zone.top ||
        y > zone.bottom;

      let best = null;
      let bestScore = -Infinity;

      for (let i = 0; i < 60; i += 1) {
        const x = b.minX + Math.random() * (b.maxX - b.minX);
        const y = b.minY + Math.random() * (b.maxY - b.minY);
        if (!clearsYes(x, y)) continue;

        const cx = x + w / 2;
        const cy = y + h / 2;
        const fromFinger = Math.hypot(cx - fromX, cy - fromY);
        const fromYes = zone ? Math.hypot(cx - zone.cx, cy - zone.cy) : 0;
        const score = fromFinger * 0.75 + fromYes * 0.25;

        if (score > bestScore) {
          bestScore = score;
          best = { x, y };
        }
      }

      // Cramped screen: the top strip is somewhere "yes" never is
      if (!best) best = { x: (b.minX + b.maxX) / 2, y: b.minY };
      return best;
    },
    [getBounds, yesZone]
  );

  const flyTo = useCallback(
    (fromX, fromY) => {
      const el = btnRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const spot = pickSpot(rect.width, rect.height, fromX, fromY);

      gsap.to(el, {
        x: spot.x,
        y: spot.y,
        duration: reduced ? 0 : 0.42,
        ease: 'power3.out',
        overwrite: 'auto',
      });

      if (!reduced) {
        gsap.fromTo(
          el,
          { rotation: 0 },
          {
            rotation: spot.x > rect.left ? 5 : -5,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'sine.inOut',
          }
        );
      }
    },
    [pickSpot, reduced]
  );

  const clampIntoView = useCallback(() => {
    const el = btnRef.current;
    if (!el || !loose) return;
    const r = el.getBoundingClientRect();
    const b = getBounds(r.width, r.height);
    const x = Number(gsap.getProperty(el, 'x')) || 0;
    const y = Number(gsap.getProperty(el, 'y')) || 0;
    gsap.set(el, {
      x: Math.min(Math.max(x, b.minX), b.maxX),
      y: Math.min(Math.max(y, b.minY), b.maxY),
    });
  }, [getBounds, loose]);

  const attempt = (clientX, clientY) => {
    pointerRef.current = { x: clientX, y: clientY };
    dodgedAtRef.current = Date.now();

    if (!loose) {
      // Remember the spot it is vacating so the portalled copy can start there
      const r = btnRef.current.getBoundingClientRect();
      handoffRef.current = { x: r.left, y: r.top };
      setLoose(true);
    }

    // The flight itself waits for the re-render: the new label changes the
    // button's width, and the landing spot has to be computed from that.
    setDodges((n) => n + 1);
  };

  const handlePointerDown = (e) => {
    lastPointerRef.current = Date.now();
    if (dodges >= MAX_DODGES) return; // she has earned the click
    e.preventDefault();
    attempt(e.clientX, e.clientY);
  };

  const handlePointerEnter = (e) => {
    if (e.pointerType !== 'mouse' || dodges >= MAX_DODGES) return;
    lastPointerRef.current = Date.now();
    attempt(e.clientX, e.clientY);
  };

  const handleClick = () => {
    // A tap that just made the button run away also fires a click once the
    // dodge has been committed — swallow that one, or the fourth escape would
    // instantly decline for her.
    if (Date.now() - dodgedAtRef.current < 700) return;

    // preventDefault on pointerdown still lets a click through on touch, so a
    // recent pointer event — not event.detail — is what tells a real press
    // apart from keyboard activation.
    const fromPointer = Date.now() - lastPointerRef.current < 700;
    if (!fromPointer || dodges >= MAX_DODGES) onDecline();
  };

  /* Every escape happens here, after the new label has been committed, so the
     landing spot is computed from the width the button is about to have.
     On the first one the portalled node is first parked exactly where the
     inline one stood — all before paint, so nothing jumps. */
  useLayoutEffect(() => {
    if (dodges === 0) return;
    const el = btnRef.current;
    if (!el) return;

    if (handoffRef.current) {
      gsap.set(el, { x: handoffRef.current.x, y: handoffRef.current.y });
      handoffRef.current = null;
    }

    flyTo(pointerRef.current.x, pointerRef.current.y);
  }, [dodges, flyTo]);

  useEffect(() => {
    const onResize = () => clampIntoView();
    window.addEventListener('resize', onResize);
    window.visualViewport?.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
    };
  }, [clampIntoView]);

  const button = (
    <button
      ref={btnRef}
      type="button"
      className={`btn btn--no${loose ? ' btn--loose' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onClick={handleClick}
    >
      {LABELS[Math.min(dodges, LABELS.length - 1)]}
    </button>
  );

  return (
    <>
      {/* Placeholder keeps the card's height steady once the button leaves */}
      <span className="no-slot">{loose ? null : button}</span>
      {loose && createPortal(button, document.body)}

      {dodges >= MAX_DODGES && (
        <button type="button" className="link-soft" onClick={onDecline}>
          לא הפעם
        </button>
      )}
    </>
  );
}
