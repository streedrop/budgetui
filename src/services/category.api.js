import { handleError } from "@/utils/api";

export async function fetchCategories() {
    const res = await fetch("/api/categories");

    await handleError(res);

    return res.json();
}

export async function fetchCategory(id) {
    const res = await fetch(`/api/categories/${id}`);

    await handleError(res);

    return res.json();
}

export async function insertCategory(data) {
    const res = await fetch('/api/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    await handleError(res);

    return res.json();
}

export async function updateCategory(id, data) {
    const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    await handleError(res);

    return res.json();
}

export async function deleteCategory(id) {
    const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
    });

    await handleError(res);
    
    return res;
}