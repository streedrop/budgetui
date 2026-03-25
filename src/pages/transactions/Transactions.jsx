import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useTransactions } from '@/hooks/rq/useTransactions.js';
import { useDeleteTransaction } from '@/hooks/rq/useDeleteTransaction.js';
import { useTransactionFilters } from '@/hooks/useTransactionFilters.js';

import AddButton from '@/components/buttons/AddButton.jsx';
import FilterOverlay from '@/components/filter/FilterOverlay.jsx';
import TransactionList from './TransactionList.jsx'

function Transactions() {
  const { data : transactions = [], isLoading, error } = useTransactions();
  const { filtered, filters, setFilters } = useTransactionFilters(transactions);
  const { mutate: deleteTransaction } = useDeleteTransaction();

  const [openFilters, setOpenFilters] = useState(false);

  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>Transactions</h1>
      <section>
        <p>Every transaction you add should be categorized to see it's data and interpret results better.</p>
        <AddButton action={() => navigate('/transactions/new')}>Add transaction</AddButton>
      </section>
      <FilterOverlay isOpen={openFilters} onClose={() => setOpenFilters(false)} filters={filters} setFilters={setFilters}  />
      {/* <Filter filters={filters} setFilters={setFilters} /> */}
      <TransactionList transactions={filtered} onDelete={deleteTransaction} openFilters={setOpenFilters} />
    </>
  );
}

export default Transactions
