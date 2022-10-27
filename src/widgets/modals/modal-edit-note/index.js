import { useState } from 'react';

import cls from './styles.module.scss';

import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';
import { Caption, Title4 } from 'shared/ui/typography';
import { UncloseblModal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';

import { FileLoad } from 'shared/ui/file-load';
import { convertDateMn } from 'shared/utils';
import { useCreateNote } from './model';

export const ModalEditNote = ({ isOpen, setIsOpen, id, state }) => {
  const { createNote } = useCreateNote();
  const [name, setName] = useState(state?.note_name);
  const [text, setText] = useState(state?.note_text);
  const [files, setfiles] = useState(state?.file ? [state?.file] : null);
  const date_today = new Date();

  // useEffect(() => {
  //   if (!isOpen) {
  //     setname('Новая заметка');
  //     settext('');
  //     setfiles([]);
  //   }
  // }, [isOpen]);

  console.log("State.note_name___", name)
  console.log("State.note_text___", text)
  const handleSaveNote = async () => {
    var formData = new FormData();
    formData.append('note_name', name);
    formData.append('note_text', text);
    formData.append('file', files[0] || '');

    await createNote(formData);
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
        onChange={e => setname(e.target.value)}
      />
      <TextArea
        value={text}
        onChange={e => settext(e.target.value)}
        className={cls.textArea}
      ></TextArea>
      <FileLoad
        // value={files}
        multiple
        // label={files.length > 0 && files[0].name}
        // onChange={e => {
        //   setfiles([...files, ...e.target.files]);
        // }}
        className={cls.load}
        id={'file'}
      />
      <Button size={ButtonSizes.small} type={ButtonTypes.primary} onClick={handleSaveNote} className={cls.btn}>
        Сохранить заметку
      </Button>
    </UncloseblModal>
  );
};
