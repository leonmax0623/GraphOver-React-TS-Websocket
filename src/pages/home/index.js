import React from 'react';
import { NavLink } from 'react-router-dom';
import { paths } from '../../shared/paths';

export const HomePage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Список страниц</h1>
      <ul>
        <li><NavLink to={paths.login}>Вход</NavLink></li>
        <li><NavLink to={paths.register}>Регистрация</NavLink></li>
        <li><NavLink to={paths.recoverPassword}>Восстановить пароль</NavLink></li>
        <li><NavLink to={paths.plotsCatalog}>Все сюжеты</NavLink></li>
        <li><NavLink to={paths.orders}>Доска заказов - заказчик</NavLink></li>
        <li><NavLink to={paths.tariffs}>Тарифы</NavLink></li>
        <li><NavLink to={paths.notebook}>Блокнот</NavLink></li>
        <li><NavLink to={paths.check}>Работа со счетом</NavLink></li>
        <li><NavLink to={paths.modals}>Все модальные окна</NavLink></li>
        <li><NavLink to={paths.auctions}>Аукционы</NavLink></li>
        <li><NavLink to={paths.auction}>Внутр. страница аукцион</NavLink></li>
        <li><NavLink to={paths.chat}>Чат</NavLink></li>
        <li><NavLink to={paths.plotsCatalog2}>Доска заказов - автор</NavLink></li>
        <li><NavLink to={paths.performer}>Работа исполнителя</NavLink></li>
        <li><NavLink to={paths.cataloginner}>Внутр. страница сюжета</NavLink></li>
        <li><NavLink to={paths.cataloginner2}>Внутр.страница сюжета (продолжить писать после вступления в авторы)</NavLink></li>
        <li><NavLink to={paths.profile}>Профиль Автора</NavLink></li>
        <li><NavLink to={paths.history}>История предложений(История модерации)</NavLink></li>
        <li><NavLink to={paths.customer}>Профиль Заказчика</NavLink></li>
        <li><NavLink to={paths.viewdata}>Просмотр данных по БиТ</NavLink></li>
        <li><NavLink to={paths.sub}>Управление подпиской</NavLink></li>
        <li><NavLink to={paths.profileadmin}>Профиль администратора</NavLink></li>
      </ul>
    </div>
  );
};
