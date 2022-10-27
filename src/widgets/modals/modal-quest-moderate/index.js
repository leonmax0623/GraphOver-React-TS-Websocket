import React from 'react';

import cls from './styles.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';
import { Radio } from 'shared/ui/radio';

export const ModalQuestModerate = ({ isOpen, setIsOpen, quest, handleModerate }) => {
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Модерация сюжета</Title3>
      <ul className={cls.info}>
        <li>
          <span className={cls.title}>Категория</span>
          <p>{quest?.topic_name}</p>
        </li>
        <li>
          <span className={cls.title}>Название</span>
          <p>{quest?.name}</p>
        </li>
        <li>
          <span className={cls.title}>Краткое описание</span>
          <p className={cls.text}>{quest?.small_info}</p>
        </li>
        <li>
          <span className={cls.title}>Подробное описание</span>
          <p className={cls.text}>{quest?.info} </p>
        </li>
      </ul>
      <div className={cls.controls}>
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.outline}
          onClick={() => {
            setIsOpen(false);
            handleModerate('D');
          }}
          className={cls.btn}
        >
          Отклонить
        </Button>
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpen(false);
            handleModerate('L');
          }}
          className={cls.btn}
        >
          Принять
        </Button>
      </div>
    </Modal>
  );
};
