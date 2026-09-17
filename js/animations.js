/**
 * animations.js
 * Scroll-triggered reveals (IntersectionObserver) and hero parallax.
 * Fully disabled when prefers-reduced-motion is set.
 */

const ScrollReveal = (() => {
  let observer = null;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function init() {
    if (reduced) return;
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observeAll();
  }

  function observeAll() {
    if (reduced || !observer) return;
    document.querySelectorAll(".reveal:not(.is-visible), .reveal-stagger:not(.is-visible)").forEach((el) => {
      observer.observe(el);
    });
  }

  return { init, observeAll };
})();

const HeroParallax = (() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function init() {
    const scene = document.getElementById("hero-scene");
    if (!scene || reduced) return;

    const layers = scene.querySelectorAll(".scene__layer");
    const strength = { back: 6, mid: 14, front: 24 };
    const depthMap = [strength.back, strength.mid, strength.front];

    let raf = null;
    function handleMove(x, y) {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        layers.forEach((layer, i) => {
          const depth = depthMap[i] || 10;
          layer.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
        });
      });
    }

    window.addEventListener("mousemove", (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      handleMove(nx, ny);
    });

    window.addEventListener(
      "touchmove",
      (e) => {
        if (!e.touches[0]) return;
        const nx = e.touches[0].clientX / window.innerWidth - 0.5;
        const ny = e.touches[0].clientY / window.innerHeight - 0.5;
        handleMove(nx * 0.5, ny * 0.5);
      },
      { passive: true }
    );
  }

  return { init };
})();
