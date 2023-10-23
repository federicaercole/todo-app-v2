import { fetchData, endpoints, transformBtnNodeToObj } from "./utility.js";
import { openModal } from "./modal.js";
import { createRenameDOM } from "./category-script.js";

const navMenu = {
    btn: document.querySelector("#menu"),
    menu: document.querySelector(".navigation"),
    click() { return manageMenu(this) },
};

const accountMenu = {
    btn: document.querySelector("#account"),
    menu: document.querySelector("#user-menu"),
    click() { return manageMenu(this) },
};

const filterBtn = {
    btn: document.querySelector("#filter"),
    menu: document.querySelector("#filter-menu"),
    click() { return toggleMenu(this) },
};

const closeMsgBtn = {
    btn: document.querySelector(".close"),
    msg: document.querySelector("body>.info"),
    click() { return closeMsg(this.msg) },
    esc() { return this.click() }
};

const deleteCategoryBtn = {
    btn: document.querySelector("#delete"),
    click() { return openModal("category") },
}

const renameCategoryBtn = {
    btn: document.querySelector("#rename"),
    click() { return createRenameDOM },
}

const deleteTodoBtns = [...document.querySelectorAll(".delete-todo")].map((item) => transformBtnNodeToObj(item, openModal("todo")));
const checkboxes = [...document.querySelectorAll("article input[type='checkbox']")].map((item) => transformBtnNodeToObj(item, toggleCheckboxes));

export const buttons = [
    navMenu,
    accountMenu,
    ...deleteTodoBtns,
    ...checkboxes,
    filterBtn,
    closeMsgBtn,
    deleteCategoryBtn,
    renameCategoryBtn
];

function closeMsg(msg) {
    return function deleteMsgDOM() {
        return msg.remove();
    }
}

function toggleMenu(menu) {
    return function openOrCloseMenu() {
        let isMenuOpened = menu.menu.classList.contains("show-menu");
        isMenuOpened = !isMenuOpened;
        isMenuOpened ? menu.menu.classList.add("show-menu") : menu.menu.classList.remove("show-menu");
        menu.btn.setAttribute("aria-expanded", `${isMenuOpened}`);
        if (menu.btn.querySelector("span")) return changeSpanText();

        function changeSpanText() {
            const spanBtn = menu.btn.querySelector("span");
            isMenuOpened ? spanBtn.textContent = "Close menu" : spanBtn.textContent = "Open menu";
        }
    }
}

function manageMenu(menu) {
    const otherMenu = menu === navMenu ? accountMenu : navMenu;
    return function toggleAndCloseOtherMenuIfOpened() {
        const isOtherMenuOpened = otherMenu.menu != null ? otherMenu.menu.classList.contains("show-menu") : false;
        if (isOtherMenuOpened) toggleMenu(otherMenu)();
        return toggleMenu(menu)();
    }
}

async function toggleCheckboxes(event) {
    const id = event.target.dataset.id;
    const todo = document.querySelector(`[data-id="${id}"]`);

    if (event.target.checked) {
        todo.classList.add("done");
    } else {
        todo.classList.remove("done");
    }
    return fetchData(`${endpoints.status}${id}`, { method: "PUT" });
}