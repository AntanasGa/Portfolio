import { useTranslation } from "react-i18next";

export default function LoaderFallback() {
  const { t } = useTranslation("shared");
  return (
    <div className="p-full-center">
      <svg viewBox="0 0 64 64" style={{ width: "8rem" }}>
        <title>{t("contentLoader")}</title>
        <defs>
          <linearGradient id="globalGradient" x1="0%" x2="100%" y1="0%" y2="112.5%" gradientUnits="userSpaceOnUse">
            <stop offset="-40%" style={{ stopColor: "var(--animation-translucent-color)" }}>
              <animate
                attributeName="offset"
                from="-30%"
                to="90%"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="-5%" style={{ stopColor: "#fff", stopOpacity: "0.7" }}>
              <animate
                attributeName="offset"
                values="0; 1"
                keyTimes="0; 1"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="0%" style={{ stopColor: "var(--animation-translucent-color)" }}>
            <animate
                attributeName="offset"
                from="-3%"
                to="78%"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>

        <polygon points="16,12 22,10 24,4 26,10 32,12 26,14 24,20 22,14" fill="url(#globalGradient)" />
        <polygon points="0,46 9,43 12,34 15,43 24,46 15,49 12,58 9,49" fill="url(#globalGradient)" />
        <polygon points="16,32 34,24 40,0 46,24 64,32 46,40 40,64 34,40" fill="url(#globalGradient)" />
      </svg>
    </div>
  );
}
