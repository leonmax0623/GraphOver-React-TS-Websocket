import React from 'react';
import cls from './cover-area.module.scss';

const PlotCardCover = ({
  cover = null,
  alt = null,
  width = null,
  height = null,

  className = null,
  leftTop = null,
  rightTop = null,
  leftBottom = null,
  rightBottom = null,

  withOverlay = true,
}) => {
  return (
    <div className={[cls.container, className].join(' ')}>
      {leftTop && <div className={cls.leftTop}>{leftTop}</div>}
      {rightTop && <div className={cls.rightTop}>{rightTop}</div>}

      {cover && <img className={cls.cover} alt={alt} src={cover} width={width} height={height} />}

      {withOverlay && <div className={cls.overlay} />}

      {leftBottom && <div className={cls.leftBottom}>{leftBottom}</div>}
      {rightBottom && <div className={cls.rightBottom}>{rightBottom}</div>}
    </div>
  );
};

export default PlotCardCover;
