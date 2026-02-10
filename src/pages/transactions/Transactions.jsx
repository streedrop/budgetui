import { useState, useEffect } from 'react';
import TransactionItem from './TransactionItem.jsx'

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/transactions')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setTransactions(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Transactions</h1>
      {transactions.map(transaction => (
        <TransactionItem key={transaction.id} description={transaction.description} amount={transaction.amount} />
      ))}
    </div>
  );
}

export default Transactions
