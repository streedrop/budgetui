export const handleError = async (res) => {
    if (res.ok) return;
    
    const body = await res.json();
    console.error(body.error);
    throw new Error(body.error);
}