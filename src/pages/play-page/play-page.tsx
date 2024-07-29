import { io } from 'socket.io-client';
import { AuthorizationStatus, ScreenState } from '../../config';
import Header from '../../components/header/header';


import '../../../styles/container.scss';
import './play-page.scss';
import ScreenSelectGame from '../../components/screen-select-game/screen-select-game';
import { useState } from 'react';
import ScreenCreateGame from '../../components/screen-create-game/screen-create-game';
import ScreenEnterGame from '../../components/screen-enter-game/screen-enter-game';
import ScreenMainGame from '../../components/screen-main-game/screen-main-game';


const socket = io('http://localhost:3000/');


type PlayPageProps = {
  authorizationStatus: AuthorizationStatus,
}


export default function PlayPage({authorizationStatus}: PlayPageProps) {
  const [screenState, setScreenState] = useState<ScreenState>(ScreenState.SelectMode);


  return (
    <div className='play-page'>
      <Header authorizationStatus={authorizationStatus} />
      <main className='main-container'>
        <div className="wrapper">
          {
            screenState === ScreenState.SelectMode &&
            <ScreenSelectGame socket={socket} setScreenState={setScreenState} />
          }
          {
            screenState === ScreenState.CreateRoom &&
            <ScreenCreateGame socket={socket} setScreenState={setScreenState} />
          }
          {
            screenState === ScreenState.EnterRoom &&
            <ScreenEnterGame socket={socket} setScreenState={setScreenState} />
          }
          {
            screenState === ScreenState.PlayRoom &&
            <ScreenMainGame socket={socket} setScreenState={setScreenState} />
          }
        </div>
      </main>
    </div>
  );
}
