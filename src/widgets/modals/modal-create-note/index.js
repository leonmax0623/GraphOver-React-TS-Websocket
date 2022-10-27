import { useEffect, useState } from 'react';

import cls from './styles.module.scss';

import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';
import { Caption, Title4 } from 'shared/ui/typography';
import { UncloseblModal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';

import { FileLoad } from 'shared/ui/file-load';
import { convertDateMn } from 'shared/utils';
import { useCreateNote, useUpdateNote } from './model';

export const ModalCreateNote = ({ isOpen, setIsOpen, id, editableNote }) => {
  const { createNote } = useCreateNote();
  const { updateNote } = useUpdateNote();
  const [name, setName] = useState(editableNote?.note_name);
  const [text, setText] = useState(editableNote?.note_text);
  const [files, setFiles] = useState([]);
  const date_today = new Date();

  // useEffect(() => {
  //   if (!isOpen) {
  //     setname('Новая заметка');
  //     settext('');
  //     setfiles([]);
  //   }
  // }, [isOpen]);

  useEffect(() => {
    setName(editableNote?.note_name)
    setText(editableNote?.note_text)
  }, [isOpen])

  const handleSaveNote = async () => {
    var formData = new FormData();
    formData.append('note_name', name);
    formData.append('note_text', text);
    formData.append('file', files[0] || '');

    if (editableNote.id) {
      await updateNote(formData, editableNote.id);
    } else {
      await createNote(formData);
    }
    setIsOpen(false);
  };

  return (
    <UncloseblModal id={id} className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={cls.controls} onDragStart>
        {/* <button className={cls.iconAspect}>
          <img src={iconAspect} alt={'iconAspect'} />
        </button> */}
        <BtnCloseModal className={cls.btnCloseSmall} setIsOpen={setIsOpen} />
      </div>
      <Caption className={cls.caption}>{convertDateMn(date_today)}</Caption>
      <Title4 className={cls.title}>Новая заметка</Title4>
      <TextInput
        className={cls.textInput}
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Название заметки"
      />
      <TextArea
        value={text}
        onChange={e => setText(e.target.value)}
        className={cls.textArea}
        placeholder="Текст"
      ></TextArea>
      <FileLoad
        // value={files}
        multiple
        label={files.length > 0 && files[0].name}
        onChange={e => {
          setfiles([...files, ...e.target.files]);
        }}
        className={cls.load}
        id={'file'}
      />
      <Button size={ButtonSizes.small} type={ButtonTypes.primary} onClick={handleSaveNote} className={cls.btn}>
        Сохранить заметку
      </Button>
    </UncloseblModal>
  );
};
