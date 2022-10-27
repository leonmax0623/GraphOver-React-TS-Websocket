import React, { useState } from 'react';

import cls from './styles.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';

export const ModalAnswerToTask = ({ isOpen, setIsOpen, addAnswer, err }) => {
  const [text, setText] = useState('');
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Ответ на задачу</Title3>
      <TextArea
        value={text}
        onChange={e => setText(e.target.value)}
        className={cls.textArea}
        placeholder="Текст"
      ></TextArea>
      {err.answer && <p className={cls['label-error']}>{err.answer[0]}</p>}
      {err.error && <p className={cls['label-error']}>{err.error}</p>}
      {!err.answer && !err.error && !cls.answer && (
        <p className={cls['label-error']} style={{ visibility: 'hidden' }}>
          1
        </p>
      )}
      <Button
        size={ButtonSizes.medium}
        type={ButtonTypes.primary}
        onClick={() => addAnswer({ answer: text })}
        className={cls.btn}
      >
        Ответить
      </Button>
    </Modal>
  );
};
