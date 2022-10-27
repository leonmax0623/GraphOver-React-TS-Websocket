import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { dataURLtoFile } from 'shared/utils/canvasPreview';
import { questAPI } from 'shared/api/quest';
import { useSnackbar } from 'notistack';

export const useStoryValidateConfig = () => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Это поле обязательно')
      .min(2, 'Это поле должно содержать от 2 до 80 символов')
      .max(80, 'Это поле должно содержать от 2 до 80 символов'),
    smallDescr: yup
      .string()
      .required('Это поле обязательно')
      .min(3, 'Это поле должно содержать от 3 до 100 символов')
      .max(100, 'Это поле должно содержать от 3 до 100 символов'),
    bigDescr: yup.string().required('Это поле обязательно').max(300, 'Это поле должно содержать от 3 до 300 символов'),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  return { register, reset, handleSubmit, errors };
};

export const useStoryValidate = () => {
  const [err, setErr] = useState({});

  const [selectedErr, setSelectedErr] = useState(false);
  const [uploadErr, setUploadErr] = useState(false);

  const resetValidateState = () => {
    setUploadErr(false);
    setSelectedErr(false);
  };

  const uploadErrReject = () => {
    setUploadErr(true);
  };

  const validateErrors = { err, selectedErr, uploadErr };

  return { validateErrors, resetValidateState, uploadErrReject, setSelectedErr, setErr };
};

export const useCreateStory = (storyValidateModel, refetchData, setIsOpen) => {
  const [imgSrc, setImgSrc] = useState('');
  const [cropSrcImg, setCropSrcImg] = useState('');
  const [file, setFile] = useState(null);
  const [selected, setSelected] = useState('');
  const [name, setname] = useState('');
  const [small_info, setsmall_info] = useState('');
  const [info, setinfo] = useState('');
  const [is_private, setprivate] = useState(false);
  const [encryption, setencryption] = useState(false);
  const [authors, setauthors] = useState([]);
  const [mode, setmode] = useState('ORDINARY');
  // ORDINARY, PROJECT, SCENARIO
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (mode === 'PROJECT' || mode === 'SCENARIO') setprivate(true);
    if (mode === 'OPEN') setprivate(false);
    if (mode === 'PRIVATE') setprivate(true);
  }, [mode]);

  const createFetchData = async data => {
    var formData = new FormData();
    formData.append('topic_name', selected);
    formData.append('name', name);
    formData.append('small_info', small_info);
    formData.append('info', info);

    if (mode === 'OPEN' || mode === 'PRIVATE') formData.append('mode', 'ORDINARY');
    else formData.append('mode', mode);
    formData.append('encryption', encryption);

    formData.append('private', is_private ? 'Sec' : 'Pub');

    if (!!cropSrcImg) {
      const _file = dataURLtoFile(cropSrcImg, file.name);
      formData.append('avatar', _file);
    } else if (!!file) {
      formData.append('avatar', file);
    }

    if(authors.length) {
      formData.append('authors', authors.join(', '));
    }

    return formData;
  };

  const onSubmit = async () => {
    storyValidateModel.resetValidateState();
    if (!selected) {
      storyValidateModel.setSelectedErr(true);
      return;
    }
    // if (!cropSrcImg && !file) {
    //   storyValidateModel.uploadErrReject();
    //   return;
    // }

    try {
      const fdata = await createFetchData();
      await questAPI.addItem(fdata);
      setSelected('');
      setIsOpen(false);
      enqueueSnackbar('Сюжет отправлен на модерацию.', {
        variant: 'success',
      });
      refetchData();
    } catch (err) {
      try {
        if (err.response) {
          if (err.response.data && Object.keys(err.response.data).length) {
            storyValidateModel.setErr(err.response.data);
            const errKeys = Object.keys(err.response.data);
            const errKey = errKeys[0];
            const errItemData = err.response.data[errKey];
            let errtext = '';
            if (Array.isArray(errItemData)) errtext = errItemData.join('; ');
            else errtext = errItemData;
            enqueueSnackbar(errtext, {
              variant: 'error',
              preventDuplicate: true,
            });
          } else {
            enqueueSnackbar('Извините, возникла ошибка. Попробуйте позже.', {
              variant: 'error',
              preventDuplicate: true,
            });
          }
        } else {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
        enqueueSnackbar('Извините, возникла ошибка. Попробуйте позже.', {
          variant: 'error',
          preventDuplicate: true,
        });
      }
    }
  };
  const state = { mode, encryption, imgSrc, cropSrcImg, file, selected, name, small_info, info, is_private, authors };
  const actions = {
    setmode,
    setencryption,
    setImgSrc,
    setCropSrcImg,
    setFile,
    setSelected,
    setname,
    setsmall_info,
    setinfo,
    setprivate,
    setauthors,
  };
  return {
    state,
    actions,
    onSubmit,
  };
};
