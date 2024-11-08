import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getUser, User } from '../../api/auth';
import { redirect } from 'next/navigation';
import { QUERIES, ROUTES } from '../../utils';
import { AxiosError } from 'axios';

export const useUser = (
  redirectOnFail?: boolean
): UseQueryResult<User, AxiosError> => {
  const query = useQuery<User, AxiosError>({
    queryKey: [QUERIES.ME],
    queryFn: async () => {
      try {
        return await getUser();
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401 && redirectOnFail) {
          redirect(`${ROUTES.login}?redirect=${window.location.pathname}`);
        }
        throw error; // Re-throw to ensure react-query handles it as a failed query
      }
    },
  });

  return query;
};
