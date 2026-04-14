import { useState, useEffect } from "react";

export function useConsentHistoryLastVisit() {
  const [lastVisitTime] = useState(() => {
    const saved = localStorage.getItem("consentHistoryLastVisit");
    return saved ? new Date(saved).getTime() : Date.now();
  });

  useEffect(() => {
    // Only update on unmount (component leaving the page)
    return () => {
      const now = new Date().toISOString();
      localStorage.setItem("consentHistoryLastVisit", now);
    };
  }, []);

  return lastVisitTime;
}
