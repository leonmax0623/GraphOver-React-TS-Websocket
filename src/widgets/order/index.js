import React, { useEffect, useRef, useState } from 'react';

import cls from './auction.module.scss';

import { Title3 } from 'shared/ui/typography';

import { useAucItem, useCloseOrder, useOrderItem } from './model';
import { useNavigate, useParams } from 'react-router';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { useSelector } from 'react-redux';
import { AucLotInfo } from 'widgets/auc-lot-info';
import { FeedBackAucItem } from 'widgets/feedback-auc-item';
import { ModalRedemptionLot } from 'widgets/modals/modal-redemption-lot';
import { OrderInfo } from 'widgets/order-info';
import { ModalOrder } from 'widgets/modals/modal-order';
import { FeedBackItem } from 'widgets/feedback-item';

import { MessageWriteTextArea } from 'widgets/message-write-textarea';
import { Message } from 'widgets/message';
import { Answer } from 'widgets/answer';
import { Modal15 } from 'widgets/modals/modal15';
import { useExecutorAcceptOrReject } from 'entities/order-executor-accept-or-reject/model';
import { useChat, useWebSocketChat } from 'app/hooks/chat';
import { Performer } from 'widgets/performer';
import { Tooltip } from 'chart.js';

const ChatBlock = ({ to_id }) => {
  const userId = useSelector(state => state.userReducer.user.pk);

  const ws = useRef({});
  const { getMessages, messages, sendMessage, addMessage, newComment, setNewComment } = useChat(
    userId,
    to_id,
    'orders',
  );

  const {} = useWebSocketChat(userId, ws, addMessage, messages);

  useEffect(() => {
    if (userId && to_id) getMessages();
  }, [userId, to_id]);

  return (
    <div className={cls.chats}>
      <MessageWriteTextArea handleClick={sendMessage} newComment={newComment} setNewComment={setNewComment} />
      {messages.map(m =>
        m?.to_user?.id === userId ? (
          <Message key={m?.id} className={cls.message} time={m?.timestamp} user={m?.to_user} text={m.body}>
            {/* {m.body} */}
          </Message>
        ) : (
          <Answer key={m?.id} time={m?.timestamp} className={cls.answer} text={m.body}>
            {/* {m.body} */}
          </Answer>
        ),
      )}
    </div>
  );
};

export const PageOrder = () => {
  const params = useParams();

  const { state, history, getItemById, getRespondsById } = useOrderItem(params.id);
  const { selectChoose, isOpen, setIsOpen } = useExecutorAcceptOrReject(params.id);

  const userId = useSelector(state => state.userReducer.user.pk);
  const is_own = state?.customer?.id === userId;
  // console.log(userId, state?.main_author?.id);
  const executor_id = state?.executor?.id;
  useEffect(() => {
    getItemById();
    getRespondsById();
  }, []);

  return (
    <>
      <ButtonActionsPanel
        is_own={is_own}
        order_id={params.id}
        status={state.status}
        getRespondsById={getRespondsById}
      />
      <OrderInfo {...state} />
      {state?.status === 'in work' || state?.status === 'on review' ? (
        // {state?.status === 'in_work' ? (
        executor_id === userId || state?.customer?.id === userId ? (
          <>
            <ChatBlock to_id={is_own ? executor_id : state?.customer?.id} />
            <Performer
              is_own={is_own}
              order_id={params.id}
              executor_id={executor_id}
              title={state?.title}
              status={state?.status}
              end_date={state?.max_writing_time}
            />
          </>
        ) : (
          <div className={cls.feedBack}>
            <div className={cls.top}>
              <Title3 className={cls.title}>Отклики участников</Title3>
              <div className={cls.count}>
                Общее количество:<span className={cls.num}>{history.length}</span>
              </div>
            </div>
            <div className={cls.body}>
              {history?.length > 0 ? (
                history
                  ?.filter(i => i.user.id === executor_id)
                  ?.map(item => (
                    <FeedBackItem
                      getRespondsById={getRespondsById}
                      getItemById={getItemById}
                      key={item.id}
                      is_own={is_own}
                      {...item}
                    />
                  ))
              ) : (
                <>Нет откликов</>
              )}
            </div>
          </div>
        )
      ) : state?.status === 'completed' ? (
        state?.customer?.id === userId ? (
          <>
            <ChatBlock to_id={is_own ? executor_id : state?.customer?.id} />
            <Performer
              is_own={is_own}
              order_id={params.id}
              executor_id={executor_id}
              title={state?.title}
              status={state?.status}
              end_date={state?.max_writing_time}
            />
          </>
        ) : (
          <div className={cls.feedBack}>
            {console.log(history?.filter(i => i.user.id === executor_id))}
            <div className={cls.top}>
              <Title3 className={cls.title}>Отклик исполнителя</Title3>
            </div>
            <div className={cls.body}>
              {history?.length > 0 ? (
                history
                  ?.filter(i => i.user.id === executor_id)
                  ?.map(item => (
                    <FeedBackItem
                      getRespondsById={getRespondsById}
                      getItemById={getItemById}
                      key={item.id}
                      status="completed"
                      is_own={is_own}
                      {...item}
                    />
                  ))
              ) : (
                <>Нет откликов</>
              )}
            </div>
          </div>
        )
      ) : (
        <div className={cls.feedBack}>
          <div className={cls.top}>
            <Title3 className={cls.title}>Отклики участников</Title3>
            <div className={cls.count}>
              Общее количество:<span className={cls.num}>{history?.length}</span>
            </div>
          </div>
          <div className={cls.body}>
            {history?.map(item => (
              <FeedBackItem
                getRespondsById={getRespondsById}
                getItemById={getItemById}
                key={item.id}
                is_own={is_own}
                {...item}
              />
            ))}
          </div>
        </div>
      )}
      <Modal15
        title={`Вас назначили исполнителем в заказ ${state?.title}`}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        cancelText={'Отказаться'}
        acceptText={'Принять'}
        handleReject={() => selectChoose(false)}
        handleAccept={() => selectChoose(true)}
      />
    </>
  );
};

const ButtonActionsPanel = ({ is_own, order_id, getRespondsById, status }) => {
  const navigate = useNavigate();
  const [isOpen, setisOpen] = useState(false);
  const { closeOrder } = useCloseOrder(order_id);
  const subscription = useSelector(state => state.userReducer.user.subscription);

  return (
    <div className={cls.btnsWrapper}>
      <Button
        size={ButtonSizes.small}
        type={ButtonTypes.outline}
        onClick={() => {
          navigate('/orders');
        }}
        className={cls.btn}
      >
        Вернуться назад
      </Button>

      {is_own ? (
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.outline}
          onClick={() => {
            closeOrder();
          }}
          className={cls.btn}
        >
          Удалить заказ
        </Button>
      ) : status === 'published' ? (
        !subscription || subscription?.level === 'BASE' ? (
          <div className="">
            <Button size={ButtonSizes.small} type={ButtonTypes.disabled} disabled className={cls.btn}>
              Откликнуться
            </Button>
          </div>
        ) : (
          <Button
            size={ButtonSizes.small}
            type={ButtonTypes.outline}
            onClick={() => {
              setisOpen(true);
            }}
            className={cls.btn}
          >
            Откликнуться
          </Button>
        )
      ) : (
        <></>
      )}
      {isOpen && (
        <ModalOrder getRespondsById={getRespondsById} isOpen={isOpen} setIsOpen={setisOpen} order_id={order_id} />
      )}
      {/* <ModalRedemptionLot isOpen={isOpen} setIsOpen={setisOpen} lot_id={lot_id} redemption_price={redemption_price} /> */}
    </div>
  );
};
