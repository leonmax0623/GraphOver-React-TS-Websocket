import React, { useState } from 'react';

import cls from './styles.module.scss';
import classes from 'widgets/CropFile/style.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';
import { SelectInput, SelectInputStatuses } from 'shared/ui/select-input';
import { useSnackbar } from 'notistack';
import { useCreateStory, useStoryValidate, useStoryValidateConfig } from './model';
import { useSelector } from 'react-redux';
import { Radio } from 'shared/ui/radio';
import { CropComponent } from 'widgets/CropFile';
import { useCrop } from 'widgets/CropFile/hooks';
import { useDrop } from 'widgets/DropFile/model';
import { ModalSelectAuthors } from '../modal-select-authors';

const createOptionsFromTopics = topics => {
  let options = [];
  topics.forEach(social => options.push({ id: social.name, value: `${social.name}`, label: `${social.name}` }));
  return options;
};

export const ModalCreatePlot = ({ isOpen, setIsOpen, refetchData, topics }) => {
  const { enqueueSnackbar } = useSnackbar();
  const is_moderator = useSelector(state => state.userReducer.user.is_moderator);
  const [openDrop, setOpenDrop] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const storyValidateModel = useStoryValidate();
  const { err, selectedErr, uploadErr } = storyValidateModel.validateErrors;
  const { state, actions, onSubmit } = useCreateStory(storyValidateModel, refetchData, setIsOpen);
  const options = createOptionsFromTopics(topics);
  const cropModel = useCrop(actions.setCropSrcImg);
  const dropModel = useDrop({ accept: 'image/*' });
  const { openCrop, imgRef, handleClose, handleOpen, handleCloseAndSave } = cropModel;
  const { files } = dropModel;

  const handleOpenDrop = () => {
    setOpenDrop(true);
    handleClose();
  };

  const OpenCropBtn = () => {
    return (
      <div className={classes.textBtn}>
        <div className={classes.imgDropBtn} onClick={handleOpenDrop}>
          <p>Добавить картинку</p>
        </div>
        {/* <ReactTooltip>
            Загрузите картинку размером не более ${maxWidth}х${maxHeight}. Если изображение не соответствует размерам, вам
            будет предложено его обрезать после нажатия кнопки "Предложить". Если вы хотите изменить выбор картинки
            картинки - нажмите на выделенную пунктиром область еще раз.
          </ReactTooltip> */}
        {/* <Tooltip
            title={`Загрузите картинку размером не более ${maxWidth}х${maxHeight}.
        Если изображение не соответствует размерам, вам будет предложено его обрезать после нажатия кнопки "Предложить".
        Если вы хотите изменить выбор картинки картинки - нажмите на выделенную пунктиром область еще раз.`}
          >
            <span className={classes.iconQWapper}>
              <QuestionMarkIcon fontSize="small" />
            </span>
          </Tooltip> */}

        {files.length === 0 && uploadErr ? (
          <span style={{ color: 'red', fontSize: 14 }}>Выберите картинку</span>
        ) : (
          <span className={classes['filename']}>{files.length > 0 && files[0].name}</span>
        )}
      </div>
    );
  };

  return (
    <>
      <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
        <BtnCloseModal setIsOpen={setIsOpen} />
        <Title3 className={cls.title}>Предложить сюжет</Title3>
        <SelectInput
          value={state.selected}
          changeHandler={actions.setSelected}
          color={'rgba(26, 26, 26, 0.5);'}
          paddingLeft={'8px'}
          className={cls.sort}
          placeholder={'Выберите категорию'}
          options={options}
          status={selectedErr && SelectInputStatuses.error}
          message={selectedErr && 'Это поле обязательно'}
        />
        <SelectInput
          value={state.mode}
          changeHandler={actions.setmode}
          color={'rgba(26, 26, 26, 0.5);'}
          paddingLeft={'8px'}
          className={cls.sort}
          placeholder={'Выберите тип сюжета'}
          options={[
            {
              value: 'OPEN',
              label: 'Открытый',
            },
            {
              value: 'PRIVATE',
              label: 'Приватный',
            },
            {
              value: 'PROJECT',
              label: 'Проект',
            },
            {
              value: 'SCENARIO',
              label: 'Сценарий',
            },
          ]}
          //   status={selectedErr && SelectInputStatuses.error}
          //   message={selectedErr && 'Это поле обязательно'}
        />
        <TextInput
          value={state.name}
          onChange={e => actions.setname(e.target.value)}
          className={cls.textInput}
          placeholder="Название"
          message={(err.name && err.name[0]) || ''}
          status={err.name && SelectInputStatuses.error}
        />
        <TextArea
          value={state.small_info}
          onChange={e => actions.setsmall_info(e.target.value)}
          className={cls.textArea}
          placeholder="Краткое описание"
          message={(err.small_info && err.small_info[0]) || ''}
          status={err.small_info && SelectInputStatuses.error}
        ></TextArea>
        <TextArea
          value={state.info}
          onChange={e => actions.setinfo(e.target.value)}
          className={cls.textArea}
          placeholder="Описание"
          message={(err.info && err.info[0]) || ''}
          status={err.info && SelectInputStatuses.error}
        ></TextArea>
        {(state.mode === 'PROJECT' || state.mode === 'SCENARIO') && (
          <p onClick={() => setOpenUsers(true)} style={{ cursor: 'pointer' }}>
            Пригласить участников {`(${state.authors.length})` || ''}
          </p>
        )}
        {/* {is_moderator && ( */}
        {(state.mode === 'PROJECT' || state.mode === 'SCENARIO') && (
          <Radio
            onChange={actions.setencryption}
            value={state.encryption}
            className={cls.approval}
            label={'Зашифрованный сюжет'}
          />
        )}
        {/* )} */}
        <div className={cls.wrapper}>
          <OpenCropBtn />
          {/* <CropComponent
            setFile={actions.setFile}
            imgSrc={state.imgSrc}
            setImgSrc={actions.setImgSrc}
            cropSrcImg={state.cropSrcImg}
            setCropSrcImg={actions.setCropSrcImg}
            uploadErr={uploadErr}
            maxWidth={720}
            maxHeight={550}
          /> */}
        </div>
        <Button
          size={ButtonSizes.medium}
          type={ButtonTypes.primary}
          onClick={() => {
            onSubmit();
          }}
          className={cls.btn}
        >
          Отправить на модерацию
        </Button>
      </Modal>
      <ModalSelectAuthors
        isOpen={openUsers}
        setIsOpen={setOpenUsers}
        authors={state.authors}
        setAuthors={actions.setauthors}
      />
      <CropComponent
        setFile={actions.setFile}
        imgSrc={state.imgSrc}
        setImgSrc={actions.setImgSrc}
        cropSrcImg={state.cropSrcImg}
        setCropSrcImg={actions.setCropSrcImg}
        uploadErr={uploadErr}
        maxWidth={720}
        maxHeight={550}
        openDrop={openDrop}
        setOpenDrop={setOpenDrop}
        cropModel={cropModel}
        dropModel={dropModel}
      />
    </>
  );
};
