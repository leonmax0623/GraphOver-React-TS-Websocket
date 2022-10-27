import React from 'react';
import cls from 'shared/ui/auth-layout/form.module.scss'
import {TextInput, TextInputStatuses} from "../../../shared/ui/text-input";
import {Button, ButtonSizes, ButtonTypes} from "../../../shared/ui/button";

export const RecoverPasswordForm = () => {
    return (
        <form className={cls.form}>

            <p className={cls.title}>Восстановить пароль</p>
            <p className={cls.subtitle}>
                Введите почту, к которой вы привязывали аккаунт. На нее придет письмо для смены пароля
            </p>

            <TextInput
                label={'Email'}
                placeholder={'Ваш адрес электронной почты'}
            />

            <Button
                className={cls.button}
                type={ButtonTypes.primary}
                size={ButtonSizes.huge}
            >
                Восстановить
            </Button>

        </form>
    );
};
