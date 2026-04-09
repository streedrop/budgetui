import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useTransactions } from '@/hooks/transactions/useTransactions.js';
import { useTransactionFilters } from '@/hooks/useTransactionFilters.js';

import AddButton from '@/components/buttons/AddButton.jsx';
import FilterOverlay from '@/components/filter/FilterOverlay.jsx';
import TransactionList from './TransactionList.jsx';

function Transactions() {
  const { t } = useTranslation();
  const { data : transactions = [], isLoading, error } = useTransactions();
  const { filtered, filters, setFilters } = useTransactionFilters(transactions);

  const [openFilters, setOpenFilters] = useState(false);

  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>{t('transactions.title')}</h1>
      <section>
        <p>{t('transactions.description')}</p>
        <AddButton action={() => navigate('/transactions/new')}>{t('transactions.add')}</AddButton>
      </section>
      <FilterOverlay isOpen={openFilters} onClose={() => setOpenFilters(false)} filters={filters} setFilters={setFilters}  />
      {/* <Filter filters={filters} setFilters={setFilters} /> */}
      <TransactionList transactions={filtered} openFilters={setOpenFilters} />
    </>
  );
}

export default Transactions
