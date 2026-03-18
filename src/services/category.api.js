export async function fetchCategories() {
    const res = await fetch("/api/categories");

    if (!res.ok) throw new Error("Failed to fetch categories");

    return res.json();
}

export async function fetchCategory(id) {
    const res = await fetch(`/api/categories/${id}`);

    if (!res.ok) throw new Error("Failed to fetch category");

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

    if (!res.ok) throw new Error("Failed to insert category");

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

    if (!res.ok) throw new Error("Failed to update category");

    return res.json();
}

export async function deleteCategory(id) {
    const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
    });
    
    return res;
}