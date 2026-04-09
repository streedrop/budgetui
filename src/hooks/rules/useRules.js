import { useQuery } from '@tanstack/react-query';
import { fetchRules } from '@/services/rule.api';

export function useRules() {
    return useQuery({
        queryKey: ['rules'],
        queryFn: () => {
            return fetchRules();
        },
    });
}