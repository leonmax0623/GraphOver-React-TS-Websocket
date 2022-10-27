import React, { useState } from 'react';
import cls from './write-textarea.module.scss';

import foto from 'shared/assets/test-content/foto.png';

import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { useSelector } from 'react-redux';

export const MessageWriteTextArea = ({
  textAreaPlaceHolder = 'Написать сообщение',
  textButton = 'Написать сообщение',
  setNewComment,
  newComment,
  handleClick,
}) => {
  const avatar = useSelector(state => state.userReducer.user.avatar);
  return (
    <form
      className={cls.container}
      onSubmit={e => {
        e.preventDefault();
        setNewComment();
      }}
    >
      <img className={cls.picture} src={avatar} alt="foto" />
      <textarea
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        className={cls.input}
        placeholder={textAreaPlaceHolder}
      />
      <div className={cls.controls}>
        <Button
          size={ButtonSizes.small}
          type={ButtonTypes.primary}
          className={[cls.btn].join(' ')}
          // buttonType={'submit'}
          onClick={handleClick}
        >
          {textButton}
        </Button>
      </div>
    </form>
  );
};
