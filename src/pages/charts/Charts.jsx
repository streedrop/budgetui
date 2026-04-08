import { useBudgets } from '@/hooks/useBudgets.js';
import { useBudgetFilters } from '@/hooks/useBudgetFilters.js';
import { useCategories } from '@/hooks/useCategories.js';
import { useTransactions } from '@/hooks/transactions/useTransactions';
import { useTransactionFilters } from '@/hooks/useTransactionFilters.js';

import Filter from '@/components/filter/Filter.jsx';
import ChartList from './ChartList.jsx';

function Charts() {

    const { categories } = useCategories();

    const { budgets } = useBudgets();
    const { filtered: filteredBudgets, setFilters: setBFilters } = useBudgetFilters(budgets);

    const { data: transactions = [] } = useTransactions();
    const { filtered: filteredTransactions, filters, setFilters: setTFilters } = useTransactionFilters(transactions);

    function handleFilterChange(newFilters) {
        setBFilters(newFilters);
        setTFilters(newFilters);
    }

    return (
        <>
            <h1>Charts</h1>
            <Filter filters={filters} setFilters={handleFilterChange} amount={false} />
            <ChartList transactions={filteredTransactions} categories={categories} budgets={filteredBudgets} />
        </>
    );
}

export default Charts