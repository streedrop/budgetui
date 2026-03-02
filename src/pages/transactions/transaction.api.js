export async function fetchTransactions() {
    const res = await fetch("/api/transactions");

    if (!res.ok) throw new Error("Failed to fetch transactions");

    return res.json();
}

export async function deleteTransaction(id) {
    const res = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
    });
    
    return res;
}