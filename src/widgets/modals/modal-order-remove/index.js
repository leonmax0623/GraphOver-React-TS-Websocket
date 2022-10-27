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
import { useAdminOrderModal, useOrderModal } from './model';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';
import moment from 'moment';

export const ModalOrderRemove = ({ isOpen, setIsOpen, order_id, refetchData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const [ban_info, setorderText] = useState('');
  const [writing_time, setorderTime] = useState('');
  const [price, setorderCost] = useState('');
  const userId = useSelector(state => state.userReducer.user.pk);
  const user_id = userId;

  const { removeOrder } = useAdminOrderModal(order_id);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(false);
  }, [ban_info]);

  const removeOrderN = async () => {
    try {
      const res = await removeOrder({ ban_info }, () => {
        refetchData();
        setIsOpen(false);
      });
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Причина закрытия</Title3>
      <div className={cls.inputWrapper}>
        <div className={cls.inputItem}>
          <TextArea
            value={ban_info}
            onChange={e => setorderText(e.target.value)}
            className={cls.TextArea}
            placeholder={'Аннотация'}
            message={status && !ban_info && 'Это поле не может быть пустым'}
            status={status && !ban_info && TextInputStatuses.error}
          />
        </div>
      </div>

      <Button
        size={ButtonSizes.medium}
        type={ButtonTypes.primary}
        onClick={() => {
          setStatus(true);
          if (ban_info) removeOrderN();
        }}
        className={cls.btn}
      >
        Подтвердить
      </Button>
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
