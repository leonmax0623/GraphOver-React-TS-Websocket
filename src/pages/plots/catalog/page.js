import React, { useEffect } from 'react';
import { MainLayout } from 'shared/ui/main-layout';
import { HeaderMain } from 'widgets/header-main';
import { SidebarMain } from 'widgets/sidebar-main';
import { PlotsCatalog } from 'features/plots/catalog';
import { FooterMain } from '../../../widgets/footer-main';
import { HeaderMain1 } from 'widgets/header-main-client';
import { Carousel } from 'react-responsive-carousel';
import { Card, ShadowSizes } from 'shared/ui/card';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import cls from './style.module.scss';
import sl1 from 'shared/assets/test-content/_111.jpg';
import sl2 from 'shared/assets/test-content/_222.jpg';
import sl3 from 'shared/assets/test-content/_333.jpg';

import './carousel.scss';
import classNames from 'classnames';
import { useSliderSettings } from 'widgets/profile-admin/components/Socials copy/model';
import { useSelector } from 'react-redux';
import { HeaderAdmin } from 'widgets/header-main-admin';
import { SidebarAdmin } from 'widgets/sidebar-main copy';

export const Slider = () => {
  const { settings, getSliderSettings } = useSliderSettings();

  useEffect(() => {
    getSliderSettings();
  }, []);

  // console.log(settings);
  return (
    <Card className={classNames(cls.card, cls.cardSlider)} shadowSize={ShadowSizes.big}>
      <Carousel
        className="my-carousel"
        autoPlay
        infiniteLoop
        // renderIndicator={() => {}}
        renderThumbs={() => {}}
        // renderArrowNext={() => {}}
        // renderArrowPrev={() => {}}
        showStatus={false}
        interval={settings?.time_to_swap || 3000}
      >
        {settings?.sliders
          ?.filter(s => s.id !== 7 && s.id !== 8)
          ?.map(s => (
            <div className="carousel-slide" key={s.id}>
              <img src={'https://graphover.ru' + s.image} />
            </div>
          ))}
        {/* <div className="carousel-slide">
          <img src={sl2} />
        </div>
        <div className="carousel-slide">
          <img src={sl3} />
        </div> */}
      </Carousel>
    </Card>
  );
};

export const PlotsCatalogPage = () => {
  const is_administrator = useSelector(state => state.userReducer.user.is_administrator);

  return (
    <MainLayout
      header={is_administrator ? <HeaderAdmin /> : <HeaderMain1 />}
      sidebar={is_administrator ? <SidebarAdmin /> : <SidebarMain />}
      footer={!is_administrator && <FooterMain />}
    >
      <Slider />
      <PlotsCatalog />
    </MainLayout>
  );
};
