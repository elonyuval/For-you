import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useDate } from '../state/store';
import { useReducedMotion } from '../hooks/useReducedMotion';
import NoButton from './NoButton';
import TimePicker from './TimePicker';

/**
 * The greeting card. One physical face whose contents are swapped mid-flip,
 * which sidesteps every backface-visibility quirk on iOS while still reading
 * as a card turning over.
 */
export default function InviteCard() {
  const { stage, setStage, time, setTime, setCelebrating } = useDate();
  const reduced = useReducedMotion();

  const cardRef = useRef(null);
  const faceRef = useRef(null);
  const yesRef = useRef(null);
  const heightRef = useRef(0);

  /* Smooth the card's height whenever its contents change ------------- */
  useLayoutEffect(() => {
    const el = faceRef.current;
    if (!el) return;
    const next = el.offsetHeight;
    const prev = heightRef.current;
    heightRef.current = next;

    if (!prev || prev === next || reduced) return;
    gsap.fromTo(
      el,
      { height: prev },
      {
        height: next,
        duration: 0.4,
        ease: 'power2.inOut',
        clearProps: 'height',
      }
    );
  }, [stage, reduced]);

  /* Gentle entrance for freshly swapped copy -------------------------- */
  useEffect(() => {
    const el = faceRef.current;
    if (!el || reduced) return;
    gsap.fromTo(
      el.querySelectorAll('[data-fade]'),
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.08,
      }
    );
  }, [stage, reduced]);

  const flipTo = (nextStage, then) => {
    const card = cardRef.current;

    if (reduced) {
      setStage(nextStage);
      if (then) gsap.delayedCall(1.6, then);
      return;
    }

    const tl = gsap.timeline();
    tl.to(card, { rotationY: 90, duration: 0.32, ease: 'power2.in' })
      .add(() => setStage(nextStage))
      .set(card, { rotationY: -90 })
      .to(card, { rotationY: 0, duration: 0.44, ease: 'power2.out' });

    if (then) tl.to({}, { duration: 1.7 }).add(then);
  };

  const handleYes = () => {
    setCelebrating(true);
    flipTo('yes', () => setStage('picking'));
  };

  const handlePick = (chosen) => {
    setTime(chosen);
    setStage('settled');
  };

  const asking = stage === 'gift' || stage === 'asking';

  return (
    <>
      <div className="card" ref={cardRef}>
        <div className="card__face" ref={faceRef}>
          {asking && (
            <>
              <Flourish />
              <p className="card__question" data-fade>
                רוצה לצאת איתי בשישי בערב? 🌹
              </p>
              <p className="card__aside" data-fade>
                (ל&quot;לא&quot; יש חוקים משלו)
              </p>
              <div className="card__actions">
                <button
                  ref={yesRef}
                  type="button"
                  className="btn btn--yes"
                  onClick={handleYes}
                >
                  כן ❤️
                </button>
                <NoButton
                  yesRef={yesRef}
                  reduced={reduced}
                  onDecline={() => setStage('softno')}
                />
              </div>
            </>
          )}

          {stage === 'yes' && (
            <>
              <Flourish />
              <p className="card__question" data-fade>
                ידעתי שאת חכמה 😌
              </p>
              <p className="card__sub" data-fade>
                עכשיו נשאר לסגור כמה פרטים קטנים…
              </p>
            </>
          )}

          {stage === 'picking' && (
            <div data-fade>
              <TimePicker onPick={handlePick} />
            </div>
          )}

          {stage === 'settled' && <Settled time={time} reduced={reduced} />}

          {stage === 'softno' && (
            <>
              <Flourish />
              <p className="card__question" data-fade>
                אין לחץ 🙂
              </p>
              <p className="card__sub" data-fade>
                הפרחים נשארים אצלך בכל מקרה.
              </p>
              <div className="card__actions">
                <button
                  type="button"
                  className="btn btn--yes"
                  onClick={handleYes}
                >
                  רגע, בעצם כן ❤️
                </button>
                <button
                  type="button"
                  className="link-soft"
                  onClick={() => setStage('rain')}
                >
                  באמת לא הפעם
                </button>
              </div>
            </>
          )}

          {stage === 'rain' && (
            <>
              <Flourish />
              <p className="card__question" data-fade>
                סבבה לגמרי 🌹
              </p>
              <p className="card__sub" data-fade>
                ההצעה נשארת פתוחה. תגידי מתי מתאים לך, ואני שם.
              </p>
              <div className="card__actions">
                <button
                  type="button"
                  className="btn btn--yes"
                  onClick={handleYes}
                >
                  שיניתי את דעתי ❤️
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function Settled({ time, reduced }) {
  const noteRef = useRef(null);

  useEffect(() => {
    const el = noteRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: reduced ? 0.01 : 0.6,
        delay: reduced ? 0.2 : 1.15,
        ease: 'power2.out',
      }
    );
  }, [reduced]);

  return (
    <div className="settled">
      <p className="settled__headline" data-fade>
        קבענו! ❤️
      </p>
      <p className="settled__when" data-fade>
        שישי ב־<bdi>{time}</bdi>
      </p>
      <p className="settled__note" ref={noteRef}>
        בלי איחורים. ⏰
      </p>
    </div>
  );
}

function Flourish() {
  return (
    <svg className="card__flourish" viewBox="0 0 78 12" aria-hidden="true">
      <path
        d="M2 6 C16 0 26 12 39 6 C52 0 62 12 76 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="39" cy="6" r="2" fill="currentColor" />
    </svg>
  );
}
