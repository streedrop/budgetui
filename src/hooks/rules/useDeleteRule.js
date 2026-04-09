import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRule } from '@/services/rule.api';

export function useDeleteRule() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['rule'],
        mutationFn: (id) => deleteRule(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['rules'] }),
    });
}