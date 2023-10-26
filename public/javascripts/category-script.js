import { handleEscKey, endpoints } from "./utility.js";
import { openModal } from "./modal.js";

const categoryName = document.querySelector("h1").innerText;
const categoryUrl = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
focusable="false">
<path fill="currentColor"
    d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z" />
</svg>`

function createElement(elem, elemAttr) {
    const element = document.createElement(elem);
    for (const attr in elemAttr) {
        element.setAttribute(attr, elemAttr[attr]);
    }

    return element;
}

const formAttr = {
    method: "post",
    action: `${endpoints.category}${categoryUrl}?_method=PUT`,
};

const inputAttr = {
    type: "text",
    name: "name",
    minlength: 3,
    maxlength: 30,
    ["aria-invalid"]: false,
    ["aria-describedby"]: "cat-error",
    ["aria-label"]: "New category name",
    value: categoryName,
};

const saveBtnAttr = {
    type: "submit",
};

const btnAttr = {
    type: "button",
};

const renameBtnAttr = {
    type: "button",
    id: "rename",
};

const deleteBtnAttr = {
    type: "button",
    id: "delete",
    ["data-id"]: categoryUrl,
};

const errorAttr = {
    ["aria-live"]: "polite",
    id: "cat-error",
};

export function createRenameDOM() {
    const form = createElement("form", formAttr);
    form.noValidate = true;

    const input = createElement("input", inputAttr);
    input.required = true;

    const cancelBtn = createElement("button", btnAttr);
    cancelBtn.textContent = "Cancel";

    const saveBtn = createElement("button", saveBtnAttr);
    saveBtn.textContent = "Save";

    const headerDiv = document.querySelector("header>div");
    headerDiv.replaceWith(form);

    const error = createElement("p", errorAttr);
    error.classList.add("info", "error", "hidden");

    form.append(input);
    form.append(cancelBtn);
    form.append(saveBtn);
    form.before(error);
    input.focus();

    return renameDOMHandlers(form, cancelBtn);
}

function renameDOMHandlers(form, cancelBtn) {
    cancelBtn.addEventListener("click", resetDOM);
    form.addEventListener("keydown", handleEscKey(resetDOM));
    form.addEventListener("submit", formValidation);
}

function resetDOM() {
    const div = document.createElement("div");

    const renameBtn = createElement("button", renameBtnAttr);
    renameBtn.textContent = "Rename";
    renameBtn.classList.add("link");

    const deleteBtn = createElement("button", deleteBtnAttr);
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("link");

    const form = document.querySelector("form");

    const h1 = document.createElement("h1");
    h1.textContent = categoryName;

    const error = document.querySelector(".info.error");

    form.replaceWith(div);
    div.append(h1);
    div.append(renameBtn);
    div.append(deleteBtn);
    renameBtn.focus();
    error.remove();

    return resetDOMHandlers(renameBtn, deleteBtn);
}

function resetDOMHandlers(renameBtn, deleteBtn) {
    renameBtn.addEventListener("click", createRenameDOM);
    deleteBtn.addEventListener("click", openModal("category"));
}

function formValidation(event) {
    const input = document.querySelector("input");
    const error = document.querySelector(".info.error.hidden");

    if (!input.validity.valid) {
        event.preventDefault();
        input.setAttribute("aria-invalid", "true");
        error.classList.remove("hidden");
        error.innerHTML = `${errorIcon} Category name must be between 3 and 30 characters`;
    }
}