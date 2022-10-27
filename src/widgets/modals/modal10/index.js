import React from 'react';

import cls from './styles.module.scss';

import { Caption, Title3, Title5 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';

import backURL from 'shared/assets/test-content/pic.jpg';

export const Modal10 = ({ isOpen, setIsOpen, children, saveCallback }) => {
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>
        Выберите область
        <br /> обрезки изображения
      </Title3>
      {children}
      {/* <div className={cls.picture} style={{ backgroundImage: `url(${backURL})` }}></div> */}
      <Button
        size={ButtonSizes.medium}
        type={ButtonTypes.primary}
        onClick={() => {
          if (saveCallback) {
            saveCallback();
            setIsOpen(false);
          } else setIsOpen(false);
        }}
        className={cls.btn}
      >
        Сохранить
      </Button>
    </Modal>
  );
};
