import './styles/TransactionList.css'

import TransactionItem from './TransactionItem'

function TransactionList({ transactions, onDelete }) {

    // group transactions by month for display
    const groupedByMonth = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.date);

        const monthKey = date.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
        });

        // First item of the month = create new sum total and array of items
        if (!acc[monthKey])
            acc[monthKey] = {
                sum: 0,
                transactions: []
            };

        acc[monthKey].sum += Number(transaction.amount);
        acc[monthKey].transactions.push(transaction);

        return acc;
    }, {});


    return (
        <div className="transactionList">
            {Object.entries(groupedByMonth).map(([month, { sum, transactions }]) => (
                <div key={month}>
                    <div className="month">
                        <h2>{month}</h2>
                        <h2> {sum.toFixed(2)} $</h2>
                    </div>

                    {
                        transactions.map(transaction => (
                            <TransactionItem
                                key={transaction.id}
                                transaction={transaction}
                                onDelete={onDelete}
                            />
                        ))
                    }
                </div>
            ))}
        </div>
    );
}

export default TransactionList