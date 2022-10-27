import React from 'react';

import cls from './styles.module.scss';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Caption, Title3, Title4, Title5 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import { TextInput } from 'shared/ui/text-input';
import { useBook } from './model';

export const ModalReadGraphs = ({ isOpen, setIsOpen, state: questState }) => {
  const { state, downloadPdf, viewPdf } = useBook(questState?.id);
  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Button
        size={ButtonSizes.small}
        type={ButtonTypes.outline}
        onClick={() => {
          viewPdf();
          setIsOpen(false);
        }}
        className={[cls.btn].join(' ')}
      >
        PDF
      </Button>

      <div className={cls.workWrapper}>
        <div className={cls.work}>
          {state.length > 0 ? (
            state.map(gr => (
              <div className="" key={gr.id}>
                <Title4 id="scroll-dialog-title">{gr.title}</Title4>
                <Title5 id="scroll-dialog-description" tabIndex={-1}>
                  {gr.text}
                </Title5>
              </div>
            ))
          ) : (
            <p id="scroll-dialog-description" tabIndex={-1}>
              Нет написанных графов
            </p>
          )}
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In imperdiet et fames nunc etiam sed adipiscing.
            Auctor turpis id feugiat dictumst sed sit. Egestas pellentesque urna morbi eu libero penatibus. Amet neque,
            maecenas bibendum massa porta turpis duis. Odio egestas commodo non, facilisis massa ultrices. Sit ut diam
            habitasse luctus. Mi morbi dolor lectus in. Tellus arcu gravida hac quis egestas. Urna sed facilisis ut
            commodo. Ultrices netus nunc elit accumsan vestibulum, quis at. Mattis morbi augue auctor eget. Dignissim
            enim, commodo enim ut. Ipsum sit dui platea non. Felis sit pharetra sit eros.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. In imperdiet et fames nunc etiam sed adipiscing. Auctor turpis id feugiat
            dictumst sed sit. Egestas pellentesque urna morbi eu libero penatibus. Amet neque, maecenas bibendum massa
            porta turpis duis. Odio egestas commodo non, facilisis massa ultrices. Sit ut diam habitasse luctus. Mi
            morbi dolor lectus in. Tellus arcu gravida hac quis egestas. Urna sed facilisis ut commodo. Ultrices netus
            nunc elit accumsan vestibulum, quis at. Mattis morbi augue auctor eget. Dignissim enim, commodo enim ut.
            Ipsum sit dui platea non. Felis sit pharetra sit eros.Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. In imperdiet et fames nunc etiam sed adipiscing. Auctor turpis id feugiat dictumst sed sit. Egestas
            pellentesque urna morbi eu libero penatibus. Amet neque, maecenas bibendum massa porta turpis duis. Odio
            egestas commodo non, facilisis massa ultrices. Sit ut diam habitasse luctus. Mi morbi dolor lectus in.
            Tellus arcu gravida hac quis egestas. Urna sed facilisis ut commodo. Ultrices netus nunc elit accumsan
            vestibulum, quis at. Mattis morbi augue auctor eget. Dignissim enim, commodo enim ut. Ipsum sit dui platea
            non. Felis sit pharetra sit eros.
          </p> */}
        </div>
      </div>
    </Modal>
  );
};
