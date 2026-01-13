import type { PlasmoCSConfig } from "plasmo";
import { useEffect, useState } from "react";
import styleText from "data-text:./style.css";

import { Tooltip } from "~src/components/Tooltip";
import { useDraggable, type Position } from "~src/hooks/useDraggable";
import { loadPosition, savePosition } from "~src/lib/storage";
import { TOOLTIP_WIDTH, TOOLTIP_DEFAULT_PADDING } from "~src/lib/constants";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
};

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = styleText;
  return style;
};

const MathGPTOverlay = () => {
  const [initialPosition, setInitialPosition] = useState<Position>({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initPosition = async () => {
      const saved = await loadPosition();

      if (saved) {
        setInitialPosition(saved);
      } else {
        setInitialPosition({
          x: window.innerWidth - TOOLTIP_WIDTH - TOOLTIP_DEFAULT_PADDING,
          y: TOOLTIP_DEFAULT_PADDING,
        });
      }

      setIsReady(true);
    };

    initPosition();
  }, []);

  const { position, handlePointerDown, handlePointerMove, handlePointerUp } = useDraggable(
    initialPosition,
    savePosition
  );

  if (!isReady) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2147483647,
      }}
    >
      <Tooltip
        position={position}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
    </div>
  );
};

export default MathGPTOverlay;
