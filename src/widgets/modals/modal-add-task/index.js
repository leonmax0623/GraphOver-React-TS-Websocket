import React, { useState } from 'react';

import cls from './styles.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';

export const ModalAddTask = ({ isOpen, setIsOpen, onSubmit, err }) => {
  const [name, setname] = useState('');
  const [info, setinfo] = useState('');
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Добавить задачу</Title3>
      <TextInput
        value={name}
        onChange={e => setname(e.target.value)}
        className={cls.textInput}
        placeholder="Текст"
      ></TextInput>
      {err.name && <p className={cls['label-error']}>{err.name[0]}</p>}
      <TextArea
        value={info}
        onChange={e => setinfo(e.target.value)}
        className={cls.textArea}
        placeholder="Текст"
      ></TextArea>
      {err.info && <p className={cls['label-error']}>{err.info[0]}</p>}
      <Button
        size={ButtonSizes.medium}
        type={ButtonTypes.primary}
        onClick={() => {
          onSubmit({ name, info });
        }}
        className={cls.btn}
      >
        Добавить задачу
      </Button>
    </Modal>
  );
};
