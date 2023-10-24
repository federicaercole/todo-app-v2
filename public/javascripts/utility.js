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

export function checkIfItemExistsInDOM(item) {
    const prop = Object.keys(item)[0];
    return document.contains(item[prop]);
}

export function handleEscKey(callback) {
    return function close(event) {
        if (event.key === "Escape") {
            callback()
        }
    }
}

export function transformBtnNodeToObj(node, callback) {
    return {
        btn: node,
        click() { return callback }
    };
}