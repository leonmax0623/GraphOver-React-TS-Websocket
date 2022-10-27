import { useEffect, useRef, useState } from 'react';
import { createParams } from './utils';
import { storyCatalogAPI } from 'shared/api/story-catalog';
import { ordersAPI } from 'shared/api/orders';

export const useOrderCatalog = (isUser = false) => {
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('E');
  const ref = useRef(null);
  const [page, setPageN] = useState(1);
  const [pageCnt, setPageCnt] = useState(1);
  const [isNextPage, setIsNextPage] = useState(true);

  const [catalogType, setCatalogtype] = useState('cells');
  const [topics, setTopics] = useState([]);
  const [items, setItems] = useState([]);
  const [role, setRole] = useState('All');

  const refetchData = () => {
    const params = createParams(isUser, category, status, role, page);
    getData(params);
  };

  const setPage = num => {
    setPageN(num);
    try {
      window.scrollTo({ behavior: 'smooth', top: 0 });
      // if (ref && ref.current /* + other conditions */) {
      //   ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async params => {
    const body = {
      complexity: 'EASY',
      date: '2022-08-16',
      price: '100',
      topic: 1,
    };
    const { data } = await ordersAPI.getOrders(body);

    if (data.num_pages < page) {
      setPage(1);
    }
    setItems(data.data);
    setPageCnt(data.num_pages);
  };

  const getTopics = async () => {
    const res = await storyCatalogAPI.getTopics();
    setTopics(res.data);
  };

  const changeItem = (_field, _value, _id) => {
    const new_items = [...items].map(item => {
      if (item.id === _id) {
        let _tmp_item = { ...item };
        _tmp_item[_field] = _value;
        return _tmp_item;
      }
      return item;
    });
    setItems(new_items);
  };

  useEffect(() => {
    const params = createParams(isUser, category, status, role, page);
    getData(params);
  }, [category, status, page, role, isUser]);

  useEffect(() => {
    getTopics();
  }, []);

  // create RETURN
  const actions = {
    setCategory,
    setStatus,
    setCatalogtype,
    setPage,
    setPageCnt,
    setIsNextPage,
    setTopics,
    setItems,
    changeItem,
    setRole,
  };
  const state = {
    category,
    status,
    catalogType,
    topics,
    page,
    pageCnt,
    isNextPage,
    items,
    role,
    ref,
  };

  return {
    actions,
    state,
    refetchData,
  };
};
