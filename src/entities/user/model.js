import { userActions } from 'app/store/user-slice';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAPI } from 'shared/api/user';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useAccount = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const userState = useSelector(state => state.userReducer.user);
  const { notificateAxiosError } = useAxiosErrorNotificate();

  const setState = state => {
    dispatch(userActions.setUserData(state));
  };

  const [nicknameInputValue, setnicknameInputValue] = useState('');
  const [showNicknameInput, setShowNicknameInput] = useState(false);
  const [errNicknameInput, setErrNicknameInput] = useState('');

  const [nameInputValue, setnameInputValue] = useState(userState?.fio);
  const [showNameInput, setShowNameInput] = useState(false);
  const [errNameInput, setErrNameInput] = useState('');

  const getUserData = async () => {
    try {
      const res = await userAPI.getUserData();
      const { data } = res;
      setState(data);
    } catch (err) {
      console.log(err);
    }
  };
  const changeAvatar = async formData => {
    try {
      const { data } = await userAPI.postUserAvatar(formData);
      setState(data);
    } catch (err) {
      notificateAxiosError(err);
      console.log(err);
    }
  };

  const changeState = (field, value) => {
    const new_state = { ...userState };
    new_state[field] = value;

    setState(new_state);
  };

  const changeUserState = async field => {
    try {
      const _params = {};
      _params[field] = userState[field];
      await userAPI.patchUserData(_params);
      setErrNicknameInput('');
      setErrNameInput('');
      if (field === 'username') {
        setShowNicknameInput(false);
      }
      if (field === 'fio') {
        setShowNameInput(false);
      }
      getUserData();
    } catch (error) {
      notificateAxiosError(error);
      if (error.response) {
        const err = error.response.data;
        const errKey = Object.keys(err);
        if (errKey.includes('username')) {
          setErrNicknameInput(err['username'][0]);
        } else if (errKey.includes('fio')) {
          setErrNameInput(err['fio'][0]);
        }
      }
      // enqueueSnackbar("Ошибка изменения пользовательских данных", {
      //   variant: "error",
      // });
    }
  };

  const ui_state = {
    showNicknameInput,
    showNameInput,
    errNicknameInput,
    errNameInput,
    nicknameInputValue,
    nameInputValue,
  };
  const actions = { setShowNameInput, setShowNicknameInput, getUserData, setnicknameInputValue, setnameInputValue };

  return {
    userState,
    ui_state,
    actions,
    changeState,
    changeUserState,
    changeAvatar,
  };
};
