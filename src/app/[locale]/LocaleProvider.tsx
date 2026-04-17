'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@/i18n';

const LocaleContext = createContext<string>('en');

export function useLocale() {
  return useContext(LocaleContext);
}

export default function LocaleProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const { i18n } = useTranslation();
  const [currentLocale, setCurrentLocale] = useState(locale);

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
    setCurrentLocale(locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={currentLocale}>
      {children}
    </LocaleContext.Provider>
  );
}
