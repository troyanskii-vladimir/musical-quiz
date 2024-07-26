import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import { AppRoute } from '../../config';
import { io } from 'socket.io-client';
import RegisterPage from '../../pages/register-page/register-page';
import PlayPage from '../../pages/play-page/play-page';


const socket = io('http://localhost:3000/');


export default function App(): JSX.Element {

  return (
    <BrowserRouter>
        <Routes>

          <Route
            path={AppRoute.Main}
            element={<MainPage />}
          />

          <Route
            path={AppRoute.Play}
            element={<PlayPage socket={socket} />}
          />

          <Route
            path={AppRoute.Register}
            element={<RegisterPage />}
          />

        </Routes>
    </BrowserRouter>
  );
}
