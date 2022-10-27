import { useState } from 'react';

import cls from './notebook-item.module.scss';

import { Caption, Title4 } from 'shared/ui/typography';

import { convertDate } from 'shared/utils';
// import { ModalEditNote } from 'widgets/modals/modal-edit-note';
import iconDelete from '../../shared/assets/test-content/icdelete.svg';
import iconEdit from '../../shared/assets/test-content/icedit.svg';

export const NotebookItem = props => {
  const [isopen, setisopen] = useState(false);
  return (
    <div className={cls.noteBookItem}>
      <div className={cls.plot}>
        <div className={cls.plotTitle}>
          <Caption className={cls.caption}>{convertDate(props?.created_at)}</Caption>
          <Title4 className={cls.title}>{props?.note_name}</Title4>
          <div className={cls.icons}>
            <ul>
              <li>
                <div className={cls.icons__item}>
                  <img src={iconEdit} alt="iconEdit" onClick={() => props?.editNote(props.id)} />
                </div>
              </li>
              <li>
                <div className={cls.icons__item} onClick={() => props?.deleteNote(props.id)}>
                  <img src={iconDelete} alt="iconDelete" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <p>{props?.note_text}</p>
        {props?.file && (
          <div className={cls.attachedFiles}>
            Подкрепленные файлы:<span className={cls.count}>2</span>
          </div>
        )}
      </div>
      {/* <ModalEditNote id={`edit-note-${props?.id}`} isOpen={isopen} setIsOpen={setisopen} state={props} /> */}
    </div>
  );
};
