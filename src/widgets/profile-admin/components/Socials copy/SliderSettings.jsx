// Import modules
import React, { useEffect } from 'react';
import cls from '../../profileadmin.module.scss';
import { ReactComponent as PlusIcon } from 'shared/assets/test-content/add.svg';
import { Title3, Title4 } from 'shared/ui/typography';
import { SocialList } from './components/SocialList';
import { useSliderSettings } from './model';
import { Tooltip } from '@mui/material';

// Exports
export const SliderSettings = () => {
  const { settings, getSliderSettings, removeSlide, appendFile } = useSliderSettings();

  useEffect(() => {
    getSliderSettings();
  }, []);

  return (
    <div className={cls['slider-settings']}>
      <div className={cls.topTitle}>
        <Title4 className={cls.title}>Настройки слайдера</Title4>
        <Tooltip title="Рекомендуемый размер изображения 1920х240">
          <div className={cls.addSlide}>
            <input multiple id="load" type={'file'} className={cls.file} onChange={e => appendFile(e)} />
            <label className={cls.label} htmlFor={'load'}>
              <PlusIcon />
            </label>
          </div>
        </Tooltip>
      </div>
      <div className={cls.list}>
        {settings?.sliders?.map(s => (
          <div className={cls.sliderItem}>
            <p className={cls.sliderLink}>{s.image.replace(/\/media\/images\/slider\/media/g, '')}</p>
            <div className={cls.actions}>
              <a href={s.image} target="_blank" className={cls.sliderItem} rel="noreferrer">
                Посмотреть
              </a>
              <a
                href={'#'}
                className={cls.sliderItem}
                onClick={e => {
                  e.preventDefault();
                  removeSlide(s.id);
                }}
              >
                Удалить
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
