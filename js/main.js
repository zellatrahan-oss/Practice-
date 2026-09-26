(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");

  // Mobile menu
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    links.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  }

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    links.addEventListener("click", (e) => {
      if (e.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });

    window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
      if (e.matches) setMenu(false);
    });
  }

  // Header hairline once the page scrolls
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  if (header) {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();

/* ==========================================================================
    Spring Formal countdown
    ========================================================================== */
(function () {
  const clocks = document.querySelectorAll("[data-countdown]");
  if (!clocks.length) return;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function render() {
    clocks.forEach((clock) => {
      const target = new Date(clock.getAttribute("data-countdown")).getTime();
      let diff = Math.max(0, target - Date.now());

      const days = Math.floor(diff / 86400000);
      diff -= days * 86400000;
      const hours = Math.floor(diff / 3600000);
      diff -= hours * 3600000;
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff - minutes * 60000) / 1000);

      const set = (attr, value) => {
        const el = clock.querySelector("[data-countdown-" + attr + "]");
        if (el) el.textContent = value;
      };

      set("days", days);
      set("hours", pad(hours));
      set("minutes", pad(minutes));
      set("seconds", pad(seconds));
    });
  }

  render();
  setInterval(render, 1000);
})();

/* ==========================================================================
    Plus-one eligibility check (Article VII, Section 3)
    ========================================================================== */
(function () {
  const form = document.querySelector("[data-checker]");
  const panel = document.querySelector("[data-checker-verdict]");
  if (!form || !panel) return;

  form.addEventListener("change", (e) => {
    const input = e.target.closest("input[type=radio]");
    if (!input) return;

    const verdict = input.getAttribute("data-verdict");

    panel.className = "verdict verdict--" + verdict;
    panel.innerHTML =
      '<span class="verdict__stamp">' +
      input.getAttribute("data-stamp") +
      "</span><h3>" +
      input.getAttribute("data-headline") +
      "</h3><p>" +
      input.getAttribute("data-body") +
      "</p><cite>" +
      input.getAttribute("data-cite") +
      "</cite>";
  });
})();

/* ==========================================================================
    Asset Recovery: where in the world is Harry Black?
    ========================================================================== */
(function () {
  const status = document.querySelector("[data-recovery-status]");
  const reset = document.querySelector("[data-recovery-reset]");
  const regions = document.querySelectorAll(".map-region");
  if (!status || !regions.length) return;

  const LAST_KNOWN = "China";

  const MISSES = [
    "No trace. The committee filed expenses anyway.",
    "Nothing. A local contact remembers &ldquo;a tall American talking about liquidity.&rdquo; Promising, but no.",
    "Dead end. Someone there had heard of the fog machine, which is somehow worse.",
    "Not here. The committee is now asking whether this trip needed to be in person.",
  ];

  let attempts = 0;

  function say(heading, body, found) {
    status.innerHTML = "<h3>" + heading + "</h3><p>" + body + "</p>";
    status.classList.toggle("is-found", Boolean(found));
  }

  function search(location) {
    attempts += 1;
    const tries = attempts + (attempts === 1 ? " search" : " searches");

    if (location === LAST_KNOWN) {
      say(
        "Located: " + location + ".",
        "Harry Black was found in " + location +
          " after " + tries +
          ", seated outdoors, ordering for the table. He described the $4,200 as &ldquo;seed capital,&rdquo; called the fog machine &ldquo;a fixed asset in transit,&rdquo; and picked up the check. The committee is calling it a win and filing the receipt.",
        true
      );
      regions.forEach((el) => {
        el.style.pointerEvents = "none";
        el.setAttribute("tabindex", "-1");
      });
    } else {
      say(
        "Not in " + location + ".",
        MISSES[(attempts - 1) % MISSES.length] + " (" + tries + " logged.)"
      );
    }
  }

  regions.forEach((region) => {
    const location = region.getAttribute("data-location");
    region.addEventListener("click", () => search(location));
    region.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        search(location);
      }
    });
  });

  if (reset) {
    reset.addEventListener("click", () => {
      attempts = 0;
      say(
        "Harry Black remains at large.",
        "Select a country to dispatch the Alumni Relations Committee."
      );
      regions.forEach((el) => {
        el.style.pointerEvents = "auto";
        el.setAttribute("tabindex", "0");
      });
    });
  }
})();
