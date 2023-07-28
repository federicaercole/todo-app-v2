const form = document.querySelector("form");
const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
focusable="false">
<path fill="currentColor"
    d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z" />
</svg>`;

form.addEventListener("submit", (event) => {
    const inputTitle = document.querySelector("input[name='title']");
    const inputDate = document.querySelector("input[name='due_date']");
    const errorTitle = document.querySelector("#title-err");
    const errorDate = document.querySelector("#date-err");

    if (!inputTitle.validity.valid || !inputDate.validity.valid) {
        event.preventDefault();
        if (!inputTitle.validity.valid) {
            inputTitle.setAttribute("aria-invalid", "true");
            errorTitle.classList.remove("hidden");
            errorTitle.innerHTML = `${errorIcon} Todo title must be between 1 and 100 characters`;
        } else {
            inputTitle.setAttribute("aria-invalid", "false");
            errorTitle.classList.add("hidden");
        }

        if (!inputDate.validity.valid) {
            inputDate.setAttribute("aria-invalid", "true");
            errorDate.classList.remove("hidden");
            errorDate.innerHTML = `${errorIcon} You must insert a valid due date`;
        } else {
            inputDate.setAttribute("aria-invalid", "false");
            errorDate.classList.add("hidden");
        }
    }
});