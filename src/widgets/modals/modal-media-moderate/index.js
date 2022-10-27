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
        <source src={'https://graphover.ru' + item.media} type="video/webm" />
        {/* <source src={testVideo} type="video/webm" /> */}
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
      <img className={cls.img} src={'https://graphover.ru' + item.media} alt="" />
      {/* <img className={cls.img} src={testImg} alt="" /> */}
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
        <source src={'https://graphover.ru' + media} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      {/* <span className={cls.desc}>Новое медиа</span> */}
    </div>
  );
};
const CurrentImage = ({ type, media }) => {
  return (
    <div className={cls.picture}>
      <img className={cls.src} src={'https://graphover.ru' + media} alt="" />
      {/* <span className={cls.desc}>Новое медиа</span> */}
    </div>
  );
};

export const ModalMediaModerate = props => {
  const { isOpen, setIsOpen, media, handleModerate } = props;

  const userData = useSelector(state => state.userReducer.user);

  const [current, setCurrent] = useState(null);

  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <div className={cls.mediaModal}>
        <div className={cls.top}>
          <Title2 className={cls.title}>Медиатека</Title2>
          <div className={cls.btns}></div>
        </div>
        <div className={cls.body}>
          <div className={cls.list}>
            {media?.map(m => {
              if (m.media_type === 'image' || m.media_type === 'gif')
                return <ImageItem key={m.id} selectCurrent={setCurrent} item={m} />;
              if (m.media_type === 'video') return <VideoItem key={m.id} selectCurrent={setCurrent} item={m} />;
            })}
          </div>
          {current && (
            <div className={cls.user}>
              {current?.media_type === 'video' ? <CurrentVideo {...current} /> : <CurrentImage {...current} />}
              {/* <div className={cls.picture}>
              <span className={cls.desc}>Новое медиа</span>
            </div> */}
              <div className={cls.info}>
                <span className={cls.date}>{current?.crated_at}</span>
                <span>
                  Пользователь:<a className={cls.link}>{current?.username}</a>
                </span>
              </div>
              {current && (
                <div className={cls.controls}>
                  <button
                    className={[cls.btn, cls.app].join(' ')}
                    onClick={() => {
                      handleModerate(current.id, 'L', () => setCurrent(null));
                    }}
                  >
                    Утвердить
                  </button>
                  <button
                    className={[cls.btn, cls.ref].join(' ')}
                    onClick={() => {
                      handleModerate(current.id, 'D', () => setCurrent(null));
                    }}
                  >
                    Отказать
                  </button>
                  {/* <button className={[cls.btn, cls.main].join(' ')}>Назначить главной</button> */}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
