import { useRef, useState } from 'react';

export const useCrop = setCropSrcImg => {
  const [openCrop, setOpenCrop] = useState(false);
  const imgRef = useRef(null);

  const handleOpen = () => {
    setOpenCrop(true);
  };

  const handleClose = () => {
    setOpenCrop(false);
  };

  const handleCloseAndSave = async () => {
    setOpenCrop(false);
    try {
      const canvas = imgRef.current.getImage();
      const _dataImg = canvas.toDataURL('image/png');
      setCropSrcImg(_dataImg);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    openCrop,
    imgRef,
    handleOpen,
    setOpenCrop,
    handleClose,
    handleCloseAndSave,
  };
};
