import styles from './styles/Dev.module.css';

import { fetchTransactions } from '@/services/transaction.api';

import ColorPicker from '@/components/ColorPicker/ColorPicker';
import IconPicker from '@/components/IconPicker/IconPicker';
import Button from '@/components/buttons/Button';

function Dev() {

    const extractSql = () => {
        fetchTransactions().then(data => {
            let string = 'INSERT INTO transactions (amount, description, category_id, date) VALUES\n';
            string = data.reduce(((acc, item) => {
                item.description = item.description.replaceAll("'", "''");
                acc += `(${Number(item.amount)}, '${item.description}', ${item.category_id}, '${item.date.split("T")[0]}'),\n`;
                return acc;
            }), string)
            navigator.clipboard.writeText(string.slice(0, -2) + ';');
        })
    }

    return (
        <>
            <h1>Dev Tools</h1>
            <ColorPicker />
            <IconPicker />

            <div>
                <Button onClick={extractSql}>Extract transactions as SQL</Button>
            </div>

        </>
    )
}


export default Dev