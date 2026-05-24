import { useState, useMemo } from 'react';

import { emptyFilters } from '@/constants/EmptyData';
import { dateToYearMonthDay } from '@/utils/formatters';

export function useTransactionFilters(transactions) {
  const [filters, setFilters] = useState(emptyFilters);

  const filtered = useMemo(() => transactions
    .filter(t => filters.from === '' || dateToYearMonthDay(t.date) >= filters.from)
    .filter(t => filters.to === '' || dateToYearMonthDay(t.date) <= filters.to)
    .filter(t => filters.minAmount === '' || Number(t.amount) >= Number(filters.minAmount))
    .filter(t => filters.maxAmount === '' || Number(t.amount) <= Number(filters.maxAmount))
    , [transactions, filters]);

  return { filtered, filters, setFilters };
}