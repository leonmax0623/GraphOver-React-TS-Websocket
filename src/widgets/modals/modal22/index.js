import React, { useRef, useState } from 'react';

import cls from './styles.module.scss';

import { Caption, Title2, Title3 } from 'shared/ui/typography';
import { Modal } from 'shared/ui/modal';
import { BtnCloseModal } from 'shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';
import testImg from 'shared/assets/test-content/test_image2.jpg';
import testVideo from 'shared/assets/test-content/test_video.mov';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

const VideoItem = ({ item, selectCurrent }) => {
  return (
    <div className={classNames(cls.item, cls.video)} onClick={() => selectCurrent(item)}>
      <video autoPlay muted>
        {/* <source src={item.media} type="video/webm" /> */}
        <source src={testVideo} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      {/* <Button className={cls.btn} type={ButtonTypes.primary} size={ButtonSizes.small}>
        Главное медиа
      </Button> */}
    </div>
  );
};
const ImageItem = ({ selectCurrent, item }) => {
  return (
    <div className={cls.item} onClick={() => selectCurrent(item)}>
      {/* <img className={cls.img} src={item.media} alt="" /> */}
      <img className={cls.img} src={testImg} alt="" />
      {/* <Button className={cls.btn} type={ButtonTypes.primary} size={ButtonSizes.small}>
        Главное медиа
      </Button> */}
      {/* <Button className={cls.btn} type={ButtonTypes.secondary} size={ButtonSizes.small}>
                Новое медиа
              </Button> */}
    </div>
  );
};
const CurrentVideo = ({ media }) => {
  return (
    <div className={cls.picture}>
      <video autoPlay controls>
        <source src={media} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      {/* <span className={cls.desc}>Новое медиа</span> */}
    </div>
  );
};
const CurrentImage = ({ type, media }) => {
  return (
    <div className={cls.picture}>
      <img className={cls.src} src={media} alt="" />
      {/* <span className={cls.desc}>Новое медиа</span> */}
    </div>
  );
};

const item1 = {
  id: 0,
  media: testImg,
  user: 0,
  username: 'Volodya',
  avatar: '/media/images/accounts/default-user.jpeg',
  moderation: 'M',
  chapter_title: 'string',
  chapter_text: 'string',
  type: 'image',
};
const item2 = {
  id: 1,
  media: testVideo,
  user: 0,
  username: 'Volodya1',
  avatar: '/media/images/accounts/default-user.jpeg',
  moderation: 'M',
  chapter_title: 'string',
  chapter_text: 'string',
  type: 'video',
};

export const Modal22 = props => {
  const { isOpen, setIsOpen, current, setCurrent, files, setFiles } = props;
  const userData = useSelector(state => state.userReducer.user);
  const [openModeratorBlock, setOpenModeratorBlock] = useState(false);
  const ref = useRef(null);

  function handleClick(event) {
    ref.current.click();
    // setFiles(event.target.files[0]);
  }
  function handleChange(event) {
    setFiles(event.target.files[0]);
  }

  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <div className={cls.mediaModal}>
        <div className={cls.top}>
          <Title2 className={cls.title}>Медиатека</Title2>
          <div className={cls.btns}>
            <form action="">
              <input ref={ref} type="file" onChange={handleChange} hidden />
              <Button type={ButtonTypes.primary} size={ButtonSizes.small} onClick={handleClick}>
                Загрузить
              </Button>
            </form>
            {/* {current && (userData?.is_moderator || userData?.is_administrator) && (
              <Button
                type={ButtonTypes.primary}
                size={ButtonSizes.small}
                onClick={() => setOpenModeratorBlock(!openModeratorBlock)}
              >
                Утвердить медиа
              </Button>
            )} */}
          </div>
        </div>
        <div className={cls.body}>
          <div className={cls.list}>
            <VideoItem selectCurrent={setCurrent} item={item2} />
            <ImageItem selectCurrent={setCurrent} item={item1} />
          </div>
          {current && (
            <div className={cls.user}>
              {current?.type === 'video' ? <CurrentVideo {...current} /> : <CurrentImage {...current} />}
              {/* <div className={cls.picture}>
              <span className={cls.desc}>Новое медиа</span>
            </div> */}
              <div className={cls.info}>
                <span className={cls.date}>{current?.crated_at}</span>
                <span>
                  Пользователь:<a className={cls.link}>{current?.username}</a>
                </span>
              </div>
              {/* {openModeratorBlock && (
                <div className={cls.controls}>
                  <button className={[cls.btn, cls.app].join(' ')}>Утвердить</button>
                  <button className={[cls.btn, cls.ref].join(' ')}>Отказать</button>
                  <button className={[cls.btn, cls.main].join(' ')}>Назначить главной</button>
                </div>
              )} */}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
