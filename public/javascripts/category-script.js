import { handleEscKey, endpoints } from "./utility.js";
import { openModal } from "./modal.js";
import { formValidation } from "./validation.js";

const categoryName = document.querySelector("h1").innerText;
const categoryUrl = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

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
    id: "cat-err",
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
    form.addEventListener("submit", formValidation());
    cancelBtn.addEventListener("click", resetDOM);
    form.addEventListener("keydown", handleEscKey(resetDOM));
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