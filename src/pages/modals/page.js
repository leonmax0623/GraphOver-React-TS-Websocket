import React, { useState } from 'react';
import { Button, ButtonTypes } from 'shared/ui/button';
import { Modal1 } from 'widgets/modals/modal1';
import { Modal2 } from 'widgets/modals/modal2';
import { Modal3 } from 'widgets/modals/modal3';
import { Modal4 } from 'widgets/modals/modal4';
import { Modal5 } from 'widgets/modals/modal5';
import { Modal6 } from 'widgets/modals/modal6';
import { Modal7 } from 'widgets/modals/modal7';
import { Modal8 } from 'widgets/modals/modal8';
import { Modal9 } from 'widgets/modals/modal9';
import { Modal10 } from 'widgets/modals/modal10';
import { Modal11 } from 'widgets/modals/modal11';
import { Modal12 } from 'widgets/modals/modal12';
import { Modal13 } from 'widgets/modals/modal13';
import { Modal14 } from 'widgets/modals/modal14';
import { Modal15 } from 'widgets/modals/modal15';
import { Modal16 } from 'widgets/modals/modal16';
import { Modal17 } from 'widgets/modals/modal17';

import { ModalOrderFilter } from 'widgets/modals/modal-order-filter';
import { ModalOrderView, ModalOrder } from 'widgets/modals/modal-order';
import { Modal20 } from 'widgets/modals/modal20';
import { Modal21 } from 'widgets/modals/modal21';
import { Modal22 } from 'widgets/modals/modal22';
import { Modal23 } from 'widgets/modals/modal23';
import { Modal24 } from 'widgets/modals/modal24';
import { Modal25 } from 'widgets/modals/modal25';

export const Modals = () => {
  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [isOpenModal3, setIsOpenModal3] = useState(false);
  const [isOpenModal4, setIsOpenModal4] = useState(false);
  const [isOpenModal5, setIsOpenModal5] = useState(false);
  const [isOpenModal6, setIsOpenModal6] = useState(false);
  const [isOpenModal7, setIsOpenModal7] = useState(false);
  const [isOpenModal8, setIsOpenModal8] = useState(false);
  const [isOpenModal9, setIsOpenModal9] = useState(false);
  const [isOpenModal10, setIsOpenModal10] = useState(false);
  const [isOpenModal11, setIsOpenModal11] = useState(false);
  const [isOpenModal12, setIsOpenModal12] = useState(false);
  const [isOpenModal13, setIsOpenModal13] = useState(false);
  const [isOpenModal14, setIsOpenModal14] = useState(false);
  const [isOpenModal15, setIsOpenModal15] = useState(false);
  const [isOpenModal16, setIsOpenModal16] = useState(false);
  const [isOpenModal17, setIsOpenModal17] = useState(false);
  const [isOpenModal18, setIsOpenModal18] = useState(false);
  const [isOpenModal19, setIsOpenModal19] = useState(false);
  const [isOpenModal20, setIsOpenModal20] = useState(false);
  const [isOpenModal21, setIsOpenModal21] = useState(false);
  const [isOpenModal22, setIsOpenModal22] = useState(false);
  const [isOpenModal23, setIsOpenModal23] = useState(false);
  const [isOpenModal24, setIsOpenModal24] = useState(false);
  const [isOpenModal25, setIsOpenModal25] = useState(false);

  return (
    <div style={{ padding: '55px' }}>
      <h1>Список модальных окон:</h1>

      <div style={{ display: 'flex', flexFlow: 'column wrap', width: '250px', height: '535px', gap: '15px' }}>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal1(true);
          }}
        >
          Modal 1
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal2(true);
          }}
        >
          Modal 2
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal3(true);
          }}
        >
          Modal 3
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal4(true);
          }}
        >
          Modal 4
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal5(true);
          }}
        >
          Modal 5
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal6(true);
          }}
        >
          Modal 6
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal7(true);
          }}
        >
          Modal 7
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal8(true);
          }}
        >
          Modal 8
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal9(true);
          }}
        >
          Modal 9
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal10(true);
          }}
        >
          Modal 10
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal11(true);
          }}
        >
          Modal 11
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal12(true);
          }}
        >
          Modal 12
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal13(true);
          }}
        >
          Modal 13
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal14(true);
          }}
        >
          Modal 14
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal15(true);
          }}
        >
          Modal 15
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal16(true);
          }}
        >
          Modal 16
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal17(true);
          }}
        >
          Modal 17
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal18(true);
          }}
        >
          Modal 18
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal19(true);
          }}
        >
          Modal 19
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal20(true);
          }}
        >
          Modal 20
        </Button>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal21(true);
          }}
        >
          Modal 21
        </Button>

        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal22(true);
          }}
        >
          Modal 22
        </Button>

        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal23(true);
          }}
        >
          Modal 23
        </Button>

        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal24(true);
          }}
        >
          Modal 24
        </Button>

        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            setIsOpenModal25(true);
          }}
        >
          Modal 25
        </Button>
      </div>

      <Modal1 isOpen={isOpenModal1} setIsOpen={setIsOpenModal1} />
      <Modal2 isOpen={isOpenModal2} setIsOpen={setIsOpenModal2} />
      <Modal3 isOpen={isOpenModal3} setIsOpen={setIsOpenModal3} />
      <Modal4 isOpen={isOpenModal4} setIsOpen={setIsOpenModal4} />
      <Modal5 isOpen={isOpenModal5} setIsOpen={setIsOpenModal5} />
      <Modal6 isOpen={isOpenModal6} setIsOpen={setIsOpenModal6} />
      <Modal7 isOpen={isOpenModal7} setIsOpen={setIsOpenModal7} />
      {/* <Modal8 isOpen={isOpenModal8} setIsOpen={setIsOpenModal8} /> */}
      <Modal9 isOpen={isOpenModal9} setIsOpen={setIsOpenModal9} />
      <Modal10 isOpen={isOpenModal10} setIsOpen={setIsOpenModal10} />
      <Modal11 isOpen={isOpenModal11} setIsOpen={setIsOpenModal11} />
      <Modal12 isOpen={isOpenModal12} setIsOpen={setIsOpenModal12} />
      <Modal13 isOpen={isOpenModal13} setIsOpen={setIsOpenModal13} />
      <Modal14 isOpen={isOpenModal14} setIsOpen={setIsOpenModal14} />
      <Modal15 isOpen={isOpenModal15} setIsOpen={setIsOpenModal15} />
      <Modal16 isOpen={isOpenModal16} setIsOpen={setIsOpenModal16} />
      <Modal17 isOpen={isOpenModal17} setIsOpen={setIsOpenModal17} />
      <ModalOrderFilter isOpen={isOpenModal18} setIsOpen={setIsOpenModal18} />
      <ModalOrderView
        isOpen={isOpenModal19}
        setIsOpen={setIsOpenModal19}
        state={{
          text: `          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa sint nam, debitis maiores temporibus error alias hic dolores earum deserunt magni dolorum dicta quod delectus eos necessitatibus quam asperiores magnam.`,
          time: '2 дня',
          cost: '1200 ',
        }}
      />
      <Modal20 isOpen={isOpenModal20} setIsOpen={setIsOpenModal20} />
      <Modal21 isOpen={isOpenModal21} setIsOpen={setIsOpenModal21} />
      <Modal22 isOpen={isOpenModal22} setIsOpen={setIsOpenModal22} />
      <Modal23 isOpen={isOpenModal23} setIsOpen={setIsOpenModal23} />
      <Modal24 isOpen={isOpenModal24} setIsOpen={setIsOpenModal24} />
      <Modal25 isOpen={isOpenModal25} setIsOpen={setIsOpenModal25} />
    </div>
  );
};
