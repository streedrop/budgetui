import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertRule } from '@/services/rule.api';

export function useCreateRule() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['rule'],
        mutationFn: (data) => insertRule(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['rules'] }),
    });
}