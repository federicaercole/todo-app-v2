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

if (document.querySelector("body>.info")) {
    const close = document.querySelector(".close");
    const message = document.querySelector("body>.info");

    close.addEventListener("click", () => message.remove());
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            message.remove();
        }
    });
}

if (document.querySelector(`a[href="${window.location.pathname}"`)) {
    const currentNavElement = document.querySelector(`a[href="${window.location.pathname}"`);
    currentNavElement.setAttribute("aria-current", "page");
}