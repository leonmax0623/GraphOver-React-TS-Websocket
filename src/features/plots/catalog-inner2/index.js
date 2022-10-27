import React, { useEffect, useState } from 'react';
import cls from './catalog-inner.module.scss';

import { InnerCatalogHead } from '../catalog-inner-head';
import { InnerCatalogChat } from '../catalog-inner-chat';
import { InnerCatalogContent2 } from '../catalog-inner-content2';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useQuestStatus } from '../catalog-inner/model';
import { useRate } from './model';
import { TaskActual } from 'widgets/task-actual';
import { ScenariState } from 'widgets/state-scenari';
import { useQuest } from '../catalog-inner-content2/model';

export const InnerCatalogPage2 = () => {
  const { id: quest_id } = useParams();

  const userState = useSelector(state => state.userReducer.user);
  const { getQuestStatus } = useQuestStatus();

  // const [isDropFileShow, setIsDropFileShow] = useState(false);
  const [isTaskShow, setTaskShow] = useState(false);

  useEffect(() => {
    getQuestStatus(quest_id);
  }, []);

  const questData = useQuest(quest_id, getQuestStatus);

  const { state, getQuestData } = questData;

  const { handleRateChange } = useRate(quest_id, getQuestData);

  return (
    <div className={cls.container}>
      <InnerCatalogHead
        key={'inner'}
        inner={true}
        state={state}
        setTaskShow={setTaskShow}
        isTaskShow={isTaskShow}
        handleRateChange={handleRateChange}
        updateState={getQuestData}
      />
      <TaskActual setTaskShow={setTaskShow} isTaskShow={isTaskShow} />
      {state.mode === 'SCENARIO' && <ScenariState {...questData} />}
      <InnerCatalogContent2 {...questData} />
      {/* <ProjectDashBoard /> */}
      {/* <ScenariState /> */}
    </div>
  );
};
