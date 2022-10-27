import React from 'react';

import cls from './styles.module.scss';

import { Caption, Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';

export const Modal21 = ({ isOpen, setIsOpen }) => {
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Работа исполнителя</Title3>
      <div className={cls.workWrapper}>
        <div className={cls.work}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In imperdiet et fames nunc etiam sed adipiscing.
            Auctor turpis id feugiat dictumst sed sit. Egestas pellentesque urna morbi eu libero penatibus. Amet neque,
            maecenas bibendum massa porta turpis duis. Odio egestas commodo non, facilisis massa ultrices. Sit ut diam
            habitasse luctus. Mi morbi dolor lectus in. Tellus arcu gravida hac quis egestas. Urna sed facilisis ut
            commodo. Ultrices netus nunc elit accumsan vestibulum, quis at. Mattis morbi augue auctor eget. Dignissim
            enim, commodo enim ut. Ipsum sit dui platea non. Felis sit pharetra sit eros.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. In imperdiet et fames nunc etiam sed adipiscing. Auctor turpis id feugiat
            dictumst sed sit. Egestas pellentesque urna morbi eu libero penatibus. Amet neque, maecenas bibendum massa
            porta turpis duis. Odio egestas commodo non, facilisis massa ultrices. Sit ut diam habitasse luctus. Mi
            morbi dolor lectus in. Tellus arcu gravida hac quis egestas. Urna sed facilisis ut commodo. Ultrices netus
            nunc elit accumsan vestibulum, quis at. Mattis morbi augue auctor eget. Dignissim enim, commodo enim ut.
            Ipsum sit dui platea non. Felis sit pharetra sit eros.Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. In imperdiet et fames nunc etiam sed adipiscing. Auctor turpis id feugiat dictumst sed sit. Egestas
            pellentesque urna morbi eu libero penatibus. Amet neque, maecenas bibendum massa porta turpis duis. Odio
            egestas commodo non, facilisis massa ultrices. Sit ut diam habitasse luctus. Mi morbi dolor lectus in.
            Tellus arcu gravida hac quis egestas. Urna sed facilisis ut commodo. Ultrices netus nunc elit accumsan
            vestibulum, quis at. Mattis morbi augue auctor eget. Dignissim enim, commodo enim ut. Ipsum sit dui platea
            non. Felis sit pharetra sit eros.
          </p>
        </div>
      </div>
      <div className={cls.controls}>
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.outline}
          onClick={() => {
            setIsOpen(false);
          }}
          className={[cls.btn].join(' ')}
        >
          Отправить на корректировку
        </Button>
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpen(false);
          }}
          className={[cls.btn].join(' ')}
        >
          Принять работу
        </Button>
      </div>
    </Modal>
  );
};
