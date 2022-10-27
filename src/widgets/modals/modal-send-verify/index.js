import React, { useState } from 'react';

import cls from './styles.module.scss';

import { Caption, Title4, Title5 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';

import iconAspect from 'shared/assets/test-content/aspect-ratio.svg';
import { FileLoad } from 'shared/ui/file-load';

export const ModalSendverify = ({ isOpen, setIsOpen, handleAccept }) => {
  const [files, setFile] = useState(null);

  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={cls.controls}>
        <BtnCloseModal className={cls.btnCloseSmall} setIsOpen={setIsOpen} />
      </div>

      <Title4 className={cls.title}>Запрос на верификацию</Title4>
      <Title5 className={cls.text}>Для заявки на верификацию аккаунта загрузите фото или скан паспорта</Title5>

      <FileLoad
        className={cls.load}
        id={'verify'}
        // value={files}
        onChange={e => {
          setFile(e.target.files);
        }}
      />
      {files && files.length > 0 && (
        <p
          style={{
            marginTop: 0,
            marginBottom: 5,
            textAlign: 'center',
          }}
        >
          {files[0]?.name}
        </p>
      )}
      <Button
        size={ButtonSizes.small}
        type={ButtonTypes.primary}
        onClick={() => {
          handleAccept(files[0]);
          setIsOpen(false);
        }}
        className={cls.btn}
      >
        Отправить запрос
      </Button>
    </Modal>
  );
};
