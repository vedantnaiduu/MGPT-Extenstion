import { useState, useCallback, useRef, useEffect } from "react";
import { clamp } from "../lib/clamp";
import { TOOLTIP_WIDTH } from "../lib/constants";

export interface Position {
  x: number;
  y: number;
}

interface DragState {
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
}

export const useDraggable = (initialPosition: Position, onDragEnd?: (pos: Position) => void) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<DragState>({ offsetX: 0, offsetY: 0, width: 0, height: 0 });

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const container = (e.currentTarget as HTMLElement).closest("[data-tooltip-container]");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    dragState.current = {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      width: rect.width,
      height: rect.height,
    };

    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;

    const { offsetX, offsetY, width, height } = dragState.current;
    const newX = clamp(e.clientX - offsetX, 0, window.innerWidth - width);
    const newY = clamp(e.clientY - offsetY, 0, window.innerHeight - height);

    setPosition({ x: newX, y: newY });
  }, [isDragging]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;

    setIsDragging(false);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    onDragEnd?.(position);
  }, [isDragging, position, onDragEnd]);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition.x, initialPosition.y]);

  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        x: clamp(prev.x, 0, window.innerWidth - TOOLTIP_WIDTH),
        y: clamp(prev.y, 0, window.innerHeight - 100),
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { position, isDragging, handlePointerDown, handlePointerMove, handlePointerUp };
};
