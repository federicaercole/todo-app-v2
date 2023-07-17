const categoryUrl = document.querySelector("main").dataset.id;
const h1 = document.querySelector("h1");
const categoryName = h1.innerText;
const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
focusable="false">
<path fill="currentColor"
    d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z" />
</svg>`

const deleteBtn = document.querySelector("#delete");
deleteBtn.addEventListener("click", openModalCategory);

const renameBtn = document.querySelector("#rename");
renameBtn.addEventListener("click", createRenameDOM);

function openModalCategory() {
    const modal = document.querySelector(".modal");
    const h2 = modal.querySelector("h2");
    const p = modal.querySelector("p");
    h2.textContent = "Delete this category?"
    p.textContent = "Deleting a category deletes all the todos associated with the category!"
    modal.classList.remove("hidden");
    const cancelBtn = document.querySelector("#cancel");
    const confirmBtn = document.querySelector("#confirm");
    cancelBtn.focus();

    cancelBtn.addEventListener("click", closeModalCategory);
    confirmBtn.addEventListener("click", deleteCategory);

    modal.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeModalCategory();
        }
    });
}

function closeModalCategory() {
    modal.classList.add("hidden");
    const deleteBtn = document.querySelector("#delete");
    deleteBtn.focus();
}

async function deleteCategory() {
    const response = await fetch(`/category/${categoryUrl}/delete`, { method: "DELETE" });
    const data = await response.json();
    window.location.href = data.redirect;
}

function createRenameDOM() {
    const form = document.createElement("form");
    form.noValidate = true;
    form.setAttribute("method", "post");
    form.setAttribute("action", `/category/${categoryUrl}/edit?_method=PUT`);
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "name");
    input.required = true;
    input.setAttribute("minlength", "3");
    input.setAttribute("maxlength", "30");
    input.setAttribute("aria-invalid", "false");
    input.setAttribute("aria-describedby", "cat-error");
    input.value = categoryName;
    input.setAttribute("aria-label", "New category name");
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.setAttribute("type", "button");
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.setAttribute("type", "submit");
    const headerDiv = document.querySelector("header>div");
    headerDiv.replaceWith(form);
    const error = document.createElement("p");
    error.classList.add("info", "error", "hidden");
    error.setAttribute("aria-live", "polite");
    error.id = "cat-error";

    form.append(input);
    form.append(cancelBtn);
    form.append(saveBtn);
    form.before(error);
    input.focus();

    cancelBtn.addEventListener("click", resetDOM);
    form.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            resetDOM();
        }
    });
    form.addEventListener("submit", (event) => formValidation(event));
}

function resetDOM() {
    const div = document.createElement("div");
    const renameBtn = document.createElement("button");
    renameBtn.textContent = "Rename";
    renameBtn.setAttribute("type", "button");
    renameBtn.classList.add("link");
    renameBtn.id = "rename";
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("type", "button");
    deleteBtn.classList.add("link");
    deleteBtn.id = "delete";
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

    renameBtn.addEventListener("click", createRenameDOM);
    deleteBtn.addEventListener("click", openModalCategory);
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