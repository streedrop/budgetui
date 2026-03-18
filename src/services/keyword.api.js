export async function fetchKeywords() {
    const res = await fetch("/api/keywords");

    if (!res.ok) throw new Error("Failed to fetch keywords");

    return res.json();
}

export async function insertKeyword(data) {
    const res = await fetch('/api/keywords', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Failed to insert keyword");

    return res.json();
}

export async function deleteKeyword(source, keyword) {
    const res = await fetch(`/api/keywords/${source}/${keyword}`, {
        method: "DELETE",
    });
    
    return res;
}