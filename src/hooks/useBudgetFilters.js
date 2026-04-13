import { useState } from 'react';

import { emptyFilters } from '@/constants/EmptyData';

export function useBudgetFilters(budgets) {
  const [filters, setFilters] = useState(emptyFilters);

  const filtered = budgets
    .filter(b => filters.to === '' || b.month <= filters.to.substring(0, 7))
    .filter(b => filters.from === '' || b.month >= filters.from.substring(0, 7))

  return { filtered, filters, setFilters };
}