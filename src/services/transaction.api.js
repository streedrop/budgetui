import { handleError } from "@/utils/api";

export async function fetchTransactions(id) {
    const url = id ? `/api/transactions/category/${id}` : '/api/transactions';

    const res = await fetch(url);

    await handleError(res);

    return res.json();
}

export async function fetchTransaction(id) {
    const res = await fetch(`/api/transactions/${id}`);

    await handleError(res);

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

    await handleError(res);

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

    await handleError(res);

    return res.json();
}

export async function deleteTransaction(id) {
    const res = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
    });

    await handleError(res);

    return res;
}