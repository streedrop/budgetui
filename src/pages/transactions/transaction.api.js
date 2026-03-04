export async function fetchTransactions() {
    const res = await fetch("/api/transactions");

    if (!res.ok) throw new Error("Failed to fetch transactions");

    return res.json();
}

export async function fetchTransaction(id) {
    const res = await fetch(`/api/transactions/${id}`);

    if (!res.ok) throw new Error("Failed to fetch transaction");

    return res.json();
}

export async function fetchTransactionsByCategory(id) {
    const res = await fetch(`/api/transactions/category/${id}`);

    if (!res.ok) throw new Error("Failed to fetch transactions for category!");

    return res.json();
}

export async function insertTransaction(data) {
    const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Failed to insert transaction");

    return res.json();
}

export async function updateTransaction(id, data) {
    const res = await fetch(`/api/transactions/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Failed to update transaction");

    return res.json();
}

export async function deleteTransaction(id) {
    const res = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
    });

    return res;
}