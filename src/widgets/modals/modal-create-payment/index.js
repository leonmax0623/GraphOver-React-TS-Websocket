import React, { useState } from 'react';

import cls from './styles.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';
import { SelectInput } from 'shared/ui/select-input';

export const ModalCreatePayment = ({ isOpen, setIsOpen, handleClick }) => {
  const [value, setValue] = useState(0);
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Пополнение баланса</Title3>

      <div className={cls.inputListWrapper}>
        <div className={cls.inputWrapper}>
          <TextInput
            value={value}
            onChange={e => setValue(e.target.value)}
            className={cls.textInput}
            placeholder="Введите сумму"
            inputType="number"
          />
        </div>
      </div>
      <Button
        size={ButtonSizes.medium}
        type={ButtonTypes.primary}
        onClick={() => handleClick(value)}
        className={cls.btn}
      >
        Пополнить
      </Button>
    </Modal>
  );
};
