import cover from 'shared/assets/test-content/plot-card-cover.jpg';
import userAvatar2 from 'shared/assets/test-content/user-avatar-2.png';
import userAvatar3 from 'shared/assets/test-content/user-avatar-3.png';

import { useEffect, useRef, useState } from 'react';
import { createParams } from './utils';
import { storyCatalogAPI } from 'shared/api/story-catalog';
import { useSelector } from 'react-redux';

export const useStoryCatalogSmall = () => {};

export const useStoryCatalog = (isUser = false) => {
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('E');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('rating_avg');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [activateFilter, setActivateFilter] = useState(false);

  const userId = useSelector(state => state.userReducer.user.pk);

  const ref = useRef(null);
  const [page, setPageN] = useState(1);
  const [pageCnt, setPageCnt] = useState(1);
  const [isNextPage, setIsNextPage] = useState(true);

  const [catalogType, setCatalogtype] = useState('cells');
  const [topics, setTopics] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const [filteredItems, setItems] = useState([]);
  const [role, setRole] = useState('All');

  const todosPerPage = 4;
  const indexOfLastTodo = page * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

  const items = filteredItems.slice(indexOfFirstTodo, indexOfLastTodo);

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
    const { data } = await storyCatalogAPI.getAllItems();

    setAllItems(data);
    const new_items = createFilteredItems(data);
    setItems(new_items);
    setPageCnt(Math.ceil(new_items.length / todosPerPage));
  };

  const refetchData = () => {
    const params = createParams(isUser, category, status, role, page);
    getData(params);
  };
  const getTopics = async () => {
    const res = await storyCatalogAPI.getTopics();
    setTopics(res.data);
  };

  const changeItem = (_field, _value, _id) => {
    const new_items = [...items].map(item => {
      if (item.id === _id) {
        let _tmp_item = { ...item };
        if (_value) {
          _tmp_item[_field] = [..._tmp_item[_field], userId];
        } else {
          _tmp_item[_field] = [..._tmp_item[_field]].filter(i => i !== userId);
        }
        // _tmp_item[_field] = _value;
        return _tmp_item;
      }
      return item;
    });

    setItems(new_items);
  };

  const resetFilter = () => {
    setCategory('');
    // setSort('rating_avg');
    // console.log(sort);
  };

  const createFilteredItems = _data => {
    const new_items = _data.filter(item => {
      if (item.status !== status) return false;

      let cFlag = false;
      let sFlag = false;
      let aFlag = false;
      if (search?.toLowerCase() && item.name?.toLowerCase()?.includes(search?.toLowerCase())) sFlag = true;
      if (category) {
        if (item.topic_name === category) cFlag = true;
      } else {
        cFlag = true;
      }

      item.authors_list.forEach(a => {
        if (a.name.includes(search)) {
          aFlag = true;
        }
      });

      return cFlag && (sFlag || aFlag);
    });
    return new_items;
  };

  useEffect(() => {
    // if (activateFilter) {
    const new_items = createFilteredItems(allItems);
    setItems(new_items);
    setPageCnt(Math.ceil(new_items.length / todosPerPage));
    setActivateFilter(false);
    // }
  }, [category, status, page, role, search]);

  useEffect(() => {
    getTopics();
    const params = createParams(isUser, category, status, role, page);
    getData(params);
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
    setSortOrder,
    setItems,
    changeItem,
    setRole,
    setSearch,
    resetFilter,
    setSort,
    setActivateFilter,
  };
  const state = {
    category,
    status,
    catalogType,
    topics,
    activateFilter,
    page,
    pageCnt,
    isNextPage,
    items,
    allItems,
    role,
    ref,
    sortOrder,
    search,
    sort,
  };

  return {
    actions,
    state,
    refetchData,
  };
};

export const model = [
  {
    cover: cover,
    tag: 'Психология',
    liked: false,
    rating: 4.6,
    graphsCount: 2,
    startDate: '22.06.2022',
    endDate: '2 дня',
    encrypted: false,
    viewsCount: 121,
    name: 'Таинственная история Билли Миллигана и длинный заголовок',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet tempor nisi, sit dolor ultricies ut etiam. Arcu venenatis ornare nisi lectus luctus netus eu diam, lorem. Eget nec tortor senectus elementum integer arcu. Diam velit enim suscipit scelerisque. Elit fusce.',
    owner: {
      firstName: 'Александр',
      secondName: 'Палександров',
      avatar: userAvatar2,
    },
    authors: [
      {
        avatar: userAvatar3,
        firstName: '',
        secondName: '',
      },
      {
        avatar: userAvatar2,
        firstName: '',
        secondName: '',
      },
    ],
  },
  {
    cover: cover,
    tag: 'Психология',
    liked: false,
    rating: 4.6,
    graphsCount: 2,
    startDate: '22.06.2022',
    endDate: '2 дня',
    encrypted: false,
    viewsCount: 121,
    name: 'Таинственная история Билли Миллигана и длинный заголовок',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet tempor nisi, sit dolor ultricies ut etiam. Arcu venenatis ornare nisi lectus luctus netus eu diam, lorem. Eget nec tortor senectus elementum integer arcu. Diam velit enim suscipit scelerisque. Elit fusce.',
    owner: {
      firstName: 'Александр',
      secondName: 'Палександров',
      avatar: userAvatar2,
    },
    authors: [
      {
        avatar: userAvatar3,
        firstName: '',
        secondName: '',
      },
      {
        avatar: userAvatar2,
        firstName: '',
        secondName: '',
      },
    ],
  },
  {
    cover: cover,
    tag: 'Психология',
    liked: false,
    rating: 4.6,
    graphsCount: 2,
    startDate: '22.06.2022',
    endDate: '2 дня',
    encrypted: false,
    viewsCount: 121,
    name: 'Таинственная история Билли Миллигана и длинный заголовок',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet tempor nisi, sit dolor ultricies ut etiam. Arcu venenatis ornare nisi lectus luctus netus eu diam, lorem. Eget nec tortor senectus elementum integer arcu. Diam velit enim suscipit scelerisque. Elit fusce.',
    owner: {
      firstName: 'Александр',
      secondName: 'Палександров',
      avatar: userAvatar2,
    },
    authors: [
      {
        avatar: userAvatar3,
        firstName: '',
        secondName: '',
      },
      {
        avatar: userAvatar2,
        firstName: '',
        secondName: '',
      },
    ],
  },
  {
    cover: cover,
    tag: 'Психология',
    liked: false,
    rating: 4.6,
    graphsCount: 2,
    startDate: '22.06.2022',
    endDate: '2 дня',
    encrypted: false,
    viewsCount: 121,
    name: 'Таинственная история Билли Миллигана и длинный заголовок',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet tempor nisi, sit dolor ultricies ut etiam. Arcu venenatis ornare nisi lectus luctus netus eu diam, lorem. Eget nec tortor senectus elementum integer arcu. Diam velit enim suscipit scelerisque. Elit fusce.',
    owner: {
      firstName: 'Александр',
      secondName: 'Палександров',
      avatar: userAvatar2,
    },
    authors: [
      {
        avatar: userAvatar3,
        firstName: '',
        secondName: '',
      },
      {
        avatar: userAvatar2,
        firstName: '',
        secondName: '',
      },
    ],
  },
  {
    cover: cover,
    tag: 'Психология',
    liked: false,
    rating: 4.6,
    graphsCount: 2,
    startDate: '22.06.2022',
    endDate: '2 дня',
    encrypted: false,
    viewsCount: 121,
    name: 'Таинственная история Билли Миллигана и длинный заголовок',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet tempor nisi, sit dolor ultricies ut etiam. Arcu venenatis ornare nisi lectus luctus netus eu diam, lorem. Eget nec tortor senectus elementum integer arcu. Diam velit enim suscipit scelerisque. Elit fusce.',
    owner: {
      firstName: 'Александр',
      secondName: 'Палександров',
      avatar: userAvatar2,
    },
    authors: [
      {
        avatar: userAvatar3,
        firstName: '',
        secondName: '',
      },
      {
        avatar: userAvatar2,
        firstName: '',
        secondName: '',
      },
    ],
  },
  {
    cover: cover,
    tag: 'Психология',
    liked: false,
    rating: 4.6,
    graphsCount: 2,
    startDate: '22.06.2022',
    endDate: '2 дня',
    encrypted: false,
    viewsCount: 121,
    name: 'Таинственная история Билли Миллигана и длинный заголовок',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet tempor nisi, sit dolor ultricies ut etiam. Arcu venenatis ornare nisi lectus luctus netus eu diam, lorem. Eget nec tortor senectus elementum integer arcu. Diam velit enim suscipit scelerisque. Elit fusce.',
    owner: {
      firstName: 'Александр',
      secondName: 'Палександров',
      avatar: userAvatar2,
    },
    authors: [
      {
        avatar: userAvatar3,
        firstName: '',
        secondName: '',
      },
      {
        avatar: userAvatar2,
        firstName: '',
        secondName: '',
      },
    ],
  },
];
