import React, { useEffect, useState } from 'react';

import cls from './styles.module.scss';

import { Caption, Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';
import { Radio } from 'shared/ui/radio';
import { SelectInput } from 'shared/ui/select-input';

import icon from 'shared/assets/test-content/calendar-gray.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ordersActions } from 'app/store/orders-slice';
import moment from 'moment';

export const ModalOrderFilter = ({ isOpen, setIsOpen, actions }) => {
  const dispatch = useDispatch();

  const topics = useSelector(state => state.ordersReducer.topics);
  const filters = useSelector(state => state.ordersReducer.filters);

  const [topic, settopic] = useState(filters?.topic);
  const [date, setdate] = useState(filters?.date);
  const [min_price, setmin_price] = useState(filters?.min_price);
  const [max_price, setmax_price] = useState(filters?.max_price);
  const [complexity, setcomplexity] = useState(filters?.complexity);

  const handleAcceptClick = () => {
    dispatch(ordersActions.setFilters({ topic, date, min_price, max_price, complexity }));
  };

  const handleReset = () => {
    settopic('');
    setdate('');
    setmin_price(null);
    setmax_price(null);
    setcomplexity('');
  };
  useEffect(() => {
    console.log(max_price);
  }, [max_price]);

  
  const handleRevert = () => {
    settopic(filters?.topic);
    setdate(filters?.date);
    setmin_price(filters?.min_price);
    setmax_price(filters?.max_price);
    setcomplexity(filters?.complexity);
  };

  useEffect(() => {
    if (!isOpen) handleRevert();
  }, [isOpen]);

  // useEffect(() => {
  //   handleRevert();
  // }, [filters]);

  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Фильтр заказов</Title3>
      <div className={cls.inputWrapper}>
        <Caption className={cls.label}>Категория</Caption>
        <div className={cls.inputItem}>
          <SelectInput
            color={'rgba(26, 26, 26, 0.5);'}
            paddingLeft={'8px'}
            className={cls.sort}
            value={topic}
            changeHandler={val => settopic(val)}
            options={topics.map(t => ({
              label: t.name,
              value: t.name,
              id: t.name,
            }))}
          />
        </div>
      </div>
      <div className={cls.inputWrapper}>
        <Caption className={cls.label}>Сложность</Caption>
        <div className={cls.inputItem}>
          <SelectInput
            color={'rgba(26, 26, 26, 0.5);'}
            paddingLeft={'8px'}
            className={cls.sort}
            value={complexity}
            changeHandler={val => setcomplexity(val)}
            options={[
              { id: 'EASY', value: 'EASY', label: 'EASY' },
              { id: 'MED', value: 'MED', label: 'MED' },
              { id: 'DIF', value: 'DIF', label: 'DIF' },
              { id: 'VDIF', value: 'VDIF', label: 'VDIF' },
            ]}
          />
        </div>
      </div>
      <div className={cls.inputWrapper}>
        <Caption className={cls.label}>Стоимость</Caption>
        <div className={cls.inputItems}>
          <div className={cls.inputItem}>
            <TextInput
              className={cls.textInput}
              placeholder="От"
              inputType="number"
              value={min_price}
              onChange={e => setmin_price(e.target.value)}
            />
          </div>
          <div className={cls.inputItem}>
            <TextInput
              className={cls.textInput}
              placeholder="До"
              inputType="number"
              value={max_price}
              onChange={e => setmax_price(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={cls.inputWrapper}>
        <Caption className={cls.label}>Дата размещения</Caption>
        <div className={cls.inputItem}>
          <TextInput
            className={cls.textInput}
            inputType="date"
            value={date}
            onChange={e => {
              const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
              setdate(newDate);
            }}
          />
          {/* <img className={cls.icon} src={icon} alt="calendar" /> */}
        </div>
      </div>
      <Button
        size={ButtonSizes.medium}
        type={ButtonTypes.primary}
        onClick={() => {
          handleAcceptClick();
          setIsOpen(false);
        }}
        className={cls.btn}
      >
        Применить фильтр
      </Button>
      <span className={cls.reset} onClick={handleReset}>
        Сбросить фильтр
      </span>
    </Modal>
  );
};
