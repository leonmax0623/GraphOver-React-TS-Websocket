import { useEffect } from 'react';

import cls from './tariffs-plans.module.scss';

import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Tabs } from 'shared/ui/tabs';

import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import recommendPicture from '../../../src/shared/assets/tariffs/recommend.png';
import { useTariffs } from './model';

export const TariffsPlans = () => {
  const { getItems, items, curDuration, setcurDuration, buySubscripion } = useTariffs();
  const subscription = useSelector(state => state.userReducer.user.subscription);
  const role = useSelector(state => state.userReducer.user.role);
  const navigate = useNavigate();

  useEffect(() => {
    getItems();
  }, []);

  const handleLater = () => {
    const date = new Date();
    localStorage.setItem('later', date);
    navigate('/catalog');
  };

  return (
    <>
      <div className={cls.tariffs}>
        <div className={cls.tariffsTitle}>
          <h2 className={cls.cap}>Тарифные планы</h2>
          <span className={cls.desc}>Используйте все возможности сервиса для эффективной работы</span>
        </div>
        <div className={cls.tariffsTabs}>
          <Tabs
            name={'tariffs-activity'}
            active={curDuration}
            onChange={e => setcurDuration(e.target.value)}
            items={[
              {
                label: 'Месяц',
                id: 'one month',
                value: 'one month',
              },
              {
                label: 'Три месяца',
                id: 'three month',
                value: 'three month',
              },
              {
                label: 'Год',
                id: 'one year',
                value: 'one year',
              },
            ]}
          />
        </div>
        {role === 'customer' && !subscription && (
          <div className={cls.laterWrapper}>
            <p className={cls.later} onClick={handleLater}>
              Напомнить позже
            </p>
          </div>
        )}
        <div className={cls.tariffsList}>
          {items
            .filter(i => i.duration === curDuration)
            .map(item => (
              <TariffsItem
                key={item.level}
                {...item}
                is_recommended={item.level === subscription?.level}
                curDuration={curDuration}
                disabled={
                  subscription?.level === 'PRO' && (item.level === 'BASE' || item.level === 'PRO') ? true : false
                }
                handleSubscriptionClick={buySubscripion}
              />
            ))}
        </div>
      </div>
    </>
  );
};

const TariffsItem = props => {
  const cost =
    props?.curDuration === 'one month'
      ? props?.cost
      : props?.curDuration === 'three month'
        ? props?.cost / 3
        : props?.curDuration === 'one year'
          ? props?.cost / 12
          : 0;

  return (
    <div className={classNames(cls.tariffsItem, { [cls.recommend]: props?.is_recommended })}>
      <img className={cls.check} src={recommendPicture} alt="recommend" />
      <h2 className={cls.tariffsName}>ПАКЕТ {props?.level}</h2>
      <span className={cls.tariffsValue}>
        {props?.level === 'BASE' ? (
          <span className={cls.price} style={{ fontSize: 20, color: '#4fd1c5' }}>
            БЕСПЛАТНО
          </span>
        ) : (
          <>
            <span className={cls.price}>{Math.ceil(cost)} ₽</span> / <span className={cls.date}> месяц</span>
          </>
        )}
      </span>
      <ul className={cls.tariffsInfo}>
        {subscriptionOptions[props.level].map(o => (
          <li key={o}>
            <div>
              {o.content}
            </div>
            <div>
              {o.description}
            </div>
          </li>
        ))}
      </ul>
      <Button
        size={ButtonSizes.medium}
        type={ButtonTypes.primary}
        className={cls.btn}
        disabled={props?.disabled}
        onClick={() => props?.handleSubscriptionClick({ level: props?.level, duration: props?.curDuration })}
      >
        Оформить подписку
      </Button>
    </div>
  );
};

const subscriptionOptions = {
  BASE: [
    {
      content: 'Написание открытых сюжетов в коллективе неограниченно',
      description: ''
    },
    {
      content: 'Написание (участие) приватных сюжетов (1 сюжет в год)',
      description: 'Макс. кол-во авторов – 3 пользователя'
    },
    {
      content: 'Написание (участие) проектов (1 проект в год)',
      description: 'Макс. кол-во авторов – 3 пользователя'
    }
  ],
  PRO: [
    {
      content: 'Написание приватных сюжетов (неограниченно)',
      description: 'Макс. кол-во авторов - 5'
    },
    {
      content: 'Написание проектов (неограниченно)',
      description: 'Макс. кол-во авторов - 5'
    },
    {
      content: 'Написание сценария (1 в год)',
      description: 'Макс. кол-во авторов – 3'
    }
  ],
  BUSINESS: [
    {
      content: 'Нринятие заказов авторами',
      description: ''
    },
    {
      content: 'Написание сценариев',
      description: 'Неограниченное кол-во в год, неограниченное кол-во авторов'
    },
    {
      content: 'Участие в аукционе в качестве продавца',
      description: ''
    },
    {
      content: 'Доступны все функции сервиса, связанные с написанием сюжетов, включая проекты и сюжеты с неограниченным кол-во авторов. - функция «шифрование»',
      description: ''
    },
    {
      content: 'Вывод средств',
      description: ''
    }
  ],
};
