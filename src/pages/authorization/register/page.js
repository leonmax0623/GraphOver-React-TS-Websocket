import React from 'react';
import {AuthLayout} from "shared/ui/auth-layout";
import {RegisterForm} from 'features/authorization/register'
import {HeaderAuth} from "widgets/header-auth";

export const RegisterPage = () => {
    return (
        <AuthLayout header={<HeaderAuth/>}>
            <RegisterForm/>
        </AuthLayout>
    );
};
