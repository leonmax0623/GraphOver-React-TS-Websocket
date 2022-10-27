import React from 'react';
import cls from './profileadmin.module.scss';

import { Replenishment } from './components/Replenishment/Replenishment';
import { Information } from './components/Information/Information';
import { Statistics } from './components/Statistics/Statistics';
import { Settings } from './components/Settings/Settings';
import { Rewards } from './components/Reward/Rewards';
import { Socials } from './components/Socials/Socials';
import { Complaints } from './components/Complaints/Complaints';
import { Users } from './components/Users/Users';
import { SliderSettings } from './components/Socials copy/SliderSettings';

export const AdminProfile = () => {
  return (
    <>
      <div className={cls.container}>
        {/* <Replenishment /> */}
        <SliderSettings />
        <Information />
        <Rewards />
        <Statistics />
        <Settings />
        {/* <Socials /> */}
      </div>
      {/* <Complaints />
      <Users /> */}
    </>
  );
};
