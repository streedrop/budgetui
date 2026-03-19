import { useState } from 'react';

export function useTransactionFilters(transactions) {
  const [filters, setFilters] = useState({
    after: '',
    before: '',
    minAmount: '',
    maxAmount: ''
  });

  const filtered = transactions
    .filter(t => filters.before === '' || t.date <= filters.before)
    .filter(t => filters.after === '' || t.date >= filters.after)
    .filter(t => filters.minAmount === '' || Number(t.amount) >= Number(filters.minAmount))
    .filter(t => filters.maxAmount === '' || Number(t.amount) <= Number(filters.maxAmount));

  return { filtered, filters, setFilters };
}