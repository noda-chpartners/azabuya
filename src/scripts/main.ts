import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const header = document.querySelector<HTMLElement>("[data-header]");
const menu = document.querySelector<HTMLElement>("[data-menu]");
const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const menuLinks = document.querySelectorAll<HTMLAnchorElement>("[data-menu-link]");

const lenis = new Lenis({
  duration: 1.15,
  smoothWheel: true,
});

lenis.on("scroll", ({ scroll }) => {
  header?.classList.toggle("is-scrolled", scroll > 40);
  ScrollTrigger.update();
});
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

const closeMenu = () => {
  if (!header || !menu || !toggle) return;
  header.classList.remove("is-open");
  menu.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("is-locked");
  lenis.start();
};

const openMenu = () => {
  if (!header || !menu || !toggle) return;
  header.classList.add("is-open");
  menu.hidden = false;
  toggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("is-locked");
  lenis.stop();
};

toggle?.addEventListener("click", () => {
  const expanded = toggle.getAttribute("aria-expanded") === "true";
  if (expanded) closeMenu();
  else openMenu();
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

if (!reduceMotion) {
  gsap.from(".hero__content > *", {
    y: 28,
    opacity: 0,
    duration: 1.15,
    stagger: 0.1,
    ease: "power3.out",
    delay: 0.12,
  });

  gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>(".catalog__image").forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: 28,
      duration: 1.05,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
        once: true,
      },
    });
  });

  const refresh = () => ScrollTrigger.refresh();
  requestAnimationFrame(refresh);
  window.addEventListener("load", refresh);
} else {
  document.querySelectorAll(".reveal").forEach((el) => {
    (el as HTMLElement).style.opacity = "1";
    (el as HTMLElement).style.transform = "none";
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    if (!href) return;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    event.preventDefault();
    requestAnimationFrame(() => {
      lenis.scrollTo(target, { offset: -24 });
    });
  });
});
