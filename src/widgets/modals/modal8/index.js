import React from 'react';

import cls from './styles.module.scss';

import { Caption, Title3, Title5 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';

export const Modal8 = ({
  isOpen,
  setIsOpen,
  handleClose,
  handleCloseDropAndSave,
  title,
  text,
  files,
  getRootProps,
  getInputProps,
}) => {
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>
        Предложить изображение/
        <br />
        видео/gif к главе
      </Title3>
      <div {...getRootProps({ className: cls.DragAndDrop })}>
        <Title5 className={cls.caption}>Или перетащите файл сюда</Title5>
        <Title5 className={cls.format}>JPEG, PNG, MP4, GIF</Title5>
        {files.length > 0 && <p className={cls['file-list']}>{files[0].name}</p>}
      </div>
      <Button size={ButtonSizes.medium} type={ButtonTypes.primary} onClick={handleCloseDropAndSave} className={cls.btn}>
        Предложить
      </Button>
    </Modal>
  );
};
