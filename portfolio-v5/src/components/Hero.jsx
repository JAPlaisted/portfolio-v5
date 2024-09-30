import { useEffect, useRef } from 'react';
import anime from 'animejs';
import colors from '../colors';
import {
  FaGithub,
  FaTwitter,
  FaYoutube,
  FaCodepen,
  FaLinkedin,
  FaEnvelope,
  FaFileDownload,
} from 'react-icons/fa';
import '../styles/Hero.scss';

const Hero = () => {
  const canvasRef = useRef(null);
  const animations = useRef([]);
  const bgColor = useRef(colors.primary);
  const colorIndex = useRef(0);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext('2d');
    let cW, cH;

    // Color array and picker
    const colorArray = [colors.primary, colors.secondary, colors.accent, colors.dark];
    const colorPicker = {
      next: () => {
        colorIndex.current = (colorIndex.current + 1) % colorArray.length;
        return colorArray[colorIndex.current];
      },
      current: () => colorArray[colorIndex.current],
    };

    // Circle class
    class Circle {
      constructor(opts) {
        Object.assign(this, opts);
      }

      draw() {
        ctx.globalAlpha = this.opacity || 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        if (this.stroke) {
          ctx.strokeStyle = this.stroke.color;
          ctx.lineWidth = this.stroke.width;
          ctx.stroke();
        }
        if (this.fill) {
          ctx.fillStyle = this.fill;
          ctx.fill();
        }
        ctx.closePath();
        ctx.globalAlpha = 1;
      }
    }

    // Helper functions
    function removeAnimation(animation) {
      const index = animations.current.indexOf(animation);
      if (index > -1) animations.current.splice(index, 1);
    }

    function calcPageFillRadius(x, y) {
      const l = Math.max(x - 0, cW - x);
      const h = Math.max(y - 0, cH - y);
      return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
    }

    function handleEvent(e) {
      if (e.touches) {
        e.preventDefault();
        e = e.touches[0];
      }
      const currentColor = colorPicker.current();
      const nextColor = colorPicker.next();
      const targetR = calcPageFillRadius(e.pageX, e.pageY);
      const rippleSize = Math.min(200, cW * 0.4);
      const minCoverDuration = 750;

      const pageFill = new Circle({
        x: e.pageX,
        y: e.pageY,
        r: 0,
        fill: nextColor,
      });

      const fillAnimation = anime({
        targets: pageFill,
        r: targetR,
        duration: Math.max(targetR / 2, minCoverDuration),
        easing: 'easeOutQuart',
        update: function () {
          bgColor.current = pageFill.fill;
        },
        complete: function () {
          removeAnimation(fillAnimation);
        },
      });

      const ripple = new Circle({
        x: e.pageX,
        y: e.pageY,
        r: 0,
        stroke: {
          width: 3,
          color: currentColor,
        },
        opacity: 1,
      });

      const rippleAnimation = anime({
        targets: ripple,
        r: rippleSize,
        opacity: 0,
        easing: 'easeOutExpo',
        duration: 900,
        complete: () => removeAnimation(rippleAnimation),
      });

      const particles = [];
      for (let i = 0; i < 32; i++) {
        const particle = new Circle({
          x: e.pageX,
          y: e.pageY,
          fill: currentColor,
          r: anime.random(24, 48),
        });
        particles.push(particle);
      }

      const particlesAnimation = anime({
        targets: particles,
        x: function (particle) {
          return particle.x + anime.random(-rippleSize, rippleSize);
        },
        y: function (particle) {
          return particle.y + anime.random(-rippleSize * 1.15, rippleSize * 1.15);
        },
        r: 0,
        easing: 'easeOutExpo',
        duration: anime.random(1000, 1300),
        complete: () => removeAnimation(particlesAnimation),
      });

      animations.current.push(fillAnimation, rippleAnimation, particlesAnimation);
    }

    function resizeCanvas() {
      cW = window.innerWidth;
      cH = window.innerHeight;
      c.width = cW * window.devicePixelRatio;
      c.height = cH * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function addClickListeners() {
      c.addEventListener('touchstart', handleEvent);
      c.addEventListener('mousedown', handleEvent);
    }

    function removeClickListeners() {
      c.removeEventListener('touchstart', handleEvent);
      c.removeEventListener('mousedown', handleEvent);
    }

    function handleInactiveUser() {
      const inactive = setTimeout(function () {
        fauxClick(cW / 2, cH / 2);
      }, 2000);

      function clearInactiveTimeout() {
        clearTimeout(inactive);
        window.removeEventListener('mousedown', clearInactiveTimeout);
        window.removeEventListener('touchstart', clearInactiveTimeout);
      }

      window.addEventListener('mousedown', clearInactiveTimeout);
      window.addEventListener('touchstart', clearInactiveTimeout);
    }

    function fauxClick(x, y) {
      const fauxEvent = new MouseEvent('mousedown', {
        clientX: x,
        clientY: y,
        bubbles: true,
        cancelable: true,
      });
      c.dispatchEvent(fauxEvent);
    }

    // Initialize canvas and events
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    addClickListeners();
    handleInactiveUser();

    // Animation loop
    const animationLoop = anime({
      duration: Infinity,
      update: function () {
        ctx.fillStyle = bgColor.current;
        ctx.fillRect(0, 0, cW, cH);

        animations.current.forEach(function (anim) {
          anim.animatables.forEach(function (animatable) {
            animatable.target.draw();
          });
        });
      },
    });

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      removeClickListeners();

      // Cancel animations
      if (animationLoop) animationLoop.pause();
      animations.current.forEach((animation) => animation.pause());
      animations.current = [];
    };
  }, []);

  // JSX return statement
  return (
    <div className="hero-container">
      <canvas ref={canvasRef} className="hero-canvas"></canvas>
      <div className="hero-content">
        <h1>Hi, I&#39;m Jon</h1>
        <p>Welcome to my portfolio. Here you&#39;ll find some of my top projects and skills.</p>
        <p>The hero is made with anime.js. Click around before scrolling!</p>
        <div className="hero-icons">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter size={30} />
          </a>
          <a
            href="https://youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube size={30} />
          </a>
          <a
            href="https://codepen.io/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CodePen"
          >
            <FaCodepen size={30} />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={30} />
          </a>
          <a href="mailto:youremail@example.com" aria-label="Email">
            <FaEnvelope size={30} />
          </a>
          <a href="/path/to/your/resume.pdf" download aria-label="Download Resume">
            <FaFileDownload size={30} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
