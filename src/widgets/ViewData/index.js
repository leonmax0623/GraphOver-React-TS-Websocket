import React from 'react';

import cls from './view.module.scss';

import { Caption, Title3, Title2, Title4, Title5 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextInput } from 'shared/ui/text-input';

import wallet from '../../shared/assets/test-content/wallet.svg';
import iconCalendar from '../../shared/assets/test-content/calendar-gray2.svg';
import iconUp from '../../shared/assets/test-content/icup.svg';
import iconDown from '../../shared/assets/test-content/icdown.svg';
import { SelectInput } from 'shared/ui/select-input';
import { FilterToggle } from 'entities/filter-toggle';
import { SortingSelect } from 'shared/ui/sorting-select';
import { useCurrencyHistory } from './model';
import { Information } from 'widgets/profile-admin/components/Information/Information';
import Chart from 'widgets/chart';
import { HistoryCurrency } from './history-currency';

export const ViewingData = () => {
  const {} = useCurrencyHistory();

  return (
    <div className={cls.check}>
      {/* <div className={cls.checkInfo}>
        <div className={cls.info}>
          <div className={cls.icon}>
            <img src={wallet} alt="wallet" />
          </div>
        </div>
        <div className={cls.value}>
          <div className={cls.text}>
            <Title2 className={cls.title}>340 000 БиТ</Title2>
            <Caption className={cls.caption}>1 бит - 5 руб</Caption>
            <a className={cls.btn}>Сменить курс</a>
            <span className={cls.desc}>340 000 БиТ на счетах пользователей сервиса</span>
          </div>
        </div>
        <div className={cls.state}>
          <div className={cls.topTitle}>
            <Title3 className={cls.title}>Оборотная сумма пользователей</Title3>
            <SelectInput
              className={cls.select}
              placeholder={'30 дней'}
              options={[
                { label: '30 дней', value: 'fame', id: 1 },
                { label: '30 дней', value: 'last-change', id: 2 },
              ]}
            />
          </div>
          <ul>
            <li>
              <div className={cls.text}>
                <img className={cls.pic} src={iconUp} alt="iconUp" />
                <Title5 className={cls.title}>Начислено</Title5>
                <Caption className={cls.day}>340 000 БиТ</Caption>
              </div>
            </li>
            <li>
              <div className={cls.text}>
                <img className={cls.pic} src={iconDown} alt="iconDown" />
                <Title5 className={cls.title}>Списано</Title5>
                <Caption className={cls.day}>340 000 БиТ</Caption>
              </div>
            </li>
          </ul>
        </div>
      </div> */}
      <Information />
      {/* <div className={cls.replenishment}>
        <div className={cls.top}>
          <Title4 className={cls.title}>Пополнения</Title4>
          <div className={cls.date}>
            <img src={iconCalendar} alt="iconCalendar" />
            <Caption className={cls.caption}>22 - 24.05.2022</Caption>
          </div>
          <FilterToggle
            className={cls.right}
            items={[
              <SelectInput
                placeholder={'Категория'}
                options={[
                  { label: 'Популярность', value: 'fame', id: 1 },
                  { label: 'Последние изменения', value: 'last-change', id: 2 },
                ]}
              />,
              <SortingSelect
                label={'Сортировать по:'}
                name={'sort-by'}
                options={[
                  { label: 'Рейтинг', value: 'rating_avg', id: 1 },
                  { label: 'Дата создания', value: 'created_at', id: 2 },
                ]}
              />,
            ]}
          />
        </div>
        <div className={cls.graf}>Grafic</div>
      </div> */}
      <HistoryCurrency />
      {/* <div className={cls.checkHistory}>
        <div className={cls.top}>
          <Title3 className={cls.title}>История счета</Title3>
          <div className={cls.date}>
            <img src={iconCalendar} alt="iconCalendar" />
            <Caption className={cls.caption}>22 - 24.05.2022</Caption>
          </div>
          <SelectInput
            className={cls.select}
            placeholder={'Все операции'}
            options={[
              { label: 'Все операции', value: 'fame', id: 1 },
              { label: 'Все операции', value: 'last-change', id: 2 },
            ]}
          />
        </div>
        <div className={cls.listHistory}>
          <Caption className={cls.caption}>Сегодня</Caption>
          <div className={[cls.itemHistory, cls.down].join(' ')}>
            <img className={cls.pic} src={iconDown} alt="iconDown" />
            <Title5 className={cls.title}>Покупка тарифа</Title5>
            <Caption className={cls.caption}>340 000 БиТ, 16.06.2022, 12:30</Caption>
            <span className={cls.price}>-300₽</span>
            <span className={cls.info}>Награда</span>
          </div>
          <div className={[cls.itemHistory, cls.up].join(' ')}>
            <img className={cls.pic} src={iconUp} alt="iconUp" />
            <Title5 className={cls.title}>Покупка тарифа</Title5>
            <Caption className={cls.caption}>340 000 БиТ, 16.06.2022, 12:30</Caption>
            <span className={cls.price}>-300₽</span>
            <span className={cls.info}>Алексей К.</span>
          </div>
          <Caption className={cls.caption}>07.07.2022</Caption>
          <div className={[cls.itemHistory, cls.up].join(' ')}>
            <img className={cls.pic} src={iconUp} alt="iconUp" />
            <Title5 className={cls.title}>Заказ №23456</Title5>
            <Caption className={cls.caption}>07 июл. 2022, 18:30</Caption>
            <span className={cls.price}>+800₽</span>
            <span className={cls.info}>Покупка сюжета</span>
          </div>
          <div className={[cls.itemHistory, cls.up].join(' ')}>
            <img className={cls.pic} src={iconUp} alt="iconUp" />
            <Title5 className={cls.title}>Покупка тарифа</Title5>
            <Caption className={cls.caption}>10 июл. 2022, 12:30</Caption>
            <span className={cls.price}>-300₽</span>
            <span className={cls.info}>Награда</span>
          </div>
          <div className={[cls.itemHistory, cls.down].join(' ')}>
            <img className={cls.pic} src={iconDown} alt="iconDown" />
            <Title5 className={cls.title}>Аукцион 23</Title5>
            <Caption className={cls.caption}>07 июл. 2022, 08:30</Caption>
            <span className={cls.price}>-300₽</span>
            <span className={cls.info}>Награда</span>
          </div>
          <div className={[cls.itemHistory, cls.up].join(' ')}>
            <img className={cls.pic} src={iconUp} alt="iconUp" />
            <Title5 className={cls.title}>Покупка тарифа</Title5>
            <Caption className={cls.caption}>10 июл. 2022, 12:30</Caption>
            <span className={cls.price}>-300₽</span>
            <span className={cls.info}>Награда</span>
          </div>
          <div className={[cls.itemHistory, cls.up].join(' ')}>
            <img className={cls.pic} src={iconUp} alt="iconUp" />
            <Title5 className={cls.title}>Заказ №23456</Title5>
            <Caption className={cls.caption}>07 июл. 2022, 18:30</Caption>
            <span className={cls.price}>+800₽</span>
            <span className={cls.info}>Награда</span>
          </div>
          <div className={[cls.itemHistory, cls.up].join(' ')}>
            <img className={cls.pic} src={iconUp} alt="iconUp" />
            <Title5 className={cls.title}>Покупка тарифа</Title5>
            <Caption className={cls.caption}>10 июл. 2022, 12:30</Caption>
            <span className={cls.price}>-300₽</span>
            <span className={cls.info}>Награда</span>
          </div>
          <div className={[cls.itemHistory, cls.down].join(' ')}>
            <img className={cls.pic} src={iconDown} alt="iconDown" />
            <Title5 className={cls.title}>Аукцион 23</Title5>
            <Caption className={cls.caption}>07 июл. 2022, 08:30</Caption>
            <span className={cls.price}>-300₽</span>
            <span className={cls.info}>Награда</span>
          </div>
          <div className={[cls.itemHistory, cls.up].join(' ')}>
            <img className={cls.pic} src={iconUp} alt="iconUp" />
            <Title5 className={cls.title}>Покупка тарифа</Title5>
            <Caption className={cls.caption}>10 июл. 2022, 12:30</Caption>
            <span className={cls.price}>-300₽</span>
            <span className={cls.info}>Награда</span>
          </div>
          <div className={[cls.itemHistory, cls.up].join(' ')}>
            <img className={cls.pic} src={iconUp} alt="iconUp" />
            <Title5 className={cls.title}>Заказ №23456</Title5>
            <Caption className={cls.caption}>07 июл. 2022, 18:30</Caption>
            <span className={cls.price}>+800₽</span>
            <span className={cls.info}>Награда</span>
          </div>
          <div className={[cls.itemHistory, cls.up].join(' ')}>
            <img className={cls.pic} src={iconUp} alt="iconUp" />
            <Title5 className={cls.title}>Покупка тарифа</Title5>
            <Caption className={cls.caption}>10 июл. 2022, 12:30</Caption>
            <span className={cls.price}>-300₽</span>
            <span className={cls.info}>Награда</span>
          </div>
          <div className={[cls.itemHistory, cls.down].join(' ')}>
            <img className={cls.pic} src={iconDown} alt="iconDown" />
            <Title5 className={cls.title}>Аукцион 23</Title5>
            <Caption className={cls.caption}>07 июл. 2022, 08:30</Caption>
            <span className={cls.price}>-300₽</span>
            <span className={cls.info}>Награда</span>
          </div>
          <div className={[cls.itemHistory, cls.up].join(' ')}>
            <img className={cls.pic} src={iconUp} alt="iconUp" />
            <Title5 className={cls.title}>Покупка тарифа</Title5>
            <Caption className={cls.caption}>10 июл. 2022, 12:30</Caption>
            <span className={cls.price}>-300₽</span>
            <span className={cls.info}>Награда</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};
