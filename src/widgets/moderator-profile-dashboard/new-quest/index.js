import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import Scrollbar from 'react-scrollbars-custom';
import { moderatorAPI } from 'shared/api/moderator';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Modal } from 'shared/ui/modal';
import { Title3 } from 'shared/ui/typography';
import { convertDate } from 'shared/utils';
import { ModalQuestModerate } from 'widgets/modals/modal-quest-moderate';
import cls from '../dashboard.module.scss';
import { useCasesAnswers, useCasesGrafs, useNewQuests } from './model';

const CasesItem = ({ quest, updateState }) => {
  const { created_at, name, id, info, owner, authors_list } = quest;
  const [open, setOpen] = useState(false);
  const f_date = convertDate(created_at);
  const { enqueueSnackbar } = useSnackbar();
  const { notificateAxiosError } = useAxiosErrorNotificate();

  const handleModerate = async vote => {
    try {
      const { data } = await moderatorAPI.questVote(quest.id, { vote: vote, reason_for_rejection: vote });
      setOpen(false);
      updateState();
      enqueueSnackbar(data?.success, {
        variant: 'success',
        preventDuplicate: true,
      });
    } catch (err) {
      console.log(err);
      notificateAxiosError(err);
    }
  };

  return (
    <div className={cls.item}>
      <div className={cls.head}>
        <Button className={cls.btn} type={ButtonTypes.primary} size={ButtonSizes.small} onClick={() => setOpen(true)}>
          Посмотреть
        </Button>
        {/* <span className={cls.caterogry}>Новый сюжет</span> */}
        <span className={cls.date}>{f_date}</span>
        <Title3 className={cls.title}>{name}</Title3>
      </div>
      <p className={cls.text}>{info}</p>
      <div className={cls.info}>
        <div className={cls.authors}>
          <span className={cls.tit}>Владелец:</span>
          <span className={cls.num}>{owner?.username}</span>
          <div className={cls.peoples}>
            <div className={cls.circle}>{/* <img src={avatar} alt={'ava'} /> */}</div>
          </div>
        </div>
        <div className={cls.authors}>
          <span className={cls.tit}>Авторы сюжета:</span>

          <div className={cls.peoples}>
            {authors_list?.map(a => (
              <div key={a.id} className={cls.circle}>
                <img src={a.avatar} alt={'ava'} />
              </div>
            ))}
            <div className={[cls.circle, cls.last].join(' ')}>{/* <img src={avatar} alt={'ava'} /> */}</div>
          </div>
        </div>
      </div>
      <ModalQuestModerate isOpen={open} setIsOpen={setOpen} quest={quest} handleModerate={handleModerate} />
    </div>
  );
};

export const NewQuests = ({ setQuestCnt }) => {
  const { quests, getQuests } = useNewQuests();
  useEffect(() => {
    setQuestCnt(quests.length);
  }, [quests]);

  return (
    <div className={cls.list}>
      {quests.length > 0 ? (
        quests.map(q => <CasesItem key={q.id} quest={q} updateState={getQuests} />)
      ) : (
        <>Нет новых сюжетов</>
      )}{' '}
    </div>
  );
};
