import React from 'react';

import cls from './check.module.scss';

import { Caption, Title2 } from 'shared/ui/typography';

import iconAdd from '../../shared/assets/test-content/add.svg';

import { ModalCreatePayment } from 'widgets/modals/modal-create-payment';
import { usePayment } from './model';
import { ModalCreatePayout } from 'widgets/modals/modal-create-payout';

export const PaymentPanel = ({ balance }) => {
  const { isOpen, setisOpen, createPayment, isOpenWithdraw, setisOpenWithdraw, createPayout } = usePayment();
  return (
    <>
      <div className={cls.value}>
        <div className={cls.text}>
          <Title2 className={cls.title}>{balance} БиТ</Title2>
          <Caption className={cls.caption}>1Бит = 1 руб</Caption>
        </div>
        <div className={cls.icons}>
          <a className={cls.btn} onClick={() => setisOpenWithdraw(true)}>
            Вывод средств
          </a>
          <div className={cls.icons__item} onClick={() => setisOpen(true)}>
            <img src={iconAdd} alt="iconAdd" />
          </div>
        </div>
      </div>
      <ModalCreatePayment isOpen={isOpen} setIsOpen={setisOpen} handleClick={createPayment} />
      {isOpenWithdraw && (
        <ModalCreatePayout isOpen={isOpenWithdraw} setIsOpen={setisOpenWithdraw} handleClick={createPayout} />
      )}{' '}
    </>
  );
};
