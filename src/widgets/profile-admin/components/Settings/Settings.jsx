// Import modules
import React, { useEffect, useState } from 'react';
import cls from '../../profileadmin.module.scss'

import { Title4 } from 'shared/ui/typography';
import {
  Button,
  ButtonSizes,
  ButtonTypes
} from 'shared/ui/button';
import { EditableSettingsItem } from '../EditableSettingsItem/EditableSettingsItem';
import { adminPanelApi } from 'shared/api/admin-panel';

// Exports
export const Settings = () => {

  const [settingsList, setSettingsList] = useState({});
  const [isAbleToEdit, setIsAbleToEdit] = useState(false);

  const onEditButton = async () => {
    if (isAbleToEdit){
      await adminPanelApi.setSettings(settingsList);
    }
    setIsAbleToEdit(!isAbleToEdit);
  }

  useEffect(() => {
    const fetch = async () => {
      const res = await adminPanelApi.getSettings();
      setSettingsList(res.data.settings);
    }

    fetch();
  }, []);

  return (
    <div className={[cls.card, cls.infoBlock].join(' ')}>
      <div className={cls.head}>
        <Title4 className={cls.title}>Настройки</Title4>
        <Button
          className={cls.btn}
          size={ButtonSizes.small}
          type={ButtonTypes.primary}
          onClick={ onEditButton }
        >
          Изменить
        </Button>
      </div>
      <ul>
        {
          Object.entries(settingsList).map(([key, value]) => (
            <EditableSettingsItem
              key={ key }
              label={ key }
              value={ value.active_date || value.moderator_rating }
              isAbleToEdit={ isAbleToEdit }
              onInputChange={(inputValue) => {
                setSettingsList({
                  ...settingsList,
                  [key]: { ...settingsList[key], [value.active_date ? 'active_date' : 'moderator_rating'] : inputValue  }
                })
              }}
            />
          ))
        }
      </ul>
    </div>
  );
}
