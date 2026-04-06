// increment a month string
export const incrementMonth = (monthStr) => {
    let [year, month] = monthStr.split('-').map(Number);
    month += 1;
    if (month > 12) {
        month = 1;
        year += 1;
    }
    return `${year}-${String(month).padStart(2, '0')}`;
}

export const allMonthsFromYear = (year) => {
    return Array.from({ length: 12 }, (_, i) => `${year}-${String(i + 1).padStart(2, '0')}`);
}