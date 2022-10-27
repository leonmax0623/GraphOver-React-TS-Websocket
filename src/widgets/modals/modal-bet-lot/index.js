import React from 'react';

import cls from './styles.module.scss';

import { Caption, Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';

export const ModalBetLot = ({ isOpen, setIsOpen, price, acceptClick }) => {
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Title3 className={cls.title}>Продажа лота</Title3>
      <p className={cls.text}>
        Продать лот пользовалтелю за <strong>{price}</strong> БиТ?
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
            acceptClick();
          }}
          className={[cls.btn].join(' ')}
        >
          Подтвердить
        </Button>
      </div>
      {/* <span className={cls.errorTxt}>На балансе не хватает денег</span>
      <a className={cls.link}>Пополнить</a> */}
    </Modal>
  );
};
