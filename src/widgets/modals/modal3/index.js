
import React from 'react';

import cls from './styles.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';
import { Radio } from 'shared/ui/radio';

export const Modal3 = ({ isOpen, setIsOpen }) => {
    return (
        <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
            <BtnCloseModal setIsOpen={setIsOpen} />
            <Title3 className={cls.title}>Модерация сюжета</Title3>
            <ul className={cls.info}>
                <li>
                    <span className={cls.title}>Категория</span>
                    <p>Категория сюжета</p>
                </li>
                <li>
                    <span className={cls.title}>Название</span>
                    <p>Название сюжета</p>
                </li>
                <li>
                    <span className={cls.title}>Краткое описание</span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius id tristique nibh sapien amet, scelerisque. Pellentesque quis habitant etiam nisi.</p>
                </li>
                <li>
                    <span className={cls.title}>Подробное описание</span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. A id facilisi id mauris faucibus ut. Ullamcorper viverra mauris fringilla et morbi in. Pellentesque placerat cras nam mollis. Et, quis risus sed parturient. At in tristique sit ut aliquam arcu turpis at ultrices. Cras venenatis faucibus lorem mi dictumst. Vitae lobortis augue magna turpis. Lobortis tellus blandit at eu, sollicitudin diam posuere ut eget. Posuere et, aliquet non interdum hendrerit quis. A amet, nec non sagittis, cum libero est. Faucibus sed aenean ligula adipiscing quis arcu donec sit morbi. Ridiculus euismod nisi, in nibh mauris risus facilisis euismod. </p>
                </li>
            </ul>
            <div className={cls.controls}>
                <Button size={ButtonSizes.small} type={ButtonTypes.outline} onClick={() => { setIsOpen(false) }} className={cls.btn}>
                    Отклонить
                </Button>
                <Button size={ButtonSizes.small} type={ButtonTypes.primary} onClick={() => { setIsOpen(false) }} className={cls.btn}>
                    Принять
                </Button>
            </div>
        </Modal>
    );
};
