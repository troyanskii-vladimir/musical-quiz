import { UserData } from './user-data';


export type AuthData = {
  userName?: string,
  email: string,
  password: string,
}

export type AuthResponse = {
  accessToken: string,
  refreshToken: string,
  user: UserData,
}
