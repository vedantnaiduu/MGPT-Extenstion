import React from "react";
import { PRIMARY_GRADIENT } from "../lib/constants";

interface TopBarProps {
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  onMinimize: () => void;
}

// Draggable header bar with logo and minimize button
export const TopBar: React.FC<TopBarProps> = ({
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onMinimize,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 14px 6px",
        userSelect: "none",
        cursor: "grab",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <Logo />
      <DragDots />
      <MinimizeButton onClick={onMinimize} />
    </div>
  );
};

// App icon with gradient background
const Logo: React.FC = () => (
  <div
    style={{
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.7))",
      padding: 2,
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        background: PRIMARY_GRADIENT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={13}
        height={13}
        fill="none"
        stroke="white"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12h2l4 8L16 4h2" />
      </svg>
    </div>
  </div>
);

// Visual indicator that the bar is draggable
const DragDots: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.3)",
        }}
      />
    ))}
  </div>
);

// Button to collapse/expand the tooltip content
const MinimizeButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  // Prevent drag from starting when clicking the button
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.1)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
    >
      <div style={{ width: 9, height: 1.5, background: "rgba(255,255,255,0.55)", borderRadius: 2 }} />
    </button>
  );
};
