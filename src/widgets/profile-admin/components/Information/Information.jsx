// Import modules
import React, { useEffect, useState } from 'react';
import cls from '../../profileadmin.module.scss'

import { General } from './components/General/General';
import { Turnover } from './components/Turnover/Turnover';
import { adminPanelApi } from 'shared/api/admin-panel';

// Exports
export const Information = () => {

  const [allBits, setAllBits] = useState(0);
  const [accruedBits, setAccruedBits] = useState(0);
  const [withdrawnedBits, setWithdrawnedBits] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const { all, accrued, withdrawned } = await adminPanelApi.getServiceInformation();
      setAllBits(all);
      setAccruedBits(accrued);
      setWithdrawnedBits(withdrawned);
    };
    fetch();
  }, []);

  return (
    <div className={cls.checkInfo}>
      <General bits={allBits} />
      <Turnover
        accrued={ accruedBits }
        withdrawned={ withdrawnedBits }
      />
    </div>
  );
}
