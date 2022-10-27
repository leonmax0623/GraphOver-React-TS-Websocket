import React from 'react';
import { useEffect, useRef, useState } from 'react';
import cls from './filter-toggle.module.scss';
import { Icon, IconNames } from 'shared/ui/icon';
import { Button, ButtonSizes, ButtonTypes } from '../../shared/ui/button';

export const FilterToggle = ({ items, onSubmit, onReset, className = null }) => {
  const [isOpen, setIsOpen] = useState(false);

  let [maxHeight, setMaxHeight] = useState(0);
  const containerRef = useRef();
  const bodyRef = useRef();

  const handleClickOutside = event => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [containerRef]);

  useEffect(() => {
    if (bodyRef) {
      if (isOpen) setMaxHeight(`${bodyRef.current.scrollHeight}px`);
      else setMaxHeight(`0px`);
    }
  }, [isOpen]);

  return (
    <div className={[cls.container, className, isOpen ? cls.open : null].join(' ')} ref={containerRef}>
      <button className={cls.header} type={'button'} onClick={() => setIsOpen(!isOpen)}>
        <span>Фильтр</span>
        <Icon className={cls.headerIcon} name={IconNames.popular.filter} size={21} />
      </button>

      <div className={cls.body} ref={bodyRef} style={{ maxHeight }}>
        <button type={'button'} className={cls.bodyHeader} onClick={() => setIsOpen(!isOpen)}>
          <span>Фильтр</span>
          <Icon className={cls.headerIcon} name={IconNames.popular.filter} size={21} />
        </button>
        <div className={cls.inner}>
          <ul className={cls.list}>
            {items.map((item, index) => (
              <li className={cls.item} key={index}>
                {item}
              </li>
            ))}
          </ul>
          {/* <Button type={ButtonTypes.primary} size={ButtonSizes.small} className={cls.button} onClick={onSubmit}>
            Применить фильтр
          </Button>
        */}
          <button className={cls.reset} onClick={onReset}>
            Сбросить
          </button>
        </div>
      </div>
    </div>
  );
};
