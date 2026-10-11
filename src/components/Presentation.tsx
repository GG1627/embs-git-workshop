import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import type { Slide } from "../data/lessons";
import SlideVisual from "./SlideVisual";
import Icon from "./Icon";

/** A separate, slides-only surface; the regular app stays mounted and inert. */
export default function Presentation({ slide, index, count, onNavigate, onExit, trigger }: {
  slide: Slide; index: number; count: number; onNavigate: (delta: number) => void; onExit: () => void;
  trigger: RefObject<HTMLButtonElement | null>;
}) {
  const surface = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLElement>(null);
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
    const observer = new ResizeObserver(() => {
      setScale(Math.min(element.clientWidth / 1200, Math.max(1, element.clientHeight - 76) / 675));
    });
    observer.observe(element);
    function fullscreenChange() {
      if (document.fullscreenElement === element) enteredNative = true;
      else if (enteredNative) exit.current();
    }
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); exit.current(); }
    }
    document.addEventListener("fullscreenchange", fullscreenChange);
    document.addEventListener("keydown", key);
    canvas.current?.focus();
    // The fallback is already visible while the browser decides the request.
    Promise.resolve().then(async () => {
      if (!alive) return;
      try {
        if (!element.requestFullscreen) throw new Error("Fullscreen unavailable");
        await element.requestFullscreen();
        if (!alive && document.fullscreenElement === element) await document.exitFullscreen();
      } catch { if (alive) setFallback(true); }
    });
    return () => {
      alive = false;
      observer.disconnect();
      document.removeEventListener("fullscreenchange", fullscreenChange);
      document.removeEventListener("keydown", key);
      if (timer.current) clearTimeout(timer.current);
      if (document.fullscreenElement === element) void document.exitFullscreen().catch(() => {});
      document.body.style.overflow = previousOverflow;
      requestAnimationFrame(() => returnTarget?.isConnected && returnTarget.focus());
    };
  }, [trigger]);
  return <div ref={surface} className={`presentation ${quiet ? "controls-quiet" : ""}`} role="dialog" aria-modal="true" aria-label="Slide presentation" onPointerMove={wake} onKeyDown={(event) => {
    wake();
    if (event.key === "Tab") {
      const controls = Array.from(surface.current!.querySelectorAll<HTMLElement>('button:not(:disabled), [href], input, summary, [tabindex="0"]'));
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === canvas.current)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  }}>
    <div className="projection-space"><div style={{ width: 1200 * scale, height: 675 * scale }}>
      <section ref={canvas} tabIndex={-1} className={`slide-canvas projection-canvas visual-${slide.visual}`} style={{ transform: `scale(${scale})` }} aria-label={`Slide ${index + 1} of ${count}`}>
        <div className="slide-copy"><h1>{slide.title}</h1><p>{slide.body}</p></div>
        <SlideVisual key={index} slide={slide} />
      </section>
    </div></div>
    <div className="presentation-controls" onFocus={wake}>
      <button className="button" disabled={!index} onClick={() => onNavigate(-1)} aria-label="Previous slide"><Icon name="left" /></button>
      <span>{index + 1} / {count}</span>
      <button className="button" disabled={index === count - 1} onClick={() => onNavigate(1)} aria-label="Next slide"><Icon name="right" /></button>
      <span className="presentation-status">{fallback ? "In-window presentation" : "Presentation"}</span>
      <button className="button" onClick={onExit}>Exit <span className="escape-label">· Esc</span></button>
    </div>
  </div>;
}
