// Import modules
import React, { useEffect, useState } from 'react';
import cls from '../../profileadmin.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Caption } from 'shared/ui/typography';

import { FilterToggle } from 'entities/filter-toggle';
import { SelectInput } from 'shared/ui/select-input';

import iconCalendar from 'shared/assets/test-content/calendar-gray2.svg';
import { ComplaintsList } from './components/ComplaintsList/ComplaintsList';
import { adminPanelApi } from 'shared/api/admin-panel';
import { ModalComplaint } from 'widgets/modals/modal-complaint';

// Exports
export const Complaints = () => {
  const [category, setCategory] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await adminPanelApi.getComplaintsAndSuggestions(1, category);
      setComplaints(data.data);
    };
    fetch();
  }, [category]);

  useEffect(() => {
    if (currentComplaint) {
      setIsModalOpened(true);
    }
  }, [currentComplaint]);

  return (
    <>
      <div className={cls.complaints}>
        <div className={cls.top}>
          <Title3 className={cls.title}>Жалобы и предложения</Title3>
          {/* <div className={cls.date}>
            <img src={iconCalendar} alt='iconCalendar' />
            <Caption className={cls.caption}>22 - 24.05.2022</Caption>
          </div> */}
          <FilterToggle
            className={cls.right}
            items={[
              <SelectInput
                placeholder="Категория"
                options={[
                  { label: 'Все', value: '', id: 1 },
                  { label: 'Жалобы', value: 'complaints', id: 2 },
                  { label: 'Предложения', value: 'suggestions', id: 3 },
                ]}
                value={category}
                changeHandler={value => setCategory(value)}
              />,
            ]}
          />
        </div>
        <div className={cls.col}>
          <div className={cls.target}>
            <ComplaintsList complaints={complaints} setCurrentComplaint={setCurrentComplaint} />
          </div>
        </div>
      </div>
      <ModalComplaint
        isOpen={isModalOpened}
        setIsOpen={setIsModalOpened}
        text={currentComplaint && currentComplaint.text}
        date={currentComplaint && currentComplaint.created_at}
        author={currentComplaint && (currentComplaint.user || currentComplaint.sender)}
      />
    </>
  );
};
