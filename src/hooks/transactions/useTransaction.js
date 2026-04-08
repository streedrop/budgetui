import { useQuery } from '@tanstack/react-query';
import { fetchTransaction } from '@/services/transaction.api';

export function useTransaction(id) {
    return useQuery({
        queryKey: ['transaction', id],
        queryFn: () => {
            if(id) return fetchTransaction(id);
            
            return null;
        },
    });
}