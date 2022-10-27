
import React from 'react';

import cls from './styles.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';

export const Modal1 = ({ isOpen, setIsOpen }) => {
    return (
        <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
            <BtnCloseModal setIsOpen={setIsOpen} />
            <Title3 className={cls.title}>Добавить заголовок</Title3>
            <TextArea className={cls.textArea} placeholder='Текст'></TextArea>
            <TextArea className={cls.textArea} placeholder='Текст'></TextArea>
            <Button size={ButtonSizes.medium} type={ButtonTypes.primary} onClick={() => { setIsOpen(false) }} className={cls.btn}>
                Добавить главу
            </Button>
        </Modal>
    );
};
