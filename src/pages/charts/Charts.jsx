import { useTranslation } from 'react-i18next';

import { useBudgets } from '@/hooks/budgets/useBudgets.js';
import { useBudgetFilters } from '@/hooks/useBudgetFilters.js';
import { useCategories } from '@/hooks/categories/useCategories.js';
import { useTransactions } from '@/hooks/transactions/useTransactions';
import { useTransactionFilters } from '@/hooks/useTransactionFilters.js';

import Filter from '@/components/filter/Filter.jsx';
import ChartList from './ChartList.jsx';

function Charts() {
    const { t } = useTranslation();

    const { data: categories = [] } = useCategories();

    const { data: budgets = [] } = useBudgets();
    const { filtered: filteredBudgets, setFilters: setBFilters } = useBudgetFilters(budgets);

    const { data: transactions = [] } = useTransactions();
    const { filtered: filteredTransactions, filters, setFilters: setTFilters } = useTransactionFilters(transactions);

    function handleFilterChange(newFilters) {
        setBFilters(newFilters);
        setTFilters(newFilters);
    }

    return (
        <>
            <h1>{t('charts.title')}</h1>
            <Filter filters={filters} setFilters={handleFilterChange} amount={false} />
            <ChartList transactions={filteredTransactions} categories={categories} budgets={filteredBudgets} />
        </>
    );
}

export default Charts