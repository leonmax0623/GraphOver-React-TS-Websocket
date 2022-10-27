import React, { useState } from 'react';
import cls from './plots-catalog-author.module.scss';

import { Caption, Title2, Title3, Title5 } from 'shared/ui/typography';

import check from 'shared/assets/test-content/circle-check.svg';
import foto from 'shared/assets/test-content/foto.png';
import { FeedBackItem } from 'widgets/feedback-item';
import { OrderInfo } from 'widgets/order-info';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Message } from 'widgets/message';
import { Answer } from 'widgets/answer';
import { MessageWriteTextArea } from 'widgets/message-write-textarea';

export const PlotsCatalog2 = () => {
  return (
    <>
      <OrderInfo />
      {/* <div className={cls.jobCompleted}>
        <span className={cls.tit}>Работа завершена</span>
        <Button size={ButtonSizes.small} type={ButtonTypes.primary} className={[cls.btn].join(' ')}>
          Посмотреть результат
        </Button>
      </div> */}

      <div className={cls.chats}>
        <MessageWriteTextArea />
        <Message className={cls.message}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante scelerisque amet, dui ac purus, mauris ornare
          elementum. In elit massa dictum placerat mauris ullamcorper volutpat. Aenean.
        </Message>
        <Answer className={cls.answer}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra enim, ultrices sed venenatis. Libero in
          pellentesque leo at aliquet nibh. Nec elementum tortor non sed sit odio nulla tincidunt nec. Ultricies in
          nunc.
        </Answer>
      </div>
      <div className={cls.feedBack}>
        <div className={cls.top}>
          <Title3 className={cls.title}>Отклики участников</Title3>
          <div className={cls.count}>
            Общее количество:<span className={cls.num}>12</span>
          </div>
        </div>
        <div className={cls.body}>
          <FeedBackItem author={true} />
          <FeedBackItem author={true} />
          <FeedBackItem author={true} />
        </div>
      </div>
    </>
  );
};
