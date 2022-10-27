import React from 'react';

import cls from './modal.module.scss';

export const BtnCloseModal = ({ setIsOpen, className }) => {
    return (
        <>
            <button className={[cls.btnClose, className].join(' ')} onClick={() => { setIsOpen(false) }}>
                <span></span>
                <span></span>
            </button>
        </>
    )
}