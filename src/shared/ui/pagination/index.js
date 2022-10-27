import React from 'react';
import cls from './pagination.module.scss';
import { ScreenReader } from '../screen-reader';
import { range } from './range';

export const Pagination = ({ className = null, total, current, onChange = pageNumber => null }) => {
  return (
    <ul className={[cls.list, className].join(' ')}>
      <li className={cls.item} key={'prev'}>
        <button
          className={[cls.control, cls.button, cls.prev].join(' ')}
          disabled={current === 1}
          onClick={() => onChange(current - 1)}
        >
          <svg
            className={cls.arrow}
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17 8L11 14L17 20" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <ScreenReader>Предыдущая страница</ScreenReader>
        </button>
      </li>

      {range(1, total).map(number => (
        <li className={cls.item} key={number}>
          {number === current ? (
            <span className={[cls.control, cls.page, cls.current].join(' ')}>{number}</span>
          ) : (
            <button className={[cls.control, cls.page].join(' ')} onClick={() => onChange(number)}>
              {number}
            </button>
          )}
        </li>
      ))}

      <li className={cls.item} key={'next'}>
        <button
          className={[cls.control, cls.button, cls.next].join(' ')}
          disabled={current === total}
          onClick={() => onChange(current + 1)}
        >
          <svg
            className={cls.arrow}
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17 8L11 14L17 20" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <ScreenReader>Следующая страница</ScreenReader>
        </button>
      </li>
    </ul>
  );
};
