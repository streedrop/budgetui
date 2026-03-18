import './styles/Transactions.css';

import { Link } from 'react-router-dom';

import { useTransactions } from '@/hooks/transaction.hooks.js';
import { deleteTransaction } from '@/services/transaction.api.js';

import TransactionList from './TransactionList.jsx'

function Transactions() {
  const { transactions, setTransactions } = useTransactions();

  const handleDelete = async (id) => {
    const res = await deleteTransaction(id);
    if (!res.ok) return;

    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  //if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error: {error}</p>;

  return (
    <div id="main">
      <h1>Transactions</h1>
      <Link to="/transactions/new">Add a new transaction</Link>
      <div className="transactionListContainer">
        <TransactionList transactions={transactions} onDelete={handleDelete}></TransactionList>
      </div>
    </div>
  );
}

export default Transactions
