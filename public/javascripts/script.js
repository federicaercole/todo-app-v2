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
deleteBtns.forEach(button => button.addEventListener("click", async (event) => {
    const path = window.location.pathname;
    const id = event.currentTarget.dataset.id;
    const response = await fetch(`/todo/${id}/delete`, {
        method: "DELETE", headers: { "Content-Type": "application/json; charset=UTF-8" }, body: JSON.stringify({ id, url: path })
    });
    const data = await response.json();
    window.location.href = data.redirect;
}));

const sortFilter = document.querySelector("#sort");

sortFilter.addEventListener("change", async (event) => {
    let url = window.location.href;
    const response = await fetch(`${url}filter?sort=${event.target.value}`, { method: "GET" })
    const data = await response.json();
    window.location.href = data.redirect;
});