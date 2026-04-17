import { useQuery } from '@tanstack/react-query';
import { fetchBudgets } from '@/services/budget.api';

export function useBudgets(id) {
    return useQuery({
        queryKey: ['budgets', id],
        queryFn: () => {
            return fetchBudgets(id);
        },
    });
}