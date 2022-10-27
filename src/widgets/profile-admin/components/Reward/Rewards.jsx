// Import modules
import React, { useEffect, useState } from 'react';
import cls from '../../profileadmin.module.scss';

import { Title4, Title5 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { adminPanelApi } from 'shared/api/admin-panel';
import { EditableSettingsItem } from '../EditableSettingsItem/EditableSettingsItem';

const awardsLabelMap = {
  moderator: {
    moderation_answer: 'Разрешение спорной ситуации',
    moderation_graph: 'Подтверждение сюжета',
    moderation_quest: 'Подтверждение медиа'
  },
  author: {
    create_quest :'Успешное предложение сюжета',
    create_chapter: 'Написание графа',
    win_chapter :'Успешное написание графа',
    win_answer: 'Написание правильного ответа',
    any_vote: 'Участие в голосовании'
  }
}

// Exports
export const Rewards = () => {

  const [moderatorRewards, setModeratorRewards] = useState({});
  const [authorRewards, setAuthorRewards] = useState({});
  const [isAbleToEdit, setIsAbleToEdit] = useState(false);

  const onEditButton = async () => {
    if (isAbleToEdit){
      await adminPanelApi.setModeratorRewards(moderatorRewards);
      await adminPanelApi.setAuthorRewards(authorRewards)
    }
    setIsAbleToEdit(!isAbleToEdit);
  }

  useEffect(() => {
    const fetch = async () => {
      const { data: author } = await adminPanelApi.getAuthorRewards();
      const { data: moderator } = await adminPanelApi.getModeratorRewards();
      setModeratorRewards(moderator.rating_point_moderator);
      setAuthorRewards(author.rating_point_author);
      // console.log(moderator);
    };
    fetch();
  }, []);

  return (
    <div className={[cls.card, cls.infoBlock, cls.awards].join(' ')}>
      <div className={cls.head}>
        <Title4 className={cls.title}>Награды</Title4>
        <Button
          className={cls.btn}
          size={ButtonSizes.small}
          type={ButtonTypes.primary}
          onClick={ onEditButton }
        >
          Изменить
        </Button>

      </div>
      <div className={cls.line}>
        <Title5 className={cls.cap}>Модераторы</Title5>
        <ul>
          {
            Object.entries(moderatorRewards).map(([key, value]) => {
              if(key !== 'pk'){
                return (
                  <EditableSettingsItem
                    key={ key }
                    label={ awardsLabelMap.moderator[key] }
                    value={ value }
                    isAbleToEdit={ isAbleToEdit }
                    onInputChange={(inputValue) => setModeratorRewards({ ...moderatorRewards, [key]: inputValue })}
                  />
                )
              } else {
                return null;
              }
            })
          }
        </ul>
      </div>

      <div className={cls.line}>
        <Title5 className={cls.cap}>Пользователи</Title5>
        <ul>
          {
            Object.entries(authorRewards).map(([key, value]) => {
              if (key !== 'pk'){
                return (
                  <EditableSettingsItem
                    key={ key }
                    label={ awardsLabelMap.author[key] }
                    value={ value }
                    isAbleToEdit={ isAbleToEdit }
                    onInputChange={(inputValue) => setAuthorRewards({ ...authorRewards, [key]: inputValue })}
                  />
                );
              } else {
                return null;
              }
            })
          }
        </ul>
      </div>


    </div>
  );
};
