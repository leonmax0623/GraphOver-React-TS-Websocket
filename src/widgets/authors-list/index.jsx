import { Link, useParams } from 'react-router-dom';
import { BtnCloseModal } from 'shared/ui/modal/btnclose-modal';
import { Title4, Title5 } from 'shared/ui/typography';
import arrow from 'shared/assets/test-content/arrow_right.svg';
import cls from './style.module.scss';
import iconDelete from 'shared/assets/test-content/icdelete.svg';
import iconPlusFriend from 'shared/assets/test-content/user-plus.svg';
import iconPlus from 'shared/assets/test-content/add.svg';
import circleAlert from 'shared/assets/test-content/circle-alert.svg';
import check from 'shared/assets/test-content/check.svg';
import close from 'shared/assets/test-content/close.svg';
import { useFriends } from 'widgets/chat/hooks';
import { Tooltip } from '@mui/material';
import { useApproveJoin, useComplaints } from 'features/plots/catalog-inner-head/model';
import { ModalCreateZaloba } from 'widgets/modals/modal-create-zaloba';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import iconAdd from 'shared/assets/test-content/add.svg';
import { ModalInviteAuthors } from 'widgets/modals/modal-invite-authors';
import { useInviteAuthor } from './model';

export const AuthorList = ({ isOpenDrop, setOpen, list, updateState, append = false, actionCases = ['view'] }) => {
  const { id } = useParams();
  const { addFriend } = useFriends();
  const { approveAuthor } = useApproveJoin(id, updateState);

  const { addComplaint } = useComplaints(id);

  const [isOpen, setisOpen] = useState(false);
  const [isOpenInvite, setisOpenInvite] = useState(false);
  const [authors, setauthors] = useState([]);
  const [authorId, setauthorId] = useState(null);

  const friends = useSelector(state => state.userReducer.friends);
  const userId = useSelector(state => state.userReducer.user.pk);

  const { inviteAuthor } = useInviteAuthor(id, updateState);

  const handleAccept = () => {
    authors.forEach(a => {
      inviteAuthor(a);
    });
    setauthors([]);
  };
  console.log(list);
  return (
    <>
      <ModalCreateZaloba isOpen={isOpen} setIsOpen={setisOpen} handleAccept={addComplaint} authorId={authorId} />
      <ModalInviteAuthors
        list={list?.map(l => l.id)}
        isOpen={isOpenInvite}
        setIsOpen={setisOpenInvite}
        authors={authors}
        setAuthors={setauthors}
        handleAccept={handleAccept}
      />
      <div className={[cls.authorsDropMenu, isOpenDrop && cls.opened].join(' ')}>
        <div className={cls.head}>
          <BtnCloseModal setIsOpen={setOpen} />
          <div className="" style={{ display: 'flex', marginBottom: 10 }}>
            <Title4 className={cls.title}>Авторы сюжета</Title4>
            {append && (
              <div className={cls.icon} style={{ marginLeft: 15, marginTop: 0 }} onClick={() => setisOpenInvite(true)}>
                <img src={iconAdd} alt="iconAdd" />
              </div>
            )}
          </div>
          <div className={cls.list}>
            {list?.map(a => (
              <div className={cls.item} key={a.id}>
                <img
                  className={[cls.picture, cls.active].join(' ')}
                  src={'https://graphover.ru' + a.avatar}
                  alt={'foto'}
                />
                <div className={cls.text}>
                  <Title5 className={cls.title}>{a.name}</Title5>
                  {/* <span className={cls.desc}>Евгений Ж.</span> */}
                </div>
                <div className={cls.controls}>
                  {actionCases.includes('delete') && userId !== a.id && (
                    <div className={cls.icon}>
                      <img src={iconDelete} alt="iconDelete" />
                    </div>
                  )}
                  {actionCases.includes('join-confirm') && userId !== a.id && a.status === 'V' && (
                    <Tooltip title="Принять автора">
                      <div className={cls.icon} onClick={() => approveAuthor(a.id, 'L')}>
                        <img style={{ backgroundColor: '#00c48c' }} src={check} alt="iconDelete" />
                      </div>
                    </Tooltip>
                  )}
                  {actionCases.includes('join-confirm') && userId !== a.id && a.status === 'V' && (
                    <Tooltip title="Отклонить автора">
                      <div className={cls.icon} onClick={() => approveAuthor(a.id, 'D')}>
                        <img style={{ backgroundColor: '#ff4b67' }} src={close} alt="iconDelete" />
                      </div>
                    </Tooltip>
                  )}
                  {actionCases.includes('zaloba') && userId !== a.id && userId !== a.id && a.status === 'C' && (
                    <Tooltip title="Отправить жалобу">
                      <div
                        className={cls.icon}
                        onClick={e => {
                          e.preventDefault();
                          setisOpen(true);
                          setauthorId(a.id);
                        }}
                      >
                        <img src={circleAlert} alt="circleAlert" />
                      </div>
                    </Tooltip>
                  )}
                  {actionCases.includes('add-friend') &&
                    userId !== a.id &&
                    !friends.map(f => f.friend.id).includes(a.id) && (
                      <Tooltip title="Добавить в друзья">
                        <div className={cls.icon} onClick={() => addFriend(a.id)}>
                          <img src={iconPlusFriend} alt="iconPlus" />
                        </div>
                      </Tooltip>
                    )}
                  {actionCases.includes('view') && (
                    <Tooltip title="Посмотреть профиль">
                      <Link to={`/profile/${a.id}`} className={cls.arrow}>
                        <img src={arrow} alt={'arrow'} />
                      </Link>
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
