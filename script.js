const filters = document.querySelectorAll("#filters button");
const cards = document.querySelectorAll(".work-card");
const navLinks = document.querySelectorAll("#mainNav a");
const menu = document.getElementById("menu");
const nav = document.getElementById("mainNav");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(f => f.classList.remove("active"));
    filter.classList.add("active");
    const value = filter.dataset.filter;
    cards.forEach(card => {
      const visible = value === "all" || card.dataset.category === value;
      card.style.display = visible ? "" : "none";
    });
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
window.addEventListener("scroll", () => {
  const current = sections.reduce((acc, section) => {
    if (window.scrollY >= section.offsetTop - 180) return section.id;
    return acc;
  }, "inicio");
  navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + current));
});

if (menu) {
  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    nav.style.display = open ? "flex" : "";
    nav.style.position = "absolute";
    nav.style.top = "64px";
    nav.style.right = "16px";
    nav.style.flexDirection = "column";
    nav.style.padding = "15px 20px";
    nav.style.background = "#0b0b0b";
    nav.style.border = "1px solid #242424";
    nav.style.borderRadius = "12px";
    nav.style.gap = "0";
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      nav.style.display = "";
    }
  });
});

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});
