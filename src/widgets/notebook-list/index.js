import { useEffect, useState } from 'react';

import cls from './notebook.module.scss';

import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { SearchFieldToggle } from 'shared/ui/search-field-toggle';
import { SelectInput } from 'shared/ui/select-input';
import { Title3 } from 'shared/ui/typography';

import { useSelector } from 'react-redux';
import { ModalCreateNote } from 'widgets/modals/modal-create-note';
import { NotebookItem } from 'widgets/notebook-item';
import iconAdd from '../../shared/assets/test-content/add.svg';
import { useNotebook } from './model';

export const NotebookList = () => {
  const { getNotes, search, setSearch, deleteNote } = useNotebook();
  const notes = useSelector(state => state.notesReducer.notes);
  const [isOpen, setisOpen] = useState(false);
  const [editableNote, setEditableNote] = useState(
    {
      note_name: 'Новая заметка',
      note_text: ''
    }
  )

  useEffect(() => {
    getNotes();
  }, [search]);

  const handleEditNote = (val) => {
    setEditableNote(notes.filter((item, i) => item.id === val)[0])
    setisOpen(true)
  }

  const handleCreateNote = () => {
    setEditableNote({
      note_name: 'Новая заметка',
      note_text: ''
    })
    setisOpen(true)
  }

  // console.log(notes);

  return (
    <div className={cls.noteBookList}>
      <ModalCreateNote id="page-create-note" isOpen={isOpen} setIsOpen={setisOpen} editableNote={editableNote} />

      <div className={cls.notes}>
        <div className={cls.top}>
          <Title3 className={cls.title}>Мои заметки</Title3>
          <div className={cls.icons__item} onClick={handleCreateNote}>
            <img src={iconAdd} alt="iconAdd" />
          </div>
        </div>
        <SearchFieldToggle
          value={search}
          onChange={value => setSearch(value)}
          open={true}
          className={cls.searchField}
          name={'search'}
          placeholder={'Поиск'}
        />
        <div className={cls.controls}>
          <SelectInput
            className={cls.sort}
            placeholder={'Сортировать по'}
            options={[
              { label: 'Популярность', value: 'fame', id: 1 },
              { label: 'Последние изменения', value: 'last-change', id: 2 },
            ]}
          />
          <Button size={ButtonSizes.medium} type={ButtonTypes.primary} className={[cls.right, cls.btn].join(' ')}>
            Применить
          </Button>
        </div>
      </div>
      {notes.length > 0 && notes.map(n => <NotebookItem {...n} editNote={handleEditNote} deleteNote={deleteNote} />)}
    </div>
  );
};
