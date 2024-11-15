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

  // access_token?: string;
}

interface ResetPassword {
  token: string;
  newPassword: string;
  confirmPwd?: string;
  access_token?: string;
}
interface Utilities {
  email: string;
  amount: string;
  utilityType: string;
  phone: string;
}

interface FundWallet {
  reference: string;
  amount: number;
  status?: string;
}

interface Payment {
  amount: number;
  channel: string;
  paymentDate: string;
  status: string;
  transactionReference: string;
}

interface UserId {
  username: string;
  email: string;
  phoneNumber: string;
}
interface Profile {
  userId?: UserId;
  payments: Payment[] | undefined;
}
export interface User {
  username: string;
  profile?: Profile;
  email: string;
  // password: string;
  phoneNumber: string;
  transactionReference: string;
  amount: number;
  paymentDate: Date;
  status: string;
  channel: string;

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
export const payUtiliies = async (body: Utilities) => {
  const { data } = await apiClient.post(QUERIES.PAYUTILITIES, body);

  postToLocalStorage(data.access_token ?? '');

  return data;
};

export const fundWallet = async (body: FundWallet) => {
  const { data } = await apiClient.post(QUERIES.VERIFYPAYMENT, body);

  postToLocalStorage(data.access_token ?? '');

  return data;
};
export const getUser = async () => {
  const { data } = await apiClient.get(QUERIES.USERPROFILE);
  return data || {};
};

export const paymentCallBack = async () => {
  const { data } = await apiClient.get(QUERIES.PAYMENTCALLBACK);
  return data || {};
};
