import { useState, useEffect, useRef } from "react";

/**
 * Country dial-code mapping (ISO 3166-1 alpha-2 → calling code).
 * Covers the most common countries for NRI / expat audiences.
 */
const COUNTRY_DIAL_CODES = {
  IN: "+91",
  US: "+1",
  GB: "+44",
  CA: "+1",
  AU: "+61",
  AE: "+971",
  SG: "+65",
  MY: "+60",
  NZ: "+64",
  DE: "+49",
  FR: "+33",
  JP: "+81",
  KR: "+82",
  HK: "+852",
  SA: "+966",
  QA: "+974",
  KW: "+965",
  OM: "+968",
  BH: "+973",
  LK: "+94",
  ZA: "+27",
  BR: "+55",
  MX: "+52",
  IT: "+39",
  ES: "+34",
  NL: "+31",
  SE: "+46",
  CH: "+41",
  IE: "+353",
  TH: "+66",
  TW: "+886",
  CN: "+86",
  IL: "+972",
  PK: "+92",
  BD: "+880",
  NP: "+977",
};

/** Fallback defaults (India-specific) */
const FALLBACK = {
  timezone: "Asia/Kolkata",
  dialCode: "+91",
  country: "India",
  city: "",
};

/**
 * Attempts to detect the user's timezone, country, city, and phone
 * dial code using the browser's Intl API (timezone) and a free IP
 * geolocation service (ipapi.co). No browser GPS permission is
 * requested — detection is IP-based only.
 *
 * On failure every value silently falls back to India defaults so the
 * form remains fully functional.
 */
export default function useAutoDetect() {
  /* Track whether the async detection is still in progress */
  const [detecting, setDetecting] = useState(true);

  /* Detected values — initialised with India fallbacks */
  const [detected, setDetected] = useState({
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || FALLBACK.timezone,
    dialCode: FALLBACK.dialCode,
    countryCity: "",
  });

  /* Ref to avoid setting state on an unmounted component */
  const mountedRef = useRef(true);

  useEffect(() => {
    let cancelled = false;

    async function detect() {
      try {
        /* ── 1. Detect timezone from browser (no API call) ── */
        const timezone =
          Intl.DateTimeFormat().resolvedOptions().timeZone || FALLBACK.timezone;

        /* ── 2. Fetch country & city from ipapi.co (IP-based, no GPS) ── */
        const res = await fetch("https://ipapi.co/json/", {
          signal: AbortSignal.timeout(5000), // 5-second timeout
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        /* Safely extract fields; any missing value is treated as a failure */
        const countryName = (data.country_name || "").trim();
        const cityName = (data.city || "").trim();
        const countryCode = (data.country_code || "").trim().toUpperCase();

        if (countryName && cityName) {
          /* Build "Country, City" string */
          const countryCity = `${countryName}, ${cityName}`;

          /* Look up the dial code for the detected country */
          const dialCode = COUNTRY_DIAL_CODES[countryCode] || FALLBACK.dialCode;

          if (!cancelled && mountedRef.current) {
            setDetected({ timezone, dialCode, countryCity });
          }
        } else {
          /* Partial response — use timezone only, keep India fallbacks for the rest */
          if (!cancelled && mountedRef.current) {
            setDetected((prev) => ({ ...prev, timezone }));
          }
        }
      } catch {
        /*
         * Any failure (network, timeout, bad response) → silently fall back
         * to India defaults. The timezone from step 1 is kept since it
         * doesn't depend on the API.
         */
        try {
          const timezone =
            Intl.DateTimeFormat().resolvedOptions().timeZone || FALLBACK.timezone;
          if (!cancelled && mountedRef.current) {
            setDetected((prev) => ({
              timezone,
              dialCode: FALLBACK.dialCode,
              countryCity: prev.countryCity || "",
            }));
          }
        } catch {
          // Double-failure (very unlikely): stick with initial state
        }
      } finally {
        if (!cancelled && mountedRef.current) {
          setDetecting(false);
        }
      }
    }

    detect();

    return () => {
      cancelled = true;
      mountedRef.current = false;
    };
  }, []);

  return { detecting, detected };
}
