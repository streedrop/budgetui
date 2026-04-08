export async function fetchRules() {
    const res = await fetch("/api/rules");

    if (!res.ok) throw new Error("Failed to fetch rules");

    return res.json();
}

export async function insertRule(data) {
    const res = await fetch('/api/rules', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Failed to insert rule");

    return res.json();
}

export async function deleteRule(id) {
    const res = await fetch(`/api/rules/${id}`, {
        method: "DELETE",
    });
    
    return res;
}