import { QUERIES } from '../utils';
import { apiClient } from './init';

interface Signup {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  access_token?: string;
}

interface Login {
  username: string;

  password: string;

  access_token?: string;
}

interface RequestPwdReset {
  email: string;
  newPassword: string;
}

interface ResetPassword {
  password: string;
}
export interface User {
  username: string;

  password: string;

  access_token?: string;
}

const postToLocalStorage = (key: string) => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.setItem('token', key);
};

export const signUp = async (body: Signup) => {
  const { data } = await apiClient.post(QUERIES.SIGNUP, body);
  postToLocalStorage(data.access_token ?? '');

  return data;
};

export const logIn = async (body: Login) => {
  const { data } = await apiClient.post(QUERIES.LOGIN, body);

  postToLocalStorage(data.access_token ?? '');

  return data;
};

export const requestPasswordReset = async (body: RequestPwdReset) => {
  const { data } = await apiClient.post(QUERIES.REQUESTPASSWORDRESET, body);

  postToLocalStorage(data.access_token ?? '');

  return data;
};

export const resetPassword = async (body: ResetPassword) => {
  const { data } = await apiClient.post(QUERIES.RESETPASSWORD, body);

  postToLocalStorage(data.access_token ?? '');

  return data;
};

export const getUser = async () => {
  const { data } = await apiClient.get(QUERIES.ME);
  return data || {};
};
