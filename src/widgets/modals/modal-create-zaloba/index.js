import React, { useState } from 'react';

import cls from './styles.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';
import { Radio } from 'shared/ui/radio';

export const ModalCreateZaloba = ({ isOpen, setIsOpen, handleAccept, authorId }) => {
  //   const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Отправить жалобу</Title3>
      {/* <TextInput className={cls.textInput} placeholder="Название поля" /> */}
      <TextArea
        className={cls.textArea}
        placeholder="Текст"
        value={text}
        onChange={e => setText(e.target.value)}
      ></TextArea>
      <Button
        size={ButtonSizes.medium}
        type={ButtonTypes.primary}
        onClick={() => {
          handleAccept(authorId, text);
          setIsOpen(false);
        }}
        className={cls.btn}
        disabled={!text}
      >
        Отправить
      </Button>
    </Modal>
  );
};
