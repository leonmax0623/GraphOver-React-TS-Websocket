import classNames from 'classnames';
import React from 'react';
import cls from './card-list.module.scss';

const CardList = ({ items, catalogType, className = null }) => {
  return (
    <ul className={[cls.list, className].join(' ')}>
      {items.map((item, index) => (
        <li className={classNames(cls.item, { [cls.itemCell]: catalogType === 'cells' })} key={index}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default CardList;
