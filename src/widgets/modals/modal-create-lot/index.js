import React, { useEffect, useState } from 'react';

import cls from './styles.module.scss';

import { useAucTerms } from 'entities/auc-times/model';
import { useFileCatalog } from 'entities/files-catalog/model';
import { useStoryCatalog } from 'features/plots/catalog/model';
import { useSelector } from 'react-redux';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { SelectInput } from 'shared/ui/select-input';
import { TextArea } from 'shared/ui/text-area';
import { TextInput, TextInputStatuses } from 'shared/ui/text-input';
import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';

export const ModalCreateLot = ({ isOpen, setIsOpen, onClick }) => {
  const [status, setStatus] = useState(false);
  const [name, setname] = useState('');
  const [quest, setquest] = useState(null);
  const [description, setdescription] = useState('');
  const [start_price, setstart_price] = useState(null);
  const [redemption_price, setredemption_price] = useState(null);
  const [term, setterm] = useState(null);
  const [fileId, setfileId] = useState(null);

  const { state, actions } = useStoryCatalog();
  const { getFilesCatalog } = useFileCatalog();
  const { getTerms } = useAucTerms();

  const userId = useSelector(state => state.userReducer.user.pk);
  const filesAvailable = useSelector(state => state.filesReducer.files);
  const termsAvailable = useSelector(state => state.aucReducer.terms);

  const questList = state.allItems
    .filter(item => item.owner.id === userId && item.private === 'Sec')
    .map(item => ({ value: item.id, label: item.name }));

  const filesList = filesAvailable
    .filter(item => item.user === userId)
    .map(item => ({ value: item.id, label: item.media.split('/')[item.media.split('/').length - 1] }));
  const termsList = termsAvailable.map(item => ({
    value: item.id,
    label: item.name === 'DAY' ? 'День' : item.name === 'WEEK' ? 'Неделя' : 'Месяц',
  }));

  useEffect(() => {
    if (fileId) setquest(null);
  }, [fileId]);

  useEffect(() => {
    if (quest) setfileId(null);
  }, [quest]);

  useEffect(() => {
    getFilesCatalog();
    getTerms();
  }, []);

  useEffect(() => {
    setStatus(false);
  }, [name, quest, start_price, redemption_price, term]);

  const body = { quest_id: quest, lot_name: name, start_price, redemption_price, term, file_id: fileId, description };

  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Размещение лота</Title3>
      <div className={cls.inputListWrapper}>
        <div className={cls.inputWrapper}>
          <SelectInput
            color={'rgba(26, 26, 26, 0.5);'}
            paddingLeft={'8px'}
            value={quest}
            changeHandler={val => {
              setquest(val);
            }}
            className={cls.sort}
            placeholder={'Выберите сюжет'}
            options={questList}
            message={status && !quest && !fileId && 'Это поле не может быть пустым'}
            status={status && !quest && !fileId && TextInputStatuses.error}
          />
        </div>
        <p className={cls.divider}>или</p>
        <div className={cls.inputWrapper}>
          <SelectInput
            color={'rgba(26, 26, 26, 0.5);'}
            paddingLeft={'8px'}
            value={fileId}
            changeHandler={val => {
              setfileId(val);
            }}
            className={cls.sort}
            placeholder={'Выберите файл'}
            options={filesList}
            message={status && !quest && !fileId && 'Это поле не может быть пустым'}
            status={status && !quest && !fileId && TextInputStatuses.error}
          />
          {/* <FileLoad
            label={file?.name}
            onChange={e => {
              setfile(e.target.files[0]);
            }}
            className={cls.load}
            id={'file-lot'}
          /> */}
        </div>

        <div className={cls.inputWrapper}>
          <TextInput
            value={start_price}
            onChange={e => setstart_price(e.target.value)}
            className={cls.textInput}
            inputType={'number'}
            placeholder="Стартовая ставка"
            message={status && !start_price && 'Это поле не может быть пустым'}
            status={status && !start_price && TextInputStatuses.error}
          />
        </div>
        <div className={cls.inputWrapper}>
          <TextInput
            value={redemption_price}
            onChange={e => setredemption_price(e.target.value)}
            className={cls.textInput}
            inputType={'number'}
            placeholder="Цена выкупа"
            message={status && !redemption_price && 'Это поле не может быть пустым'}
            status={status && !redemption_price && TextInputStatuses.error}
          />
        </div>
        <div className={cls.inputWrapper}>
          <TextInput
            value={name}
            onChange={e => setname(e.target.value)}
            className={cls.textInput}
            placeholder="Название лота"
            message={status && !name && 'Это поле не может быть пустым'}
            status={status && !name && TextInputStatuses.error}
          />
        </div>
        <div className={cls.inputWrapper}>
          <SelectInput
            color={'rgba(26, 26, 26, 0.5);'}
            paddingLeft={'8px'}
            value={term}
            changeHandler={val => {
              setterm(val);
            }}
            className={cls.sort}
            placeholder={'Срок'}
            options={termsList}
            message={status && !term && 'Это поле не может быть пустым'}
            status={status && !term && TextInputStatuses.error}
          />
        </div>
        {fileId && (
          <div className={cls.inputWrapper}>
            <TextArea
              value={description}
              onChange={e => setdescription(e.target.value)}
              className={cls.textArea}
              placeholder="Описание лота"
            />
          </div>
        )}
      </div>
      <Button
        size={ButtonSizes.medium}
        type={ButtonTypes.primary}
        onClick={() => {
          setStatus(true);
          if (name && (quest || fileId) && start_price && redemption_price && term) onClick(body);
        }}
        className={cls.btn}
      >
        Разместить
      </Button>
    </Modal>
  );
};
