
import React from 'react';

import cls from './styles.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';
import { SelectInput } from 'shared/ui/select-input';

export const Modal11 = ({ isOpen, setIsOpen }) => {
    return (
        <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
            <BtnCloseModal setIsOpen={setIsOpen} />
            <Title3 className={cls.title}>Короткий заголовок</Title3>
            <SelectInput
                color={'rgba(26, 26, 26, 0.5);'}
                paddingLeft={'8px'}
                className={cls.sort}
                placeholder={'Выбор сюжета'}
                options={[
                    { label: 'Выбор сюжета', value: 'one', id: 1 },
                    { label: 'Выбор сюжета1', value: 'two', id: 2 },
                ]}
            />
            <div className={cls.inputListWrapper}>
                <div className={cls.inputWrapper}>
                    <TextInput className={cls.textInput} placeholder='Название поля' />
                </div>
                <div className={cls.inputWrapper}>
                    <TextInput className={cls.textInput} placeholder='Название поля' />
                </div>
                <div className={cls.inputWrapper}>
                    <TextInput className={cls.textInput} placeholder='Название поля' />
                </div>
                <div className={cls.inputWrapper}>
                    <TextInput className={cls.textInput} placeholder='Название поля' />
                </div>
            </div>
            <Button size={ButtonSizes.medium} type={ButtonTypes.primary} onClick={() => { setIsOpen(false) }} className={cls.btn}>
                Текст кнопки
            </Button>
        </Modal>
    );
};
