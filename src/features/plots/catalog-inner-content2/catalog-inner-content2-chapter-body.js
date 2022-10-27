import React, { useEffect, useRef, useState } from 'react';
import cls from './content.module.scss';

import iconEye from 'shared/assets/test-content/eye.svg';
import iconEdit from 'shared/assets/test-content/icedit.svg';
import iconDelete from 'shared/assets/test-content/icdelete.svg';
import unableBanIcon from 'shared/assets/test-content/lock.svg';
import banIcon from 'shared/assets/test-content/lock-red.svg';
import unbanIcon from 'shared/assets/test-content/unlock.svg';

import { Title3, Title4 } from 'shared/ui/typography';
import { useSelector } from 'react-redux';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';
import { TextField, Tooltip } from '@mui/material';
import { useChangeChapter } from './model';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export const InnerCatalogContent2ChapterBody = props => {
  const { currentChapter, getChapter, getQuestStructure } = props;

  const { id } = useParams();

  const userId = useSelector(state => state.userReducer.user.pk);
  const is_administrator = useSelector(state => state.userReducer.user.is_administrator);

  const { fetchData } = useChangeChapter(id, getChapter, getQuestStructure);

  const [title, setTitle] = useState(() => {
    return currentChapter.title;
  });

  const baseTitle = useRef(currentChapter.title || '');

  const [text, setText] = useState('');

  useEffect(() => {
    if (Object.keys(currentChapter).length) {
      setTitle(currentChapter.title);
      setText(currentChapter.text);
    }
  }, [currentChapter]);

  const handleChangeTitle = e => {
    const val = e.target.value;
    // console.log(baseTitle);

    fetchData(currentChapter?.id, { title: val });
    // if (val) {
    // } else {
    //   setTitle(baseTitle.current);
    // }
  };

  const handleChangePrivate = val => {
    fetchData(currentChapter?.id, { private: val });
  };

  const handleChangeText = e => {
    const val = e.target.value;
    console.log(val);
    fetchData(currentChapter?.id, { text: val });
  };

  if (Object.keys(currentChapter).length) {
    if (currentChapter.role === 'E' && currentChapter.user.id === userId && currentChapter.winner !== 'W')
      return (
        <div className={cls.right}>
          <div className={cls.list}>
            <div className={cls.controls}>
              <Title3 className={cls.title}>
                Граф.{currentChapter?.graph_number}
                <TextField
                  type="text"
                  label="Название графа"
                  className={cls['title-input']}
                  value={title || ''}
                  onChange={e => setTitle(e.target.value)}
                  onBlur={handleChangeTitle}
                  placeholder="Название графа..."
                  sx={{
                    '&': { marginLeft: '10px' },
                    '& .MuiInputBase-input': { padding: '5px 14px' },
                    '& .MuiInputLabel-root': { top: '-9px' },
                    '& .MuiInputLabel-shrink': { top: '0' },
                  }}
                />
              </Title3>
              <div className={cls.icons}>
                <ul>
                  {currentChapter.private === 'Sec' ? (
                    <Tooltip
                      title="Откройте свой вариант графа для просмотра другими пользователями"
                      placement="top-end"
                    >
                      <li onClick={() => handleChangePrivate('Pub')}>
                        <div className={cls.icons__item}>
                          <img src={unbanIcon} alt="iconEye" />
                        </div>
                      </li>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Закройте свой вариант графа от просмотра другими пользователями до момента голосования."
                      placement="top-end"
                    >
                      <li onClick={() => handleChangePrivate('Sec')}>
                        <div className={cls.icons__item}>
                          <img src={unableBanIcon} alt="iconEye" />
                        </div>
                      </li>
                    </Tooltip>
                  )}

                  {/* <li>
                    <div className={cls.icons__item}>
                      <img src={unableBanIcon} alt="iconEdit" />
                    </div>
                  </li> */}
                  {/* <li>
                    <div className={cls.icons__item}>
                      <img src={iconDelete} alt="iconDelete" />
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className={cls.body}>
              <TextArea
                value={text}
                placeholder="Начните писать здесь..."
                onChange={e => {
                  setText(e.target.value);
                  // handleChangeText(e);
                }}
                onBlur={handleChangeText}
                className={cls.textarea}
              />
            </div>
          </div>
        </div>
      );
    return (
      <div className={cls.right}>
        <div className={cls.list}>
          <div className={cls.controls}>
            <Title3 className={cls.title}>
              Граф.{currentChapter?.graph_number} {currentChapter?.title}
            </Title3>
            {is_administrator && (
              <div className={cls.icons}>
                <ul>
                  <li>
                    <div className={cls.icons__item}>
                      <img src={iconEye} alt="iconEye" />
                    </div>
                  </li>
                  <li>
                    <div className={cls.icons__item}>
                      <img src={iconEdit} alt="iconEdit" />
                    </div>
                  </li>
                  <li>
                    <div className={cls.icons__item}>
                      <img src={iconDelete} alt="iconDelete" />
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className={cls.body}>
            <div className={cls.text}>
              <span className={cls.aut}>
                Автор сюжета:
                <Link to={`/profile/${currentChapter?.user?.id}`} className={cls.name}>
                  {currentChapter?.user?.name}
                </Link>
              </span>
              {/* <Title4>Длинное название сюжета от автора</Title4> */}
              {currentChapter?.private === 'Sec' ? (
                <p>Автор закрыл граф до момента голосования</p>
              ) : (
                <p>{currentChapter?.text}</p>
              )}
            </div>
            {/* <div className={cls.text}>
            <span className={cls.aut}>
              Автор сюжета:<span className={cls.name}>Александр В.</span>
            </span>
            <Title4>Длинное название сюжета от автора</Title4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In imperdiet et fames nunc etiam sed adipiscing.
              Auctor turpis id feugiat dictumst sed sit. Egestas pellentesque urna morbi eu libero penatibus. Amet
              neque, maecenas bibendum massa porta turpis duis. Odio egestas commodo non, facilisis massa ultrices. Sit
              ut diam habitasse luctus. Mi morbi dolor lectus in. Tellus arcu gravida hac quis egestas. Urna sed
              facilisis ut commodo. Ultrices netus nunc elit accumsan vestibulum, quis at. Mattis morbi augue auctor
              eget. Dignissim enim, commodo enim ut. Ipsum sit dui platea non. Felis sit pharetra sit eros. Aliquam
              lectus suspendisse et lobortis risus in et. Lacinia netus sit sodales gravida tortor purus tristique. Ut
              nisi auctor maecenas faucibus aliquam. Leo, blandit enim nisi, diam leo id pellentesque. Tincidunt feugiat
              et duis facilisis.
            </p>
          </div>
          <div className={cls.text}>
            <span className={cls.aut}>
              Автор сюжета:<span className={cls.name}>Александр В.</span>
            </span>
            <Title4>Длинное название сюжета от автора</Title4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In imperdiet et fames nunc etiam sed adipiscing.
              Auctor turpis id feugiat dictumst sed sit. Egestas pellentesque urna morbi eu libero penatibus. Amet
              neque, maecenas bibendum massa porta turpis duis. Odio egestas commodo non, facilisis massa ultrices. Sit
              ut diam habitasse luctus. Mi morbi dolor lectus in. Tellus arcu gravida hac quis egestas. Urna sed
              facilisis ut commodo. Ultrices netus nunc elit accumsan vestibulum, quis at. Mattis morbi augue auctor
              eget. Dignissim enim, commodo enim ut. Ipsum sit dui platea non. Felis sit pharetra sit eros. Aliquam
              lectus suspendisse et lobortis risus in et. Lacinia netus sit sodales gravida tortor purus tristique. Ut
              nisi auctor maecenas faucibus aliquam. Leo, blandit enim nisi, diam leo id pellentesque. Tincidunt feugiat
              et duis facilisis.
            </p>
          </div> */}
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};
