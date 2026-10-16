"use client";

import { createContext, useCallback, useContext, useState } from "react";

type Intro = { done: boolean; finish: () => void };

const IntroCtx = createContext<Intro>({ done: true, finish: () => {} });

export function IntroProvider({
  children,
  initialDone,
}: {
  children: React.ReactNode;
  initialDone: boolean;
}) {
  const [done, setDone] = useState(initialDone);
  const finish = useCallback(() => setDone(true), []);
  return <IntroCtx.Provider value={{ done, finish }}>{children}</IntroCtx.Provider>;
}

export const useIntro = () => useContext(IntroCtx);
