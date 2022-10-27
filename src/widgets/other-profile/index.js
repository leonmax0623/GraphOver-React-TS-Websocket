import React, { useEffect, useState } from 'react';

import cls from './author.module.scss';

import { Caption, Title3, Title2, Title4, Title5 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextInput } from 'shared/ui/text-input';

import foto from 'shared/assets/test-content/foto.png';
import chat from 'shared/assets/test-content/ico2-blue.svg';
import arrow from 'shared/assets/test-content/arrow_right.svg';
import iconDelete from 'shared/assets/test-content/icdelete.svg';
import vk from 'shared/assets/test-content/vk.svg';
import whatssapp from 'shared/assets/test-content/whatssapp.svg';
import youtube from 'shared/assets/test-content/youtube.svg';
import telegram from 'shared/assets/test-content/telegram.svg';
import { PlotsCatalog } from 'features/plots/catalog';
import { ProfileAuthorHead } from 'widgets/author-profile-head';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { useAccount } from 'entities/user/model';
import { useSelector } from 'react-redux';
import { Modal7 } from 'widgets/modals/modal7';
import { useFriends } from 'widgets/chat/hooks';
import { Link, useParams } from 'react-router-dom';
import { useOtherAccount, useOtherFriends } from './model';
import { ProfileOtherHead } from 'widgets/other-profile-head';
import { PlotsProfileCatalog } from 'features/plots/catalog-profile';

// const getImageForSocial = (social, img) => {
//   switch (social) {
//     case 'VK':
//       return

//     default:
//       break;
//   }
// };

const RateComponent = ({ rating, title, solo = false }) => {
  return (
    <div className={cls.rating}>
      <div className={cls.knob}>
        <div className={cls.knobWrapper} style={solo ? { width: 100, height: 100 } : { width: 70, height: 70 }}>
          <CircularProgressbar
            value={rating}
            text={`${rating}`}
            styles={buildStyles({
              rotation: 0,
              textSize: '23px',
              pathColor: `#4D1EE0`,
              textColor: '#000000',
              trailColor: 'rgba(196, 196, 196, 0.3)',
              backgroundColor: '#4D1EE0',
            })}
          />
        </div>
      </div>
      <div className={cls.text}>
        <Title3 className={cls.title}>{title}</Title3>
        {/* <a className={cls.link}>смотреть историю</a> */}
      </div>
    </div>
  );
};

export const RatePanel = ({ userState }) => {
  if (userState?.is_moderator)
    return (
      <div className={cls.ratings}>
        <RateComponent rating={userState?.rating} title={'Рейтинг автора'} />
        <RateComponent rating={userState?.moderator_info?.rating_moderator} title={'Рейтинг модератора'} />
      </div>
    );
  return <RateComponent solo rating={userState?.rating} title={'Рейтинг автора'} />;
};

export const ProfileOther = () => {
  const [isOpenSocials, setIsOpenSocials] = useState(false);
  const params = useParams();

  const { getFriends, friends } = useOtherFriends(params?.id);
  const { userState } = useOtherAccount(params?.id);

  useEffect(() => {
    getFriends();
  }, [params]);

  if (!userState) return <></>;
  return (
    <>
      <div className={cls.container}>
        <Modal7 isOpen={isOpenSocials} setIsOpen={setIsOpenSocials} />
        <ProfileOtherHead userState={userState} />
        <div className={cls.userInfo}>
          <div className={cls.social}>
            <div className={cls.topTitle}>
              <Title3 className={cls.title}>Соц.сети</Title3>
            </div>

            <ul className={cls.list}>
              {userState?.get_social?.map(s => (
                <li>
                  <a href={s.url} target="_blank">
                    <img src={s.image_url} alt={''} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Когда несоклько рейтинг */}
          <RatePanel userState={userState} />
          <div className={cls.about}>
            <div className={cls.topTitle}>
              <Title3 className={cls.title}>Обо мне</Title3>
            </div>
            <div className={cls.text}>
              <p>{userState?.info}</p>
            </div>
            <div className={cls.interests}>
              <div className={cls.topTitle}>
                <Title3 className={cls.title}>Интересы</Title3>
              </div>
              <ul className={cls.list}>{userState?.interesting}</ul>
            </div>
          </div>
          <div className={cls.contacts}>
            <div className={cls.topTitle}>
              <Title3 className={cls.title}>Контакты</Title3>
            </div>

            <div className={cls.list}>
              {friends.length > 0 ? (
                friends.map(fr => (
                  <div className={cls.item}>
                    <div className={cls.text}>
                      <img className={cls.picture} src={fr.friend.avatar} alt={'foto'} />
                      {/* <span className={cls.tit}>модератор</span> */}
                      <span className={cls.name}>{fr.friend.username}</span>
                    </div>
                    <div className={cls.controls}>
                      <Link to={`/profile/${fr.friend?.id}`} className={cls.arrow}>
                        <img src={arrow} alt={'arrow'} />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <>Нет контактов</>
              )}
            </div>
          </div>
        </div>
        <PlotsProfileCatalog profile author={true} userId={userState?.pk} />
      </div>
    </>
  );
};
