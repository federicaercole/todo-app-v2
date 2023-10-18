import { toggleMenu } from "./utility.js";

const menuBtn = document.querySelector("#menu");
const nav = document.querySelector(".navigation");

function openMenu(menu, btn) {
    const isMenuOpened = toggleMenu(menu, btn);

    return function toggleSpanText() {
        const spanBtn = btn.querySelector("span");
        isMenuOpened() ? spanBtn.textContent = "Close menu" : spanBtn.textContent = "Open menu";
    };
}

if (document.querySelector("#account")) {
    const userMenu = document.querySelector("#user-menu");
    const accountBtn = document.querySelector("#account");
    menuBtn.addEventListener("click", openMenu(nav, menuBtn));
    accountBtn.addEventListener("click", openMenu(userMenu, accountBtn));
} else {
    menuBtn.addEventListener("click", openMenu(nav, menuBtn));
}

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