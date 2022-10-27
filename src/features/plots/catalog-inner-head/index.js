import React, { useEffect, useState } from 'react';
import cls from './head.module.scss';

import foto from 'shared/assets/test-content/plot-card-cover.jpg';
import clock from 'shared/assets/test-content/clock.svg';
import avatar from 'shared/assets/test-content/foto.png';
import heart from 'shared/assets/test-content/heart.svg';
import { Title3, Title4 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { ViewsCount } from 'entities/plots/catalog-card/ui/views-count';
import { convertDate, convertDateMn } from 'shared/utils';
import classNames from 'classnames';
import { ModalVoteRate } from 'widgets/modals/modal-vote-rate';
import { AuthorList } from 'widgets/authors-list';
import { useSelector } from 'react-redux';

export const InnerCatalogHead = ({ state, inner = false, setTaskShow, isTaskShow, handleRateChange, updateState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDrop, setOpenDrop] = useState(false);
  const userId = useSelector(state => state.userReducer.user.pk);
  const is_own = userId === state?.owner?.id;

  let author_list_actions = [];
  if (inner) {
    // 2 внутренняя
    if (is_own) {
      author_list_actions = ['join-confirm', 'view', 'zaloba'];
      if (state?.mode === 'PROJECT') author_list_actions = [...author_list_actions, 'append-friend'];
    } else author_list_actions = ['add-friend', 'view'];
  } else {
    // 1 внутренняя
    author_list_actions = ['add-friend', 'view'];
    if (is_own) {
    }
  }

  return (
    <div className={cls.head}>
      <div className={cls.foto} style={{ backgroundImage: `url(${state?.avatar})` }}>
        <div className={cls.list}>
          <div className={cls.item}>
            <div className={cls.category}>{state?.topic_name}</div>
          </div>
          <div className={cls.item}>
            {/* <span className={cls.favorite}>
              <img src={heart} alt={'heart'} />
            </span> */}
          </div>
          <div className={cls.item}>
            <div className={cls.rating}>
              <span className={cls.num}>{state?.rating_avg}</span>
            </div>
          </div>
          <div className={cls.item}>
            <div className={cls.text}>
              <span className={cls.tit}>Графов:</span>
              <span className={cls.val}>{state?.graphs_count}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={cls.owner}>
        <div className="">
          {state.mode !== 'ORDINARY' && (
            <Button className={[cls.btn, cls.btnAccent, cls.plank].join(' ')} size={ButtonSizes.small}>
              {state.mode === 'PROJECT' ? 'Проект' : state.mode === 'SCENARIO' ? 'Сценарий' : 'Приватный'}
            </Button>
          )}
          {inner ? (
            <div className={cls.timer}>
              <img className={cls.icon} src={clock} alt={'icon'} />
              <span className={cls.cap}>Завершение написания Граф:</span>
              <span className={cls.time}>{convertDateMn(state?.active_to)}</span>
            </div>
          ) : (
            <div className={cls.view}>
              <ViewsCount>{state?.view_count}</ViewsCount>
            </div>
          )}
        </div>

        <div className={cls.author}>
          Владелец сюжета:<a className={cls.link}>{state?.owner?.username}</a>
        </div>
        <Title3 className={cls.title}>{state?.name}</Title3>
        <ul className={cls.desc}>
          <li>
            Начало:
            <span className={cls.data}>{convertDate(state?.created_at)}</span>
          </li>
          {/* <li>
            Завершение::
            <span className={cls.data}>2 дня</span>
          </li> */}
        </ul>
        <p className={cls.info}>
          {state?.info}
          {/* <a className={cls.link}>читать написанные графы</a> */}
        </p>
        <div className={cls.controls}>
          {inner && (
            <>
              {!state.rating_voted && (
                <Button
                  className={cls.btn}
                  type={ButtonTypes.primary}
                  size={ButtonSizes.small}
                  onClick={() => setIsOpen(true)}
                >
                  Оценить сюжет
                </Button>
              )}
              {!isTaskShow && (
                <Button
                  className={cls.btn}
                  type={ButtonTypes.outline}
                  size={ButtonSizes.small}
                  onClick={() => setTaskShow(true)}
                >
                  Смотреть задачи
                </Button>
              )}
            </>
          )}

          <div
            className={classNames(cls.status, {
              // [cls.wait]: state?.status === 'E',
              [cls.wait]: state?.vote_status === 'V',
              [cls.close]: state?.status === 'C',
            })}
          >
            {state?.status === 'C' ? 'Сюжет закрыт' : state?.vote_status === 'V' ? 'На голосовании' : ''}
          </div>
          <div
            className={cls.authors}
            onClick={e => {
              e.preventDefault();
              setOpenDrop(!isOpenDrop);
            }}
          >
            <span className={cls.tit}>Авторы сюжета:</span>
            {/* <span className={cls.num}>2 человека</span> */}
            <div className={cls.peoples}>
              {state?.authors_list?.map(a => (
                <div className={cls.circle} key={a.id}>
                  <img src={a?.avatar} alt={'ava'} />
                </div>
              ))}

              {/* <div className={[cls.circle, cls.last].join(' ')}>
                <img src={avatar} alt={'ava'} />
              </div> */}
            </div>
            <AuthorList
              list={state?.authors_list}
              isOpenDrop={isOpenDrop}
              setOpen={setOpenDrop}
              updateState={updateState}
              actionCases={author_list_actions}
              append
            />
          </div>
        </div>
      </div>
      {isOpen && <ModalVoteRate isOpen={isOpen} setIsOpen={setIsOpen} handleAccept={handleRateChange} />}
    </div>
  );
};
