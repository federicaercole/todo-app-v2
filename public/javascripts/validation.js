const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
focusable="false">
<path fill="currentColor"
    d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z" />
</svg>`;

const form = document.querySelector("form");

const catFields = {
    name: {
        getInput() { return document.querySelector("input[name='name']") },
        getError() { return document.querySelector("#cat-err") },
        errorMsg: "Category name must be between 3 and 30 characters",
        isFieldValid() { return this.getInput().validity.valid },
    }
};

const todoFields = {
    title: {
        input: document.querySelector("input[name='title']"),
        error: document.querySelector("#title-err"),
        errorMsg: "To-do title must be between 1 and 100 characters",
        isFieldValid() { return this.input.validity.valid },
    },
    date: {
        input: document.querySelector("input[name='due_date']"),
        error: document.querySelector("#date-err"),
        errorMsg: "You must insert a valid due date",
        isFieldValid() { return this.input.validity.valid },
    }
};

const userFields = {
    email: {
        input: document.querySelector("input[name='email']"),
        error: document.querySelector("#email-err"),
        errorMsg: "Must be a valid email address",
        isFieldValid() { return this.input.validity.valid },
    },
    password: {
        input: document.querySelector("input[name='password']"),
        error: document.querySelector("#password-err"),
        errorMsg: "You must provide a password",
        isFieldValid() { return this.input.validity.valid },
    }
};

const signupFields = {
    confirmPassword: {
        input: document.querySelector("input[name='confirm-password']"),
        error: document.querySelector("#password-conf-err"),
        errorMsg: "Passwords do not match",
        isFieldValid() { return this.input.value === userFields.password.input.value },
    }
};

const fields = [catFields, todoFields, userFields, signupFields];

form.addEventListener("submit", formValidation());

export function formValidation() {
    const fieldsInPage = fields.filter(item => {
        for (const field in item) {
            return item[field].input;
        }
    });
    return function preventSubmission(event) {
        fieldsInPage.forEach(field => {
            if (!validateForm(field)) {
                event.preventDefault();
            }
        });
    }
}

function validateField(field) {
    const isFieldValid = field.isFieldValid();
    return function setErrorDOM() {
        field.input.setAttribute("aria-invalid", !isFieldValid);
        isFieldValid ? field.error.classList.add("hidden") : field.error.classList.remove("hidden");
        isFieldValid ? field.error.innerHTML = "" : field.error.innerHTML = `${errorIcon} ${field.errorMsg}`;
        return isFieldValid;
    }
}

function validateForm(fields) {
    const isFormValid = Object.keys(fields).reduce((acc, curr) => {
        const currentField = fields[curr];
        const isFieldValid = validateField(currentField);

        if (isFieldValid()) {
            return acc;
        } else {
            return false;
        }
    }, true);

    return isFormValid;
}