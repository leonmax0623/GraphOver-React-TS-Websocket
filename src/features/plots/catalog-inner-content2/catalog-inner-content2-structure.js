import React from 'react';
import cls from './content.module.scss';

import avatar from 'shared/assets/test-content/foto.png';
import iconAdd from 'shared/assets/test-content/add.svg';
import { Title3, Title4 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';

import iconEye from 'shared/assets/test-content/eye.svg';
import iconEdit from 'shared/assets/test-content/icedit.svg';
import iconDelete from 'shared/assets/test-content/icdelete.svg';

import like from 'shared/assets/test-content/like.svg';
import dislike from 'shared/assets/test-content/dislike.svg';

import check from 'shared/assets/test-content/check.svg';
import close from 'shared/assets/test-content/close.svg';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Tooltip } from '@mui/material';
import { useParallel, useVoteChapter } from './model';
import { VotePanel } from './vote-panel';
import { Link } from 'react-router-dom';

const StructureItem = ({
  id,
  updateState,
  chapters_list,
  winner_graph,
  number,
  can_parallel,
  setChapterId,
  chapterId,
  currentChapter,
  getChapter,
  getQuestStructure,
}) => {
  const navigate = useNavigate();
  const { id: quest_id } = useParams();

  const { parallelGraph } = useParallel(quest_id, updateState);
  const { handleVote } = useVoteChapter(quest_id, getChapter, getQuestStructure);

  if (winner_graph)
    return (
      <li onClick={() => setChapterId(winner_graph.id)}>
        <div className={cls.head}>
          <a className={classNames(cls.caption, { [cls.active]: chapterId === winner_graph.id })}>
            <span className={cls.cap}>
              Граф.{number} {winner_graph.title}
            </span>
            {/* <span className={cls.auth}>
              Автор:
              <img onClick={() => navigate(`/profile/${winner_graph.user.id}`)} src={winner_graph.user.avatar} />
            </span> */}
          </a>
          {can_parallel && (
            <div
              className={cls.icons__item}
              onClick={() => parallelGraph({ graph: id, title: 'Параллельный граф', text: 'TExt parallel' })}
            >
              <img src={iconAdd} alt="iconAdd" />
            </div>
          )}
        </div>
      </li>
    );
  // return <></>;
  if (chapters_list)
    return (
      <li className={cls.unhover}>
        <div className={cls.head}>
          <a className={cls.caption} style={{ cursor: 'unset', width: '100%' }}>
            <span className={cls.cap} style={{ cursor: 'unset' }}>
              Граф {number}. {winner_graph ? winner_graph.title : 'В написании'}
            </span>
            <ul>
              {chapters_list.length ? (
                chapters_list.map(chapt => (
                  <li
                    onClick={() => setChapterId(chapt.id)}
                    className={classNames(cls.caption, cls.parentCaption, {
                      [cls['active']]: chapt.id === currentChapter.id,
                    })}
                    key={chapt.id}
                  >
                    {chapt.role === 'E' ? (
                      <Tooltip title="Граф в стадии написания">
                        <div className={cls.head}>
                          <a className={classNames(cls.caption, { [cls.active]: chapterId === chapt.id })}>
                            <span className={cls.cap}>{chapt.title || 'Без названия'}</span>
                            <span className={cls.auth}>
                              Автор:
                              <img src={chapt?.user?.avatar} />
                              {/* <img onClick={() => navigate(`/profile/${chapt?.user?.id}`)} src={chapt?.user?.avatar} /> */}
                            </span>
                          </a>
                        </div>
                      </Tooltip>
                    ) : chapt.role === 'W' ? (
                      <Tooltip
                        title="Граф ожидает голосования"
                        sx={{
                          '& .MuiTooltip-popper': {
                            backgroundColor: '#c4c4c4',
                          },
                        }}
                      >
                        <div className={cls.head}>
                          <a className={cls.caption}>
                            <span className={cls.cap}>{chapt.title}</span>
                            <span className={cls.auth}>
                              Автор:
                              <img src={chapt?.user?.avatar} />
                              {/* <img onClick={() => navigate(`/profile/${chapt?.user?.id}`)} src={chapt?.user?.avatar} /> */}
                            </span>
                          </a>
                        </div>
                        {/* <div className={classNames(cls['chapter-status'], cls['chapter-status_wait'])}>
                        <div className={classNames(cls['chapter-status-icon'], cls['chapter-status-icon_wait'])}>
                          <HourglassBottomOutlinedIcon />
                        </div>
                        <p>{chapt.title}</p>
                        <Link
                          className={cls.avatarSidebarBox}
                          to={chapt?.user?.id === userId ? '/user-profile' : `/profile/${chapt?.user?.id}`}
                        >
                          <img src={chapt?.user?.avatar} alt="" />
                        </Link>
                      </div> */}
                      </Tooltip>
                    ) : chapt.role === 'V' || chapt.role === 'C' ? (
                      <>
                        <Tooltip title="Граф находится на голосовании">
                          <div className={cls.head}>
                            <a className={cls.caption}>
                              <span className={cls.cap}>{chapt.title}</span>
                              <span className={cls.auth}>
                                Автор варианта:
                                <Link style={{ marginLeft: 5 }} to={`/profile/${chapt?.user?.id}`}>
                                  {chapt?.user?.name}
                                </Link>
                                {/* <img src={chapt?.user?.avatar} /> */}
                                {/* <img onClick={() => navigate(`/profile/${chapt?.user?.id}`)} src={chapt?.user?.avatar} /> */}
                              </span>
                            </a>
                          </div>
                        </Tooltip>
                        {/* {console.log(chapt)} */}
                        {
                          <VotePanel
                            likeCnt={chapt?.like}
                            dislikeCnt={chapt?.dislike}
                            likeCallback={() => handleVote('L', chapt?.id)}
                            dislikeCallback={() => handleVote('D', chapt?.id)}
                          />
                        }
                        {/* <div className={classNames(cls['chapter-status'], cls['chapter-status_vote'])}>
                        <div className={classNames(cls['chapter-status-icon'], cls['chapter-status-icon_vote'])}>
                          <ThumbUpOffAltOutlinedIcon />
                        </div>
                        <p>{chapt.title}</p>

                        <div
                          className={cls.voteBox}
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          >
                          <VotePanel plus={chapt.like} minus={chapt.dislike} disable={true} black={true} small={true} />
                          </div>
                        </div> */}
                      </>
                    ) : (
                      <></>
                    )}
                  </li>
                ))
              ) : (
                // <></>
                <p style={{ fontSize: 12, marginTop: 10 }}>Пока нет предложенных вариантов</p>
              )}
            </ul>
            {/* <span className={cls.auth}>
              Автор:
              <img src={avatar} alt={avatar} />
            </span> */}
          </a>
          {/* <div className={cls.icons__item}>
            <img src={iconAdd} alt="iconAdd" />
          </div> */}
        </div>
      </li>
    );

  return <>Пока нет предложенных вариантов</>;
};

export const InnerCatalogContent2Structure = props => {
  if (!props?.structure) return <></>;

  let min_br_number = Math.min(...props.structure.filter(l => l.branch === props.currentBranch).map(l => l.number));
  let branch_list = [];
  props.structure.forEach(l => {
    if (l.number < min_br_number) {
      branch_list.push(l);
    } else {
      if (l.branch === props.currentBranch) branch_list.push(l);
    }
  });

  return (
    <div className={cls.listStory}>
      <ul>
        {branch_list.map(s => (
          <StructureItem
            currentChapter={props.currentChapter}
            updateState={props.getQuestStructure}
            chapterId={props.chapterId}
            setChapterId={props?.setChapterId}
            getQuestStructure={props?.getQuestStructure}
            getChapter={props?.getChapter}
            key={s.id}
            {...s}
          />
        ))}

        {/* <li>
          <div className={cls.head}>
            <a className={cls.caption}>
              <span className={cls.cap}>Граф.1 Заголовок</span>
            </a>
            <div className={cls.icons__item}>
              <img src={iconAdd} alt="iconAdd" />
            </div>
          </div>
          <div className={cls.lines}>
            <div className={cls.line}>
              <Title4 className={cls.cap}>Длинное название сюжета от автора (ожидает голосования)</Title4>
              <span className={cls.desc}>
                Автор варианта сюжета:<span className={cls.author}>Александр В.</span>
              </span>
              <div className={cls.likes}>
                <div className={cls.like}>
                  15 <img src={like} alt={'like'} />
                </div>
                <div className={cls.dislike}>
                  2 <img src={dislike} alt={'dislike'} />
                </div>
              </div>
              <div className={cls.btns}>
                <button className={[cls.btnIcon, cls.check].join(' ')}>
                  <img src={check} alt={'check'} />
                </button>
                <button className={[cls.btnIcon, cls.canced].join(' ')}>
                  <img src={close} alt={'close'} />
                </button>
              </div>
            </div>
            <div className={cls.line}>
              <Title4 className={cls.cap}>Длинное название сюжета от автора (ожидает голосования)</Title4>
              <span className={cls.desc}>
                Автор варианта сюжета:<span className={cls.author}>Александр В.</span>
              </span>
            </div>
          </div>
        </li> */}
        {/* <li>
          <div className={cls.head}>
            <a className={cls.caption}>
              <span className={cls.cap}>Граф.2 Название длинного графа (но не в 2 строчки)</span>
              <span className={cls.auth}>
                Автор:
                <img src={avatar} alt={avatar} />
              </span>
            </a>
            <div className={cls.icons__item}>
              <img src={iconAdd} alt="iconAdd" />
            </div>
          </div>
        </li> */}
      </ul>
    </div>
  );
};
