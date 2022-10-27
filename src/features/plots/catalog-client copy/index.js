import React, { useState } from 'react';
import cls from './plots-catalog-client.module.scss';
import PlotCard from 'entities/plots/catalog-card';
import { model, useOrderCatalog } from './model';
import { Card, ShadowSizes } from 'shared/ui/card';
import { Title2 } from 'shared/ui/typography';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Tabs } from 'shared/ui/tabs';
import makeId from 'shared/lib/makeId';
import CardList from 'shared/ui/card-list';
import { Pagination } from 'shared/ui/pagination';
import { FilterToggle } from 'entities/filter-toggle';
import { SelectInput } from 'shared/ui/select-input';
import { SearchFieldToggle } from 'shared/ui/search-field-toggle';
import { SortingSelect } from 'shared/ui/sorting-select';
import { StageList } from 'widgets/stage-list';
import { OrderItem } from 'widgets/order-item';

export const PlotsCatalog1 = () => {
  const { state, actions } = useOrderCatalog();
  console.log(state);
  return (
    <>
      <Card className={cls.card} shadowSize={ShadowSizes.big}>
        <div className={cls.top}>
          <Title2 className={cls.title}>Доска заказов</Title2>
          <StageList />
          <Button
            size={ButtonSizes.small}
            type={ButtonTypes.primary}
            className={[cls.right, cls.plotPropose].join(' ')}
          >
            Разместить заказ
          </Button>
        </div>
        <div className={cls.bottom}></div>
      </Card>
      <Card className={cls.card} shadowSize={ShadowSizes.big}>
        <div className={cls.top}>
          <Title2 className={cls.title}>Список заказов</Title2>
          <SearchFieldToggle className={cls.searchField} name={'search'} placeholder={'Поиск'} />
        </div>

        <div className={cls.filters}>
          <Tabs
            name={'plot-by-activity'}
            onChange={e => actions.setStatus(e.target.value)}
            active={state.status}
            items={[
              {
                label: 'Все заказы',
                value: 'A',
                id: 1,
              },
              {
                label: 'Мои заказы',
                value: 'M',
                id: 2,
              },
              {
                label: 'В работе',
                value: 'E',
                id: 3,
              },
              {
                label: 'Выполненные',
                value: 'C',
                id: 4,
              },
            ]}
          />

          <FilterToggle
            className={cls.right}
            items={[
              <SelectInput
                placeholder={'Категория'}
                options={[
                  { label: 'Популярность', value: 'fame', id: 1 },
                  { label: 'Последние изменения', value: 'last-change', id: 2 },
                ]}
              />,
              <SortingSelect
                label={'Сортировать по:'}
                name={'sort-by'}
                options={[
                  { label: 'Рейтинг', value: 'rating_avg', id: 1 },
                  // { label: 'Популярность', value: 'fame', id: makeId(5) },
                  // { label: 'Последние изменения', value: 'last-change', id: makeId(5) },
                  { label: 'Дата создания', value: 'created_at', id: 2 },
                ]}
              />,
            ]}
          />
        </div>
        <div className="">
          {state.items.length ? state.items.map(item => <OrderItem {...item} />) : <>Нет доступных сюжетов</>}
        </div>
      </Card>
    </>
  );
};
