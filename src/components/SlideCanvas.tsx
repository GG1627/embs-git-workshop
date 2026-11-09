import type { WorkshopSlide } from "../data/workshop";
import SlideArtwork from "./SlideArtwork";

export default function SlideCanvas({ slide, index }: { slide: WorkshopSlide; index: number }) {
  return <section className={`slide-canvas visual-${slide.visual}`} aria-label={`Slide ${index + 1}: ${slide.title}`}>
    <div className="slide-heading">
      <div className="slide-eyebrow"><span>{String(index + 1).padStart(2, "0")}</span><span>{slide.section}</span></div>
      <h1 tabIndex={-1}>{slide.title}</h1>
      <p>{slide.subtitle}</p>
    </div>
    <SlideArtwork slide={slide}/>
  </section>;
}
