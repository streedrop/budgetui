import { useState } from 'react';

export function useBudgetFilters(budgets) {
  const [filters, setFilters] = useState({
    after: '',
    before: '',
    minAmount: '',
    maxAmount: ''
  });

  console.log(filters.before.substring(0, 7), filters.after);

  const filtered = budgets
    .filter(b => filters.before === '' || b.month <= filters.before.substring(0, 7))
    .filter(b => filters.after === '' || b.month >= filters.after.substring(0, 7))

  return { filtered, filters, setFilters };
}