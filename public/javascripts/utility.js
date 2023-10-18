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

export function toggleMenu(menu, btn) {
    let openMenu = false;

    return function openOrCloseMenu() {
        openMenu = !openMenu;
        openMenu ? menu.classList.add("show-menu") : menu.classList.remove("show-menu");
        btn.setAttribute("aria-expanded", `${openMenu}`);
        return openMenu;
    }
}