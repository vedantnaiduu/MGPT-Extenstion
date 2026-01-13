import React, { useState } from "react";
import { COLORS, PRIMARY_GRADIENT } from "../lib/constants";

// Text input field for submitting math queries
export const InputBar: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{ padding: "0 16px 12px" }}>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          background: COLORS.inputBackground,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 12,
          border: isFocused ? "1.5px solid rgba(74,159,255,0.8)" : "1px solid rgba(255,255,255,0.08)",
          boxShadow: isFocused ? "0 0 0 3px rgba(74,159,255,0.2)" : "none",
          transition: "all 0.2s ease",
        }}
      >
        <input
          type="text"
          placeholder="Ask MathGPT..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.95)",
            fontSize: 13,
            padding: "10px 40px 10px 14px",
            outline: "none",
            fontFamily: "inherit",
            fontWeight: 500,
          }}
        />
        <SubmitButton isActive={isFocused} />
      </div>
    </div>
  );
};

// Circular submit button with gradient when focused
const SubmitButton: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <button
    style={{
      position: "absolute",
      right: 5,
      width: 26,
      height: 26,
      borderRadius: "50%",
      background: isActive ? PRIMARY_GRADIENT : "rgba(255,255,255,0.12)",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease",
      boxShadow: isActive ? "0 2px 8px rgba(74,159,255,0.4)" : "none",
    }}
  >
    <svg
      width={11}
      height={11}
      viewBox="0 0 24 24"
      fill="none"
      stroke={isActive ? "white" : COLORS.textSecondary}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  </button>
);
