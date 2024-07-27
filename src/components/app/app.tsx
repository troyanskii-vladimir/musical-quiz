import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import { AppRoute, AuthorizationStatus } from '../../config';
import RegisterPage from '../../pages/register-page/register-page';
import PlayPage from '../../pages/play-page/play-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { getAuthorizationStatus } from '../../store/auth/auth.selectors';
import { checkAuthAction } from '../../store/api-actions';


export default function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus) as AuthorizationStatus;

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Unknown) {
      dispatch(checkAuthAction());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
        <Routes>

          <Route
            path={AppRoute.Main}
            element={<MainPage authorizationStatus={authorizationStatus} />}
          />

          <Route
            path={AppRoute.Play}
            element={<PlayPage authorizationStatus={authorizationStatus} />}
          />

          <Route
            path={AppRoute.Register}
            element={<RegisterPage authorizationStatus={authorizationStatus} />}
          />

        </Routes>
    </BrowserRouter>
  );
}
