import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertTransaction } from '@/services/transaction.api';

export function useCreateTransaction() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['transaction'],
        mutationFn: (data) => insertTransaction(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['transactions'] }),
    });
}