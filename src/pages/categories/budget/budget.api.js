export async function fetchBudgets(id) {
    const url = id ? `/api/budget/${id}` : `/api/budget`;

    const res = await fetch(url);

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error);
    }

    return res.json();
}

export async function fetchBudget(id, month) {
    const res = await fetch(`/api/budget/${id}/${month}`);

    if (!res.ok) throw new Error("Failed to fetch budget for given category and month");

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

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error);
    }

    return res.json();
}

export async function deleteBudget(id, month) {
    const res = await fetch(`/api/budget/${id}/${month}`, {
        method: "DELETE",
    });

    return res;
}