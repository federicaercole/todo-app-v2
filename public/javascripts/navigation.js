import { manageClickEvents } from "./utility.js";
import { buttons } from "./buttons.js";

manageClickEvents(buttons);

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