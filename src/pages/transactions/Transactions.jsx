import { useNavigate } from 'react-router-dom';

import { useTransactions } from '@/hooks/useTransactions.js';
import { useTransactionFilters } from '@/hooks/useTransactionFilters.js';
import { deleteTransaction } from '@/services/transaction.api.js';

import AddButton from '@/components/buttons/AddButton.jsx';
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

  const navigate = useNavigate();

  //if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Transactions</h1>
      <section>
        <p>Every transaction you add should be categorized to see it's data and interpret results better.</p>
        <AddButton action={() => navigate('/transactions/new')}>Add transaction</AddButton>
      </section>
      <Filter filters={filters} setFilters={setFilters} />
      <TransactionList transactions={filtered} onDelete={handleDelete} />
    </>
  );
}

export default Transactions
