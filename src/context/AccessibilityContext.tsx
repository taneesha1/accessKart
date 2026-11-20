import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type AccessibilityPreferences = {
  fontScale: number;
  highContrast: boolean;
  grayscale: boolean;
  underlineLinks: boolean;
};

const initialPreferences: AccessibilityPreferences = {
  fontScale: 1,
  highContrast: false,
  grayscale: false,
  underlineLinks: false,
};

type AccessibilityValue = {
  preferences: AccessibilityPreferences;
  update: (next: Partial<AccessibilityPreferences>) => void;
  reset: () => void;
};

const AccessibilityContext = createContext<AccessibilityValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useLocalStorage('accesskart-accessibility', initialPreferences);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--font-scale', String(preferences.fontScale));
    root.classList.toggle('high-contrast', preferences.highContrast);
    root.classList.toggle('grayscale', preferences.grayscale);
    root.classList.toggle('underline-links', preferences.underlineLinks);
  }, [preferences]);

  const value: AccessibilityValue = {
    preferences,
    update: (next) => setPreferences((current) => ({ ...current, ...next })),
    reset: () => setPreferences(initialPreferences),
  };

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility(): AccessibilityValue {
  const value = useContext(AccessibilityContext);
  if (!value) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return value;
}
