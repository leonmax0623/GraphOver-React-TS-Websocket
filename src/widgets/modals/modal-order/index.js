import React, { useEffect, useState } from 'react';

import cls from './styles.module.scss';

import { Caption, Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput, TextInputStatuses } from 'shared/ui/text-input';
import { Radio } from 'shared/ui/radio';
import { SelectInput } from 'shared/ui/select-input';
import { useOrderModal } from './model';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';
import moment from 'moment';

export const ModalOrder = ({ isOpen, setIsOpen, order_id, getRespondsById }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const [annotation, setorderText] = useState('');
  const [writing_time, setorderTime] = useState('');
  const [price, setorderCost] = useState('');
  const userId = useSelector(state => state.userReducer.user.pk);
  const user_id = userId;

  const { pushRespond } = useOrderModal(order_id);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(false);
  }, [annotation, writing_time, price]);

  const onPushRespond = async () => {
    try {
      const res = await pushRespond({ user_id, annotation, price, writing_time }, () => {
        getRespondsById();
        setIsOpen(false);
      });
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Откликнуться на заказ</Title3>
      <div className={cls.inputWrapper}>
        <div className={cls.inputItem}>
          <TextArea
            value={annotation}
            onChange={e => setorderText(e.target.value)}
            className={cls.TextArea}
            placeholder={'Аннотация'}
            message={status && !annotation && 'Это поле не может быть пустым'}
            status={status && !annotation && TextInputStatuses.error}
          />
        </div>
      </div>
      <div className={cls.inputWrapper}>
        <div className={cls.inputItems}>
          <div className={cls.inputItem}>
            <TextInput
              value={price}
              onChange={e => setorderCost(e.target.value)}
              className={cls.textInput}
              inputType="number"
              placeholder="Цена"
              message={status && !price && 'Это поле не может быть пустым'}
              status={status && !price && TextInputStatuses.error}
            />
          </div>
          <div className={cls.inputItem}>
            <TextInput
              className={cls.textInput}
              inputType="date"
              value={writing_time}
              onChange={e => {
                const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
                setorderTime(newDate);
              }}
              message={status && !writing_time && 'Это поле не может быть пустым'}
              status={status && !writing_time && TextInputStatuses.error}
            />
            {/* <TextInput
              value={writing_time}
              onChange={e => setorderTime(e.target.value)}
              className={cls.textInput}
              placeholder="Срок (YYYY-MM-DD)"
            /> */}
          </div>
        </div>
      </div>
      <Button
        size={ButtonSizes.medium}
        type={ButtonTypes.primary}
        onClick={() => {
          setStatus(true);
          if (price && writing_time && writing_time) onPushRespond();
        }}
        className={cls.btn}
      >
        Откликнуться
      </Button>
      {/* <span className={cls.text}>Стоимость отклика 200 р</span> */}
    </Modal>
  );
};

export const ModalOrderView = ({ isOpen, setIsOpen, state }) => {
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Просмотр отклика</Title3>

      <div className={cls.inputWrapper}>
        <div className={cls.inputItem}>
          <TextArea className={cls.TextArea} placeholder={'Аннотация'} readOnly value={state?.text} />
        </div>
      </div>
      <div className={cls.inputWrapper}>
        <div className={cls.inputItems}>
          <div className={cls.inputItem}>
            <TextInput value={state?.cost} className={cls.textInput} placeholder="Стоимость, рублей" readOnly />
          </div>
          <div className={cls.inputItem}>
            <TextInput value={state?.time} className={cls.textInput} placeholder="Сроки, дней" readOnly />
          </div>
        </div>
      </div>
    </Modal>
  );
};
