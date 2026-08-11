import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StoreProvider, useDate } from './state/store';
import GiftStage from './scenes/GiftStage';
import ChecklistStage from './scenes/ChecklistStage';
import FinalScene from './scenes/FinalScene';
import Petals from './fx/Petals';
import { useReducedMotion } from './hooks/useReducedMotion';

/**
 * Act two only exists once a pickup time has been chosen. Keeping it out of
 * the document is what stops her from scrolling past the invitation before
 * she has answered it — no scroll hijacking required.
 */
function ActTwo() {
  const { actTwoUnlocked } = useDate();

  useEffect(() => {
    if (!actTwoUnlocked) return undefined;
    // The document just got taller; let ScrollTrigger remeasure.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [actTwoUnlocked]);

  if (!actTwoUnlocked) return null;

  return (
    <>
      <ChecklistStage />
      <FinalScene />
    </>
  );
}

/** Root-level so the canvas is never trapped inside a transformed ancestor. */
function Celebration() {
  const { celebrating, setCelebrating } = useDate();
  const reduced = useReducedMotion();

  return (
    <Petals
      run={celebrating}
      onDone={() => setCelebrating(false)}
      count={reduced ? 14 : 42}
      duration={reduced ? 1400 : 2900}
    />
  );
}

export default function App() {
  return (
    <StoreProvider>
      <GiftStage />
      <ActTwo />
      <Celebration />
    </StoreProvider>
  );
}
