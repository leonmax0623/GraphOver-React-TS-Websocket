
import React from 'react';

import cls from './styles.module.scss';

import { Caption, Title4 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';

import iconAspect from 'shared/assets/test-content/aspect-ratio.svg'
import { FileLoad } from 'shared/ui/file-load';

export const Modal4 = ({ isOpen, setIsOpen }) => {
    return (
        <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className={cls.controls}>
                <button className={cls.iconAspect}><img src={iconAspect} alt={"iconAspect"} /></button>
                <BtnCloseModal className={cls.btnCloseSmall} setIsOpen={setIsOpen} />
            </div>
            <Caption className={cls.caption}>Сегодня 20:08</Caption>
            <Title4 className={cls.title}>Новая заметка</Title4>
            <TextInput className={cls.textInput} placeholder='Название заметки' />
            <TextArea className={cls.textArea} placeholder='Текст'></TextArea>
            <FileLoad className={cls.load} id={"file"} />
            <Button size={ButtonSizes.small} type={ButtonTypes.primary} onClick={() => { setIsOpen(false) }} className={cls.btn}>
                Сохранить заметку
            </Button>
        </Modal>
    );
};
