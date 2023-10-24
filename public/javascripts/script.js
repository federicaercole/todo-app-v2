export function manageFilterMenu(menu) {
    const sortOption = menu.querySelector("#sort");
    const params = new URLSearchParams(window.location.search);

    function checkFilterCheckboxes(item) {
        document.querySelector(`input[value="${item}"]`).checked = true;
    }

    if (params.has("sort")) {
        sortOption.value = params.get("sort");
        params.getAll("priority[]").map(checkFilterCheckboxes);
        params.getAll("done[]").map(checkFilterCheckboxes);
    } else {
        sortOption.value = "desc";
        [...menu.querySelectorAll("input[type='checkbox']")].map(item => item.checked = false);
    }
}