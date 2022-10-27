import React, { useEffect, useState } from 'react';
import cls from './plots-catalog.module.scss';
import PlotCard from 'entities/plots/catalog-card';
import { model, useStoryCatalog } from './model';
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
import { ModalCreatePlot } from 'widgets/modals/modal-create-plot';
import { useSelector } from 'react-redux';
import { ViewPanelComponent } from './toggle-view-panel';
import classNames from 'classnames';

export const PlotsCatalog = ({ author, profile }) => {
  const { state, actions, refetchData } = useStoryCatalog();
  const [isOpen, setisOpen] = useState();
  const [catalogType, setCatalogtype] = useState('rows'); // 'cells', 'rows'
  const userId = useSelector(state => state.userReducer.user.pk);

  return (
    <Card className={cls.card} shadowSize={ShadowSizes.big}>
      {isOpen && (
        <ModalCreatePlot isOpen={isOpen} setIsOpen={setisOpen} refetchData={refetchData} topics={state.topics} />
      )}{' '}
      <div className={cls.top}>
        <Title2 className={cls.title}>{profile ? 'Ваши' : 'Все'} сюжеты</Title2>
        <SearchFieldToggle
          value={state.search}
          onChange={actions.setSearch}
          className={cls.searchField}
          name={'search'}
          placeholder={'Поиск'}
        />
        <Button
          onClick={() => setisOpen(true)}
          size={ButtonSizes.small}
          type={ButtonTypes.primary}
          className={[cls.right, cls.plotPropose].join(' ')}
        >
          Предложить сюжет
        </Button>
      </div>
      <div className={cls.filters}>
        <Tabs
          name={'plot-by-activity'}
          onChange={e => actions.setStatus(e.target.value)}
          active={state.status}
          items={[
            {
              label: 'Активные',
              value: 'E',
              id: makeId(5),
            },
            {
              label: 'Неактивные',
              value: 'D',
              id: makeId(5),
            },
            {
              label: 'Завершенные',
              value: 'C',
              id: makeId(5),
            },
          ]}
        />
        <div className="" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <ViewPanelComponent catalogType={catalogType} setCatalogtype={setCatalogtype} />
          <FilterToggle
            className={cls.right}
            onSubmit={() => actions.setActivateFilter(true)}
            onReset={actions.resetFilter}
            items={[
              <SelectInput
                placeholder={'Категория'}
                value={state.category}
                changeHandler={actions.setCategory}
                options={state.topics.map(t => ({
                  label: t.name,
                  value: t.name,
                  id: t.name,
                }))}
              />,
              <SortingSelect
                label={'Сортировать по:'}
                name={'sort-by'}
                sort={state.sort}
                order={state.sortOrder}
                options={[
                  { label: 'Рейтинг', value: 'rating_avg', id: makeId(5) },
                  { label: 'Популярность', value: 'view_count', id: makeId(5) },
                  // { label: 'Последние изменения', value: 'last-change', id: makeId(5) },
                  { label: 'Дата создания', value: 'created_at', id: makeId(5) },
                ]}
                onOrderChange={order => actions.setSortOrder(order)}
                onParamChange={param => actions.setSort(param)}
              />,
            ]}
          />
        </div>
      </div>
      {state.items.length ? (
        <CardList
          className={classNames(cls.list, { [cls.cellsList]: catalogType === 'cells' })}
          catalogType={catalogType}
          items={state.items
            .sort((prev, next) => {
              if (state.sortOrder === 'ASC') {
                if (prev[state.sort] < next[state.sort]) return -1;
                if (prev[state.sort] > next[state.sort]) return 1;
              } else {
                if (prev[state.sort] < next[state.sort]) return 1;
                if (prev[state.sort] > next[state.sort]) return -1;
              }
            })
            .filter(i => {
              if (profile) {
                return i?.owner?.id === userId;
              } else {
                return true;
              }
            })
            .map(item => (
              <PlotCard catalogType={catalogType} author={author} changeItem={actions.changeItem} {...item} />
            ))}
        />
      ) : (
        <>Нет доступных сюжетов</>
      )}
      {!!state.pageCnt && (
        <Pagination total={state.pageCnt} current={state.page} onChange={number => actions.setPage(number)} />
      )}
    </Card>
  );
};
