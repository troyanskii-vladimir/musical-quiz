import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import { AppRoute } from '../../config';
import { io } from 'socket.io-client';


const socket = io('http://localhost:3000/');


export default function App(): JSX.Element {

  return (
    <BrowserRouter>
        <Routes>

          <Route
            path={AppRoute.Main}
            element={<MainPage socket={socket} />}
          />

        </Routes>
    </BrowserRouter>
  );
}
