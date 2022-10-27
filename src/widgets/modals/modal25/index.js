import React from 'react';

import cls from './styles.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';

export const Modal25 = (
  {
    onAllow,
    onDeny,
    isOpen,
    setIsOpen,
    name,
    role,
    description,
    passport,
  }) => {

  const allow = () => {
    onAllow();
    setIsOpen(false);
  }

  const deny = () => {
    onDeny();
    setIsOpen(false);
  }

  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Заявка на верификацию</Title3>
      <ul className={cls.info}>
        <li>
          <span className={cls.title}>ФИО</span>
          <p>{name}</p>
        </li>
        <li>
          <span className={cls.title}>Роль на сервисе</span>
          <p>{role}</p>
        </li>
        <li>
          <span className={cls.title}>Краткое описание</span>
          <p>{description}</p>
        </li>
        <li>
          <span className={cls.title}>Фото паспорта</span>
          <div className={cls.foto}>
            <div className={cls.iconWrap}>
              <svg
                className={cls.icon}
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M19 11C19 13.2091 18.1046 15.2091 16.6569 16.6569C15.2091 18.1046 13.2091 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z'
                  stroke='#171D25'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path d='M20.9999 20.9999L16.6567 16.6567' stroke='#171D25' strokeLinecap='round'
                      strokeLinejoin='round' />
              </svg>
            </div>
          </div>
        </li>
      </ul>
      <div className={cls.controls}>
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.outline}
          onClick={ deny }
          className={cls.btn}
        >
          Отказать
        </Button>
        <Button size={ButtonSizes.small} type={ButtonTypes.primary} onClick={allow} className={cls.btn}>
          Подтвердить
        </Button>
      </div>
    </Modal>
  );
};
