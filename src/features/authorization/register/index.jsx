import cls from './form.module.scss';
import { Link } from 'shared/ui/link';
import { paths } from 'shared/paths';
import { TextInput, TextInputStatuses } from 'shared/ui/text-input';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Tabs } from 'shared/ui/tabs';

import { useRegistration } from '../model';
import { Radio } from 'shared/ui/radio';
import makeId from 'shared/lib/makeId';

export const RegisterForm = () => {
  const { state, onSubmit, actions, err } = useRegistration();
  const pass_err = err.non_field_errors || err.password1;
  const pass_err_text = (err.non_field_errors && err.non_field_errors[0]) || (err.password1 && err.password1[0]);
  const username_err = err.username;
  const username_err_text = err.username && err.username[0];
  const email_err = err.email;
  const email_err_text = err.email && err.email[0];
  const fio_err = err.fio;
  const fio_err_text = err.fio && err.fio[0];

  return (
    // <FormProvider {...formMethods}>
    <form className={cls.form} onSubmit={onSubmit}>
      <p className={cls.title}>Регистрация</p>
      <p className={cls.switch}>
        У вас уже есть учетная запись?{' '}
        <Link to={paths.login} className={cls.link}>
          Войти
        </Link>
      </p>
      <Tabs
      className={cls.tabs}
        name={'plot-by-activity'}
        onChange={e => {
          console.log(e.target.value);
          actions.setRole(e.target.value);
        }}
        
        active={state.role}
        items={[
          {
            label: 'Автор',
            value: 'author',
            id: 'author',
          },
          {
            label: 'Заказчик',
            value: 'customer',
            id: 'customer',
          },
        ]}
      />
      <TextInput
        value={state.fio}
        onChange={e => actions.setFio(e.target.value)}
        className={cls.item}
        placeholder={'Ваша Фамилия Имя Отчество'}
        label={'ФИО'}
        id={'fio'}
        message={fio_err}
        status={fio_err_text ? TextInputStatuses.error : TextInputStatuses.default}
      />

      <TextInput
        value={state.username}
        onChange={e => actions.setUsername(e.target.value)}
        className={cls.item}
        placeholder={'Придумайте никнейм'}
        label={'Никнейм'}
        id={undefined}
        message={username_err}
        status={username_err_text ? TextInputStatuses.error : TextInputStatuses.default}
      />

      <TextInput
        value={state.email}
        onChange={e => actions.setEmail(e.target.value)}
        className={cls.item}
        label={'Email'}
        placeholder={'Ваш адрес электронной почты'}
        inputType={'emal'}
        id={undefined}
        message={email_err}
        status={email_err_text ? TextInputStatuses.error : TextInputStatuses.default}
      />

      <TextInput
        value={state.password1}
        onChange={e => actions.setPassword1(e.target.value)}
        className={cls.item}
        label={'Пароль'}
        placeholder={'Ваш пароль'}
        id={undefined}
        inputType='password'
        message={pass_err}
        status={pass_err_text ? TextInputStatuses.error : TextInputStatuses.default}
      />

      <Radio
        value={state.approve}
        onChange={e => actions.setApprove(e)}
        className={cls.approval}
        id={makeId(5)}
        name={'approval'}
        label={'Я соглашаюсь с правилами сайта'}
      />

      <Button
        disabled={!state.approve}
        className={cls.button}
        type={ButtonTypes.primary}
        buttonType="submit"
        size={ButtonSizes.huge}
      >
        Регистрация
      </Button>
    </form>
    // </FormProvider>
  );
};
