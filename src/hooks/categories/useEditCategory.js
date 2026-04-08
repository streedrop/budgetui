import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory } from '@/services/category.api';

export function useEditCategory() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['category'],
        mutationFn: ({ id, data }) => updateCategory(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
    });
}