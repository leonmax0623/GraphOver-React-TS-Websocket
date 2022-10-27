import { useState } from 'react';
import { ModalCreatePayment } from 'widgets/modals/modal-create-payment';
import arrowSvgActive from '../../shared/assets/test-content/arrow-down-active.svg';
import arrowSvg from '../../shared/assets/test-content/arrow-down.svg';
import ico1Svg from '../../shared/assets/test-content/ico1.svg';
import ico2Svg from '../../shared/assets/test-content/ico2.svg';
import { AvatarRound1 } from '../../shared/ui/avatar-round-client';
import cls from './user-panel-client.module.scss';

import iconAccount from '../../shared/assets/menu-toggle/account.svg';
import iconBussines from '../../shared/assets/menu-toggle/bussines.svg';
import iconCart from '../../shared/assets/menu-toggle/cart.svg';
import iconFavorite from '../../shared/assets/menu-toggle/favorite.svg';
import tarifBase from '../../shared/assets/menu-toggle/tarif-base.svg';
import tarifBusiness from '../../shared/assets/menu-toggle/tarif-business.svg';
import tarifPro from '../../shared/assets/menu-toggle/tarif-pro.svg';

import iconClock from '../../shared/assets/menu-toggle/clock.svg';
import iconPencil from '../../shared/assets/menu-toggle/pencil.svg';

import iconChat from '../../shared/assets/menu-toggle/chat.svg';
import iconCircle from '../../shared/assets/menu-toggle/circle-alert.svg';
import iconExit from '../../shared/assets/menu-toggle/exit.svg';
import iconFile from '../../shared/assets/menu-toggle/file-list.svg';

import { convertDateWithoutTime } from 'shared/utils';

import { useAuth } from 'features/authorization/model';
import { Link, useNavigate } from 'react-router-dom';
import { ModalCreateNote } from 'widgets/modals/modal-create-note';
import { SystemNotification } from 'widgets/system-notification';
import { HeaderChat } from './header-chat';
import { usePayment } from './paymentModel';

export const UserPanel1 = props => {
  const { isOpen, setisOpen, createPayment, isOpenWithdraw, setisOpenWithdraw, createPayout } = usePayment();
  console.log("HEADER =>", props)
  const { logout } = useAuth();
  const { avatar, fio, username, pk } = props;
  let [isOpenMenu, setIsOpenMenu] = useState(false);
  let [isOpenBit, setIsOpenBit] = useState(false);
  let [isOpenChat, setOpenChat] = useState(false);
  // let [isOpenChat2, setOpenChat2] = useState(false);
  let [isOpenNotification, setOpenNotification] = useState(false);
  let [isOpenNoteModal, setOpenNoteModal] = useState(false);

  let [isOpenOverlay, setOpenOverlay] = useState(false);
  let [isBitOpenOverlay, setBitOpenOverlay] = useState(false);
  const openMenuHandle = () => {
    setIsOpenMenu(!isOpenMenu);
    setOpenOverlay(!isOpenOverlay);
  };

  const openBitHandle = () => {
    setIsOpenBit(!isOpenBit);
    setBitOpenOverlay(!isBitOpenOverlay);
  };

  const openChat = () => {
    setOpenChat(!isOpenChat);
    setOpenOverlay(!isOpenOverlay);
  };

  const openNotification = () => {
    setOpenNotification(!isOpenNotification);
    setOpenOverlay(!isOpenOverlay);
  };

  const openNoteModal = () => {
    setOpenNoteModal(!isOpenNoteModal);
    // setOpenOverlay(!isOpenOverlay);
  };

  const closeAllDrop = () => {
    if (isOpenMenu) {
      setIsOpenMenu(!isOpenMenu);
    }
    if (isOpenChat) {
      setOpenChat(!isOpenChat);
    }
    // if (isOpenChat2) {
    //   setOpenChat2(!isOpenChat2);
    // }
    if (isOpenNotification) {
      setOpenNotification(!isOpenNotification);
    }
    // if (isOpenNoteModal) {
    //   setOpenNoteModal(!isOpenNoteModal);
    // }
    setOpenOverlay(!isOpenOverlay);
  };

  const navigate = useNavigate();

  return (
    <div className={cls.container}>
      {props?.subscription?.level === 'PRO' && (
        <Link to="/tariffs" className={cls.tarif}>
          <div>
            <img src={tarifPro} alt="Иконка вниз" />
          </div>
          <div className={cls.linkPro}>Тариф {props?.subscription?.level || 'Без тарифа'} до {convertDateWithoutTime(props?.subscription_end_date)}</div>
        </Link>
      )}
      {props?.subscription?.level === 'Base' && (
        <Link to="/tariffs" className={cls.tarif}>
          <div>
            <img src={tarifBase} alt="Иконка вниз" />
          </div>
          <div className={cls.linkBase}>Тариф {props?.subscription?.level || 'Без тарифа'} до {convertDateWithoutTime(props?.subscription_end_date)}</div>
        </Link>
      )}
      {props?.subscription?.level === 'Business' && (
        <Link to="/tariffs" className={cls.tarif}>
          <div>
            <img src={tarifBusiness} alt="Иконка вниз" />
          </div>
          <div className={cls.linkBusiness}>Тариф {props?.subscription?.level || 'Без тарифа'} до {convertDateWithoutTime(props?.subscription_end_date)}</div>
        </Link>
      )}

      <div className={cls.prices}>
        <span>{props?.balance} Б</span>
        {props.balance && (
          <button onClick={openBitHandle} type="button" className={cls.bitArrow}>
            <img src={isOpenBit ? arrowSvgActive : arrowSvg} alt="Иконка вниз" />
          </button>
        )}
      </div>
      <div className={[cls.bitMenuToggle, isOpenBit && cls.opened].join(' ')}>
        <div className={cls.bitMenu}>
          <Link to="/history">
            <span style={{ color: "black" }}>История Операций</span>
          </Link>
          <div style={{ cursor: "pointer" }} onClick={() => setisOpen(true)}>Покупка</div>
        </div>
      </div>
      <div className={cls.icons}>
        <ul>
          <li onClick={openNoteModal}>
            <div className={cls.icons__item}>
              <img src={ico1Svg} alt="ico1" />
            </div>
          </li>
          <li onClick={openChat}>
            <div className={cls.icons__item}>
              <img src={ico2Svg} alt="ico2" />
            </div>
          </li>
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
        <p className={cls.role}>{fio}</p>
        <p className={cls.name}>{username}</p>
      </div>

      <button onClick={openMenuHandle} type="button" className={[cls.buttonarrow, isOpenMenu && cls.opened].join(' ')}>
        <img className={isOpenMenu && cls.activated} src={arrowSvg} alt="Иконка вниз" />
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
            <Link to="/ratings">
              {' '}
              <div className={cls.icon}>
                <img src={iconStar} />
              </div>
              Рейтинг
            </Link>
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
          <li>
            <Link to="/history">
              {' '}
              <div className={cls.icon}>
                <img src={iconClock} />
              </div>
              История
            </Link>
          </li>
          <hr />
          <li>
            <Link to="/favourite">
              {' '}
              <div className={cls.icon}>
                <img src={iconFavorite} />
              </div>
              Избранное
            </Link>
          </li>
          {/* <li>
            <Link to="/auctions">
              {' '}
              <div className={cls.icon}>
                <img src={iconStar} />
              </div>
              Аукцион
            </Link>
          </li> */}
          <li>
            <Link to="/orders">
              {' '}
              <div className={cls.icon}>
                <img src={iconPencil} />
              </div>
              Предложить сюжет
            </Link>
          </li>
          {/* <li>
            <Link to="/chat">
              {' '}
              <div className={cls.icon}>
                <img src={iconChat} />
              </div>
              Чат
            </Link>
          </li>
          <li>
            <Link to="/notebook">
              {' '}
              <div className={cls.icon}>
                <img src={iconClock} />
              </div>
              Блокнот
            </Link>
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

      <HeaderChat isOpenChat={isOpenChat} openChat={openChat} />

      {<ModalCreateNote id="header-create-note" isOpen={isOpenNoteModal} setIsOpen={openNoteModal} />}
      {<ModalCreatePayment isOpen={isOpen} setIsOpen={setisOpen} handleClick={createPayment} />}
      <div className={[cls.overlay, isOpenOverlay && cls.open].join(' ')} onClick={closeAllDrop}></div>
    </div>
  );
};
