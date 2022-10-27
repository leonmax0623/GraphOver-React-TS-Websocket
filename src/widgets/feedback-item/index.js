import React, { useEffect, useState } from 'react';

import cls from './feedback.module.scss';

import { Caption, Title2, Title3, Title4 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';

import ico2Svg from '../../shared/assets/test-content/ico2-blue.svg';

import foto from 'shared/assets/test-content/foto.png';
import { convertDate } from 'shared/utils';
import { useSelectExecutor } from './model';
import { Modal20 } from 'widgets/modals/modal-select-worker';
import moment from 'moment';

export const FeedBackItem = props => {
  //   console.log(props.is_own);
  const { selectExec, isOpen, setIsOpen } = useSelectExecutor(
    props?.order_id,
    props?.user?.id,
    props?.price,
    props?.writing_time,
    props?.getItemById,
  );
  const wr_time = new Date(props?.writing_time);
  const created_at = new Date(props?.created_at);
  const time_diff = Math.abs(wr_time - created_at);
  const time_wr1 = new moment.duration(time_diff);
  // console.log(time_wr1.asDays());
  return (
    <>
      <div className={cls.container}>
        <div className={cls.top}>
          <div className={cls.left}>
            <img className={cls.picture} src={'https://graphover.ru' + props?.user?.avatar} alt="userFoto"></img>
            <span className={cls.userNikname}>{props?.user?.username}</span>
            <Title4 className={cls.userName}>{props?.user?.fio}</Title4>
          </div>
          <div className={cls.right}>
            {/* {!props.is_own ? ( */}
            {1 ? (
              <ul className={cls.info}>
                <li>
                  <span className={cls.tit}>Срок:</span>
                  <span className={cls.data}>{convertDate(props?.writing_time)}</span>
                </li>
                <li>
                  <span className={cls.tit}>Стоимость:</span>
                  <span className={cls.data}>{props?.price} БиТ</span>
                </li>
              </ul>
            ) : (
              <>
                <span className={cls.tit}>Стоимость:</span>
                <span className={cls.price}>{props?.price}</span>
              </>
            )}
          </div>
        </div>
        <div className={cls.body}>
          <p>{props?.annotation} </p>
        </div>
        <div className={cls.controls}>
          {props.is_own && props?.status !== 'completed' ? (
            <>
              <Button
                size={ButtonSizes.small}
                type={ButtonTypes.primary}
                className={[cls.btn].join(' ')}
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Выбрать участника
              </Button>
            </>
          ) : (
            <></>
          )}

          <span className={cls.date}>{convertDate(props?.created_at)}</span>
        </div>
        <Modal20
          respond_id={props?.id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectExec={selectExec}
          order_price={props?.price}
        />
      </div>
    </>
  );
};
