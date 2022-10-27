import React, { useEffect, useState } from 'react';

import cls from './stage.module.scss'

import { Caption, Title2, Title5 } from 'shared/ui/typography';

import iconArrow from 'shared/assets/test-content/arrow.svg'

export const StageList = () => {
    return (
        <div className={cls.plotList}>
            <div className={cls.plotItem}>
                <img className={cls.pic} src={iconArrow} alt="iconArrow" />
                <Title5 className={cls.title}>Заголовок как этапа</Title5>
                <Caption className={cls.caption}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet.</Caption>
            </div>
            <div className={cls.plotItem}>
                <img className={cls.pic} src={iconArrow} alt="iconArrow" />
                <Title5 className={cls.title}>Заголовок как этапа</Title5>
                <Caption className={cls.caption}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet.</Caption>
            </div>
            <div className={cls.plotItem}>
                <img className={cls.pic} src={iconArrow} alt="iconArrow" />
                <Title5 className={cls.title}>Заголовок как этапа</Title5>
                <Caption className={cls.caption}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet.</Caption>
            </div>
            <div className={cls.plotItem}>
                <img className={cls.pic} src={iconArrow} alt="iconArrow" />
                <Title5 className={cls.title}>Заголовок как этапа</Title5>
                <Caption className={cls.caption}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet.</Caption>
            </div>
        </div>
    )
}