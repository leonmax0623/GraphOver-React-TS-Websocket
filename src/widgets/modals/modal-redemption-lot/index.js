import React, { useState } from 'react';

import cls from './styles.module.scss';

import { Title4 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextInput } from 'shared/ui/text-input';
import { Radio } from 'shared/ui/radio';
import { useBuyLot } from 'widgets/auction-item/model';

export const ModalRedemptionLot = ({ isOpen, setIsOpen, redemption_price, lot_id, getBetHistoryById }) => {
  const [price, setprice] = useState('');
  const [isAccept, setisAccept] = useState(false);

  const { sendLotBit, sendLotRedempt } = useBuyLot(getBetHistoryById);

  const handleBuy = async () => {
    if (isAccept) await sendLotRedempt(lot_id);
    else await sendLotBit(lot_id, price);
    setIsOpen(false);
  };

  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Title4 className={cls.title}>Выкуп лота</Title4>
      <div className={cls.inputWrapper}>
        <TextInput
          value={price}
          readOnly={isAccept}
          onChange={e => setprice(e.target.value)}
          className={cls.textInput}
          inputType={'number'}
          placeholder="Цена выкупа"
        />
      </div>
      <div className={cls.inputWrapper}>
        <Radio
          value={isAccept}
          onChange={setisAccept}
          className={cls.approval}
          label={`Я выкупаю лот за ${redemption_price || 0} БиТ`}
        />
      </div>
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
        <Button size={ButtonSizes.small} type={ButtonTypes.primary} onClick={handleBuy} className={[cls.btn].join(' ')}>
          Подтвердить
        </Button>
      </div>
    </Modal>
  );
};
