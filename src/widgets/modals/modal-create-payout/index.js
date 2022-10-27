import React, { useEffect, useState } from 'react';

import cls from './styles.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';
import { SelectInput } from 'shared/ui/select-input';
import classNames from 'classnames';

export const ModalCreatePayout = ({ isOpen, setIsOpen, handleClick }) => {
  const [value, setValue] = useState(null);
  const [synonim, setsynonim] = useState('');

  useEffect(() => {
    const payoutsData = new window.PayoutsData({
      type: 'payout',
      account_id: '502586', //Идентификатор шлюза (agentId в личном кабинете)
      success_callback(data) {
        setsynonim(data.synonim);
        //Обработка ответа с токеном карты
      },
      error_callback(error) {
        console.log(error);
        //Обработка ошибок инициализации
      },
    });

    payoutsData.render('payout-form');
  }, []);

  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Вывод средств</Title3>
      <div id="payout-form" className={classNames(cls.form, { [cls['hidden']]: synonim })}></div>
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
        onClick={() => handleClick(value, synonim)}
        className={cls.btn}
        disabled={!synonim}
      >
        Вывести
      </Button>
    </Modal>
  );
};
