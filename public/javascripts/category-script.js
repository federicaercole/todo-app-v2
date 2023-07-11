const categoryUrl = document.querySelector("main").dataset.id;
const h1 = document.querySelector("h1");
const categoryName = h1.innerText;
const headerDiv = document.querySelector("header>div");

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

    cancelBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
    confirmBtn.addEventListener("click", deleteCategory);
}

async function deleteCategory() {
    const response = await fetch(`/category/${categoryUrl}/delete`, { method: "DELETE" });
    const data = await response.json();
    window.location.href = data.redirect;
}

function createRenameDOM() {
    const deleteBtn = document.querySelector("#delete");
    const renameBtn = document.querySelector("#rename");
    const h1 = document.querySelector("h1");
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.value = categoryName;
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.id = "cancel-cat";
    cancelBtn.setAttribute("type", "button");
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.id = "save";
    saveBtn.setAttribute("type", "submit");
    headerDiv.setAttribute("class", "rename");

    h1.replaceWith(input);
    renameBtn.replaceWith(cancelBtn);
    deleteBtn.replaceWith(saveBtn);

    cancelBtn.addEventListener("click", resetDOM);
    saveBtn.addEventListener("click", saveChanges);
}

function resetDOM() {
    const renameBtn = document.createElement("button");
    renameBtn.textContent = "Rename";
    renameBtn.setAttribute("type", "button");
    renameBtn.setAttribute("id", "rename");
    renameBtn.classList.add("link");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("type", "button");
    deleteBtn.setAttribute("id", "delete");
    deleteBtn.classList.add("link");
    const input = document.querySelector("input[type='text']");
    const cancelBtn = document.querySelector("#cancel-cat");
    const saveBtn = document.querySelector("#save");
    const h1 = document.createElement("h1");
    h1.textContent = categoryName;
    headerDiv.removeAttribute("class");

    input.replaceWith(h1);
    cancelBtn.replaceWith(renameBtn);
    saveBtn.replaceWith(deleteBtn);

    renameBtn.addEventListener("click", createRenameDOM);
    deleteBtn.addEventListener("click", deleteCategory);
}

async function saveChanges() {
    const inputValue = document.querySelector("input[type='text']").value;
    const response = await fetch(`/category/${categoryUrl}/edit`, {
        method: "PUT", headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ name: inputValue })
    });
    const data = await response.json();
    window.location.href = data.redirect;
}