import React from 'react';

import cls from './author.module.scss'

import { Caption, Title3, Title2, Title4, Title5 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextInput } from 'shared/ui/text-input';

import foto from 'shared/assets/test-content/foto.png';
import chat from 'shared/assets/test-content/ico2-blue.svg';

import { PlotsCatalogHistory } from 'features/plots/catalog-history';

export const History = () => {

    return (
        <div className={cls.container}>
            <PlotsCatalogHistory />
        </div>
    )
}