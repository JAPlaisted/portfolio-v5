import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import colors from '../colors';
import useInView from '../hooks/useInView.js';
import '../styles/CTA.scss';

const CTA = () => {
  const ctaRef = useRef(null);
  const inView = useInView(ctaRef, { threshold: 0.5 });
  const tl = useRef(null);

  useEffect(() => {
    if (inView && ctaRef.current) {
      if (!tl.current) {
        const lines = ctaRef.current.querySelectorAll('.title-line');
        const button = ctaRef.current.querySelector('.cta-button');

        tl.current = gsap.timeline();

        tl.current.from(lines, {
          duration: 0.8,
          y: 50,
          opacity: 0,
          ease: 'back.out(1.7)',
          stagger: 0.2,
        });

        tl.current.from(
          button,
          {
            duration: 0.5,
            y: 20,
            opacity: 0,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        );
      } else {
        tl.current.play();
      }
    } else {
      if (tl.current) {
        tl.current.pause(0);
      }
    }
  }, [inView]);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="cta-container" ref={ctaRef}>
      <h1 className="cta-title">
        {["That's all", 'thanks for', 'visiting'].map((text, index) => (
          <span
            key={index}
            className={`title-line line-${index + 1}`}
            style={{
              color:
                index === 0
                  ? colors.primary
                  : index === 1
                  ? colors.secondary
                  : colors.accent,
            }}
          >
            {text}
          </span>
        ))}
      </h1>

      <button className="cta-button" onClick={handleBackToTop}>
        Back to Top
      </button>
    </section>
  );
};

export default CTA;
