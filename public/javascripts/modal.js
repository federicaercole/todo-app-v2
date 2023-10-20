
import { endpoints, fetchData } from "./utility.js";

const modal = document.querySelector(".modal");
const cancelBtn = document.querySelector("#cancel");
const confirmBtn = document.querySelector("#confirm");

export function openModal(typeOfItem) {
    return function createModal(event) {
        const id = event.currentTarget.dataset.id;
        const h2 = modal.querySelector("h2");
        const p = modal.querySelector("p");
        modal.classList.remove("hidden");
        cancelBtn.focus();

        if (typeOfItem === "todo") {
            h2.textContent = "Delete this to-do?"
            p.textContent = "It will be gone forever!"
        } else {
            h2.textContent = "Delete this category?"
            p.textContent = "Deleting a category deletes all the todos associated with the category!"
        }

        modalHandlers(id, typeOfItem);
    }
}

function modalHandlers(id, typeOfItem) {
    modal.addEventListener("keydown", focusTrap);

    modal.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeModal(id, typeOfItem);
        }
    });

    cancelBtn.addEventListener("click", () => closeModal(id, typeOfItem));
    confirmBtn.addEventListener("click", () => deleteItem(id, typeOfItem));
}

function focusTrap(event) {
    const firstFocusableElement = modal.querySelectorAll("button")[0];
    const focusableContent = modal.querySelectorAll("button");
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    if (event.key === "Tab" && !event.shiftKey) {
        if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            event.preventDefault();
        }
    }
    else if (event.key === "Tab" && event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            event.preventDefault();
        }
    }
    else return;
};

function closeModal(id, typeOfItem) {
    modal.classList.add("hidden");
    let deleteBtn;
    if (typeOfItem === "todo") {
        deleteBtn = document.querySelector(`.delete-todo[data-id='${id}']`);
    } else {
        deleteBtn = document.querySelector("#delete");
    }
    deleteBtn.focus();
}

async function deleteItem(id, typeOfItem) {
    const url = window.location.pathname;
    const data = await fetchData(`${endpoints[typeOfItem]}${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json; charset=UTF-8" }, body: JSON.stringify({ url })
    });
    window.location.href = data.redirect;
}