
import React from 'react';

import cls from './styles.module.scss';

import { Caption, Title3, Title4 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';

export const Modal14 = ({ isOpen, setIsOpen }) => {
    return (
        <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
            <Caption className={cls.caption}>Сегодня 20:08</Caption>
            <Title4 className={cls.title}>Голосование за продление сюжета</Title4>
            <div className={cls.controls}>
                <Button size={ButtonSizes.small} type={ButtonTypes.primary} onClick={() => { setIsOpen(false) }} className={[cls.btn, cls.for].join(' ')}>
                    За продление
                </Button>
                <Button size={ButtonSizes.small} type={ButtonTypes.primary} onClick={() => { setIsOpen(false) }} className={[cls.btn, cls.again].join(' ')}>
                    Против
                </Button>
            </div>
        </Modal>
    );
};
