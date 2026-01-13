import React, { useState } from "react";
import { TopBar } from "./TopBar";
import { InputBar } from "./InputBar";
import { TOOLTIP_WIDTH, COLORS } from "../lib/constants";

interface TooltipProps {
  position: { x: number; y: number };
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
}

const containerStyle: React.CSSProperties = {
  position: "fixed",
  zIndex: 2147483647,
  pointerEvents: "auto",
  display: "flex",
  flexDirection: "column",
  width: `${TOOLTIP_WIDTH}px`,
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const glassStyle: React.CSSProperties = {
  background: COLORS.glass,
  backdropFilter: "blur(40px)",
  WebkitBackdropFilter: "blur(40px)",
  borderRadius: 20,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.25s ease",
};

const contentStyle: React.CSSProperties = {
  padding: "4px 20px 14px",
  color: COLORS.textPrimary,
  fontWeight: 500,
  lineHeight: 1.55,
  letterSpacing: "-0.01em",
};

export const Tooltip: React.FC<TooltipProps> = ({
  position,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      data-tooltip-container
      style={{
        ...containerStyle,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          ...glassStyle,
          border: `1px solid ${isHovered ? COLORS.glassBorderHover : COLORS.glassBorder}`,
          boxShadow: isHovered
            ? "0 20px 40px -8px rgba(0,0,0,0.4), 0 0 20px 2px rgba(74,159,255,0.15)"
            : "0 16px 32px -8px rgba(0,0,0,0.3)",
          transform: isHovered ? "translateY(-1px)" : "translateY(0)",
        }}
      >
        <TopBar
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onMinimize={() => setIsMinimized(!isMinimized)}
        />

        <div
          style={{
            transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            overflow: "hidden",
            maxHeight: isMinimized ? 0 : 400,
            opacity: isMinimized ? 0 : 1,
          }}
        >
          <div style={contentStyle}>
            <p style={{ fontSize: 14, margin: "0 0 10px" }}>
              To solve 1 + 1, we simply add the two numbers together.
            </p>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', Menlo, Monaco, monospace",
                color: "#fff",
                margin: "0 0 10px",
                letterSpacing: "0.02em",
              }}
            >
              1 + 1 = 2
            </div>
            <p style={{ fontSize: 14, margin: 0 }}>So, the answer is 2.</p>
          </div>
          <InputBar />
        </div>

        <button
          onClick={() => setIsMinimized(!isMinimized)}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "4px 0 8px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 100, padding: "3px 10px" }}>
            <svg
              viewBox="0 0 24 24"
              width={14}
              height={14}
              fill="none"
              stroke={COLORS.textSecondary}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                display: "block",
                transform: isMinimized ? "rotate(0deg)" : "rotate(180deg)",
                transition: "transform 0.3s ease",
              }}
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};
