import { useState } from 'react';
import cls from './write.module.scss';

import iconSend from 'shared/assets/test-content/send.svg';
// import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';

export const MessageWrite = ({ sendMessage, currentUser, files, setfiles }) => {
  const [value, setValue] = useState('');

  const userId = useSelector(state => state.userReducer.user.pk);

  const LoogedInUser = useSelector(state => state.userReducer.user);

  const createBody = () => {
    const form = new FormData();
    form.append('body', value);
    if (files.length) {
      // console.log(files);
      form.append('media', files[0]);
    }
    return form;
  };

  const handleSubmit = e => {
    console.log("FILESE =>", files)
    e.preventDefault();
    sendMessage(userId, currentUser, createBody());
    setValue('');
    setfiles([]);
  };

  const appendFile = e => {
    e.preventDefault();
    setfiles([...e.target.files, ...files]);
  };

  return (
    <form className={cls.container} onSubmit={handleSubmit}>
      <img className={cls.picture} src={LoogedInUser.avatar} alt="foto" />
      <input
        className={cls.input}
        placeholder="Написать сообщение"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div className={[cls.loadFile].join(' ')}>
        <input multiple id="load" type={'file'} className={cls.fiel} onChange={e => appendFile(e)} />
        {files.length > 0 && <span className={cls.flsCnt}>{files.length}</span>}

        <label className={cls.label} htmlFor={'load'}></label>
      </div>
      <button className={cls.btnSend} type="sumbit">
        <img src={iconSend} alt="iconSend" />{' '}
      </button>
    </form>
  );
};
