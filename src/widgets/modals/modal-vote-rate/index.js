import React, { useState } from 'react';

import cls from './styles.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Rating } from '@mui/material';

export const ModalVoteRate = ({ isOpen, setIsOpen, handleAccept }) => {
  const [rate, setRate] = useState(0);
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Title3 className={cls.title}>Оцените сюжет</Title3>
      <div className={cls.rate}>
        <Rating
          size="large"
          name="half-rating-read"
          className={cls.modalRate}
          value={rate}
          onChange={e => setRate(Number(e.target.value))}
          precision={1}
        />
      </div>
      {/* <div className={cls.rate}>
        <div className={cls.rateValue} style={{ width: '50%' }}></div>
      </div> */}
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
            handleAccept(rate);
            setIsOpen(false);
          }}
          className={[cls.btn].join(' ')}
        >
          Подтвердить
        </Button>
      </div>
    </Modal>
  );
};
