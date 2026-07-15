"use client";

import { useEffect, useState } from "react";
import i18n from "../lib/i18n";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) {
      setReady(true);
      return;
    }

    i18n.init().then(() => setReady(true));
  }, []);

  if (!ready) {
    return null;
  }

  return <>{children}</>;
}
