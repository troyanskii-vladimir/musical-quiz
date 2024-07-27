import { AUTH_TOKEN_NAME, GUEST_TOKEN_NAME } from '../config';


export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_NAME);
};


export const saveSessionToken = (token: Token): void => {
  sessionStorage.setItem(GUEST_TOKEN_NAME, token);
};

export const getSessionToken = (): Token => {
  const token = sessionStorage.getItem(GUEST_TOKEN_NAME);
  return token ?? '';
};

export const dropSessionToken = (): void => {
  sessionStorage.removeItem(GUEST_TOKEN_NAME);
};
