import { useQuery } from '@tanstack/react-query';
import { fetchTransaction } from '@/services/transaction.api';

export function useTransaction(id) {
    return useQuery({
        queryKey: ['transaction', id],
        queryFn: () => {
            return fetchTransaction(id);
        },
    });
}