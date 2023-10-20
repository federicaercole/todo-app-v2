export const endpoints = {
    todo: "/todo/",
    status: "/todo/status/",
    category: "/todo/category/"
};

export async function fetchData(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

export function toggleMenu(menu) {
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

function checkIfItemExists(item) {
    const prop = Object.keys(item)[0];
    return document.contains(item[prop]);
}

export function manageClickEvents(items) {
    const existentItems = items.filter(checkIfItemExists);
    existentItems.map(item => item.btn.addEventListener("click", item.click()));
}