import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory } from '@/services/category.api';

export function useDeleteCategory() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['category'],
        mutationFn: (id) => deleteCategory(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
    });
}