import { manageBtnEvents, filterMenuDOM } from "./buttons.js";
import { manageForm } from "./validation.js";

manageBtnEvents();
filterMenuDOM();
highlightCurrentPage();
manageForm();

function highlightCurrentPage() {
    const currentNavElement = document.querySelector(`a[href="${window.location.pathname}"`);
    if (currentNavElement) {
        return currentNavElement.setAttribute("aria-current", "page");
    }
}