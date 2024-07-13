import { fetchData } from "./utility.js";
const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
focusable="false">
<path fill="currentColor"
    d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z" />
</svg>`;

export function manageForm() {
    const form = document.querySelector("form:not(#filter-menu)");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            formValidation(form);
        })
    }
}

const catFields = {
    name: {
        setFields() { return evaluateFields.call(this, "[name='name']", "#cat-err") },
    }
};

const todoFields = {
    title: {
        setFields() { return evaluateFields.call(this, "#title", "#title-err") },
    },
    date: {
        setFields() { return evaluateFields.call(this, "#due-date", "#date-err") },
    }
};

const userFields = {
    email: {
        setFields() { return evaluateFields.call(this, "#email", "#email-err") },
    },
    password: {
        setFields() { return evaluateFields.call(this, "#password", "#password-err") },
    }
};

const signupFields = {
    confirmPassword: {
        setFields() { return evaluateFields.call(this, "#confirm-password", "#password-conf-err") },
    }
};

const fields = [catFields, todoFields, userFields, signupFields];

async function formValidation(form) {
    const evaluatedFields = fields.map(item => {
        for (const field in item) {
            item[field].setFields();
        }
        return item;
    });

    const activeFields = evaluatedFields.filter(item => {
        for (const field in item) {
            return item[field].input;
        }
    });

    const formData = new FormData(form);

    const data = await fetchData(form.action, {
        method: form.method,
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Accept": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
    });

    activeFields.forEach(field => {
        if (data.errors) {
            validateForm(field, data.errors);
            const invalidFields = document.querySelectorAll(`[aria-invalid = "true"]`);
            invalidFields[0].focus();
        }
        else {
            window.location.href = data.redirect;
        }
    });
}

function validateField(field, errors) {
    const isFieldValid = !errors;
    return function setErrorDOM() {
        field.input.setAttribute("aria-invalid", !isFieldValid);
        isFieldValid ? field.error.classList.add("hidden") : field.error.classList.remove("hidden");
        isFieldValid ? field.error.innerHTML = "" : field.error.innerHTML = `${errorIcon} <ul>${errors[field.input.name].map(error => `<li>${error}</li>`).join("")}</ul>`;
        return isFieldValid;
    }
}

async function validateForm(fields, errors) {
    Object.keys(fields).reduce((acc, curr) => {
        const currentField = fields[curr];
        const currentFieldErrors = errors.find((item) => Object.hasOwn(item, currentField.input.name));
        const isFieldValid = validateField(currentField, currentFieldErrors);

        if (isFieldValid()) {
            return acc;
        } else {
            return false;
        }
    }, true);
}

function evaluateFields(input, error) {
    this.input = document.querySelector(input);
    this.error = document.querySelector(error);
}