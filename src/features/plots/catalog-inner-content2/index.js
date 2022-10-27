import React, { useEffect, useState } from 'react';
import cls from './content.module.scss';

import avatar from 'shared/assets/test-content/foto.png';
import iconAdd from 'shared/assets/test-content/add.svg';
import { Title3, Title4 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';

import like from 'shared/assets/test-content/like.svg';
import dislike from 'shared/assets/test-content/dislike.svg';

import check from 'shared/assets/test-content/check.svg';
import close from 'shared/assets/test-content/close.svg';
import { InnerCatalogContent2Structure } from './catalog-inner-content2-structure';
import { Modal22 } from 'widgets/modals/modal22';
import { useParams } from 'react-router';
import { useCreateChapter, useMediaLib, useQuest } from './model';
import { useDrop } from 'widgets/DropFile/model';
import { InnerCatalogContent2ChapterBody } from './catalog-inner-content2-chapter-body';
import { Tabs } from 'shared/ui/tabs';
import { useSelector } from 'react-redux';
import { InnerCatalogContent2bottomPanel } from './catalog-inner-content2-bottom-panel';

export const InnerCatalogContent2 = props => {
  const { id } = useParams();
  const userId = useSelector(state => state.userReducer.user.pk);

  const questData = useQuest(id);
  const { createGraphvariant } = useCreateChapter(id, questData.getQuestStructure);
  const { currentBranch, setCurrentBranch } = questData;
  // const { isDragActive, resetState, files, inputRef, setFiles, getRootProps, getInputProps, handleUpload } = useDrop();
  const [files, setFiles] = useState(null);

  const mediaLibData = useMediaLib(id, files, props.structure);
  const { getMedia, isOpen, setIsOpen } = mediaLibData;
  const multipleBranch = !!questData.structure.filter(i => i.branch !== 1).length;

  useEffect(() => {
    getMedia();
  }, []);

  const processing_graph = questData.structure.filter(item => {
    if (!item.winner_graph && !item.chapters_list.map(c => c.user.id).includes(userId)) {
      return true;
    }
    return false;
  });
  const processing_graph_id = processing_graph.length ? processing_graph[0].id : null;

  return (
    <div className={cls.content}>
      <Modal22 {...props} isOpen={isOpen} setIsOpen={setIsOpen} {...mediaLibData} files={files} setFiles={setFiles} />
      <div className={cls.top}>
        <div className={cls.titles}>
          <span className={cls.desc}>Название сюжета</span>
          <Title3 className={cls.title}>{props?.state?.name}</Title3>
        </div>
        <div className={cls.btns}>
          <Button
            className={cls.btn}
            type={ButtonTypes.secondary}
            size={ButtonSizes.small}
            onClick={() => setIsOpen(true)}
          >
            Смотреть медиа
          </Button>
          {processing_graph_id && (
            <Button
              className={cls.btn}
              type={ButtonTypes.secondary}
              size={ButtonSizes.small}
              onClick={() => createGraphvariant(processing_graph_id)}
            >
              Продолжить писать
            </Button>
          )}
        </div>
      </div>
      <div className={cls.left}>
        <Title3 className={cls.title}>Структура сюжета</Title3>
        {multipleBranch && (
          <Tabs
            name={'plot-by-activity'}
            active={currentBranch}
            onChange={e => {
              setCurrentBranch(Number(e.target.value));
            }}
            items={[
              {
                label: '1 ветвь',
                value: 1,
                id: 1,
              },
              {
                label: '2 ветвь',
                value: 2,
                id: 2,
              },
            ]}
          />
        )}
      </div>
      <InnerCatalogContent2Structure
        {...props}
        {...questData}
        createGraphvariant={createGraphvariant}
        currentBranch={currentBranch}
      />
      <InnerCatalogContent2ChapterBody {...props} {...questData} />
      {questData.currentChapter.winner !== 'W' && <InnerCatalogContent2bottomPanel {...questData} />}
    </div>
  );
};
