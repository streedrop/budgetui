import { useState } from 'react';

import emptyFilters from '@/constants/EmptyFilters';
import { dateToYearMonthDay } from '@/utils/formatters';

export function useTransactionFilters(transactions) {
  const [filters, setFilters] = useState(emptyFilters);

  const filtered = transactions
    .filter(t => filters.from === '' || dateToYearMonthDay(t.date) >= filters.from)
    .filter(t => filters.to === '' || dateToYearMonthDay(t.date) <= filters.to)
    .filter(t => filters.minAmount === '' || Number(t.amount) >= Number(filters.minAmount))
    .filter(t => filters.maxAmount === '' || Number(t.amount) <= Number(filters.maxAmount));

  return { filtered, filters, setFilters };
}