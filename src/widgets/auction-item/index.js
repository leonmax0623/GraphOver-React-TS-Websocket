import { useState } from 'react';

import cls from './auction-item.module.scss';

import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Caption, Title4 } from 'shared/ui/typography';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { convertDate } from 'shared/utils';
import { ModalRedemptionLot } from 'widgets/modals/modal-redemption-lot';

export const PlotAuctionItem = props => {
  console.log("AUCTION => ", props.id)
  const [isOpen, setisOpen] = useState(false);
  const navigate = useNavigate();

  const userId = useSelector(state => state.userReducer.user.pk);
  const is_own = props?.main_author === userId;
  const subscription = useSelector(state => state.userReducer.user.subscription);

  const handleFavoriteClick = e => {
    e.preventDefault();
  };
  const openModal = e => {
    e.preventDefault();
    e.stopPropagation();
    setisOpen(true);
  };
  const handleClickLink = e => {
    navigate(`/auctions/${props?.id}`);
  };

  return (
    <>
      <div className={cls.item} onClick={handleClickLink}>
        <div className={cls.top}>
          <Caption className={cls.date}>{convertDate(props?.active_to).replace(',', '')}</Caption>
          <Title4 className={cls.title}>{props?.lot_name}</Title4>
          {/* <LikeButton id={props.id} user_favorite={user_favorite} changeItem={changeItem} /> */}
        </div>
        <div className={cls.body}>
          <p>{props?.description && 'Описание отсутствует'} </p>
        </div>
        <div className={cls.controls}>
          {is_own || !subscription || subscription?.level === 'BASE' ? (
            <div></div>
          ) : (
            <Button
              size={ButtonSizes.small}
              type={ButtonTypes.primary}
              className={[cls.btn].join(' ')}
              onClick={openModal}
            >
              Выкупить лот
            </Button>
          )}
          <ul className={cls.info}>
            <li>
              <span className={cls.tit}>Текущая ставка:</span>
              <span className={cls.data}>{props?.current_price} БиТ</span>
            </li>
            <li>
              <span className={cls.tit}>Цена выкупа:</span>
              <span className={cls.data}>{props?.redemption_price} БиТ</span>
            </li>
            <li>
              <span className={cls.tit}>Стартовая ставка:</span>
              <span className={cls.data}>{props?.start_price} БиТ</span>
            </li>
            {/* <li>
              <span className={cls.tit}>Осталось:</span>
              <span className={cls.data}>{props?.time_to_close}</span>
            </li> */}
          </ul>
        </div>
        <ModalRedemptionLot
          isOpen={isOpen}
          setIsOpen={setisOpen}
          lot_id={props?.id}
          redemption_price={props?.redemption_price}
        />
      </div>
    </>
  );
};
