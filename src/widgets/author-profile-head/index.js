import React, { useEffect, useState } from 'react';

import cls from './author.module.scss';

import { Caption, Title3, Title2, Title4, Title5 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextInput } from 'shared/ui/text-input';

import foto from 'shared/assets/test-content/foto.png';
import chat from 'shared/assets/test-content/ico2-blue.svg';
import { useAccount } from 'entities/user/model';
import { CropComponent } from 'widgets/CropFile';
import { useCrop } from 'widgets/CropFile/hooks';
import { useDrop } from 'widgets/DropFile/model';
import { dataURLtoFile } from 'shared/utils/canvasPreview';
import { ModalPromo } from 'widgets/modals/modal-promo';
import { usePromo, useVerify } from './model';
import { ModalSendverify } from 'widgets/modals/modal-send-verify';

export const ProfileAuthorHead = () => {
  const { userState, actions, ui_state, changeUserState, changeState, changeAvatar } = useAccount();
  const [openDrop, setOpenDrop] = useState(false);
  const [openPromo, setOpenPromo] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);

  const { enterPromo } = usePromo();
  const { sendVerify } = useVerify();

  const [imgSrc, setImgSrc] = useState('');
  const [cropSrcImg, setCropSrcImg] = useState('');
  const [file, setFile] = useState(null);

  const cropModel = useCrop(actions.setCropSrcImg);
  const dropModel = useDrop({ accept: 'image/*' });

  const { files } = dropModel;

  const saveCallback = () => {
    const formData = new FormData();
    if (!!cropSrcImg) {
      const _file = dataURLtoFile(cropSrcImg, file.name);
      formData.append('avatar', _file);
    } else if (!!file) {
      formData.append('avatar', file);
    }

    changeAvatar(formData);
    setOpenDrop(false);
  };

  return (
    <div className={cls.userProfile}>
      <div className={cls.picture}>
        <img src={userState?.avatar} alt={'foto'} />
        <span
          className={cls.edit}
          onClick={() => {
            setOpenDrop(true);
          }}
        ></span>
      </div>
      <div className={cls.info}>
        <div className={cls.line}>
          {ui_state.showNameInput ? (
            <input value={userState?.username} onChange={e => changeState('username', e.target.value)} />
          ) : (
            <span className={cls.nikname}>{userState?.username}</span>
          )}

          {/* <span className={[cls.status, cls.ok].join(' ')}>Подтвержден</span> */}
        </div>
        <div className={cls.line}>
          {ui_state.showNameInput ? (
            <input value={userState?.fio} onChange={e => changeState('fio', e.target.value)} />
          ) : (
            <span className={cls.name}>{userState?.fio}</span>
          )}
          {ui_state.showNameInput ? (
            <a
              className={cls.edit}
              onClick={() => {
                if (userState?.fio && userState?.username) {
                  changeUserState('fio');
                  changeUserState('username');
                  actions.setShowNameInput(false);
                }
              }}
            >
              сохранить
            </a>
          ) : (
            <a
              className={cls.edit}
              onClick={() => {
                actions.setShowNameInput(true);
              }}
            >
              изменить
            </a>
          )}
        </div>
      </div>
      <div className={cls.btns}>
        {/* <span className={cls.icon}>
          <img src={chat} />
        </span> */}
        <Button
          className={cls.btn}
          type={ButtonTypes.primary}
          size={ButtonSizes.small}
          onClick={() => setOpenPromo(true)}
        >
          Ввести промокод
        </Button>
        {!userState?.verified && (
          <Button
            className={cls.btn}
            type={ButtonTypes.primary}
            size={ButtonSizes.small}
            onClick={() => setOpenVerify(true)}
          >
            Запрос на верификацию
          </Button>
        )}
      </div>
      {openPromo && <ModalPromo isOpen={openPromo} setIsOpen={setOpenPromo} handleAccept={enterPromo} />}
      {openVerify && <ModalSendverify isOpen={openVerify} setIsOpen={setOpenVerify} handleAccept={sendVerify} />}
      <CropComponent
        setFile={setFile}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        cropSrcImg={cropSrcImg}
        setCropSrcImg={setCropSrcImg}
        // uploadErr={uploadErr}
        maxWidth={720}
        maxHeight={550}
        openDrop={openDrop}
        setOpenDrop={setOpenDrop}
        cropModel={cropModel}
        dropModel={dropModel}
        saveCallback={saveCallback}
      />
    </div>
  );
};
