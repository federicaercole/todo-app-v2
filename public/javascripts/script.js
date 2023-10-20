import { fetchData, endpoints } from "./utility.js";

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