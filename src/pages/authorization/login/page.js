import React from 'react';
import {LoginForm} from "features/authorization/login";
import {AuthLayout} from "shared/ui/auth-layout";
import {HeaderAuth} from "widgets/header-auth";

export const LoginPage = () => {
    return (
        <AuthLayout header={<HeaderAuth/>}>
            <LoginForm/>
        </AuthLayout>
    );
};
