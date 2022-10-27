import React, { useEffect, useState } from 'react';

import cls from './order-item.module.scss';

import { Caption, Title4, Title5 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';

import icon2 from 'shared/assets/test-content/ico2.svg';
import { convertDate, convertDateMn } from 'shared/utils';
import { ModalOrder } from 'widgets/modals/modal-order';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

export const OrderItem = ({ client = false, ...props }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const topicName = props.topic ? Object.values(props.topic)[0] : '';
  const complexity =
    props?.complexity === 'EASY'
      ? 'Легкий'
      : props?.complexity === 'MED'
      ? 'Средний'
      : props?.complexity === 'DIF'
      ? 'Сложный'
      : props?.complexity === 'VDIF'
      ? 'Оч.сложный'
      : '';

  const userId = useSelector(state => state.userReducer.user.pk);
  const is_own = props?.customer?.id === userId;

  const navigate = useNavigate();

  return (
    <div className={cls.item} onClick={() => navigate(`/orders/${props?.id}`)}>
      <div className={cls.top}>
        <div className={cls.captions}>
          <Caption className={cls.date}>{convertDate(props?.created_at)}</Caption>
          <Title4 className={cls.title}>{props?.title}</Title4>
        </div>

        <div className={cls.categories}>
          {
            <span
              className={classNames(cls.status, {
                [cls.published]: props?.status === 'published',
                [cls.work]: props?.status === 'in work',
                [cls.completed]: props?.status === 'completed',
                [cls.review]: props?.status === 'on review',
              })}
            >
              {props?.status === 'in work'
                ? 'В работе'
                : props?.status === 'published'
                ? 'Опубликован'
                : props?.status === 'on review'
                ? 'Ожидает приемки'
                : 'Завершен'}
            </span>
          }

          {complexity && <span className={cls.complexity}>{complexity}</span>}
          <span className={cls.txt}>{topicName}</span>
        </div>
      </div>
      <div className={cls.body}>
        <p>{props?.description}</p>
      </div>
      <div className={cls.controls}>
        <Button
          size={ButtonSizes.small}
          onClick={() => setIsOpenModal(true)}
          type={ButtonTypes.primary}
          className={[cls.btn].join(' ')}
        >
          {!is_own && props?.status === 'published' ? 'Откликнуться' : 'Просмотреть'}
        </Button>
        <ul className={cls.info}>
          <li>
            <img src={props?.customer?.avatar} />
            <span className={cls.data}>{props?.customer?.fio}</span>
          </li>
          <li>
            <span className={cls.tit}>Выполнить до:</span>
            <span className={cls.data}>{convertDate(props?.max_writing_time)}</span>
          </li>
          <li>
            <span className={cls.tit}>Стоимость:</span>
            <span className={cls.data}>{props?.price} БиТ</span>
          </li>
        </ul>
      </div>
      {/* <ModalOrder isOpen={isOpenModal} setIsOpen={setIsOpenModal} order_id={props?.id} /> */}
    </div>
  );
};
