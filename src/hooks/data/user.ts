import { getUser, User } from '@/api/auth';
import { QUERIES, ROUTES } from '@/utils';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

// import { getUserStats } from 'api/user';
import { redirect } from 'next/navigation';
// import { QUERIES, ROUTES } from '';

export const useUser = (redirectOnFail?: boolean): UseQueryResult<User> =>
  useQuery({
    queryKey: [QUERIES.USERPROFILE],
    queryFn: () => getUser(),
    throwOnError: (error: any) => {
      if (error.response?.status === 401 && redirectOnFail) {
        redirect(`${ROUTES.login}?redirect=${window.location.pathname}`);
      }

      return false;
    },
  });
