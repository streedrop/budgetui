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