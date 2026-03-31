// Returns "2026"
export const dateToYear = (string) => {
    const dateObj = new Date(string);
    return new Date(dateObj.getUTCFullYear(), 1, 1).toLocaleDateString("en-US", {
        year: "numeric"
    });
}

// Returns "January"
export const dateToMonth = (string) => {
    // Construct date no matter what the format is
    const dateObj = new Date(string);
    // Construct date again using dateObj to avoid timezone problems
    return new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), 1).toLocaleDateString("en-US", {
        month: "long"
    });
}

// Returns 01 for January, 02 for February, etc.
export const dateToMonthIndex = (string) => {
    const date = new Date(string);
    return String(date.getUTCMonth() + 1).padStart(2, '0');
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

// Returns "January 1"
export const dateToMonthDay = (string) => {
    const dateObj = new Date(string);
    // 2000 as a leap year placeholder
    return new Date(2000, dateObj.getUTCMonth(), dateObj.getUTCDate()).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric"
    });
}

export const amountFormatter = (string) => {
    return `${Number(string).toFixed(2)} $`
}