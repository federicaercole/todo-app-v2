const form = document.querySelector("form");
const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
focusable="false">
<path fill="currentColor"
    d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z" />
</svg>`;

form.addEventListener("submit", (event) => formValidation(event));

function formValidation(event) {
    const inputEmail = document.querySelector("input[name='email']");
    const inputPassword = document.querySelector("input[name='password']");
    const errorEmail = document.querySelector("#email-err");
    const errorPassword = document.querySelector("#password-err");

    if (!inputEmail.validity.valid || !inputPassword.validity.valid) {
        event.preventDefault();
        if (!inputEmail.validity.valid) {
            inputEmail.setAttribute("aria-invalid", "true");
            errorEmail.classList.remove("hidden");
            errorEmail.innerHTML = `${errorIcon} Must be a valid email address`;
        } else {
            inputEmail.setAttribute("aria-invalid", "false");
            errorEmail.classList.add("hidden");
        }

        if (inputPassword.validity.valueMissing) {
            inputPassword.setAttribute("aria-invalid", "true");
            errorPassword.classList.remove("hidden");
            errorPassword.innerHTML = `${errorIcon} You must provide a password`;
        } else {
            inputPassword.setAttribute("aria-invalid", "false");
            errorPassword.classList.add("hidden");
        }
    }

    if (document.querySelector("input[name='confirm-password']")) {
        const inputConfirmPassword = document.querySelector("input[name='confirm-password']");

        if (inputConfirmPassword.value !== inputPassword.value) {
            event.preventDefault();
            inputConfirmPassword.setAttribute("aria-invalid", "true");
            errorPassword.classList.remove("hidden");
            errorPassword.innerHTML = `${errorIcon} Passwords do not match`;
        } else if (inputConfirmPassword.value === inputPassword.value && inputPassword.value !== "") {
            inputConfirmPassword.setAttribute("aria-invalid", "false");
            errorPassword.classList.add("hidden");
        }
    }
}