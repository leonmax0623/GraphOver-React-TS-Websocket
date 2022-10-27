import React, { useState } from 'react';

import cls from './styles.module.scss';

import { Title3, Title4 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Radio } from 'shared/ui/radio';

export const Modal5 = ({ isOpen, setIsOpen, handleAccept }) => {
  const [accepted, setaccepted] = useState(false);
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Вы хотите стать автором?</Title3>
      <div className={cls.rules}>
        {/* <Title4 className={cls.title}>Правила</Title4> */}
        <p style={{ marginBottom: 20 }}>
          Присоединившись к сюжету как автор, Вы сможете войти в авторский коллектив сюжета, писать графы, ставить
          задачи игрокам, участвовать в авторском чате и чате с командами и принимать участие в голосованиях
        </p>
      </div>
      <Radio
        className={cls.approval}
        value={accepted}
        onChange={e => setaccepted(e)}
        label={'Я соглашаюсь с правилами'}
      />
      <div className={cls.controls}>
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.outline}
          onClick={() => {
            setIsOpen(false);
          }}
          className={cls.btn}
        >
          Нет, отмена
        </Button>
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.primary}
          onClick={() => {
            handleAccept();
            setIsOpen(false);
          }}
          disabled={!accepted}
          className={cls.btn}
        >
          Да, соглашаюсь
        </Button>
      </div>
    </Modal>
  );
};
