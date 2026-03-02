export async function fetchCategories() {
    const res = await fetch("/api/categories");

    if (!res.ok) throw new Error("Failed to fetch categories");

    return res.json();
}

export async function deleteCategory(id) {
    const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
    });
    
    return res;
}