import { manageBtnEvents } from "./utility.js";
import { buttons } from "./buttons.js";

manageBtnEvents(buttons);

if (document.querySelector(`a[href="${window.location.pathname}"`)) {
    const currentNavElement = document.querySelector(`a[href="${window.location.pathname}"`);
    currentNavElement.setAttribute("aria-current", "page");
}