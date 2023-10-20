import { toggleMenu, manageClickEvents } from "./utility.js";

const navMenu = {
    btn: document.querySelector("#menu"),
    menu: document.querySelector(".navigation"),
    click() { return manageMenu(this) },
};

const accountMenu = {
    btn: document.querySelector("#account"),
    menu: document.querySelector("#user-menu"),
    click() { return manageMenu(this) },
};

const buttons = [
    navMenu,
    accountMenu,
    {
        btn: document.querySelector("#filter"),
        menu: document.querySelector("#filter-menu"),
        click() { return toggleMenu(this); },
    }];

manageClickEvents(buttons);

function manageMenu(menu) {
    const otherMenu = menu === navMenu ? accountMenu : navMenu;
    return function toggleAndCloseOtherMenuIfOpened() {
        const isOtherMenuOpened = otherMenu.menu != null ? otherMenu.menu.classList.contains("show-menu") : false;
        if (isOtherMenuOpened) toggleMenu(otherMenu)();
        return toggleMenu(menu)();
    }
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