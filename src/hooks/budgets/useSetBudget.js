import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertBudget } from '@/services/budget.api';

export function useSetBudget() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['budget'],
        mutationFn: ({ id, month, data }) => upsertBudget(id, month, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['budgets'] }),
    });
}