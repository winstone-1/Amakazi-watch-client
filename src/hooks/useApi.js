import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

export const useApiQuery = (queryKey, fetchFn, options = {}) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        return await fetchFn();
      } catch (error) {
        console.error(`API Query Error [${queryKey}]:`, error);
        // If we get an error, fallback or throw
        throw error;
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useApiMutation = (mutationFn, options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn,
    onError: (error) => {
      message.error(error.response?.data?.detail || error.message || 'Operation failed');
      if (options.onError) options.onError(error);
    },
    onSuccess: (data) => {
      if (options.successMessage) {
        message.success(options.successMessage);
      }
      if (options.invalidateKeys) {
        options.invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      }
      if (options.onSuccess) options.onSuccess(data);
    },
    ...options,
  });
};
