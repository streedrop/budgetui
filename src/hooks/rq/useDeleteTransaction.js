import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTransaction } from '@/services/transaction.api';

export function useDeleteTransaction() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['transaction'],
        mutationFn: (id) => deleteTransaction(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['transactions'] }),
    });
}