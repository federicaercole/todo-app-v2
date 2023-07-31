const checkboxes = [...document.querySelectorAll("article input[type='checkbox']")];
checkboxes.forEach(checkbox => checkbox.addEventListener("change", async (event) => {
    const id = event.target.dataset.id;
    const todo = document.querySelector(`[data-id="${id}"]`);
    if (event.target.checked) {
        todo.classList.add("done");
    } else {
        todo.classList.remove("done");
    }
    await fetch("/", {
        method: "PUT", headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ id })
    });
}));

const deleteBtns = [...document.querySelectorAll(".delete-todo")];
deleteBtns.forEach(button => button.addEventListener("click", event => openModalTodo(event)));

function openModalTodo(event) {
    const id = event.currentTarget.dataset.id;
    const modal = document.querySelector(".modal");
    const h2 = modal.querySelector("h2");
    const p = modal.querySelector("p");
    h2.textContent = "Delete this to-do?"
    p.textContent = "It will be gone forever!"
    modal.classList.remove("hidden");
    const cancelBtn = document.querySelector("#cancel");
    const confirmBtn = document.querySelector("#confirm");

    cancelBtn.focus();
    cancelBtn.addEventListener("click", () => closeModal(id));
    confirmBtn.addEventListener("click", () => deleteItem(id));

    modal.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeModal(id);
        }
    });
}

function closeModal(id) {
    modal.classList.add("hidden");
    const deleteBtn = document.querySelector(`.delete-todo[data-id='${id}']`);
    deleteBtn.focus();
}

async function deleteItem(id) {
    const path = window.location.pathname;
    const response = await fetch(`/todo/${id}`, {
        method: "DELETE", headers: { "Content-Type": "application/json; charset=UTF-8" }, body: JSON.stringify({ id, url: path })
    });
    const data = await response.json();
    window.location.href = data.redirect;
}

const modal = document.querySelector(".modal");

modal.addEventListener("keydown", event => {
    const firstFocusableElement = modal.querySelectorAll("button")[0];
    const focusableContent = modal.querySelectorAll("button");
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    if (event.key === "Tab" && !event.shiftKey) {
        if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            event.preventDefault();
        }
    }
    else if (event.key === "Tab" && event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            event.preventDefault();
        }
    }
    else return;
});

const form = document.querySelector(".filter");
const filterBtn = document.querySelector("#filter");
const sortOption = form.querySelector("#sort");
const params = new URLSearchParams(window.location.search);

filterBtn.addEventListener("click", () => {
    if (!form.classList.contains("show-menu")) {
        form.classList.add("show-menu");
        filterBtn.setAttribute("aria-expanded", "true");
    } else {
        filterBtn.setAttribute("aria-expanded", "false");
        form.classList.remove("show-menu");
    }
});

function checkFilterCheckboxes(item) {
    document.querySelector(`input[value="${item}"]`).checked = true;
}

if (params.has("sort")) {
    sortOption.value = params.get("sort");
    params.getAll("priority[]").forEach(checkFilterCheckboxes);
    params.getAll("done[]").forEach(checkFilterCheckboxes);
} else {
    sortOption.value = "desc";
    [...form.querySelectorAll("input[type='checkbox']")].forEach(item => item.checked = false);
}