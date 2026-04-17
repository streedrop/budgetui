import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBudget } from '@/services/budget.api';

export function useDeleteBudget() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['budgets'],
        mutationFn: ({ id, month }) => deleteBudget(id, month),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['budgets'] }),
    });
}