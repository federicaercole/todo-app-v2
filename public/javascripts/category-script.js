const categoryUrl = document.querySelector("main").dataset.id;
const h1 = document.querySelector("h1");
const categoryName = h1.innerText;

const deleteBtn = document.querySelector("#delete");
deleteBtn.addEventListener("click", deleteCategory);

const renameBtn = document.querySelector("#rename");
renameBtn.addEventListener("click", createRenameDOM);

async function deleteCategory() {
    const response = await fetch(`/category/${categoryUrl}`, { method: "DELETE" });
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
    const undoBtn = document.createElement("button");
    undoBtn.textContent = "Undo";
    undoBtn.id = "undo";
    undoBtn.setAttribute("type", "button");
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.id = "save";
    saveBtn.setAttribute("type", "submit");

    h1.replaceWith(input);
    renameBtn.replaceWith(undoBtn);
    deleteBtn.replaceWith(saveBtn);

    undoBtn.addEventListener("click", resetDOM);
    saveBtn.addEventListener("click", saveChanges);
}

function resetDOM() {
    const renameBtn = document.createElement("button");
    renameBtn.textContent = "Rename";
    renameBtn.setAttribute("type", "button");
    renameBtn.setAttribute("id", "rename");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("type", "button");
    deleteBtn.setAttribute("id", "delete");
    const input = document.querySelector("input[type='text']");
    const undoBtn = document.querySelector("#undo");
    const saveBtn = document.querySelector("#save");
    const h1 = document.createElement("h1");
    h1.textContent = categoryName;

    input.replaceWith(h1);
    undoBtn.replaceWith(renameBtn);
    saveBtn.replaceWith(deleteBtn);

    renameBtn.addEventListener("click", createRenameDOM);
    deleteBtn.addEventListener("click", deleteCategory);
}

async function saveChanges() {
    const inputValue = document.querySelector("input[type='text']").value;
    const response = await fetch(`/category/${categoryUrl}`, {
        method: "PUT", headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ name: inputValue })
    });
    const data = await response.json();
    window.location.href = data.redirect;
}