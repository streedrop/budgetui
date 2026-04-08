import { handleError } from "@/utils/api";

export async function fetchBudgets(id) {
    const url = id ? `/api/budget/${id}` : `/api/budget`;

    const res = await fetch(url);

    await handleError(res);

    return res.json();
}

export async function fetchBudget(id, month) {
    const res = await fetch(`/api/budget/${id}/${month}`);

    await handleError(res);

    return res.json();
}

export async function upsertBudget(id, month, data) {
    const res = await fetch(`/api/budget/${id}/${month}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    await handleError(res);

    return res.json();
}

export async function deleteBudget(id, month) {
    const res = await fetch(`/api/budget/${id}/${month}`, {
        method: "DELETE",
    });

    await handleError(res);

    return res;
}