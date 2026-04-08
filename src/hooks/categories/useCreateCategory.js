import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertCategory } from '@/services/category.api';

export function useCreateCategory() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['category'],
        mutationFn: (data) => insertCategory(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
    });
}