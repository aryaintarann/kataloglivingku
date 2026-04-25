"use client";

import { useEffect, useRef } from "react";

export default function ClientInteractions() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Scroll progress + nav scrolled state
    const nav = document.getElementById("nav");
    const progress = document.getElementById("scrollProgress");
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      if (progress) progress.style.width = max > 0 ? (scrolled / max * 100) + "%" : "0%";
      if (nav) nav.classList.toggle("scrolled", scrolled > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Active nav link on scroll
    const sections = ["top", "about", "services", "testimoni", "contact"];
    const linkMap: Record<string, Element> = {};
    document.querySelectorAll(".nav-links a").forEach((a) => {
      const id = a.getAttribute("href")?.replace("#", "") ?? "";
      linkMap[id] = a;
    });
    const setActive = (id: string) => {
      Object.values(linkMap).forEach((a) => a.classList.remove("active"));
      if (linkMap[id]) linkMap[id].classList.add("active");
    };
    const sectionObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObs.observe(el);
    });

    // Mobile drawer
    const ham = document.getElementById("hamburger");
    const drawer = document.getElementById("drawer");
    const scrim = document.getElementById("scrim");
    const closeDrawer = () => {
      ham?.classList.remove("open");
      drawer?.classList.remove("open");
      scrim?.classList.remove("show");
      ham?.setAttribute("aria-expanded", "false");
    };
    ham?.addEventListener("click", () => {
      const open = drawer?.classList.toggle("open");
      ham.classList.toggle("open", open);
      scrim?.classList.toggle("show", open);
      ham.setAttribute("aria-expanded", open ? "true" : "false");
    });
    scrim?.addEventListener("click", closeDrawer);
    drawer?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeDrawer));

    // Reveal on scroll
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) =>
      revealObs.observe(el)
    );

    // Counter animation — targets .counter spans inside .num
    const formatNum = (n: number) => n.toLocaleString("id-ID");
    const countObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = parseInt(el.dataset.count ?? "0", 10);
          const duration = 1600;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = formatNum(Math.floor(target * eased));
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = formatNum(target);
          };
          requestAnimationFrame(tick);
          countObs.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll(".counter[data-count]").forEach((el) => countObs.observe(el));

    // Filter tabs
    const tabs = document.querySelectorAll(".filter-tabs button");
    const cards = document.querySelectorAll<HTMLElement>("#listingGrid .listing");
    cards.forEach((c) => {
      c.style.transition = "opacity .25s ease, transform .25s ease";
    });
    tabs.forEach((t) => {
      t.addEventListener("click", () => {
        tabs.forEach((x) => {
          x.classList.remove("active");
          x.setAttribute("aria-selected", "false");
        });
        t.classList.add("active");
        t.setAttribute("aria-selected", "true");
        const f = (t as HTMLElement).dataset.filter;
        cards.forEach((c) => {
          const match = f === "all" || c.dataset.cat === f;
          if (match) {
            c.style.display = "";
            requestAnimationFrame(() => {
              c.style.opacity = "1";
              c.style.transform = "none";
            });
          } else {
            c.style.opacity = "0";
            c.style.transform = "translateY(10px)";
            setTimeout(() => { c.style.display = "none"; }, 200);
          }
        });
      });
    });

    // FAQ accordion
    document.querySelectorAll(".faq-item").forEach((item) => {
      const q = item.querySelector(".faq-q");
      const a = item.querySelector<HTMLElement>(".faq-a");
      q?.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item").forEach((other) => {
          other.classList.remove("open");
          other.querySelector(".faq-q")?.setAttribute("aria-expanded", "false");
          const otherA = other.querySelector<HTMLElement>(".faq-a");
          if (otherA) otherA.style.maxHeight = "0";
        });
        if (!isOpen) {
          item.classList.add("open");
          q.setAttribute("aria-expanded", "true");
          if (a) a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
