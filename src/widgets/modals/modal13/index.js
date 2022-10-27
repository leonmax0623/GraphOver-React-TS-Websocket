
import React from 'react';

import cls from './styles.module.scss';

import { Caption, Title4 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';

import check from 'shared/assets/test-content/check.svg'
import close from 'shared/assets/test-content/close.svg'

export const Modal13 = ({ isOpen, setIsOpen }) => {
    return (
        <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
            <Caption className={cls.caption}>Сегодня 20:08</Caption>
            <Title4 className={cls.title}>Голосование за продление сюжета</Title4>
            <div className={cls.controls}>
                <button className={[cls.btn, cls.for].join(' ')}>
                    <span className={cls.num}>1</span>
                    <img className={cls.pic} src={check} alt={check} />
                </button>
                <button className={[cls.btn, cls.again].join(' ')}>
                    <span className={cls.num}>3</span>
                    <img className={cls.pic} src={close} alt={close} />
                </button>
            </div>
        </Modal>
    );
};
