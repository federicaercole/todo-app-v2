const checkboxes = [...document.querySelectorAll("input[type='checkbox']")];
checkboxes.forEach(checkbox => checkbox.addEventListener("change", async (event) => {
    await fetch("/", { method: "PUT", headers: { "Content-Type": "application/json; charset=UTF-8" }, body: JSON.stringify({ id: event.target.id }) })
}));