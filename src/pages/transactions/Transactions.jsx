import styles from './styles/Transactions.module.css';

import { Link } from 'react-router-dom';

import { useTransactions } from '@/hooks/useTransactions.js';
import { useTransactionFilters } from '@/hooks/useTransactionFilters.js';
import { deleteTransaction } from '@/services/transaction.api.js';

import Filter from '@/components/filter/Filter.jsx';
import TransactionList from './TransactionList.jsx'

function Transactions() {
  const { transactions, setTransactions } = useTransactions();
  const { filtered, filters, setFilters } = useTransactionFilters(transactions);

  const handleDelete = async (id) => {
    const res = await deleteTransaction(id);
    if (!res.ok) return;

    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  //if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Transactions</h1>
      <Link to="/transactions/new">Add a new transaction</Link>
      <Filter filters={filters} setFilters={setFilters} />
      <div className={styles.container}>
        <TransactionList transactions={filtered} onDelete={handleDelete} />
      </div>
    </>
  );
}

export default Transactions
