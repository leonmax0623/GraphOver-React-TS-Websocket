/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import cls from './content.module.scss';

import avatar from 'shared/assets/test-content/foto.png';
import iconAdd from 'shared/assets/test-content/add.svg';
import { Title3, Title4 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Tabs } from 'shared/ui/tabs';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export const ChapterSidebar = ({ structure, chapterId, currentChapter, branch, setChapterId }) => {
  let min_br_number = Math.min(...structure.filter(l => l.branch === branch).map(l => l.number));
  let branch_list = [];

  structure.forEach(l => {
    if (l.number < min_br_number) {
      branch_list.push(l);
    } else {
      if (l.branch === branch) branch_list.push(l);
    }
  });

  return (
    <div className={cls.listStory}>
      <ul>
        {branch_list.map(item => {
          if (item.winner_graph)
            return (
              <li key={item.id} onClick={() => setChapterId(item.winner_graph.id)}>
                <a className={classNames(cls.caption, { [cls.active]: chapterId === item.winner_graph.id })}>
                  <span className={cls.cap}>
                    Граф {item.number}. {item.winner_graph ? item.winner_graph.title : 'В написании'}
                  </span>
                  {item?.winner_graph?.user && (
                    <Link to={`/profile/${item?.winner_graph?.user.id}`} className={cls.auth}>
                      Автор:
                      <img src={item?.winner_graph?.user?.avatar} />
                    </Link>
                  )}
                </a>
              </li>
            );
        })}

        {branch_list.filter(i => i.winner_graph).length === 0 && <li>Сюжет находится в написании</li>}
        {/* <li>
          <a className={cls.caption}>
            <span className={cls.cap}>Граф.4 Заголовок</span>
            <span className={cls.auth}>
              Автор:
              <img src={avatar} alt={avatar} />
            </span>
          </a>
          <div className={cls.icons__item}>
            <img src={iconAdd} alt="iconAdd" />
          </div>
        </li> */}
      </ul>
    </div>
  );
};
