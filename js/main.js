// Shared header + footer for every page, plus the mobile menu.
// Edit the NAV list once here and every page updates.

const NAV = [
  { href: "index.html", label: "Home" },
  { href: "mission.html", label: "Our Mission" },
  { href: "events.html", label: "Programs & Events" },
  { href: "team.html", label: "Meet the Team" },
  { href: "network.html", label: "Our Network" },
];

const SOCIAL = {
  instagram: "https://www.instagram.com/neversaidorg",
  linkedin: "https://www.linkedin.com/company/neversaid/",
};

function currentPage() {
  const file = location.pathname.split("/").pop();
  return file === "" ? "index.html" : file.endsWith(".html") ? file : file + ".html";
}

function renderHeader() {
  const here = currentPage();
  const link = (item, mobile) => {
    const active = item.href === here;
    const base = mobile
      ? "block rounded-lg px-4 py-3 text-lg font-medium"
      : "rounded-full px-4 py-2 text-[15px] font-medium transition-colors";
    const state = active
      ? "bg-white/10 text-white"
      : "text-zinc-200 hover:text-white hover:bg-white/5";
    return `<a href="${item.href}" class="${base} ${state}"${active ? ' aria-current="page"' : ""}>${item.label}</a>`;
  };

  document.getElementById("site-header").innerHTML = `
    <header class="sticky top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-md">
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Main">
        <a href="index.html" class="font-display text-2xl tracking-wide text-white">NEVER<span class="text-gold">SAID</span></a>
        <div class="hidden items-center gap-1 lg:flex">
          ${NAV.map((i) => link(i, false)).join("")}
          <a href="index.html#join" class="ml-3 rounded-full bg-gold px-5 py-2 text-[15px] font-semibold text-ink hover:bg-gold-light transition-colors">Join us</a>
        </div>
        <button id="menu-btn" class="lg:hidden -mr-2 rounded-lg p-2 text-white hover:bg-white/10" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
          <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path id="menu-icon" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </nav>
      <div id="mobile-menu" class="hidden border-t border-white/10 bg-ink lg:hidden">
        <div class="mx-auto max-w-6xl space-y-1 px-5 py-4">
          ${NAV.map((i) => link(i, true)).join("")}
          <a href="index.html#join" class="mt-3 block rounded-lg bg-gold px-4 py-3 text-center text-lg font-semibold text-ink">Join us</a>
        </div>
      </div>
    </header>`;

  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  const icon = document.getElementById("menu-icon");
  const setOpen = (open) => {
    menu.classList.toggle("hidden", !open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    icon.setAttribute("d", open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16");
    document.body.classList.toggle("overflow-hidden", open);
  };
  btn.addEventListener("click", () => setOpen(menu.classList.contains("hidden")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
  window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => e.matches && setOpen(false));
}

function renderFooter() {
  document.getElementById("site-footer").innerHTML = `
    <footer class="border-t border-white/10 bg-ink">
      <div class="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <p class="font-display text-2xl text-white">NEVER<span class="text-gold">SAID</span></p>
          <p class="mt-3 max-w-xs text-zinc-300">The Neversaid Society. Pen, you're forever.</p>
          <p class="mt-1 text-sm text-zinc-400">A student-led non-profit in Oakville, Ontario.</p>
        </div>
        <div>
          <p class="text-sm font-semibold uppercase tracking-widest text-zinc-400">Explore</p>
          <ul class="mt-4 space-y-2">
            ${NAV.map((i) => `<li><a href="${i.href}" class="text-zinc-200 hover:text-gold">${i.label}</a></li>`).join("")}
          </ul>
        </div>
        <div>
          <p class="text-sm font-semibold uppercase tracking-widest text-zinc-400">Follow</p>
          <ul class="mt-4 space-y-2">
            <li><a href="${SOCIAL.instagram}" target="_blank" rel="noopener" class="text-zinc-200 hover:text-gold">Instagram</a></li>
            <li><a href="${SOCIAL.linkedin}" target="_blank" rel="noopener" class="text-zinc-200 hover:text-gold">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <p class="border-t border-white/5 py-6 text-center text-sm text-zinc-400">© ${new Date().getFullYear()} Neversaid. All rights reserved.</p>
    </footer>`;
}

// Fade sections in as they scroll into view.
function revealOnScroll() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("is-visible"));
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

// Numbers with data-count tick up from 0 the first time they scroll into view.
function countUp() {
  const els = document.querySelectorAll("[data-count]");
  if (!els.length || matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const el = e.target, end = +el.dataset.count, start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / 1200, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), { threshold: 0.6 });
  els.forEach((el) => { el.textContent = "0"; io.observe(el); });
}

// Join form. Paste the Formspree form ID into data-formspree on the <form> (index.html).
// Until then the form says it's a preview instead of pretending to send.
function joinForm() {
  const form = document.getElementById("join-form");
  if (!form) return;
  const msg = document.getElementById("join-msg");
  const say = (text, ok) => {
    msg.textContent = text;
    msg.className = "mt-4 " + (ok ? "text-gold" : "text-red-300");
  };
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = form.dataset.formspree;
    if (!id) return say("Thanks! This is a preview, so the form isn't sending yet.", true), form.reset();
    const btn = form.querySelector("button");
    btn.disabled = true; btn.textContent = "Sending…";
    try {
      const res = await fetch(`https://formspree.io/f/${id}`, {
        method: "POST", body: new FormData(form), headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      form.reset();
      say("Thank you! We got your message and will be in touch soon.", true);
    } catch {
      say("Sorry, that didn't send. Please try again, or message us on Instagram.", false);
    } finally {
      btn.disabled = false; btn.textContent = "Submit";
    }
  });
}

// Click any image with data-lightbox to see it full-screen. Arrow keys / swipe to move, Esc to close.
function lightbox() {
  const imgs = [...document.querySelectorAll("img[data-lightbox]")];
  if (!imgs.length) return;
  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Photo viewer");
  box.innerHTML = `
    <button class="lb-btn lb-close" aria-label="Close">✕</button>
    <button class="lb-btn lb-prev" aria-label="Previous photo">‹</button>
    <img alt="" />
    <button class="lb-btn lb-next" aria-label="Next photo">›</button>
    <p class="lb-count"></p>`;
  document.body.appendChild(box);
  const big = box.querySelector("img"), count = box.querySelector(".lb-count");
  let i = 0, lastFocus = null, touchX = null;

  const show = (n) => {
    i = (n + imgs.length) % imgs.length;
    big.src = imgs[i].src; big.alt = imgs[i].alt;
    count.textContent = `${i + 1} / ${imgs.length}`;
  };
  const open = (n) => {
    lastFocus = document.activeElement;
    show(n); box.classList.add("open"); document.body.classList.add("overflow-hidden");
    box.querySelector(".lb-close").focus();
  };
  const close = () => {
    box.classList.remove("open"); document.body.classList.remove("overflow-hidden");
    lastFocus && lastFocus.focus();
  };

  imgs.forEach((img, n) => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.classList.add("cursor-zoom-in");
    img.addEventListener("click", () => open(n));
    img.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), open(n)));
  });
  box.querySelector(".lb-close").onclick = close;
  box.querySelector(".lb-prev").onclick = () => show(i - 1);
  box.querySelector(".lb-next").onclick = () => show(i + 1);
  box.addEventListener("click", (e) => e.target === box && close());
  box.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  box.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1));
  });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(i + 1);
    if (e.key === "ArrowLeft") show(i - 1);
  });
}

renderHeader();
renderFooter();
revealOnScroll();
countUp();
joinForm();
lightbox();
