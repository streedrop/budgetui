import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTransaction } from '@/services/transaction.api';

export function useEditTransaction() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['transaction'],
        mutationFn: ({ id, data }) => updateTransaction(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['transactions'] }),
    });
}