import { handleError } from "@/utils/api";

export async function fetchRules() {
    const res = await fetch("/api/rules");

    await handleError(res);

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

    await handleError(res);

    return res.json();
}

export async function deleteRule(id) {
    const res = await fetch(`/api/rules/${id}`, {
        method: "DELETE",
    });

    await handleError(res);
    
    return res;
}