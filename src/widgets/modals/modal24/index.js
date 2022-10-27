import React from 'react';

import cls from './styles.module.scss';

import { Caption, Title2, Title4, Title5 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';

import foto from 'shared/assets/test-content/foto.png';
import arrow from 'shared/assets/test-content/arrow_right.svg';
import iconDelete from 'shared/assets/test-content/icdelete.svg';

export const Modal24 = ({ isOpen, setIsOpen }) => {
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={cls.top}>
        <BtnCloseModal setIsOpen={setIsOpen} />
        <Title4 className={cls.title}>Авторы сюжета</Title4>
        <div className={cls.list}>
          <div className={cls.item}>
            <img className={[cls.picture, cls.active].join(' ')} src={foto} alt={"foto"} />
            <div className={cls.text}>
              <Title5 className={cls.title}>Главный автор</Title5>
              <span className={cls.desc}>Евгений Ж.</span>
            </div>
            <div className={cls.controls}>
              <div className={cls.icon}>
                <img src={iconDelete} alt='iconDelete' />
              </div>
              <button className={cls.arrow}><img src={arrow} alt={'arrow'} /></button>
            </div>
          </div>
          <div className={cls.item}>
            <img className={[cls.picture, cls.active].join(' ')} src={foto} alt={"foto"} />
            <div className={cls.text}>
              <Title5 className={cls.title}>Главный автор</Title5>
              <span className={cls.desc}>Евгений Ж.</span>
            </div>
            <div className={cls.controls}>
              <div className={cls.icon}>
                <img src={iconDelete} alt='iconDelete' />
              </div>
              <button className={cls.arrow}><img src={arrow} alt={'arrow'} /></button>
            </div>
          </div>
          <div className={cls.item}>
            <img className={[cls.picture, cls.active].join(' ')} src={foto} alt={"foto"} />
            <div className={cls.text}>
              <Title5 className={cls.title}>Автор</Title5>
              <span className={cls.desc}>Евгений Ж.</span>
            </div>
            <div className={cls.controls}>
              <div className={cls.icon}>
                <img src={iconDelete} alt='iconDelete' />
              </div>
              <button className={cls.arrow}><img src={arrow} alt={'arrow'} /></button>
            </div>
          </div>
          <div className={cls.item}>
            <img className={[cls.picture, cls.active].join(' ')} src={foto} alt={"foto"} />
            <div className={cls.text}>
              <Title5 className={cls.title}>Главный автор</Title5>
              <span className={cls.desc}>Евгений Ж.</span>
            </div>
            <div className={cls.controls}>
              <div className={cls.icon}>
                <img src={iconDelete} alt='iconDelete' />
              </div>
              <button className={cls.arrow}><img src={arrow} alt={'arrow'} /></button>
            </div>
          </div>
          <div className={cls.item}>
            <img className={[cls.picture, cls.active].join(' ')} src={foto} alt={"foto"} />
            <div className={cls.text}>
              <Title5 className={cls.title}>Главный автор</Title5>
              <span className={cls.desc}>Евгений Ж.</span>
            </div>
            <div className={cls.controls}>
              <div className={cls.icon}>
                <img src={iconDelete} alt='iconDelete' />
              </div>
              <button className={cls.arrow}><img src={arrow} alt={'arrow'} /></button>
            </div>
          </div>
          <div className={cls.item}>
            <img className={[cls.picture, cls.active].join(' ')} src={foto} alt={"foto"} />
            <div className={cls.text}>
              <Title5 className={cls.title}>Главный автор</Title5>
              <span className={cls.desc}>Евгений Ж.</span>
            </div>
            <div className={cls.controls}>
              <div className={cls.icon}>
                <img src={iconDelete} alt='iconDelete' />
              </div>
              <button className={cls.arrow}><img src={arrow} alt={'arrow'} /></button>
            </div>
          </div>
        </div>
      </div>

    </Modal>
  );
};
