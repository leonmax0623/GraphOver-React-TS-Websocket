import React from 'react';
import {AuthLayout} from "shared/ui/auth-layout";
import {HeaderAuth} from "widgets/header-auth";
import {RecoverPasswordForm} from 'features/authorization/recover-password'

export const RecoverPassword = () => {
    return (
        <AuthLayout header={<HeaderAuth/>}>
            <RecoverPasswordForm/>
        </AuthLayout>
    );
};
