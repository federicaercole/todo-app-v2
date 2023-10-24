import { manageBtnEvents, filterMenuDOM } from "./buttons.js";

manageBtnEvents();
filterMenuDOM();
highlightCurrentPage();

function highlightCurrentPage() {
    const currentNavElement = document.querySelector(`a[href="${window.location.pathname}"`);
    currentNavElement.setAttribute("aria-current", "page");
}