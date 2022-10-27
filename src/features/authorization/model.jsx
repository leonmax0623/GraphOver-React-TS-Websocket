/* eslint-disable react-hooks/rules-of-hooks */
import { useLocalStorage } from 'app/hooks';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { authAPI } from 'shared/api/auth-api';
import { CREDENTIAL_KEY, CREDENTIAL_KEY_RESET } from './constants';

export const useAuth = () => {
  const [viewer, setViewer] = useLocalStorage(CREDENTIAL_KEY, '', false);
  const [viewerReset, setViewerReset] = useLocalStorage(CREDENTIAL_KEY_RESET, '', false);
  const isAuth = !!viewer;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState({});

  const login = credential => {
    setViewer(credential);
  };

  const logout = () => {
    setViewer(null);
    setViewerReset(null);
    window.location.reload();
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const res = await authAPI.login({ username, password });
      login(res.data.access_token);
      setViewerReset(res.data.refresh_token);
      window.location.reload();
      // reset();
      // setUser(responce.data.user);
    } catch (error) {
      // reset();
      if (error.response) {
        // Request made and server responded
        setErr(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('error.request', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  };
  const state = {
    username,
    password,
  };
  const actions = {
    setUsername,
    setPassword,
  };

  return {
    state,
    isAuth,
    viewer,
    actions,
    err,
    login,
    logout,
    onSubmit,
    viewerReset,
    setViewerReset,
  };
};

export const useRegistration = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fio, setFio] = useState('');
  const [password1, setPassword1] = useState('');
  const [approve, setApprove] = useState(false);
  const [role, setRole] = useState('author');
  // const [password2, setPassword2] = useState('');

  const [err, setErr] = useState({});

  const onSubmit = async e => {
    e.preventDefault();

    try {
      await authAPI.registration({ username, email, fio, password1, password2: password1, role: role });
      await authAPI.attachDocs({ email });
      enqueueSnackbar('Для подтверждения аккаунта вам на почту отправлено письмо', {
        variant: 'success',
        autoHideDuration: 6000,
      });
      // reset();
      navigate('/login');
    } catch (error) {
      // setErr();
      if (error.response) {
        // Request made and server responded
        setErr(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('error.request', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  };
  const state = {
    username,
    password1,
    email,
    fio,
    approve,
    role,
  };
  const actions = {
    setUsername,
    setPassword1,
    setEmail,
    setFio,
    setApprove,
    setRole,
  };

  return { onSubmit, state, actions, err };
};

export const refresh = async () => {
  // localStorage.setItem('refresh_token')
  localStorage.setItem('access_token', null);
  const refresh_token = localStorage.getItem('refresh_token');
  if (JSON.parse(refresh_token) !== null) {
    try {
      const { data } = await authAPI.refresh(JSON.parse(refresh_token));
      localStorage.setItem('access_token', JSON.stringify(data.access));
      // window.location.reload();
    } catch (err) {
      console.log(err.response);
      if (err.response.status === 401) {
      }
      localStorage.setItem('refresh_token', null);
      // window.location.reload();
    }
  }
};
