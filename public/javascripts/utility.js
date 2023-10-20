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

function checkIfItemExists(item) {
    const prop = Object.keys(item)[0];
    return document.contains(item[prop]);
}

export function manageClickEvents(items) {
    const existentItems = items.filter(checkIfItemExists);
    existentItems.map(item => item.btn.addEventListener("click", item.click()));
}

export function transformBtnNodeToObj(node, callback) {
    return {
        btn: node,
        click() { return callback }
    };
}