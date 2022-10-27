import React from 'react';

import cls from './styles.module.scss';

import { Caption, Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';

export const Modal20 = ({ isOpen, setIsOpen, order_price, respond_id, selectExec }) => {
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Title3 className={cls.title}>Выбрать данного исполнителя?</Title3>
      <p className={cls.text}>
        С вашего счета будет списано <strong>{order_price}</strong> БиТ и сохранены в сейфе сделки до принятия работы
        Исполнителя
      </p>
      <div className={cls.controls}>
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.outline}
          onClick={() => {
            setIsOpen(false);
          }}
          className={[cls.btn].join(' ')}
        >
          Отмена
        </Button>
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.primary}
          onClick={() => {
            selectExec(respond_id);
          }}
          className={[cls.btn].join(' ')}
        >
          Подтвердить
        </Button>
      </div>
      {/* <span className={cls.errorTxt}>На балансе не хватает денег</span> */}
      {/* <a className={cls.link}>Пополнить</a> */}
    </Modal>
  );
};
