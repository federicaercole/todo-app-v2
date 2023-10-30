import { manageBtnEvents, filterMenuDOM } from "./buttons.js";
import { formValidation } from "./validation.js";

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

function manageForm() {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", formValidation());
    }
}