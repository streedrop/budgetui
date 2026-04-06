import { dateToNumericMonthYear } from '@/utils/formatters';

// add colors to data
export const colorData = (data, colorsPerEntry = 1) => {
    return data.map((entry, index) => ({
        ...entry,
        ...Object.fromEntries(
            Array.from(
                { length: colorsPerEntry },
                (_, i) => [
                    `fill${colorsPerEntry > 1 ? i + 1 : ''}`,
                    `hsl(${(index * 360 / data.length) % 360}, 70%, ${colorsPerEntry > 1 ? 55 - (30 / (colorsPerEntry - 1)) * i : 55}%)`
                ]
            )
        )
    }))
}

// Get custom color bar
export const getCustomBar = (colorKey) => {
    return (props) => {
        const { x, y, width, height } = props;
        return <rect x={x} y={y} width={width} height={height} fill={props.payload[colorKey]} />
    }
}

// Find all months concerned by transactions and/or budgets
export const getMonths = (transactions, budgets) => {
    return [
        // New set from array to remove duplicate months
        ...new Set(
            [
                ...transactions?.map((transaction) => dateToNumericMonthYear(transaction.date)) || [],
                ...budgets?.map((budget) => dateToNumericMonthYear(budget.month)) || []
            ]
        )
    ].sort();
}

// Capitalize first letter of a word, for tooltips
export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}