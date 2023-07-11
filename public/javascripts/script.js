const checkboxes = [...document.querySelectorAll("input[type='checkbox']")];
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
    h2.textContent = "Delete this todo?"
    p.textContent = "Are you sure you want to delete this todo?"
    modal.classList.remove("hidden");
    const cancelBtn = document.querySelector("#cancel");
    const confirmBtn = document.querySelector("#confirm");

    cancelBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
    confirmBtn.addEventListener("click", () => deleteItem(id));
}

async function deleteItem(id) {
    const path = window.location.pathname;
    const response = await fetch(`/todo/${id}/delete`, {
        method: "DELETE", headers: { "Content-Type": "application/json; charset=UTF-8" }, body: JSON.stringify({ id, url: path })
    });
    const data = await response.json();
    window.location.href = data.redirect;
}

const sortFilter = document.querySelector("#sort");

sortFilter.addEventListener("change", async (event) => {
    let url = window.location.href;
    const response = await fetch(`${url}filter?sort=${event.target.value}`, { method: "GET" })
    const data = await response.json();
    window.location.href = data.redirect;
});