import cls from './filter-toggle.module.scss';
import { Icon, IconNames } from 'shared/ui/icon';
import { Button, ButtonSizes, ButtonTypes } from '../../shared/ui/button';
import { useRef, useState } from 'react';
import { ModalOrderFilter } from 'widgets/modals/modal-order-filter';

export const FilterModal = ({ items, onSubmit, onReset, state, actions, className = null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef();

  return (
    <div className={[cls.container, className, isOpen ? cls.open : null].join(' ')} ref={containerRef}>
      <button className={cls.header} type={'button'} onClick={() => setIsOpen(!isOpen)}>
        <span>Фильтр</span>
        <Icon className={cls.headerIcon} name={IconNames.popular.filter} size={21} />
      </button>
      <ModalOrderFilter isOpen={isOpen} setIsOpen={setIsOpen} actions={actions} />
    </div>
  );
};
