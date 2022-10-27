import React from 'react';

import cls from './check.module.scss';

import { Caption, Title3, Title2, Title4, Title5 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextInput } from 'shared/ui/text-input';

import iconAdd from '../../shared/assets/test-content/add.svg';
import iconEdit from '../../shared/assets/test-content/icedit.svg';
import wallet from '../../shared/assets/test-content/wallet.svg';
import mastercart from '../../shared/assets/test-content/mastercart.png';
import visa from '../../shared/assets/test-content/visa.png';
import iconCalendar from '../../shared/assets/test-content/calendar.svg';
import iconUp from '../../shared/assets/test-content/icup.svg';
import iconDown from '../../shared/assets/test-content/icdown.svg';
import { CheckHistory } from './check-history';
import { useAccount } from 'entities/user/model';
import { convertDate } from 'shared/utils';
import { ModalCreatePayment } from 'widgets/modals/modal-create-payment';
import { usePayment } from './model';

export const CardPanel = () => {
  return (
    <div className={cls.checkCarts}>
      <div className={cls.top}>
        <Title4 className={cls.title}>Сохраненные карты</Title4>
        <Button size={ButtonSizes.medium} type={ButtonTypes.primary} className={[cls.right, cls.btn].join(' ')}>
          Добавить карту
        </Button>
      </div>
      <div className={cls.cartList}>
        <div className={cls.cartItem}>
          <div className={cls.pic}>
            <img src={mastercart} alt="mastercart" />
          </div>
          <TextInput inputType={'text'} placeholder={'7812 2139 0823 XXXX'} className={cls.item} />
          <div className={cls.icons}>
            <a className={cls.icons__item}>
              <img src={iconEdit} alt="iconAdd" />
            </a>
          </div>
        </div>
        <div className={cls.cartItem}>
          <div className={cls.pic}>
            <img src={visa} alt="visa" />
          </div>
          <TextInput inputType={'text'} placeholder={'7812 2139 0823 XXXX'} className={cls.item} readOnly={true} />
          <div className={cls.icons}>
            <a className={cls.icons__item}>
              <img src={iconEdit} alt="iconAdd" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
