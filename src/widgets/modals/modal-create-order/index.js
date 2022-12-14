import React, { useEffect, useState } from 'react';

import cls from './styles.module.scss';

import { Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput, TextInputStatuses } from 'shared/ui/text-input';
import { SelectInput } from 'shared/ui/select-input';
import { Icon } from 'shared/ui/icon';
import { ReactComponent as ScrepkaIcon } from 'shared/assets/other/screpka.svg';
import { set } from 'react-hook-form';
import { FileLoad } from 'shared/ui/file-load';
import { useStoryCatalog } from 'features/plots/catalog/model';
import { useSelector } from 'react-redux';
import moment from 'moment';

const createOptionsFromTopics = topics => {
  let options = [];
  topics.forEach(social => options.push({ id: social.name, value: `${social.name}`, label: `${social.name}` }));
  return options;
};
const createOptionsFromTerms = topics => {
  let options = [];
  topics.forEach(social => options.push({ id: social.name, value: `${social.name}`, label: `${social.name}` }));
  return options;
};

export const ModalCreateOrder = ({ isOpen, setIsOpen, onClick }) => {
  const topics = useSelector(state => state.ordersReducer.topics);
  const [status, setStatus] = useState(false);
  const [name, setname] = useState('');
  const [topic_name, setquest] = useState(null);
  // EASY, MED, DIF, VDIF
  const [complexity, setcomplexity] = useState('EASY');
  const [description, setdescription] = useState('');
  const [start_price, setstart_price] = useState(null);
  const [term, setterm] = useState(null);

  const userId = useSelector(state => state.userReducer.user.pk);

  useEffect(() => {
    setStatus(false);
  }, [name, topic_name, start_price, description, complexity, term]);

  const body = { title: name, description, max_writing_time: term, topic_name, price: start_price, complexity };

  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>???????????????????? ??????????</Title3>
      <div className={cls.inputListWrapper}>
        <div className={cls.inputWrapper}>
          <SelectInput
            color={'rgba(26, 26, 26, 0.5);'}
            paddingLeft={'8px'}
            value={topic_name}
            changeHandler={val => {
              setquest(val);
            }}
            className={cls.sort}
            placeholder={'???????????????? ??????????????????'}
            options={createOptionsFromTopics(topics)}
            message={status && !topic_name && '?????? ???????? ???? ?????????? ???????? ????????????'}
            status={status && !topic_name && TextInputStatuses.error}
          />
        </div>
        <div className={cls.inputWrapper}>
          <SelectInput
            color={'rgba(26, 26, 26, 0.5);'}
            paddingLeft={'8px'}
            value={complexity}
            changeHandler={val => {
              setcomplexity(val);
            }}
            className={cls.sort}
            placeholder={'???????????????? ??????????????????'}
            options={[
              // EASY, MED, DIF, VDIF
              { id: 'EASY', value: 'EASY', label: '????????????' },
              { id: 'MED', value: 'MED', label: '??????????????' },
              { id: 'DIF', value: 'DIF', label: '??????????????' },
              { id: 'VDIF', value: 'VDIF', label: '?????????? ??????????????' },
            ]}
            message={status && !topic_name && '?????? ???????? ???? ?????????? ???????? ????????????'}
            status={status && !topic_name && TextInputStatuses.error}
          />
        </div>

        <div className={cls.inputWrapper}>
          <TextInput
            value={name}
            onChange={e => setname(e.target.value)}
            className={cls.textInput}
            placeholder="??????????????????"
            message={status && !name && '?????? ???????? ???? ?????????? ???????? ????????????'}
            status={status && !name && TextInputStatuses.error}
          />
        </div>
        <div className={cls.inputWrapper}>
          <TextInput
            value={start_price}
            onChange={e => setstart_price(e.target.value)}
            className={cls.textInput}
            inputType={'number'}
            placeholder="????????"
            message={status && !start_price && '?????? ???????? ???? ?????????? ???????? ????????????'}
            status={status && !start_price && TextInputStatuses.error}
          />
        </div>
        {/* <div className={cls.inputWrapper}>
          <TextInput
            value={redemption_price}
            onChange={e => setredemption_price(e.target.value)}
            className={cls.textInput}
            inputType={'number'}
            placeholder="????????"
            message={status && !redemption_price && '?????? ???????? ???? ?????????? ???????? ????????????'}
            status={status && !redemption_price && TextInputStatuses.error}
          />
        </div> */}
        <div className={cls.inputWrapper}>
          <TextInput
            className={cls.textInput}
            inputType="date"
            placeholder="???????? ????????????????????"
            value={term}
            onChange={e => {
              const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
              setterm(newDate);
            }}
            message={status && !term && '?????? ???????? ???? ?????????? ???????? ????????????'}
            status={status && !term && TextInputStatuses.error}
          />
          {/* <TextInput
            value={term}
            onChange={e => setterm(e.target.value)}
            className={cls.textInput}
            inputType={'text'}
            placeholder="???????? (YYYY-MM-DD)"
            message={status && !term && '?????? ???????? ???? ?????????? ???????? ????????????'}
            status={status && !term && TextInputStatuses.error}
          /> */}
        </div>
        <div className={cls.inputWrapper}>
          <TextArea
            value={description}
            onChange={e => setdescription(e.target.value)}
            className={cls.textArea}
            placeholder="????????????????"
          />
        </div>
      </div>
      <Button
        size={ButtonSizes.medium}
        type={ButtonTypes.primary}
        onClick={() => {
          setStatus(true);
          if (name && topic_name && start_price && complexity && term) onClick(body);
        }}
        className={cls.btn}
      >
        ????????????????????
      </Button>
    </Modal>
  );
};
