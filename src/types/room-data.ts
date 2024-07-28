import { RoomStatus } from '../config';


export type GameRoom = {
  id: string,
  name: string,
  users: number,
  maxUsers: number,
  status: RoomStatus,
  isPrivate: boolean,
}
