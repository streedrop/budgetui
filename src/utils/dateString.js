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