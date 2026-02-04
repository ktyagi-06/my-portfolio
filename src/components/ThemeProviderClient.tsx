'use client';

import { ThemeProvider } from 'next-themes';
import React from 'react';

export default function ThemeProviderClient({ children }: { children: React.ReactNode }) {
  return (
    // attribute="class" makes next-themes toggle the 'dark' class on the html element,
    // but it will do it after hydration (no DOM mutation before hydration).
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}