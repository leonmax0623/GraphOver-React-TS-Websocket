import { useState } from 'react';
import arrowSvg from '../../shared/assets/test-content/arrow-down.svg';
import cls from './user-panel-client.module.scss';

import { AvatarRound1 } from '../../shared/ui/avatar-round-client';

import iconAccount from '../../shared/assets/menu-toggle/account.svg';
import iconBussines from '../../shared/assets/menu-toggle/bussines.svg';

import iconCart from '../../shared/assets/menu-toggle/cart.svg';

import iconChat from '../../shared/assets/menu-toggle/chat.svg';
import iconCircle from '../../shared/assets/menu-toggle/circle-alert.svg';
import iconExit from '../../shared/assets/menu-toggle/exit.svg';
import iconFile from '../../shared/assets/menu-toggle/file-list.svg';

import { useAuth } from 'features/authorization/model';
import { Link, useNavigate } from 'react-router-dom';
import { SystemNotification } from 'widgets/system-notification';

import { useSelector } from 'react-redux';

export const AdminPanel = props => {
  const { logout } = useAuth();
  const userState = useSelector(state => state.userReducer.user);
  const navigate = useNavigate();

  const { avatar, fio, username, pk } = userState;

  let [isOpenMenu, setIsOpenMenu] = useState(false);
  let [isOpenChat, setOpenChat] = useState(false);
  let [isOpenChat2, setOpenChat2] = useState(false);
  let [isOpenNotification, setOpenNotification] = useState(false);

  let [isOpenOverlay, setOpenOverlay] = useState(false);

  const openMenuHandle = () => {
    setIsOpenMenu(!isOpenMenu);
    setOpenOverlay(!isOpenOverlay);
  };

  const openNotification = () => {
    setOpenNotification(!isOpenNotification);
    setOpenOverlay(!isOpenOverlay);
  };

  const closeAllDrop = () => {
    if (isOpenMenu) {
      setIsOpenMenu(!isOpenMenu);
    }
    if (isOpenChat) {
      setOpenChat(!isOpenChat);
    }
    if (isOpenChat2) {
      setOpenChat2(!isOpenChat2);
    }
    if (isOpenNotification) {
      setOpenNotification(!isOpenNotification);
    }
    // if (isOpenNoteModal) {
    //   setOpenNoteModal(!isOpenNoteModal);
    // }
    setOpenOverlay(!isOpenOverlay);
  };

  return (
    <div className={cls.container}>
      <div className={cls.icons}>
        <ul>
          <li>
            <div className={cls.icons__item}>
              <SystemNotification
                isOpenNotification={isOpenNotification}
                openNotification={openNotification}
                userId={pk}
              />
            </div>
          </li>
        </ul>
      </div>
      <AvatarRound1
        openMenuHandle={() => navigate('/profile/me')}
        image={avatar}
        alt={`Аватар заказчика ${fio} `}
        className={cls.avatar}
      />
      <div className={cls.info} onClick={() => navigate('/profile/me')}>
        <p className={cls.role}>{username}</p>
        {/* <p className={cls.name}>{fio}</p> */}
      </div>

      <button onClick={openMenuHandle} type="button" className={cls.buttonarrow}>
        <img src={arrowSvg} alt="Иконка вниз" />
      </button>

      <div className={[cls.menuToggle, isOpenMenu && cls.opened].join(' ')}>
        <ul>
          <li>
            <Link to={`/profile/me`}>
              <div className={cls.icon}>
                <img src={iconAccount} />
              </div>
              Личный кабинет
            </Link>
          </li>
          <li>
            <Link to="/tariffs">
              {' '}
              <div className={cls.icon}>
                <img src={iconBussines} />
              </div>
              Тариф {props?.subscription?.level}
            </Link>
          </li>
          {/* <li>
            <a>
              {' '}
              <div className={cls.icon}>
                <img src={iconStar} />
              </div>
              Рейтинг
            </a>
          </li> */}
          <li>
            <Link to="/check">
              {' '}
              <div className={cls.icon}>
                <img src={iconCart} />
              </div>
              {props?.balance} БиТ
            </Link>
          </li>
          {/* <hr /> */}
          {/* <li>
            <a>
              {' '}
              <div className={cls.icon}>
                <img src={iconFavorite} />
              </div>
              Избранное
            </a>
          </li> */}
          {/* <li>
            <a>
              {' '}
              <div className={cls.icon}>
                <img src={iconPencil} />
              </div>
              Предложить сюжет
            </a>
          </li>
          <li>
            <a>
              {' '}
              <div className={cls.icon}>
                <img src={iconBar} />
              </div>
              Популярные сюжеты
            </a>
          </li>
          <li>
            <a>
              {' '}
              <div className={cls.icon}>
                <img src={iconClock} />
              </div>
              История сюжетов
            </a>
          </li> */}
          <hr />
          <li>
            <Link to="/upgrade">
              {' '}
              <div className={cls.icon}>
                <img src={iconChat} />
              </div>
              Улучшение сервиса
            </Link>
          </li>
          <li>
            <Link to="/notions">
              {' '}
              <div className={cls.icon}>
                <img src={iconFile} />
              </div>
              Инструкции
            </Link>
          </li>
          <li>
            <Link to="/service">
              {' '}
              <div className={cls.icon}>
                <img src={iconCircle} />
              </div>
              О сервисе
            </Link>
          </li>
          <li onClick={logout}>
            <a className={cls.exit}>
              <div className={cls.icon}>
                <img src={iconExit} />
              </div>
              Выход
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
