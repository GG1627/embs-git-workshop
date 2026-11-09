import type { WorkshopSlide } from "../data/workshop";
import SlideArtwork from "./SlideArtwork";

export default function SlideCanvas({ slide, index }: { slide: WorkshopSlide; index: number }) {
  return <section className={`slide-canvas visual-${slide.visual}${slide.result ? " slide-with-result" : ""}`} aria-label={`Slide ${index + 1}: ${slide.title}`}>
    <div className="slide-heading">
      <div className="slide-eyebrow"><span>{String(index + 1).padStart(2, "0")}</span><span>{slide.section}</span></div>
      <h1 tabIndex={-1}>{slide.title}</h1>
      <p>{slide.goal ? <strong>Situation: </strong> : null}{slide.scenario ?? slide.subtitle}</p>
      {slide.goal ? <p className="slide-goal"><strong>Goal: </strong>{slide.goal}</p> : null}
    </div>
    <SlideArtwork slide={slide}/>
    {slide.result ? <p className="slide-result"><strong>Result: </strong>{slide.result}</p> : null}
  </section>;
}
