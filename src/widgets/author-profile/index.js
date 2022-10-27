import { useEffect, useState } from 'react';

import cls from './author.module.scss';

import { Title3 } from 'shared/ui/typography';

import { useAccount } from 'entities/user/model';
import { PlotsProfileCatalog } from 'features/plots/catalog-profile';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import plusIcon from 'shared/assets/test-content/add.svg';
import arrow from 'shared/assets/test-content/arrow_right.svg';
import iconDelete from 'shared/assets/test-content/icdelete.svg';
import { ProfileAuthorHead } from 'widgets/author-profile-head';
import { useFriends } from 'widgets/chat/hooks';
import { Modal7 } from 'widgets/modals/modal7';

import 'react-circular-progressbar/dist/styles.css';
import { ModalAddFriend } from 'widgets/modals/modal-add-friend';
import { useSocials } from 'widgets/modals/modal7/model';
import { ModeratorProfileDashBoard } from 'widgets/moderator-profile-dashboard';

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

export const ProfileAuthor = () => {
  const percentage = 120;
  const userState = useSelector(state => state.userReducer);
  const friends = useSelector(state => state.userReducer.friends);
  const [isOpenSocials, setIsOpenSocials] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [iseditabout, setiseditabout] = useState(false);
  const [iseditinter, setiseditinter] = useState(false);
  const { changeUserState, changeState } = useAccount();
  const { getFriends, deleteFriend } = useFriends();
  const { getSocials, socials, socialsState, setsocialsState, fetchSocialState } = useSocials();

  useEffect(() => {
    getFriends();
    getSocials();
  }, []);

  if (!userState) return <></>;
  return (
    <>
      <div className={cls.container}>
        <Modal7
          isOpen={isOpenSocials}
          setIsOpen={setIsOpenSocials}
          socials={socials}
          socialsState={socialsState}
          setsocialsState={setsocialsState}
          handleAccept={fetchSocialState}
        />
        <ProfileAuthorHead userState={userState} />
        <div className={cls.userInfo}>
          <div className={cls.social}>
            <div className={cls.topTitle}>
              <Title3 className={cls.title}>Соц.сети</Title3>
              <span className={cls.edit} onClick={() => setIsOpenSocials(true)}></span>
            </div>

            <ul className={cls.list}>
              {userState?.user?.get_social?.map(s => (
                <li>
                  <a href={s.url} target="_blank">
                    <img src={s.image_url} alt={''} />
                    {/* <img src={getImageForSocial(s.name, s.image_url)} alt={''} /> */}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Когда несоклько рейтинг */}
          <RatePanel userState={userState?.user} />
          <div className={cls.about}>
            <div className={cls.topTitle}>
              <Title3 className={cls.title}>Обо мне</Title3>
              <span
                className={cls.edit}
                onClick={() => {
                  if (iseditabout) {
                    changeUserState('info');
                    setiseditabout(false);
                  } else {
                    setiseditabout(true);
                  }
                }}
              ></span>
            </div>
            <div className={cls.text}>
              {iseditabout ? (
                <textarea
                  placeholder="Введите информацию о себе"
                  value={userState?.user?.info}
                  onChange={e => changeState('info', e.target.value)}
                />
              ) : (
                <p>{userState?.user?.info}</p>
              )}
            </div>
            <div className={cls.interests}>
              <div className={cls.topTitle}>
                <Title3 className={cls.title}>Интересы</Title3>
                <span
                  className={cls.edit}
                  onClick={() => {
                    if (iseditinter) {
                      changeUserState('interesting');
                      setiseditinter(false);
                    } else {
                      setiseditinter(true);
                    }
                  }}
                ></span>
              </div>
              {iseditinter ? (
                <textarea
                  className={cls.list}
                  placeholder="Перечислите ваши интересы"
                  value={userState?.interesting?.info}
                  onChange={e => changeState('interesting', e.target.value)}
                />
              ) : (
                <ul className={cls.list}>{userState?.user?.interesting}</ul>
              )}
            </div>
          </div>
          <div className={cls.contacts}>
            <div className={cls.topTitle}>
              <Title3 className={cls.title}>Контакты</Title3>
              <img src={plusIcon} className={cls.plus} alt="" onClick={() => setIsOpenUser(true)} />
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
                      <div className={cls.icon} onClick={() => deleteFriend(fr.friend.id)}>
                        <img src={iconDelete} alt="iconDelete" />
                      </div>
                      <Link to={`/profile/${fr.friend.id}`} className={cls.arrow}>
                        <img src={arrow} alt={'arrow'} />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <>У вас пока нет друзей</>
              )}
            </div>
          </div>
        </div>
        <ModeratorProfileDashBoard />
        <PlotsProfileCatalog profile author={true} userId={userState?.user?.pk} />
        <ModalAddFriend isOpen={isOpenUser} setIsOpen={setIsOpenUser} />
      </div>
    </>
  );
};
