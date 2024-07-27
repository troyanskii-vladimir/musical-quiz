import Header from '../../components/header/header';
import { AuthorizationStatus } from '../../config';


type MainPageProps = {
  authorizationStatus: AuthorizationStatus,
}


export default function MainPage({authorizationStatus}: MainPageProps) {


  return (
    <div>
      <Header authorizationStatus={authorizationStatus} />
      <main>
        Главная
      </main>
    </div>
  );
}
