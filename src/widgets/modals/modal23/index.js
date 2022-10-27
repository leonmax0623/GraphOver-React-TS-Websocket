import React from 'react';

import cls from './styles.module.scss';

import { Caption, Title2, Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Radio } from 'shared/ui/radio';

import foto from 'shared/assets/test-content/foto.png';

export const Modal23 = ({ isOpen, setIsOpen }) => {
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Короткий заголовок</Title3>
      <div className={cls.authorCheckList}>
        <div className={cls.item}>
          <input type={'radio'} className={cls.field} id={'rd1'} />
          <label htmlFor={'rd1'} className={cls.authorLabel}>
            <img className={cls.picture} src={foto} alt={'foto'} />
            <div className={cls.txt}>
              <span className={cls.tit}>автор</span>
              <span className={cls.name}>Александр Л.</span>
            </div>
          </label>
        </div>
        <div className={cls.item}>
          <input type={'radio'} className={cls.field} id={'rd1'} />
          <label htmlFor={'rd1'} className={cls.authorLabel}>
            <img className={cls.picture} src={foto} alt={'foto'} />
            <div className={cls.txt}>
              <span className={cls.tit}>автор</span>
              <span className={cls.name}>Александр Л.</span>
            </div>
          </label>
        </div>
        <div className={cls.item}>
          <input type={'radio'} className={cls.field} id={'rd2'} />
          <label htmlFor={'rd2'} className={cls.authorLabel}>
            <img className={cls.picture} src={foto} alt={'foto'} />
            <div className={cls.txt}>
              <span className={cls.tit}>автор</span>
              <span className={cls.name}>Александр Александр Александр Александр Л.</span>
            </div>
          </label>
        </div>
        <div className={cls.item}>
          <input type={'radio'} className={cls.field} id={'rd3'} />
          <label htmlFor={'rd3'} className={cls.authorLabel}>
            <img className={cls.picture} src={foto} alt={'foto'} />
            <div className={cls.txt}>
              <span className={cls.tit}>автор</span>
              <span className={cls.name}>Александр Л.</span>
            </div>
          </label>
        </div>
        <div className={cls.item}>
          <input type={'radio'} className={cls.field} id={'rd4'} />
          <label htmlFor={'rd4'} className={cls.authorLabel}>
            <img className={cls.picture} src={foto} alt={'foto'} />
            <div className={cls.txt}>
              <span className={cls.tit}>автор</span>
              <span className={cls.name}>Александр Л.</span>
            </div>
          </label>
        </div>
        <div className={cls.item}>
          <input type={'radio'} className={cls.field} id={'rd5'} />
          <label htmlFor={'rd5'} className={cls.authorLabel}>
            <img className={cls.picture} src={foto} alt={'foto'} />
            <div className={cls.txt}>
              <span className={cls.tit}>автор</span>
              <span className={cls.name}>Александр Л.</span>
            </div>
          </label>
        </div>
        <div className={cls.item}>
          <input type={'radio'} className={cls.field} id={'rd6'} />
          <label htmlFor={'rd6'} className={cls.authorLabel}>
            <img className={cls.picture} src={foto} alt={'foto'} />
            <div className={cls.txt}>
              <span className={cls.tit}>автор</span>
              <span className={cls.name}>Александр Л.</span>
            </div>
          </label>
        </div>
        <div className={cls.item}>
          <input type={'radio'} className={cls.field} id={'rd7'} />
          <label htmlFor={'rd7'} className={cls.authorLabel}>
            <img className={cls.picture} src={foto} alt={'foto'} />
            <div className={cls.txt}>
              <span className={cls.tit}>автор</span>
              <span className={cls.name}>Александр Л.</span>
            </div>
          </label>
        </div>
        <div className={cls.item}>
          <input type={'radio'} className={cls.field} id={'rd8'} />
          <label htmlFor={'rd8'} className={cls.authorLabel}>
            <img className={cls.picture} src={foto} alt={'foto'} />
            <div className={cls.txt}>
              <span className={cls.tit}>автор</span>
              <span className={cls.name}>Александр Л.</span>
            </div>
          </label>
        </div>
        <div className={cls.item}>
          <input type={'radio'} className={cls.field} id={'rd9'} />
          <label htmlFor={'rd9'} className={cls.authorLabel}>
            <img className={cls.picture} src={foto} alt={'foto'} />
            <div className={cls.txt}>
              <span className={cls.tit}>автор</span>
              <span className={cls.name}>Александр Л.</span>
            </div>
          </label>
        </div>
      </div>
      <Button size={ButtonSizes.medium} type={ButtonTypes.primary} onClick={() => { setIsOpen(false) }} className={cls.btn}>
        Текст кнопки
      </Button>
    </Modal>
  );
};
