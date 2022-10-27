
import React from 'react';

import cls from './styles.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';
import { SelectInput } from 'shared/ui/select-input';

export const Modal9 = ({ isOpen, setIsOpen }) => {
    return (
        <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
            <BtnCloseModal setIsOpen={setIsOpen} />
            <Title3 className={cls.title}>Короткий заголовок</Title3>
            <SelectInput
                color={'rgba(26, 26, 26, 0.5);'}
                paddingLeft={'8px'}
                className={cls.sort}
                placeholder={'Название поля'}
                options={[
                    { label: 'Название поля', value: 'one', id: 1 },
                    { label: 'Название поля', value: 'two', id: 2 },
                ]}
            />
            <TextInput className={cls.textInput} placeholder='Название поля' />
            <TextArea className={cls.textArea} placeholder='Текст'></TextArea>
            <TextArea className={cls.textArea} placeholder='Текст'></TextArea>
            <Button size={ButtonSizes.medium} type={ButtonTypes.primary} onClick={() => { setIsOpen(false) }} className={cls.btn}>
                Текст кнопки
            </Button>
        </Modal>
    );
};
