import React, { useState } from 'react';
import { TextInput, TextInputStatuses } from 'shared/ui/text-input';
import { Switch } from 'shared/ui/switch';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Link } from 'shared/ui/link';
import makeId from 'shared/lib/makeId';
import cls from 'shared/ui/auth-layout/form.module.scss';
import { paths } from 'shared/paths';
import { useAuth } from '../model';

export const LoginForm = () => {
  const { state, actions, err, onSubmit } = useAuth();

  const pass_err = err.non_field_errors || err.password;
  const pass_err_text = (err.non_field_errors && err.non_field_errors[0]) || (err.password && err.password[0]);
  const username_err = err.username;
  const username_err_text = err.username && err.username[0];

  return (
    <form className={cls.form} onSubmit={onSubmit}>
      <p className={cls.title}>С возвращением!</p>
      <p className={cls.switch}>
        У вас нет учетной записи?{' '}
        <Link to={paths.register} className={cls.link}>
          Зарегистрироваться
        </Link>
      </p>

      <TextInput
        label={'Имя пользователя'}
        inputType={'text'}
        placeholder={'Ваш никнейм'}
        className={cls.item}
        value={state.username}
        onChange={e => actions.setUsername(e.target.value)}
        message={username_err_text}
        status={username_err ? TextInputStatuses.error : TextInputStatuses.default}
        filled={true}
      />

      <TextInput
        label={'Пароль'}
        inputType={'password'}
        placeholder={'Ваш пароль'}
        className={cls.item}
        value={state.password}
        onChange={e => actions.setPassword(e.target.value)}
        message={pass_err_text}
        status={pass_err ? TextInputStatuses.error : TextInputStatuses.default}
      />

      {/* <Switch id={makeId(5)} name={'remember'} label={'Запомнить меня'} className={cls.toggle} /> */}

      <Button className={cls.button} type={ButtonTypes.primary} size={ButtonSizes.huge} buttonType="submit">
        Войти
      </Button>

      <p className={cls.forgot}>
        Забыли пароль?{' '}
        <Link to={paths.recoverPassword} className={cls.link}>
          Восстановить
        </Link>
      </p>
    </form>
  );
};
