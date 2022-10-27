import React from 'react';
import cls from './vertical-navigation.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from 'shared/ui/icon';
import { useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';
import { ReactComponent as Wallet } from 'shared/assets/menu-toggle/cart.svg';

const linkClass = ({ isActive }) => [cls.link, isActive ? cls.current : null].join(' ');

/**
 *
 * @param {Array.<{to: String, iconName: String, label: String}>} items
 * @param ?collapse
 * @returns {JSX.Element}
 */
export const VerticalNavigation = ({ items, collapse = true }) => {
  const subscription = useSelector(state => state.userReducer.user.subscription);
  const role = useSelector(state => state.userReducer.user.role);
  return (
    <nav className={[cls.container, collapse ? cls.collapse : null].join(' ')}>
      <ul className={cls.list}>
        {items.map((item, index) => {
          if (role !== 'customer' && item.baseBlock && (!subscription || subscription.level === 'BASE'))
            return (
              <li className={cls.item} key={index}>
                <Tooltip title="Для получения доступа к данной функции нужно улучшить тариф до PRO">
                  <Link to={'/tariffs'} className={cls['link-unactive']}>
                    <span className={cls.iconContainer}>
                      <Icon className={cls.icon} name={item['iconName']} size={24} />
                    </span>
                    <span className={cls.label}>{item['label']}</span>
                  </Link>
                </Tooltip>
              </li>
            );
          return (
            <li className={cls.item} key={index}>
              <NavLink to={item['to']} className={linkClass}>
                {item['label'] === 'Просмотр данных по БиТ' ? (
                  <span className={cls.iconContainerN}>
                    <Wallet />
                  </span>
                ) : (
                  <span className={cls.iconContainer}>
                    <Icon className={cls.icon} name={item['iconName']} size={24} />
                  </span>
                )}

                <span className={cls.label}>{item['label']}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
