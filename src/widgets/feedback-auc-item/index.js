import React, { useEffect, useState } from 'react';

import cls from './feedback.module.scss';

import { Caption, Title2, Title3, Title4 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';

import ico2Svg from '../../shared/assets/test-content/ico2-blue.svg';

import foto from 'shared/assets/test-content/foto.png';
import { convertDate } from 'shared/utils';
import { ModalBetLot } from 'widgets/modals/modal-bet-lot';
import { useBetAucLot } from 'widgets/auctions/model';
import { useParams } from 'react-router';

export const FeedBackAucItem = props => {
  //   console.log(props.is_own);
  const params = useParams();
  const { isOpen, setIsOpen, betLot } = useBetAucLot(params.id, props?.id, props?.bettor?.id);
  return (
    <>
      <div className={cls.container}>
        <div className={cls.top}>
          <div className={cls.left}>
            <img className={cls.picture} src={props?.bettor?.avatar} alt="userFoto"></img>
            <span className={cls.userNikname}>{props?.bettor?.username}</span>
            <Title4 className={cls.userName}>{props?.bettor?.fio}</Title4>
          </div>
          <div className={cls.right}>
            <>
              <span className={cls.tit}>Предложенная ставка:</span>
              <span className={cls.price}>{props?.bet_amount}</span>
            </>
            {/* {props.is_own ? (
              <ul className={cls.info}>
                <li>
                  <span className={cls.tit}>Срок:</span>
                  <span className={cls.data}>день</span>
                </li>
                <li>
                  <span className={cls.tit}>Стоимость:</span>
                  <span className={cls.data}>780 БиТ</span>
                </li>
              </ul>
            ) : (
              <>
                <span className={cls.tit}>Предложенная ставка:</span>
                <span className={cls.price}>{props?.bet_amount}</span>
              </>
            )} */}
          </div>
        </div>
        <div className={cls.body}>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id lacus faucibus quam in consectetur
            sagittis eu tellus. Commodo augue tristique ut ut. Commodo velit morbi quis pellentesque. Lacus eu quis
            consectetur platea enim amet risus. Lacus, amet lorem tristique magna. Faucibus cras tempus ac sit. Sem
            congue nulla volutpat cursus. Et ultricies ultricies pellentesque lacus, sem neque ac arcu.
          </p> */}
        </div>
        <div className={cls.controls}>
          {/* {props.is_own ? (
            <>
              <Button
                onClick={() => setIsOpen(true)}
                size={ButtonSizes.small}
                type={ButtonTypes.primary}
                className={[cls.btn].join(' ')}
              >
                Совершить продажу
              </Button>
              <div className={cls.icons}>
                <ul>
                  <li>
                    <div className={cls.icons__item}>
                      <img src={ico2Svg} alt="ico2" />
                    </div>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <></>
          )} */}
          {/* {props.is_own ? (
            <Button size={ButtonSizes.small} type={ButtonTypes.primary} className={[cls.btn].join(' ')}>
              Выбрать участика
            </Button>
          ) : (
            <>
              <Button size={ButtonSizes.small} type={ButtonTypes.primary} className={[cls.btn].join(' ')}>
                Совершить продажу
              </Button>
              <div className={cls.icons}>
                <ul>
                  <li>
                    <div className={cls.icons__item}>
                      <img src={ico2Svg} alt="ico2" />
                    </div>
                  </li>
                </ul>
              </div>
            </>
          )} */}

          <span className={cls.date}>{convertDate(props?.created_at)}</span>
        </div>
        <ModalBetLot price={props?.bet_amount} isOpen={isOpen} setIsOpen={setIsOpen} acceptClick={betLot} />
      </div>
    </>
  );
};
