import styles from './styles/Dev.module.css';

import { useTransactions } from '@/hooks/transactions/useTransactions';
import { useCategories } from '@/hooks/categories/useCategories';
import { useRules } from '@/hooks/rules/useRules';

import ColorPicker from '@/components/ColorPicker/ColorPicker';
import IconPicker from '@/components/IconPicker/IconPicker';
import Button from '@/components/buttons/Button';

function Dev() {

    const { data: transactions = [] } = useTransactions();
    const { data: categories = [] } = useCategories();
    const { data: rules = [] } = useRules();

    const generateSeeder = () => {
        let rules_str = 'INSERT INTO rules (source, match_type, keyword, action, category_id, new_string) VALUES\n';
        rules_str = rules.reduce(((acc, item) => {
            item.category_id = item.category_id ? Number(item.category_id) : null;
            item.new_string = item.new_string === null ? null : `'${item.new_string.replaceAll("'", "''")}'`;
            item.keyword = `'${item.keyword.replaceAll("'", "''")}'`;

            acc += `('${item.source}', '${item.match_type}', ${item.keyword},  '${item.action}', ${item.category_id}, ${item.new_string}),\n`;

            return acc;
        }), rules_str);

        let transactions_str = 'INSERT INTO transactions (amount, description, category_id, date) VALUES\n';
        transactions_str = transactions.reduce(((acc, item) => {
            item.description = item.description.replaceAll("'", "''");

            acc += `(${Number(item.amount)}, '${item.description.trim()}', ${item.category_id}, '${item.date.split("T")[0]}'),\n`;
        
            return acc;
        }), transactions_str);

        let categories_str = 'INSERT INTO categories (id, name, description, is_income, icon) VALUES\n';
        categories_str = categories.reduce(((acc, item) => {
            if(item.name == "Uncategorized")
                return acc;
            item.name = item.name.replaceAll("'", "''");
            item.description = item.description ? `'${item.description.replaceAll("'", "''")}'` : null;

            acc += `(${item.id}, '${item.name.trim()}', ${item.description}, ${Number(item.is_income)}, ${Number(item.icon)}),\n`;

            return acc;
        }), categories_str);

        const seeder = categories_str.slice(0, -2) + ";\n\n" + rules_str.slice(0, -2) + ";\n\n" + transactions_str.slice(0, -2) + ';\n';

        navigator.clipboard.writeText(seeder);
    }

    return (
        <>
            <h1>Dev Tools</h1>
            <ColorPicker />
            <IconPicker />

            <div>
                <Button action={generateSeeder}>Generate SQL Seeder</Button>
            </div>

        </>
    )
}


export default Dev