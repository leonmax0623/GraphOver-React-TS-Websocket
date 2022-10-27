import React from 'react';

import cls from './styles.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';
import { Radio } from 'shared/ui/radio';

import whatsapp from 'shared/assets/test-content/whatssapp.svg';
import vk from 'shared/assets/test-content/vk.svg';
import youtube from 'shared/assets/test-content/youtube.svg';
import { useSocials } from './model';

export const Modal7 = ({ isOpen, setIsOpen, socials, socialsState, setsocialsState, handleAccept }) => {
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Ссылки на соц.сеть</Title3>
      {socials?.map(s => (
        <div key={s.id} className={cls.inputWrapper}>
          <img className={cls.icon} src={s?.image} alt={s.name} />

          <TextInput
            className={cls.textInput}
            placeholder="https://site.ru"
            value={(socialsState[s.name] && socialsState[s.name].url) || ''}
            onChange={e => setsocialsState({ ...socialsState, [s.name]: { social_id: s.id, url: e.target.value } })}
          />
        </div>
      ))}

      <Button
        size={ButtonSizes.medium}
        type={ButtonTypes.primary}
        onClick={() => {
          handleAccept();
          setIsOpen(false);
        }}
        className={cls.btn}
      >
        Сохранить
      </Button>
    </Modal>
  );
};
