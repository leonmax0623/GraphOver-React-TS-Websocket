import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Button, ButtonSizes } from 'shared/ui/button';
import { Title5 } from 'shared/ui/typography';
import { useUsersStat } from './model';
import cls from './state.module.scss';

const UserStatItem = ({ username, task_all, answer_all, text_all }) => (
  <div className={cls.targetLine}>
    <div className={cls.targetCol}>
      <div className={cls.user}>
        <span className={cls.name}>Александр Л.</span>
      </div>
    </div>
    <div className={cls.targetCol}>
      <div className={cls.captions}>
        <span className={cls.date}>03.07.2022</span>
        <Title5 className={cls.title}>Граф. 2 Длинное название графа</Title5>
      </div>
    </div>
    <div className={cls.targetCol}>
      <Button className={cls.btnWhite} size={ButtonSizes.small}>
        Смотреть
      </Button>
    </div>
  </div>
);

export const UserStat = () => {
  const { id } = useParams();
  const userId = useSelector(state => state.userReducer.user.pk);

  const { getStatisticTasks, tesk_s } = useUsersStat(id);

  useEffect(() => {
    if (userId && id) {
      getStatisticTasks();
    }
  }, [userId, id]);

  return (
    <div className={cls.col}>
      <div className={cls.target}>
        <div className={cls.head}>
          <div className={cls.titles}>
            <span className={cls.all}>Статистика пользователей</span>
            {/* <Title5 className={cls.caption}>Количество задач</Title5> */}
          </div>
          {/* <Button className={cls.btnWhite} size={ButtonSizes.small}>
          Смотреть задачи
        </Button> */}
        </div>
        <div className={cls.targetList}>
          {Object.keys(tesk_s).map(k => (
            <UserStatItem
              username={k}
              task_all={tesk_s[k]['Количество задач']}
              answer_all={tesk_s[k]['Количество ответов на задачи']}
              text_all={tesk_s[k]['Объем написанного теста']}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
