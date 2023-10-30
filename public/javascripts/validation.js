const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
focusable="false">
<path fill="currentColor"
    d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z" />
</svg>`;

const catFields = {
    name: {
        setFields() { return evaluateFields.call(this, "[name='name']", "#cat-err") },
        errorMsg: "Category name must be between 3 and 30 characters",
        isFieldValid() { return this.input.validity.valid },
    }
};

const todoFields = {
    title: {
        setFields() { return evaluateFields.call(this, "#title", "#title-err") },
        errorMsg: "To-do title must be between 1 and 100 characters",
        isFieldValid() { return this.input.validity.valid },
    },
    date: {
        setFields() { return evaluateFields.call(this, "#due-date", "#date-err") },
        errorMsg: "You must insert a valid due date",
        isFieldValid() { return this.input.validity.valid },
    }
};

const userFields = {
    email: {
        setFields() { return evaluateFields.call(this, "#email", "#email-err") },
        errorMsg: "Must be a valid email address",
        isFieldValid() { return this.input.validity.valid },
    },
    password: {
        setFields() { return evaluateFields.call(this, "#password", "#password-err") },
        errorMsg: "You must provide a password",
        isFieldValid() { return this.input.validity.valid },
    }
};

const signupFields = {
    confirmPassword: {
        setFields() { return evaluateFields.call(this, "#confirm-password", "#password-conf-err") },
        errorMsg: "Passwords do not match",
        isFieldValid() { return this.input.value === userFields.password.input.value },
    }
};

const fields = [catFields, todoFields, userFields, signupFields];

export function formValidation() {

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

    return function preventSubmission(event) {
        activeFields.forEach(field => {
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

function evaluateFields(input, error) {
    this.input = document.querySelector(input);
    this.error = document.querySelector(error);
}