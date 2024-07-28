import { Socket } from 'socket.io-client';
import '../../../styles/container.scss';
import './screen-main-game.scss';
import { ScreenState } from '../../config';


type ScreenMainGameProps = {
  socket: Socket,
  setScreenState: (arg: ScreenState) => void,
}


export default function ScreenMainGame({socket, setScreenState}: ScreenMainGameProps) {
  const handleBackButtonClick = () => {
    setScreenState(ScreenState.SelectMode);
  }


  return (
    <div className='screen'>
      <div className='title-select'>
        <span>Игра</span>
      </div>

      <button
        className='back-btn'
        onClick={handleBackButtonClick}
      >
        Назад
      </button>


      <div>
        Название комнаты:
        <span>ТестНейм1</span>
      </div>


      <div>
        Всего игроков:
        <span>7</span>
      </div>


      <div>
        Максимум игроков:
        <span>10</span>
      </div>


    </div>
  );
}
