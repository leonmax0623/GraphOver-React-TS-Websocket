// Import modules
import React, { useEffect, useState } from 'react';
import cls from '../../profileadmin.module.scss'
import { ProfileState } from 'widgets/profile-state';
import { adminPanelApi } from '../../../../shared/api/admin-panel';

// Exports
export const Statistics = () => {

  const [statistics, setStatistics] = useState({
    all: 1,
    base: 1,
    bussiness: 1,
    pro: 1,
    without: 1
  });

  useEffect(() => {
    const fetch = async () => {
      const { data: response } = await adminPanelApi.getServiceStatistics();
      setStatistics(response);
    }

    fetch();
  }, [])

  return (
    <div className={cls.stateBlock}>
      <ProfileState
        all={ statistics.all }
        without={{
          percentage: Math.round(statistics.without / statistics.all * 100),
          value: statistics.without
        }}
        basic={{
          percentage: Math.round(statistics.base / statistics.all * 100),
          value: statistics.base
        }}
        pro={{
          percentage: Math.round(statistics.pro / statistics.all * 100),
          value: statistics.pro
        }}
        business={{
          percentage: Math.round(statistics.bussiness / statistics.all * 100),
          value: statistics.bussiness
        }}
        donutInnerPercents={ Math.round((statistics.all - statistics.without) / statistics.all * 100) }
      />
    </div>
  );
}
