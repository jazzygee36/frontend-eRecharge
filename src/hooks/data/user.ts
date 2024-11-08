import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getUser, User } from '../../api/auth';
import { redirect } from 'next/navigation';
import { QUERIES, ROUTES } from '../../utils';

export const useUser = (redirectOnFail?: boolean): UseQueryResult<User> =>
  useQuery({
    queryKey: [QUERIES.ME],
    queryFn: () => getUser(),
    throwOnError: (error: any) => {
      if (error.response?.status === 401 && redirectOnFail) {
        redirect(`${ROUTES.login}?redirect=${window.location.pathname}`);
      }

      return false;
    },
  });
