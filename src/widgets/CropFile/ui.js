import { useRef, useState, useEffect } from 'react';
import { getCroppedImg } from './model';
import { useCrop } from './hooks';
// import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
// import { Modal, Tooltip } from '@mui/material';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
import classes from './style.module.scss';
// import SugestModal from 'components/SugestModal/SugestModal';
// import DropFile from 'components/DropFile/DropFile';
// import { useDrop } from 'components/DropFile/model';

import AvatarEditor from 'react-avatar-editor';
import ReactTooltip from 'react-tooltip';
import { useDrop } from 'widgets/DropFile/model';
import DropFile from 'widgets/DropFile/DropFile';
import classNames from 'classnames';
import { Modal8 } from 'widgets/modals/modal8';
import { Modal10 } from 'widgets/modals/modal10';

export const CropComponent = ({
  imgSrc,
  setImgSrc,
  setFile,
  cropSrcImg,
  setCropSrcImg,
  openDrop,
  setOpenDrop,
  uploadErr,
  file,
  renderProfileBtnItem = false,
  maxWidth = 720,
  maxHeight = 550,
  borderRadius = 0,
  fetchCallback,
  cropModel,
  dropModel,
  saveCallback,
  ...props
}) => {
  const [fileLoad, setFileLoad] = useState(false);
  const [fileSize, setFileSize] = useState({
    width: 0,
    height: 0,
  });
  const { openCrop, imgRef, handleClose, handleOpen, setOpenCrop, handleCloseAndSave } = cropModel;
  const { files, getRootProps, getInputProps, resetState } = dropModel;

  const handleOpenDrop = () => {
    setOpenDrop(true);
    handleClose();
  };
  const handleCloseDrop = () => {
    setOpenDrop(false);
    resetState();
  };
  const getScale = () => {
    let scale = 1;
    let scaledSize = fileSize.width;
    let maxSize = maxWidth;

    if (fileSize.width / maxWidth > fileSize.height / maxHeight) {
      scaledSize = fileSize.height;
      maxSize = maxHeight;
    }

    if (scaledSize > maxSize) {
      scale = scaledSize / maxSize;
    } else {
      // scale = 1;
      // scale = maxSize / scaledSize;
    }
    // console.log(scaledSize, maxSize, scale);
    // scale = 1;
    return scale;
  };

  useEffect(() => {
    if (fileLoad) {
      handleOpen();
    }
  }, [fileLoad]);

  const TmpProfileBtn = () => {
    return (
      <div className={classes.profileBtn}>
        <p>
          Загрузите картинку размером не более {maxWidth}х{maxHeight}. Если изображение не соответствует размерам , вам
          будет предложено его обрезать после нажатия кнопки "Предложить". Для загрузки изображения на сервер, нажмите
          кнопку отправить.
        </p>
        <div className={classes.textBtn}>
          {files.length === 0 && uploadErr ? (
            <span className={classes['filename']} style={{ color: 'red', fontSize: 12 }}>
              Выберите картинку
            </span>
          ) : (
            <span className={classes['filename']}>{files.length > 0 && files[0].name}</span>
          )}
          <div className={classes.btnsBlock}>
            <div className={classes.imgDropBtn} onClick={handleOpenDrop}>
              <p>Предложить</p>
            </div>
            <div
              className={classNames(classes.imgDropBtn, { [classes.disable]: !!!file })}
              onClick={() => {
                if (!!file) {
                  fetchCallback();
                  setOpenDrop(false);
                }
              }}
            >
              <p>Отправить</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleCloseDropAndSave = () => {
    if (files.length > 0) {
      setOpenDrop(false);
      var reader = new FileReader();
      const file = files[0];
      setFile(file);
      setFileLoad(false);
      reader.onload = function (theFile) {
        var image = new Image();
        image.onload = function () {
          setFileSize({ width: this.width, height: this.height });
          setFileLoad(true);
        };
        image.src = theFile.target.result;
        setImgSrc(theFile.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Modal8
        isOpen={openDrop}
        setIsOpen={() => setOpenDrop(false)}
        handleClose={handleCloseDrop}
        handleCloseDropAndSave={handleCloseDropAndSave}
        title="Выберите картинку"
        files={files}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        text="Выберите или переместите картинку* JPG, PNG, GIF"
      ></Modal8>
      <Modal10 isOpen={openCrop} setIsOpen={setOpenCrop} saveCallback={saveCallback}>
        <AvatarEditor
          ref={imgRef}
          image={imgSrc}
          width={maxWidth}
          height={maxHeight}
          border={60}
          borderRadius={borderRadius}
          color={[141, 82, 196, 0.618]} // RGBA
          // scale={0.71}
          scale={getScale()}
        />
      </Modal10>
      {/* <Modal open={openCrop} onClose={handleClose}> */}
      <>
        {/* <SugestModal
          pure
          className={classes.modalWrapper}
          handleClose={handleClose}
          selector="close"
          buttonAccept={'Сохранить'}
          buttonAcceptCallback={handleCloseAndSave}
        >
          <div className={classes['cropBox']}>
            <h3>Обрезка изображения</h3>
            <p>
              Требуемый формат {maxWidth}х{maxHeight}
            </p>
            <AvatarEditor
              ref={imgRef}
              image={imgSrc}
              width={maxWidth}
              height={maxHeight}
              border={60}
              borderRadius={borderRadius}
              color={[141, 82, 196, 0.618]} // RGBA
              // scale={0.71}
              scale={getScale()}
            />
          </div>
        </SugestModal> */}
      </>
      {/* </Modal> */}
    </>
  );
};
