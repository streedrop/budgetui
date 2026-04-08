import { transactionNameFormatter } from '@/utils/formatters';

export const prepareTransactions = (data, categories, keywords) => {
    // Split CSV per row and per column
    let formatted = data.trim().split('\n').map((item) => { return item.split(',') });

    // Remove and save first row of the CSV, as it's the header
    const columns = formatted.shift();

    // Remove any empty row of the CSV
    formatted = formatted.filter((row) => { return row.length === columns.length });

    if (formatted.length == 0) return;

    // Find indexes for fields we need
    const dateIndex = columns.findIndex((value) => value.toLowerCase().includes("date"));
    const descriptionIndex = columns.findIndex((value) => value.toLowerCase().includes("name"));
    const amountIndex = columns.findIndex((value) => value.toLowerCase().includes("amount"));
    const memoIndex = columns.findIndex((value) => value.toLowerCase().includes("memo"));

    // Format entries that will be ready for the display and the database
    const entries = formatted.reduce(
        ((acc, item) => {
            // Tangerine Bank has a memo containing the category
            const categoryNameFromMemo = item[memoIndex].split("Category: ")[1];

            // Create a transaction and set its attributes accordingly
            let transaction = {
                amount: Number(item[amountIndex].replace("-", "")),
                description: transactionNameFormatter(item[descriptionIndex]),
                date: new Date(item[dateIndex]).toISOString().split("T")[0],
                ignored: false,
                category_id: null,
                category_name: `Uncategorized${categoryNameFromMemo ? ` (${categoryNameFromMemo})` : ''}`
            };

            // Using memo, attempt to find a category that already exists with the same name
            const category = categories.find((category) => category.name === categoryNameFromMemo);

            // Update category if a category was found
            if (category) {
                transaction.category_id = category.id;
                transaction.category_name = category.name;
            }

            applyRules(keywords, transaction, categories);

            acc.push(transaction);
            return acc;
        }), [])

    return entries;
}

export const applyRules = (rules, transaction, categories) => {
    // Find matching rules
    const matching = rules.filter(
        (rule) => {
            // Match type: either has to contain the keyword or the characters have to be the same
            switch (rule.match_type) {
                default:
                case "contains":
                    // Source: where to search for the match type
                    switch (rule.source) {
                        case "category":
                            return transaction.category_name.toLowerCase().includes(rule.keyword.toLowerCase());
                        default:
                        case "description":
                            return transaction.description.toLowerCase().includes(rule.keyword.toLowerCase());
                    }
                case "equals":
                    // Source: where to search for the match type
                    switch (rule.source) {
                        case "category":
                            return transaction.category_name.toLowerCase() === rule.keyword.toLowerCase();
                        default:
                        case "description":
                            return transaction.description.toLowerCase() === rule.keyword.toLowerCase();
                    }
            }
        }
    );

    // Apply every rule
    matching.forEach((rule) => {
        switch (rule.action) {
            // Move transaction to another category (overrides one that was already found through basic name matching)
            case "move":
                transaction.category = categories.find((category) => category.id === rule.category_id);
                break;
            // Ignore (unselect) the transaction
            case "ignore":
                transaction.ignored = true;
                break;
            // Rename the transaction to a specified string
            case "rename":
                transaction.description = rule.new_string;
                break;
            // Replace all occurences of the keyword for a specified string
            case "replace":
                transaction.description = transaction.description.replaceAll(rule.keyword, rule.new_string).trim();
                break;
        }
    });
}