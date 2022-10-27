import React, { useEffect, useState } from 'react';

import cls from './auction.module.scss';

import { Title3 } from 'shared/ui/typography';

import { useAucItem, useCloseAucLot } from './model';
import { useNavigate, useParams } from 'react-router';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { useSelector } from 'react-redux';
import { AucLotInfo } from 'widgets/auc-lot-info';
import { FeedBackAucItem } from 'widgets/feedback-auc-item';
import { ModalRedemptionLot } from 'widgets/modals/modal-redemption-lot';

export const PageAuction = () => {
  const params = useParams();
  const { state, history, getItemById, getBetHistoryById } = useAucItem(params.id);

  const userId = useSelector(state => state.userReducer.user.pk);
  const is_own = state?.main_author?.id === userId;
  // console.log(userId, state?.main_author?.id);

  useEffect(() => {
    getItemById();
    getBetHistoryById();
  }, []);

  return (
    <>
      <ButtonActionsPanel
        is_own={is_own}
        lot_id={params.id}
        redemption_price={state.redemption_price}
        getBetHistoryById={getBetHistoryById}
      />
      <AucLotInfo {...state} />
      <div className={cls.feedBack}>
        <div className={cls.top}>
          <Title3 className={cls.title}>Отклики участников</Title3>
          <div className={cls.count}>
            Общее количество:<span className={cls.num}>{history.length}</span>
          </div>
        </div>
        <div className={cls.body}>
          {history.length > 0 ? (
            history.map(item => <FeedBackAucItem key={item.id} is_own={is_own} {...item} />)
          ) : (
            <>Нет откликов</>
          )}
        </div>
      </div>
    </>
  );
};

const ButtonActionsPanel = ({ is_own, lot_id, redemption_price, getBetHistoryById }) => {
  const navigate = useNavigate();
  const [isOpen, setisOpen] = useState(false);
  const { closeLot } = useCloseAucLot(lot_id);
  const subscription = useSelector(state => state.userReducer.user.subscription);

  return (
    <div className={cls.btnsWrapper}>
      <Button
        size={ButtonSizes.small}
        type={ButtonTypes.outline}
        onClick={() => {
          navigate('/auctions');
        }}
        className={cls.btn}
      >
        Вернуться назад
      </Button>

      {!subscription || subscription?.level === 'BASE' ? (
        <></>
      ) : is_own ? (
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.outline}
          onClick={() => {
            closeLot();
          }}
          className={cls.btn}
        >
          Снять лот с аукциона
        </Button>
      ) : (
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.outline}
          onClick={() => {
            setisOpen(true);
          }}
          className={cls.btn}
        >
          Выкупить лот
        </Button>
      )}

      <ModalRedemptionLot
        getBetHistoryById={getBetHistoryById}
        isOpen={isOpen}
        setIsOpen={setisOpen}
        lot_id={lot_id}
        redemption_price={redemption_price}
      />
    </div>
  );

  return;
};
