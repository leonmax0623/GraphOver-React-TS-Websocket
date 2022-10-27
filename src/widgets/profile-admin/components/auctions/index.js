import React, { useEffect, useState } from 'react';

import cls from './auctions.module.scss';

import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Card, ShadowSizes } from 'shared/ui/card';
import { SearchFieldToggle } from 'shared/ui/search-field-toggle';
import { Tabs } from 'shared/ui/tabs';
import { Title2 } from 'shared/ui/typography';

import { useSelector } from 'react-redux';
import { PlotAuctionItem } from 'widgets/auction-item';
import { ModalCreateLot } from 'widgets/modals/modal-create-lot';
import { useAuctionItems, useNewAucLot } from './model';

export const PlotAuction = () => {
  const { getAuctionList } = useAuctionItems();
  const { isOpen, setIsOpen, createNewLot } = useNewAucLot();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('A');
  const is_moderator = useSelector(state => state.userReducer.user.is_moderator);
  const userId = useSelector(state => state.userReducer.user.pk);
  const aucItems = useSelector(state => state.aucReducer.items);

  const subscription = useSelector(state => state.userReducer.user.subscription);
  const role = useSelector(state => state.userReducer.user.role);

  useEffect(() => {
    getAuctionList();
  }, []);

  return (
    <>
      <div className={cls.plotListWrapper}>
        <Title2 className={cls.title}>Аукцион сюжетов</Title2>
        {/* <StageList /> */}
        {((is_moderator && role === 'author') || role === 'customer') &&
          subscription &&
          subscription?.level !== 'BASE' && (
            <Button
              onClick={() => setIsOpen(true)}
              size={ButtonSizes.small}
              type={ButtonTypes.primary}
              className={[cls.right, cls.plotPropose].join(' ')}
            >
              Размещение лота
            </Button>
          )}
      </div>
      <Card className={cls.card} shadowSize={ShadowSizes.big}>
        <div className={cls.top}>
          <Title2 className={cls.title}>Открытые аукционы</Title2>
          <SearchFieldToggle
            value={search}
            onChange={setSearch}
            className={cls.searchField}
            name={'search'}
            placeholder={'Поиск'}
          />
        </div>

        <div className={cls.filters}>
          <Tabs
            name={'plot-by-activity'}
            active={filter}
            onChange={e => setFilter(e.target.value)}
            items={[
              {
                label: 'Все лоты',
                value: 'A',
                id: 1,
              },
              {
                label: 'Мои лоты',
                value: 'M',
                id: 2,
              },
              {
                label: 'Закрытые',
                value: 'C',
                id: 3,
              },
            ]}
          />
          {/* 
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
          /> */}
        </div>
        {aucItems.length > 0 ? (
          aucItems
            .filter(item => {
              let fFlag = false;
              let sFlag = false;
              if (
                item.lot_name.toLowerCase().includes(search.toLowerCase()) ||
                item?.description?.toLowerCase()?.includes(search.toLowerCase())
              ) {
                sFlag = true;
              }
              if (filter === 'M') {
                if (userId === item.main_author) fFlag = true;
              } else if (filter === 'C') {
                if (item.winner) fFlag = true;
              } else {
                fFlag = true;
              }

              return fFlag && sFlag;
            })
            .map(item => <PlotAuctionItem key={item.id} {...item} />)
        ) : (
          <>нет доступных лотов</>
        )}
      </Card>
      {isOpen && <ModalCreateLot isOpen={isOpen} setIsOpen={setIsOpen} onClick={createNewLot} />}
    </>
  );
};
