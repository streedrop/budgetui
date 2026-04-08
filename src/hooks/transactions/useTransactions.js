import { useQuery } from '@tanstack/react-query';
import { fetchTransactions } from '@/services/transaction.api';

export function useTransactions(id) {
    return useQuery({
        queryKey: ['transactions', id],
        queryFn: () => {
            const resolvedId = id === "uncategorized" ? 'null' : id;
            return fetchTransactions(resolvedId);
        },
    });
}