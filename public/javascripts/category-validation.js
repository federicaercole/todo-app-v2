const form = document.querySelector("form");
const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
focusable="false">
<path fill="currentColor"
    d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z" />
</svg>`;

form.addEventListener("submit", (event) => formValidation(event));

function formValidation(event) {
    const input = form.querySelector("input");
    const error = document.querySelector(".info.error.hidden");

    if (!input.validity.valid) {
        event.preventDefault();
        input.setAttribute("aria-invalid", "true");
        error.classList.remove("hidden");
        error.innerHTML = `${errorIcon} Category name must be between 3 and 30 characters`;
    }
}