import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import Card from "../Card/Card";
import styles from "./CardCarousel.module.css";

export default function CardCarousel({ titulo, projetos }) {
  const carouselRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  if (projetos.length === 0) return null;

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const updateArrows = () => {
    const el = carouselRef.current;
    if (!el) return;

    const canScrollLeft = el.scrollLeft > 0;
    const canScrollRight = el.scrollWidth > el.clientWidth + el.scrollLeft + 1;

    setShowLeft(canScrollLeft);
    setShowRight(canScrollRight);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    updateArrows();
    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);

    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [projetos]);

  return (
    <section className={styles.section}>
      <h2 className={styles.titulo}>{titulo}</h2>

      <div className={styles.carouselContainer}>
        {showLeft && (
          <button
            className={`${styles.arrow} ${styles.leftArrow}`}
            onClick={scrollLeft}
          >
            <FaChevronLeft />
          </button>
        )}

        <div className={styles.carousel} ref={carouselRef}>
          {projetos.map((p) => (
            <Card key={p.id} projeto={p} />
          ))}
        </div>

        {showRight && (
          <button
            className={`${styles.arrow} ${styles.rightArrow}`}
            onClick={scrollRight}
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </section>
  );
}
