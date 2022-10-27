import React from 'react';

import cls from './styles.module.scss';

import { Caption, Title3, Title5 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';

export const Modal12 = ({ isOpen, setIsOpen }) => {
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Одобрения медиа</Title3>
      <div className={cls.media}></div>
      <div className={cls.controls}>
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.outline}
          onClick={() => {
            setIsOpen(false);
          }}
          className={cls.btn}
        >
          Отказать
        </Button>
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpen(false);
          }}
          className={cls.btn}
        >
          Одобрить
        </Button>
      </div>
    </Modal>
  );
};
