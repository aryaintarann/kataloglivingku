"use client";

import { useEffect, useRef } from "react";

const ALLOWED_PHOTOS = new Set(["ph-1", "ph-2", "ph-3", "ph-4", "ph-5", "ph-6"]);

const WA_SVG = `<svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M16 0C7.164 0 0 7.163 0 16c0 2.833.742 5.487 2.034 7.79L0 32l8.42-2.006A15.93 15.93 0 0 0 16 32c8.836 0 16-7.163 16-16S24.836 0 16 0Zm0 29.333a13.27 13.27 0 0 1-6.747-1.836l-.483-.287-5 1.191 1.22-4.863-.315-.5A13.248 13.248 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333Zm7.273-9.927c-.397-.199-2.35-1.159-2.715-1.29-.364-.133-.63-.199-.895.199-.266.397-1.03 1.29-1.262 1.555-.233.265-.465.298-.862.1-.397-.2-1.676-.618-3.192-1.97-1.18-1.052-1.977-2.35-2.21-2.748-.232-.397-.025-.612.175-.81.18-.178.397-.464.596-.696.199-.232.265-.397.397-.662.133-.265.067-.497-.033-.696-.1-.199-.895-2.157-1.227-2.953-.323-.775-.65-.67-.895-.682l-.762-.013c-.265 0-.696.1-1.06.497-.364.397-1.39 1.358-1.39 3.312 0 1.953 1.423 3.84 1.622 4.105.199.265 2.8 4.275 6.784 5.996.948.41 1.688.654 2.265.837.952.302 1.819.26 2.504.158.764-.114 2.35-.96 2.682-1.887.332-.928.332-1.723.232-1.887-.099-.166-.364-.265-.762-.464Z"/></svg>`;

function setText(id: string, text: string) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function clearEl(id: string): HTMLElement | null {
  const el = document.getElementById(id);
  if (el) el.innerHTML = "";
  return el ?? null;
}

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
    const sections = ["top", "about", "services", "units", "testimoni", "contact"];
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

    // Counter animation
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

    // ── Filter: category + city + price ──────────────────────────────────

    const parsePrice = (raw: string): number => {
      const s = raw.replace(/[Rp\s]/gi, "");
      if (/jt/i.test(s)) return parseFloat(s.replace(/jt.*/i, "").replace(",", ".")) * 1_000_000;
      return parseInt(s.split("/")[0].replace(/\./g, ""), 10) || 0;
    };
    const extractCity = (loc: string) => loc.split("·")[0].split(",")[0].trim();

    const grid = document.getElementById("listingGrid");
    const allCards = Array.from(document.querySelectorAll<HTMLElement>("#listingGrid .listing"));
    const originalOrder = [...allCards];

    let activeCategory = "all";
    let activeCity = "all";
    let priceSort = "default";

    const updateBadge = () => {
      const badge = document.getElementById("filterBadge");
      const count = (activeCity !== "all" ? 1 : 0) + (priceSort !== "default" ? 1 : 0);
      if (badge) {
        badge.textContent = count > 0 ? String(count) : "";
        badge.classList.toggle("show", count > 0);
      }
      document.getElementById("filterBtn")?.classList.toggle("has-filter", count > 0);
    };

    const applyFilters = () => {
      let visible = allCards.filter((c) => {
        const catMatch = activeCategory === "all" || c.dataset.cat === activeCategory;
        const cityMatch = activeCity === "all" || extractCity(c.dataset.loc ?? "") === activeCity;
        return catMatch && cityMatch;
      });

      if (priceSort !== "default") {
        visible = [...visible].sort((a, b) => {
          const pa = parsePrice(a.dataset.price ?? "0");
          const pb = parsePrice(b.dataset.price ?? "0");
          return priceSort === "asc" ? pa - pb : pb - pa;
        });
        if (grid) visible.forEach((el) => grid.appendChild(el));
      } else {
        if (grid) originalOrder.forEach((el) => grid.appendChild(el));
      }

      allCards.forEach((c) => {
        const show = visible.includes(c);
        if (show) {
          c.style.display = "";
          requestAnimationFrame(() => { c.style.opacity = "1"; c.style.transform = "none"; });
        } else {
          c.style.opacity = "0";
          c.style.transform = "translateY(10px)";
          setTimeout(() => { if (!visible.includes(c)) c.style.display = "none"; }, 200);
        }
      });

      updateBadge();
    };

    allCards.forEach((c) => { c.style.transition = "opacity .25s ease, transform .25s ease"; });

    // Category tabs
    const tabs = document.querySelectorAll(".filter-tabs button");
    tabs.forEach((t) => {
      t.addEventListener("click", () => {
        tabs.forEach((x) => { x.classList.remove("active"); x.setAttribute("aria-selected", "false"); });
        t.classList.add("active");
        t.setAttribute("aria-selected", "true");
        activeCategory = (t as HTMLElement).dataset.filter ?? "all";
        applyFilters();
      });
    });

    // Build city dropdown from listing data
    const cities = [...new Set(
      allCards.map((c) => extractCity(c.dataset.loc ?? "")).filter(Boolean)
    )].sort();
    const citySelect    = document.getElementById("citySelect");
    const cityTrigger   = document.getElementById("citySelectTrigger");
    const cityLabel     = document.getElementById("citySelectLabel");
    const cityList      = document.getElementById("citySelectList");
    const citySearchInput = document.getElementById("citySearchInput") as HTMLInputElement | null;
    const cityNoResults = document.getElementById("cityNoResults");

    const clearCitySearch = () => {
      if (citySearchInput) citySearchInput.value = "";
      cityList?.querySelectorAll<HTMLElement>("li").forEach((li) => { li.style.display = ""; });
      if (cityNoResults) cityNoResults.style.display = "none";
    };

    const toggleCityDropdown = (force?: boolean) => {
      const open = force ?? !citySelect?.classList.contains("open");
      citySelect?.classList.toggle("open", open);
      cityTrigger?.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        setTimeout(() => citySearchInput?.focus(), 60);
      } else {
        clearCitySearch();
      }
    };

    const selectCity = (city: string, label: string) => {
      activeCity = city;
      if (cityLabel) cityLabel.textContent = label;
      cityList?.querySelectorAll(".city-select-item").forEach((item) => {
        const sel = (item as HTMLElement).dataset.value === city;
        item.classList.toggle("active", sel);
        item.setAttribute("aria-selected", sel ? "true" : "false");
      });
      clearCitySearch();
      toggleCityDropdown(false);
      applyFilters();
    };

    if (cityList) {
      const makeItem = (value: string, label: string) => {
        const li = document.createElement("li");
        li.className = "city-select-item" + (value === "all" ? " active" : "");
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", value === "all" ? "true" : "false");
        li.dataset.value = value;
        li.textContent = label;
        li.addEventListener("click", (e) => { e.stopPropagation(); selectCity(value, label); });
        return li;
      };
      cityList.appendChild(makeItem("all", "Semua Kota"));
      cities.forEach((city) => cityList.appendChild(makeItem(city, city)));
    }

    // City search filter
    citySearchInput?.addEventListener("input", () => {
      const q = citySearchInput.value.toLowerCase().trim();
      let visibleCount = 0;
      cityList?.querySelectorAll<HTMLElement>("li").forEach((li) => {
        const match = !q || (li.textContent ?? "").toLowerCase().includes(q);
        li.style.display = match ? "" : "none";
        if (match) visibleCount++;
      });
      if (cityNoResults) cityNoResults.style.display = visibleCount === 0 ? "" : "none";
    });

    cityTrigger?.addEventListener("click", (e) => { e.stopPropagation(); toggleCityDropdown(); });
    document.addEventListener("click", (e) => {
      if (!citySelect?.contains(e.target as Node)) toggleCityDropdown(false);
    });

    // Price sort
    const priceOpts = document.querySelectorAll<HTMLElement>("#fpPriceOpts .fp-opt");
    priceOpts.forEach((btn) => {
      btn.addEventListener("click", () => {
        priceOpts.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        priceSort = btn.dataset.sort ?? "default";
        applyFilters();
      });
    });

    // Filter panel toggle
    const filterBtn = document.getElementById("filterBtn");
    const filterPanel = document.getElementById("filterPanel");
    const togglePanel = (force?: boolean) => {
      const open = force ?? !filterPanel?.classList.contains("open");
      filterPanel?.classList.toggle("open", open);
      filterBtn?.setAttribute("aria-expanded", open ? "true" : "false");
    };
    filterBtn?.addEventListener("click", (e) => { e.stopPropagation(); togglePanel(); });
    document.addEventListener("click", (e) => {
      if (!filterPanel?.contains(e.target as Node) && e.target !== filterBtn) togglePanel(false);
    });

    // Reset all filters
    document.getElementById("fpReset")?.addEventListener("click", () => {
      activeCategory = "all";
      activeCity = "all";
      priceSort = "default";
      tabs.forEach((t, i) => { t.classList.toggle("active", i === 0); t.setAttribute("aria-selected", i === 0 ? "true" : "false"); });
      selectCity("all", "Semua Kota");
      priceOpts.forEach((b, i) => b.classList.toggle("active", i === 0));
      applyFilters();
      togglePanel(false);
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

    // u2500u2500 Listing Modal + Photo Slider u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500

    // Baca nomor WA dari data attribute yang di-render server (bukan hardcode)
    const WA_BASE = (document.getElementById("top") as HTMLElement)?.dataset?.wabase ?? "";

    const modal = document.getElementById("listingModal");
    const modalClose = document.getElementById("modalClose");
    const sliderTrack = document.getElementById("sliderTrack");
    const sliderDots = document.getElementById("sliderDots");
    const sliderCounter = document.getElementById("sliderCounter");
    const sliderPrev = document.getElementById("sliderPrev");
    const sliderNext = document.getElementById("sliderNext");

    let currentSlide = 0;
    let totalSlides = 0;

    const goToSlide = (n: number) => {
      if (totalSlides === 0) return;
      currentSlide = ((n % totalSlides) + totalSlides) % totalSlides;
      if (sliderTrack) sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      if (sliderCounter) sliderCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
      document.querySelectorAll<HTMLElement>(".slider-dot").forEach((d, i) => {
        d.classList.toggle("active", i === currentSlide);
      });
    };

    sliderPrev?.addEventListener("click", () => goToSlide(currentSlide - 1));
    sliderNext?.addEventListener("click", () => goToSlide(currentSlide + 1));

    // Touch/swipe
    let touchStartX = 0;
    const sliderEl = document.getElementById("modalSlider");
    sliderEl?.addEventListener("touchstart", (e) => {
      touchStartX = (e as TouchEvent).touches[0].clientX;
    }, { passive: true });
    sliderEl?.addEventListener("touchend", (e) => {
      const dx = (e as TouchEvent).changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) goToSlide(currentSlide + (dx < 0 ? 1 : -1));
    }, { passive: true });

    const openModal = (article: HTMLElement) => {
      const title    = article.dataset.title ?? "";
      const loc      = article.dataset.loc ?? "";
      const type     = article.dataset.type ?? "";
      const price    = article.dataset.price ?? "";
      const period   = article.dataset.period ?? "bln";
      const desc     = article.dataset.desc ?? "";
      const wa       = article.dataset.wa ?? "";
      const facilities = (article.dataset.facilities ?? "").split(",").filter(Boolean);

      // Whitelist foto u2014 hanya ph-1 s/d ph-6 diizinkan
      const photos = (article.dataset.photos ?? "ph-1")
        .split(",")
        .map((p) => p.trim())
        .filter((p) => ALLOWED_PHOTOS.has(p) || (p.startsWith("https://") && p.includes("/storage/v1/object/public/photos/")));

      // u2500 Slider slides (foto diwhitelist, aman untuk class) u2500
      totalSlides = photos.length;
      currentSlide = 0;
      if (sliderTrack) {
        sliderTrack.innerHTML = "";
        photos.forEach((p) => {
          const slide = document.createElement("div");
          slide.className = "slide";
          const ph = document.createElement("div");
          if (p.startsWith("https://")) {
            ph.className = "ph";
            ph.style.backgroundImage = `url(${p})`;
            ph.style.backgroundSize = "cover";
            ph.style.backgroundPosition = "center";
          } else {
            ph.className = `ph ${p}`; // CSS class (ph-1..ph-6), sudah divalidasi whitelist
          }
          slide.appendChild(ph);
          sliderTrack.appendChild(slide);
        });
        sliderTrack.style.transform = "translateX(0)";
      }

      // u2500 Dots u2500
      if (sliderDots) {
        sliderDots.innerHTML = "";
        if (totalSlides > 1) {
          photos.forEach((_, i) => {
            const btn = document.createElement("button");
            btn.className = "slider-dot" + (i === 0 ? " active" : "");
            btn.setAttribute("aria-label", `Foto ${i + 1}`);
            btn.addEventListener("click", () => goToSlide(i));
            sliderDots.appendChild(btn);
          });
        }
      }

      if (sliderCounter) sliderCounter.textContent = totalSlides > 1 ? `1 / ${totalSlides}` : "";
      if (sliderPrev) sliderPrev.style.display = totalSlides > 1 ? "" : "none";
      if (sliderNext) sliderNext.style.display = totalSlides > 1 ? "" : "none";

      // u2500 Badges (textContent u2014 tidak ada innerHTML dari data pengguna) u2500
      const badgesEl = clearEl("modalBadges");
      if (badgesEl) {
        const badgeType = document.createElement("span");
        badgeType.className = "badge-type";
        badgeType.textContent = type;
        const badgeVerified = document.createElement("span");
        badgeVerified.className = "badge-verified";
        badgeVerified.textContent = "✓ Verified";
        badgesEl.appendChild(badgeType);
        badgesEl.appendChild(badgeVerified);
      }

      // u2500 Text fields u2500
      setText("modalTitle", title);
      setText("modalLoc", `📍 ${loc}`);

      // u2500 Price (perlu <small>) u2500
      const priceEl = clearEl("modalPrice");
      if (priceEl) {
        priceEl.appendChild(document.createTextNode(price));
        const small = document.createElement("small");
        small.textContent = `/${period}`;
        priceEl.appendChild(small);
      }

      // u2500 Facilities u2500
      const facEl = clearEl("modalFacilities");
      if (facEl) {
        facilities.forEach((f) => {
          const span = document.createElement("span");
          span.textContent = f.trim();
          facEl.appendChild(span);
        });
      }

      // u2500 Description u2500
      setText("modalDesc", desc);

      // u2500 WhatsApp button u2014 validasi URL sebelum digunakan sebagai href u2500
      const actionsEl = clearEl("modalActions");
      if (actionsEl && WA_BASE.startsWith("https://wa.me/")) {
        const waUrl = `${WA_BASE}?text=${wa}`;
        // Pastikan URL final juga valid (tidak ada protocol injection)
        if (waUrl.startsWith("https://wa.me/")) {
          const a = document.createElement("a");
          a.href = waUrl;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.className = "btn btn-wa btn-lg";
          // WA_SVG adalah SVG hardcode, aman
          a.innerHTML = WA_SVG + " Chat WhatsApp";
          actionsEl.appendChild(a);
        }
      }

      modal?.classList.add("open");
      document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
      modal?.classList.remove("open");
      document.body.style.overflow = "";
    };

    document.querySelectorAll<HTMLElement>(".btn-detail").forEach((btn) => {
      btn.addEventListener("click", () => {
        const article = btn.closest<HTMLElement>(".listing");
        if (article) openModal(article);
      });
    });

    modalClose?.addEventListener("click", closeModal);
    modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
