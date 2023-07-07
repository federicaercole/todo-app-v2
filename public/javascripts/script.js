const checkboxes = [...document.querySelectorAll("input[type='checkbox']")];
checkboxes.forEach(checkbox => checkbox.addEventListener("change", async (event) => {
    await fetch("/", {
        method: "PUT", headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ id: event.target.dataset.id })
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