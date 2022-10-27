import React, { useEffect, useState } from 'react';
import { Title3, Title5 } from 'shared/ui/typography';
import cls from './performer.module.scss';

import clock from 'shared/assets/test-content/clock.svg';
import check from 'shared/assets/test-content/check.svg';
import basket from 'shared/assets/test-content/trash-2.svg';
import edit from 'shared/assets/test-content/edit.svg';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import classNames from 'classnames';
import { convertDateMn } from 'shared/utils';
import { usePerformer } from './model';

export const Performer = ({ is_own, title, end_date, status, className, order_id, executor_id }) => {
  const { work, acceptWork, setWorkText, sendSubmitWork, saveWork, getWork } = usePerformer(order_id);
  const [isedit, setisedit] = useState(false);

  useEffect(() => {
    getWork(order_id);
  }, []);

  useEffect(() => {
    if (!isedit && !is_own) saveWork();
  }, [isedit]);

  return (
    <div className={[cls.container, className].join(' ')}>
      <div className={cls.head}>
        <Title3 className={cls.title}>Работа исполнителя</Title3>
        {!is_own && (
          <div className={cls.icons}>
            <div className={classNames(cls.icons__item, { [cls.check]: isedit })} onClick={() => setisedit(!isedit)}>
              <img src={isedit ? check : edit} alt="check" />
            </div>
            {/* <div className={cls.icons__item}>
              <img src={basket} alt="basket" />
            </div> */}
          </div>
        )}
      </div>
      <div className={cls.body}>
        <Title5 className={cls.title}>{title}</Title5>
        {isedit && !is_own ? (
          <textarea type="text" value={work.content} onChange={e => setWorkText(e.target.value)} />
        ) : (
          <p>{work.content}</p>
        )}
      </div>
      <div className={cls.controls}>
        <div className={cls.time}>
          <img className={cls.icon} src={clock} alt="clock" />
          <span className={cls.tit}>Завершение работы:</span>
          <span className={cls.data}>{convertDateMn(end_date)}</span>
        </div>
        <div className={cls.btns}>
          {/* <Button type={ButtonTypes.primary} size={ButtonSizes.small} className={cls.btn}>
            Сохранить работу и выйти
          </Button> */}
          {is_own ? (
            status === 'on review' && (
              <Button type={ButtonTypes.primary} size={ButtonSizes.small} className={cls.btn} onClick={acceptWork}>
                Принять работу
              </Button>
            )
          ) : (
            <Button type={ButtonTypes.primary} size={ButtonSizes.small} className={cls.btn} onClick={sendSubmitWork}>
              Отправить на приемку
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

