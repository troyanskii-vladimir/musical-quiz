import { useEffect, useState } from 'react';
import styles from './select-pack.module.scss';
import axios from 'axios';
import { AvailiablePacksData, PackData } from '../../../types/pack-data';
import { ApiRoute, BACKEND_URL } from '../../../config';

type SelectPackProps = {
  packChecked: PackData,
  setPackChecked: (arg: PackData) => void,
  setIsPackDataOpen: (arg: boolean) => void,
  setIsGameArtist: (arg: boolean) => void,
}


export default function SelectPack({packChecked, setPackChecked, setIsPackDataOpen, setIsGameArtist}: SelectPackProps) {
  //Данные с сервера
  const [avaliablePacks, setAvaliablePacks] = useState<AvailiablePacksData>({} as AvailiablePacksData);


  useEffect(() => {
    axios.get<AvailiablePacksData>(BACKEND_URL + ApiRoute.AvailiablePacks).then((res) => {
      setAvaliablePacks(res.data);
    });
  }, [])


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
                    setIsGameArtist(false);
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
                    setIsGameArtist(true);
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
