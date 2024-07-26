import { State } from '../../types/state';
import { UserData } from '../../types/user-data';

export const getAuthorizationStatus = (state: State): string => state.Auth.authorizationStatus;
export const getAllUsers = (state: State): UserData[] => state.Auth.users;
