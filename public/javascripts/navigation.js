const menuBtn = document.querySelector("#menu");
const span = menuBtn.querySelector("span");
const nav = document.querySelector(".navigation");

menuBtn.addEventListener("click", () => {
    if (!nav.classList.contains("show-menu")) {
        nav.classList.add("show-menu");
        span.textContent = "Close menu";
        menuBtn.setAttribute("aria-expanded", "true");
    } else {
        menuBtn.setAttribute("aria-expanded", "false");
        nav.classList.remove("show-menu");
        span.textContent = "Open menu";
    }
});

if (document.querySelector(".info")) {
    const close = document.querySelector(".close");
    const message = document.querySelector(".info")

    close.addEventListener("click", () => message.remove());
}