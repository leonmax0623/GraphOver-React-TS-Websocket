import React, { useState } from 'react';

import cls from './styles.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';
import { Radio } from 'shared/ui/radio';

export const ModalPromo = ({ isOpen, setIsOpen, handleAccept }) => {
  const [promo, setpromo] = useState('');

  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Использовать промокод</Title3>
      <TextInput
        value={promo}
        onChange={e => setpromo(e.target.value)}
        className={cls.textInput}
        placeholder="Введите промокод"
      />

      <Button
        size={ButtonSizes.medium}
        type={ButtonTypes.primary}
        onClick={() => {
          handleAccept(promo);
          setIsOpen(false);
        }}
        className={cls.btn}
      >
        Текст кнопки
      </Button>
    </Modal>
  );
};
