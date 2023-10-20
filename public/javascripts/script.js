import { fetchData, endpoints } from "./utility.js";
import { openModal } from "./modal.js";

const checkboxes = [...document.querySelectorAll("article input[type='checkbox']")];
checkboxes.forEach(checkbox => checkbox.addEventListener("click", async (event) => {
    const id = event.target.dataset.id;
    const todo = document.querySelector(`[data-id="${id}"]`);

    if (event.target.checked) {
        todo.classList.add("done");
    } else {
        todo.classList.remove("done");
    }
    fetchData(`${endpoints.status}${id}`, { method: "PUT" });
}));

const deleteBtns = [...document.querySelectorAll(".delete-todo")];
deleteBtns.forEach(button => button.addEventListener("click", openModal("todo")));

const form = document.querySelector("#filter-menu");
const sortOption = form.querySelector("#sort");
const params = new URLSearchParams(window.location.search);

function checkFilterCheckboxes(item) {
    document.querySelector(`input[value = "${item}"]`).checked = true;
}

if (params.has("sort")) {
    sortOption.value = params.get("sort");
    params.getAll("priority[]").forEach(checkFilterCheckboxes);
    params.getAll("done[]").forEach(checkFilterCheckboxes);
} else {
    sortOption.value = "desc";
    [...form.querySelectorAll("input[type='checkbox']")].forEach(item => item.checked = false);
}