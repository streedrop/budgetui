import { useQuery } from '@tanstack/react-query';
import { fetchCategory } from '@/services/category.api';

export function useCategory(id) {
    return useQuery({
        queryKey: ['category', id],
        queryFn: () => {
            if (id === "uncategorized") return null;
            if (id) return fetchCategory(id);
            
            return null;
        },
    });
}