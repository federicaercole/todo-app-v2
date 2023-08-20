const menuBtn = document.querySelector("#menu");
const nav = document.querySelector(".navigation");
const userMenu = document.querySelector("#user-menu");
const accountBtn = document.querySelector("#account");

function openMenu(menuToOpen, btnMenuToOpen, otherMenu, btnOtherMenu) {
    const spanMenuToOpen = btnMenuToOpen.querySelector("span");
    const spanOtherMenu = btnOtherMenu.querySelector("span");
    if (!menuToOpen.classList.contains("show-menu")) {
        menuToOpen.classList.add("show-menu");
        spanMenuToOpen.textContent = "Close menu";
        btnMenuToOpen.setAttribute("aria-expanded", "true");

        otherMenu.classList.remove("show-menu");
        btnOtherMenu.setAttribute("aria-expanded", "false");
        spanOtherMenu.textContent = "Open menu";
    } else {
        btnMenuToOpen.setAttribute("aria-expanded", "false");
        menuToOpen.classList.remove("show-menu");
        spanMenuToOpen.textContent = "Open menu";
    }
}

menuBtn.addEventListener("click", () => { openMenu(nav, menuBtn, userMenu, accountBtn) });

accountBtn.addEventListener("click", () => { openMenu(userMenu, accountBtn, nav, menuBtn) });

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