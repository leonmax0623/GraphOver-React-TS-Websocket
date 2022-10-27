
import React from 'react';

import cls from './styles.module.scss';

import { Title4 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { BtnCloseModal } from 'shared/ui/modal/btnclose-modal';

import icon from 'shared/assets/test-content/ic-ok.png'

export const Modal17 = ({ isOpen, setIsOpen }) => {
    return (
        <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
            <BtnCloseModal setIsOpen={setIsOpen} />
            <img className={cls.pic} src={icon} alt={'OK'} />
            <Title4 className={cls.title}>Текст длинного заголовка<br /> в 2 строчки</Title4>
            <p className={cls.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras diam, sagittis in id. Quis dictumst arcu</p>
            <div className={cls.controls}>
                <Button size={ButtonSizes.large} type={ButtonTypes.primary} onClick={() => { setIsOpen(false) }} className={[cls.btn].join(' ')}>
                    Текст кнопки
                </Button>
            </div>

            <div className={cls.controls}>
                <Button size={ButtonSizes.small} type={ButtonTypes.outline} onClick={() => { setIsOpen(false) }} className={[cls.btn].join(' ')}>
                    Отмена
                </Button>
                <Button size={ButtonSizes.small} type={ButtonTypes.primary} onClick={() => { setIsOpen(false) }} className={[cls.btn].join(' ')}>
                    Завершить
                </Button>
            </div>
        </Modal >
    );
};
