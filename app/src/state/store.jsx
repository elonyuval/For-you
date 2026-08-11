import { createContext, useContext, useMemo, useState } from 'react';

/**
 * Central state for the experience.
 *
 * stage walks forward only:
 *   'gift'    – the scroll-driven unwrapping
 *   'asking'  – card is out, waiting for an answer
 *   'yes'     – she said yes, celebrating + flipping the card
 *   'picking' – choosing a pickup time
 *   'settled' – time locked in, act two unlocked
 */
const DateContext = createContext(null);

export function StoreProvider({ children }) {
  const [stage, setStage] = useState('gift');
  const [time, setTime] = useState(null);
  // Lives at the root so the petal canvas is never nested inside a
  // transformed element, which would break its position:fixed.
  const [celebrating, setCelebrating] = useState(false);

  const value = useMemo(
    () => ({
      stage,
      setStage,
      time,
      setTime,
      celebrating,
      setCelebrating,
      // Act two only exists once a time is on the table — this is what keeps
      // the document from scrolling past the invitation too early.
      actTwoUnlocked: time !== null,
    }),
    [stage, time, celebrating]
  );

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
}

export function useDate() {
  const ctx = useContext(DateContext);
  if (!ctx) throw new Error('useDate must be used inside <StoreProvider>');
  return ctx;
}
