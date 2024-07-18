import { manageBtnEvents, filterMenuDOM } from "./buttons.js";
import { manageForm } from "./validation.js";

manageBtnEvents();
filterMenuDOM();
highlightCurrentPage();
focusInfoMessageBtn();
manageForm();

function highlightCurrentPage() {
    const currentNavElement = document.querySelector(`a[href="${window.location.pathname}"`);
    if (currentNavElement) {
        return currentNavElement.setAttribute("aria-current", "page");
    }
}

function focusInfoMessageBtn() {
    const infoMessage = document.querySelector("aside.info");
    if (infoMessage) {
        infoMessage.setAttribute("aria-live", "polite");
        const infoMessageBtn = infoMessage.querySelector(".close");
        infoMessageBtn.focus();
    }
}