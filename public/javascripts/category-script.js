const categoryUrl = document.querySelector("main").dataset.id;
const h1 = document.querySelector("h1");
const categoryName = h1.innerText;

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
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", `/category/${categoryUrl}/edit?_method=PUT`);
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "name");
    input.value = categoryName;
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.id = "cancel-cat";
    cancelBtn.setAttribute("type", "button");
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.id = "save";
    saveBtn.setAttribute("type", "submit");
    const headerDiv = document.querySelector("header>div");
    headerDiv.replaceWith(form);

    form.append(input);
    form.append(cancelBtn);
    form.append(saveBtn);

    cancelBtn.addEventListener("click", resetDOM);
}

function resetDOM() {
    const div = document.createElement("div");
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
    const form = document.querySelector("form");
    const h1 = document.createElement("h1");
    h1.textContent = categoryName;

    form.replaceWith(div);
    div.append(h1);
    div.append(renameBtn);
    div.append(deleteBtn);

    renameBtn.addEventListener("click", createRenameDOM);
    deleteBtn.addEventListener("click", openModalCategory);
}