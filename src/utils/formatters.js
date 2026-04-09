import i18n from '@/i18n'
import { lngs } from '@/constants/Languages';

// Returns "2026"
export const dateToYear = (string) => {
    const dateObj = new Date(string);
    return new Date(dateObj.getUTCFullYear(), 1, 1).toLocaleDateString(lngs[i18n.language].locale, {
        year: "numeric"
    });
}

// en: Returns "January"
// fr: Returns "janvier"
export const dateToMonth = (string) => {
    // Construct date no matter what the format is
    const dateObj = new Date(string);
    // Construct date again using dateObj to avoid timezone problems
    return new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), 1).toLocaleDateString(lngs[i18n.language].locale, {
        month: "long"
    });
}

// Returns 01 for January, 02 for February, etc.
export const dateToMonthIndex = (string) => {
    const date = new Date(string);
    return String(date.getUTCMonth() + 1).padStart(2, '0');
}

// en: Returns "January 2026"
// fr: Returns "janvier 2026"
export const dateToMonthYear = (string) => {
    const dateObj = new Date(string);
    return new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), 1).toLocaleDateString(lngs[i18n.language].locale, {
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

// en: Returns "January 1"
// fr: Returns "1 janvier"
export const dateToMonthDay = (string) => {
    const dateObj = new Date(string);
    // 2000 as a leap year placeholder
    return new Date(2000, dateObj.getUTCMonth(), dateObj.getUTCDate()).toLocaleDateString(lngs[i18n.language].locale, {
        month: "long",
        day: "numeric"
    });
}

// Returns "2026-01-23"
export const dateToYearMonthDay = (string) => {
    const dateObj = new Date(string);
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const day = dateObj.getUTCDate();
    return `${year}-${month}-${day}`;
}

// "12.4" => "12.40 $"
export const amountFormatter = (string) => {
    return new Intl.NumberFormat(lngs[i18n.language].locale, { minimumFractionDigits: 2, maximumFractionDigits: 2, style: 'currency', currency: 'CAD' }).format(Number(string))
}

// "EPICERIE MAGOG  " => "Epicerie Magog"
export const transactionNameFormatter = (string) => {
    return string.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ').trim()
}