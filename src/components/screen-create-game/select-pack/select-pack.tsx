import styles from './select-pack.module.scss';
import { AvailiablePacksData, PackData } from '../../../types/pack-data';
import { PackCategory } from '../../../config';


type SelectPackProps = {
  packChecked: PackData,
  setPackChecked: (arg: PackData) => void,
  setIsPackDataOpen: (arg: boolean) => void,
  setPackCategory: (arg: PackCategory) => void,
  avaliablePacks: AvailiablePacksData,
}


export default function SelectPack({packChecked, setPackChecked, setIsPackDataOpen, setPackCategory, avaliablePacks}: SelectPackProps) {
  const handleBackButtonClick = () => {
    setIsPackDataOpen(false);
  };


  if (avaliablePacks.artists?.length < 1) {
    return (
      <div className={styles['packs']}>

        <div className={styles['pack-info']}>
          <p className={styles['title']}>Выбери пак для игры</p>
          <button className={styles["back-btn"]} onClick={handleBackButtonClick}>
            Закрыть
          </button>
        </div>

        <p>Загрузка///</p>
      </div>
    );
  }


  return (
    <div className={styles['packs']}>

      <div className={styles['pack-info']}>
        <p className={styles['title']}>Выбери пак для игры</p>
        <button className={styles["back-btn"]} onClick={handleBackButtonClick}>
          Закрыть
        </button>
      </div>

      <span className={styles['packs-title']}>Плейлисты</span>
      <ul className={styles['packs-list']} key={'playlists'}>
        {
          avaliablePacks.playlists?.map((pack) => (
            <li key={pack.name} className={`${styles['pack-item']} ${packChecked.name === pack.name ? styles['pack-checked'] : ''}`}>
              <label className={styles['pack-container']}>
                <img className={styles['pack-img']} src={pack.pictureUrl} alt={pack.name} />
                <span className={styles['pack-name']}>{pack.name}</span>
                <input
                  className={styles['pack-input']}
                  type='radio'
                  name='radio'
                  onChange={() => {
                    setPackChecked(pack);
                    setPackCategory(PackCategory.Playlist);
                    setIsPackDataOpen(false);
                  }}
                />
              </label>
            </li>
          ))
        }
      </ul>

      <span className={styles['packs-title']}>Исполнители</span>
      <ul className={styles['packs-list']} key={'artists'}>
        {
          avaliablePacks.artists?.map((pack) => (
            <li key={pack.name} className={`${styles['pack-item']} ${packChecked.name === pack.name ? styles['pack-checked'] : ''}`}>
              <label className={styles['pack-container']}>
                <img className={styles['pack-img']} src={pack.pictureUrl} alt={pack.name} />
                <span className={styles['pack-name']}>{pack.name}</span>
                <input
                  className={styles['pack-input']}
                  type='radio'
                  name='radio'
                  onChange={() => {
                    setPackChecked(pack);
                    setPackCategory(PackCategory.Artist);
                    setIsPackDataOpen(false);
                  }}
                />
              </label>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
