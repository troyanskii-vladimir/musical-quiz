import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthData, AuthResponse } from '../types/auth-data';
import { AppDispatch, State } from '../types/state';
import axios, { AxiosInstance } from 'axios';
import { ApiRoute, BACKEND_URL } from '../config';
import { dropSessionToken, dropToken, getSessionToken, saveSessionToken, saveToken } from '../services/token';
import { UserData } from '../types/user-data';


export const checkAuthAction = createAsyncThunk<AuthResponse, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'getAuthData',
  async() => {
    // const {data} = await axios.get<AuthResponse>(BACKEND_URL + ApiRoute.Refresh, {
    //   withCredentials: true,
    // });

    // saveToken(data.accessToken);
    // return data;

    if (getSessionToken()) {
      const {data} = await axios.get<AuthResponse>(BACKEND_URL + ApiRoute.GuestRefresh, {
        withCredentials: true,
      });
      saveSessionToken(data.accessToken);
      return data;
    } else {
      const {data} = await axios.get<AuthResponse>(BACKEND_URL + ApiRoute.Refresh, {
        withCredentials: true,
      });
      saveToken(data.accessToken);
      return data;
    }
  }
)


export const registerAction = createAsyncThunk<AuthResponse, Partial<AuthData>, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'register',
  async({email, password}, {extra: api}) => {
    dropSessionToken();

    const {data} = await api.post<AuthResponse>(ApiRoute.Register, {email, password});

    saveToken(data.accessToken);
    return data;
  }
)

export const loginAction = createAsyncThunk<AuthResponse, Partial<AuthData>, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'login',
  async({email, password}, {extra: api}) => {
    dropSessionToken();

    const {data} = await api.post<AuthResponse>(ApiRoute.Login, {email, password});

    saveToken(data.accessToken);
    return data;
  }
)

export const guestLoginAction = createAsyncThunk<AuthResponse, Partial<AuthData>, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'guestLogin',
  async({userName}, {extra: api}) => {
    const {data} = await api.post<AuthResponse>(ApiRoute.GuestLogin, {userName});

    saveSessionToken(data.accessToken);
    return data;
  }
)

export const logoutAction = createAsyncThunk<AuthResponse, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'logout',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<AuthResponse>(ApiRoute.Logout);
    dropToken();

    return data;
  }
)


export const getUsersAction = createAsyncThunk<UserData[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'getUsers',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<UserData[]>(ApiRoute.Users);

    return data;
  }
)
