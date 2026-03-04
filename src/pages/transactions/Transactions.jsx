import { fetchTransactions, deleteTransaction } from './transaction.api.js';

import TransactionList from './TransactionList.jsx'

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions()
      .then(data => {
        console.log(data);
        setTransactions(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const res = await deleteTransaction(id);
    if (!res.ok) return;

    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="main">
      <h1>Transactions</h1>
      <Link to="/transactions/new">Add a new transaction</Link>
      <TransactionList transactions={transactions} onDelete={handleDelete}></TransactionList>
    </div>
  );
}

export default Transactions
