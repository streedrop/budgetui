// Returns "January"
export const dateToMonth = (string) => {
    // Construct date no matter what the format is
    const dateObj = new Date(string);
    // Construct date again using dateObj to avoid timezone problems
    return new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), 1).toLocaleDateString("en-US", {
        month: "long"
    });
}

// Returns 0
export const dateToMonthIndex = (string) => {
    const dateObj = new Date(string);
    return new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), 1).toLocaleDateString("en-US", {
        month: "numeric"
    });
}

// Returns "2026"
export const dateToYear = (string) => {
    const dateObj = new Date(string);
    return new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), 1).toLocaleDateString("en-US", {
        year: "numeric"
    });
}

// Returns "January 2026"
export const dateToMonthYear = (string) => {
    const dateObj = new Date(string);
    return new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), 1).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });
}

// Returns "2026-01"
export const dateToNumericMonthYear = (string) => {
    const dateObj = new Date(string);
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
}

export const amountFormatter = (string) => {
    return `${Number(string).toFixed(2)} $`
}