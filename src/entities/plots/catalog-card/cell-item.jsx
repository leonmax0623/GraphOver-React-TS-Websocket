import React, { useState } from 'react';
import cls from './plot-card.module.scss';
import { Card, ShadowSizes } from 'shared/ui/card';
import PlotCardCover from './ui/cover-area';
import { Title3, Title4, Title5 } from 'shared/ui/typography';
import { Tag } from 'shared/ui/tag';
import { Rating } from 'shared/ui/rating';
import { LikeButton } from './ui/like-button';
import { AvatarList } from 'shared/ui/avatar-list';
import { AvatarRound } from 'shared/ui/avatar-round';
import { declOfNum } from 'shared/lib/declOfNum';
import { Date } from './ui/date';
import { ViewsCount } from './ui/views-count';
import { convertDateMn } from 'shared/utils';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { StatusGlobal } from 'shared/ui/statusglobal';
import { useSelector } from 'react-redux';

import ava from 'shared/assets/test-content/foto.png';
import { BtnCloseModal } from 'shared/ui/modal/btnclose-modal';
import arrow from 'shared/assets/test-content/arrow_right.svg';
import iconDelete from 'shared/assets/test-content/icdelete.svg';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { AuthorList } from 'widgets/authors-list';

const PlotCardCell = ({
  author,
  avatar,
  topic_name: tag,
  user_favorite,
  rating_avg: rating,
  grafs_count,
  created_at: startDate,
  active_to: endDate,
  id,
  view_count,
  name,
  mode,
  status,
  small_info,
  owner,
  authors_list: authors,
  changeItem,
  overhidden = true,
}) => {
  const [isOpenDrop, setOpen] = useState(false);

  const userId = useSelector(state => state.userReducer.user.pk);
  const isAuthor = Object.keys(authors)
    .map(i => authors[i].id)
    .includes(userId);

  return (
    <Card
      className={classNames(cls.container, cls.cell, cls.overhidden)}
      shadowSize={ShadowSizes.small}
      link={`/plots/${id}`}
    >
      <div className={cls.coverArea}>
        <PlotCardCover
          className={classNames(cls.cover, cls.covercell)}
          cover={avatar}
          leftTop={tag && <Tag>{tag}</Tag>}
          leftBottom={rating && <Rating>{rating}</Rating>}
          rightTop={<LikeButton id={id} user_favorite={user_favorite} changeItem={changeItem} />}
          rightBottom={grafs_count && <span className={cls.graphsCount}>Графов: {grafs_count}</span>}
        />
      </div>
      <div className={cls.main}>
        <div className={cls.top}>
          <div className={cls.topLeft}>
            <Date className={cls.date} label={'Начало:'} value={convertDateMn(startDate)} />
            <Date label={'Завершение:'} value={convertDateMn(endDate)} />
          </div>
          <div className={cls.topRight}>
            <div className={cls.controls}>
              {mode !== 'ORDINARY' && (
                <Button className={[cls.btn, cls.btnWhite].join(' ')} size={ButtonSizes.small}>
                  {mode === 'PROJECT' ? 'Проект' : mode === 'SCENARIO' ? 'Сценарий' : ''}
                </Button>
              )}
              {isAuthor && (
                <Button className={[cls.btn].join(' ')} size={ButtonSizes.small} type={ButtonTypes.primary}>
                  Автор сюжета
                </Button>
              )}
              <ViewsCount>{view_count}</ViewsCount>
            </div>
          </div>
        </div>

        <div className={cls.middle}>
          <Title4 className={cls.title}>{name}</Title4>
          <p className={cls.excerpt}>{small_info}</p>
        </div>

        <div className={cls.bottom}>
          {/* <StatusGlobal status={status} /> */}
          {/* {author && <StatusGlobal />} */}

          <div className={cls.authors}>
            <span className={cls.tit}>Владелец:</span>
            <span className={cls.num}>{owner?.username}</span>
            <div className={cls.peoples}>
              <div className={cls.circle}>
                <img src={owner?.avatar} alt={'ava'} />
              </div>
            </div>
          </div>
          <div
            className={cls.authors}
            onClick={e => {
              e.preventDefault();
              setOpen(!isOpenDrop);
            }}
          >
            <span className={cls.tit}>Авторы сюжета:</span>
            {/* <span className={cls.num}>2 человека</span> */}
            <div className={cls.peoples}>
              {authors.slice(0, 2).map(a => (
                <div className={cls.circle}>
                  <img src={a.avatar} alt={'ava'} />
                </div>
              ))}
            </div>
            <AuthorList list={authors} isOpenDrop={isOpenDrop} setOpen={setOpen} />
          </div>

          {/* {owner && (
            <AvatarList
              className={cls.owner}
              title={'Владелец:'}
              subtitle={`${owner.username}`}
              items={[
                <AvatarRound
                  image={owner.avatar}
                  alt={`Аватар пользователя ${owner.username}}`}
                  size={34}
                  withBorder={true}
                />,
              ]}
            />
          )}
          <AvatarList
            title={'Авторы сюжета:'}
            subtitle={`${authors.length} ${declOfNum(authors.length, ['автор', 'автора', 'авторов'])}`}
            items={authors.map(item => (
              <AvatarRound
                image={item.avatar}
                alt={`Аватар пользователя ${item.firstName} ${item.secondName}`}
                size={34}
                withBorder={true}
              />
            ))}
          /> */}
        </div>
      </div>
    </Card>
  );
};

export default PlotCardCell;
