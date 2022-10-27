import React, { useEffect, useState } from 'react';

import cls from './dashboard.module.scss';

import { Caption, Title2, Title3, Title4 } from 'shared/ui/typography';

import avatar from 'shared/assets/test-content/foto.png';

import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Tabs } from 'shared/ui/tabs';
import { Cases } from './cases';
import { NewQuests } from './new-quest';
import { Modal22 } from 'widgets/modals/modal22';
import { ModalMediaModerate } from 'widgets/modals/modal-media-moderate';
import { useMedia } from './media/model';

export const ModeratorProfileDashBoard = () => {
  const [activetab, setActivetab] = useState(0);
  const [isOpenMedia, setisOpenMedia] = useState(false);
  const [questCnt, setQuestCnt] = useState(0);
  const [casesCnt, setCasesCnt] = useState(0);

  const { media, handleModerate, getMedia } = useMedia();

  useEffect(() => {
    getMedia();
  }, []);

  useEffect(() => {
    if (activetab === 2) {
      setisOpenMedia(true);
    } else {
      setisOpenMedia(false);
    }
  }, [activetab]);

  return (
    <div className={cls.container}>
      <div className={cls.top}>
        <Title2 className={cls.title}>Панель модератора</Title2>
        <div className={cls.filters}>
          <Tabs
            name={'moderator-panel'}
            active={activetab}
            onChange={e => setActivetab(Number(e.target.value))}
            items={[
              {
                label: `Спорные ситуации`,
                value: 0,
                id: 1,
              },
              {
                label: `Новые сюжеты`,
                value: 1,
                id: 2,
              },
              {
                label: 'Медиатека ',
                value: 2,
                id: 3,
              },
              // {
              //   label: 'Жалобы ',
              //   value: 3,
              //   id: 4,
              // },
            ]}
          />
        </div>
        {activetab === 0 && <Cases setCasesCnt={setCasesCnt} />}
        {activetab === 1 && <NewQuests setQuestCnt={setQuestCnt} />}
        <ModalMediaModerate
          isOpen={isOpenMedia}
          setIsOpen={val => {
            setisOpenMedia(val);
            setActivetab(0);
          }}
          media={media}
          handleModerate={handleModerate}
        />

        {/* {activetab === 3 && <Cases />} */}
      </div>
    </div>
  );
};
