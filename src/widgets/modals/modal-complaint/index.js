import React from 'react';

import cls from './styles.module.scss';

import { Title4, Title5 , Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';

export const ModalComplaint = ({ isOpen, setIsOpen, text, author, date }) => {

  const formattedDate = date && new Date(date).toLocaleString("ru", { dateStyle: 'short' })

  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Жалоба</Title3>
      <Title4 className={cls.title}>
        Автор: { author && author.username }
      </Title4>
      <Title5 className={cls.title}>
        Дата: { formattedDate }
      </Title5>
      <div className={cls.workWrapper}>
        <div className={cls.work}>
          <p>
            { text }
          </p>
        </div>
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
          Отклонить
        </Button>
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpen(false);
          }}
          className={[cls.btn].join(' ')}
        >
          Принять
        </Button>
      </div>
    </Modal>
  );
};
