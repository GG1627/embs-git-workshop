import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import type { WorkshopSlide } from "../data/workshop";
import SlideCanvas from "./SlideCanvas";
import Icon from "./Icon";

/** A fixed-format projection surface, independent of the participant guide. */
export default function Presentation({ slide, index, count, onNavigate, onExit, trigger }: {
  slide: WorkshopSlide;
  index: number;
  count: number;
  onNavigate: (delta: number) => void;
  onExit: () => void;
  trigger: RefObject<HTMLButtonElement | null>;
}) {
  const surface = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);
  const [scale, setScale] = useState(1);
  const [quiet, setQuiet] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exit = useRef(onExit);
  useEffect(() => { exit.current = onExit; }, [onExit]);

  function wake() {
    setQuiet(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setQuiet(true), 3500);
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const returnTarget = trigger.current;
    document.body.style.overflow = "hidden";
    let alive = true;
    let enteredNative = false;
    const element = surface.current!;
    function measure() {
      const controlsHeight = element.querySelector(".presentation-controls")?.getBoundingClientRect().height ?? 64;
      setScale(Math.min(element.clientWidth / 1200, Math.max(1, element.clientHeight - controlsHeight) / 675));
    }
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    function fullscreenChange() {
      if (document.fullscreenElement === element) enteredNative = true;
      else if (enteredNative) exit.current();
    }
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        exit.current();
      }
    }
    document.addEventListener("fullscreenchange", fullscreenChange);
    document.addEventListener("keydown", key);
    canvas.current?.focus();
    // The in-window layout is usable even when native fullscreen is unavailable.
    void Promise.resolve().then(async () => {
      if (!alive) return;
      try {
        if (!element.requestFullscreen) throw new Error("Fullscreen unavailable");
        await element.requestFullscreen();
        if (!alive && document.fullscreenElement === element) await document.exitFullscreen();
      } catch {
        if (alive) setFallback(true);
      }
    });
    return () => {
      alive = false;
      observer.disconnect();
      document.removeEventListener("fullscreenchange", fullscreenChange);
      document.removeEventListener("keydown", key);
      if (timer.current) clearTimeout(timer.current);
      if (document.fullscreenElement === element) void document.exitFullscreen().catch(() => {});
      document.body.style.overflow = previousOverflow;
      requestAnimationFrame(() => {
        if (returnTarget?.isConnected) returnTarget.focus();
      });
    };
  }, [trigger]);

  return <div
    ref={surface}
    className={`presentation ${quiet ? "controls-quiet" : ""}`}
    role="dialog"
    aria-modal="true"
    aria-label="Slide presentation"
    onPointerMove={wake}
    onKeyDown={(event) => {
      wake();
      if (["ArrowLeft", "ArrowRight"].includes(event.key) && !(event.target as Element).closest("input, textarea, select, [contenteditable='true']")) {
        event.preventDefault();
        event.stopPropagation();
        onNavigate(event.key === "ArrowRight" ? 1 : -1);
      }
      if (event.key === "Tab") {
        const controls = Array.from(surface.current!.querySelectorAll<HTMLElement>('button:not(:disabled), [href], input, summary, [tabindex="0"]'));
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && (document.activeElement === first || document.activeElement === canvas.current)) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }}
  >
    <div className="projection-space">
      <div style={{ width: 1200 * scale, height: 675 * scale }}>
        <div ref={canvas} tabIndex={-1} className="projection-canvas" style={{ transform: `scale(${scale})` }} aria-label={`Slide ${index + 1} of ${count}`}>
          <SlideCanvas slide={slide} index={index}/>
        </div>
      </div>
    </div>
    <div className="presentation-controls" onFocus={wake}>
      <button className="button" disabled={!index} onClick={() => onNavigate(-1)} aria-label="Previous slide"><Icon name="left"/></button>
      <span aria-live="polite">{index + 1} / {count}</span>
      <button className="button" disabled={index === count - 1} onClick={() => onNavigate(1)} aria-label="Next slide"><Icon name="right"/></button>
      <span className="presentation-status">{fallback ? "In-window presentation" : "Presentation"}</span>
      <button className="button" onClick={onExit}>Exit <span className="escape-label">· Esc</span></button>
    </div>
  </div>;
}
