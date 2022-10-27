import { useEffect, useState } from 'react';
import { Title3, Title4, Title5 } from 'shared/ui/typography';
import cls from '../dashboard.module.scss';
import classes from './style.module.scss';
import { useCasesAnswers, useCasesGrafs } from './model';
import { Accordion, AccordionDetails, AccordionSummary, Modal, Typography } from '@mui/material';
import Scrollbar from 'react-scrollbars-custom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CasesItemGrafs = ({ item, handleModerate, type, k }) => {
  const [open, setOpen] = useState(false);

  const handleView = () => {
    setOpen(true);
  };

  const _handleModerate = (graf_id, chapter_id, vote) => {
    handleModerate(graf_id, chapter_id, vote);
    setOpen(false);
  };
  const title = `Спорная ситуация в сюжете ${item[0].quest_name}`;

  return (
    <div className={cls.item} style={{ height: 140 }}>
      <div className={cls.head}>
        <span className={cls.caterogry} onClick={handleView}>
          Просмотреть
        </span>
      </div>
      <Title5>{title}</Title5>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={classes['modal']}>
          <div className={classes['close']} onClick={() => setOpen(false)}>
            x
          </div>
          <div className={classes['content']}>
            {type === 'answer' && <Title4>Спорная ситуация в ответе на задачу "{item[0].task_name}"</Title4>}
            {type === 'graf' && <Title4>Спорная ситуация в графе</Title4>}
            <div style={{ width: '100%', maxHeight: '100%' }}>
              <>
                {type === 'answer' && <p>{item[0]?.text}</p>}
                {item.map(i => (
                  <div className="" key={i.id}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <div className={classes['top-lien']}>
                          {type === 'graf' && <p>{i.title}</p>}
                          {type === 'answer' && <p>Ответ {i.id}</p>}
                          {type === 'graf' && (
                            <div className={classes['btn-text']} onClick={() => _handleModerate(i.graph, i.id, 'L')}>
                              Принять
                            </div>
                          )}
                          {type === 'answer' && (
                            <div className={classes['btn-text']} onClick={() => _handleModerate(i.task, i.id, 'L')}>
                              Принять
                            </div>
                          )}
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        {type === 'answer' && <p className={classes['text-title']}>{i.answer}</p>}
                        {type === 'graf' && <p className={classes['text-title']}>{i.text}</p>}
                      </AccordionDetails>
                    </Accordion>

                    <div className={classes['btn-block']}></div>
                  </div>
                ))}
              </>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const Cases = ({ setCasesCnt }) => {
  const { grafs, handleModerate } = useCasesGrafs();
  const { answers, handleModerate: handleModerateanswers } = useCasesAnswers();

  useEffect(() => {
    const cnt = grafs.length + answers.length;
    setCasesCnt(cnt);
  }, [grafs, answers]);

  return (
    <div className={cls.list}>
      {Object.keys(grafs).length > 0 &&
        Object.keys(grafs).map(k => (
          <CasesItemGrafs type={'graf'} key={k} item={grafs[k]} k={k} handleModerate={handleModerate} />
        ))}
      {Object.keys(answers).length > 0 &&
        Object.keys(answers).map(k => (
          <CasesItemGrafs type={'answer'} key={k} item={answers[k]} handleModerate={handleModerateanswers} />
        ))}
      {Object.keys(grafs).length === 0 && Object.keys(answers).length === 0 && <>Нет спорных ситуаций</>}
    </div>
  );
};
