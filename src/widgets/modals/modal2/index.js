
import React from 'react';

import cls from './styles.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';
import { Radio } from 'shared/ui/radio';

export const Modal2 = ({ isOpen, setIsOpen }) => {
    return (
        <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
            <BtnCloseModal setIsOpen={setIsOpen} />
            <Title3 className={cls.title}>Короткий заголовок</Title3>
            <TextInput className={cls.textInput} placeholder='Название поля' />
            <TextArea className={cls.textArea} placeholder='Текст'></TextArea>
            <Radio
                className={cls.approval}
                label={'Текст описания '}
            />
            <Button size={ButtonSizes.medium} type={ButtonTypes.primary} onClick={() => { setIsOpen(false) }} className={cls.btn}>
                Текст кнопки
            </Button>
        </Modal>
    );
};
