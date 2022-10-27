import React, { useEffect } from 'react';

import cls from './state.module.scss';

import { Caption, Title5, Title3, Title4 } from 'shared/ui/typography';

import foto from 'shared/assets/test-content/foto.png';

import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';

import iconBussines from '../../shared/assets/test-content/bussines.svg';
import iconAnalys from '../../shared/assets/test-content/analys.svg';
import { useParams } from 'react-router';
import { useScenarioStatistic } from './model';
import { useSelector } from 'react-redux';
import { UserStat } from './user-stat';

export const ScenariState = props => {
  const { id } = useParams();
  const userId = useSelector(state => state.userReducer.user.pk);

  const { state } = props;
  const statisticModel = useScenarioStatistic(id);
  const { authors_s, text_s } = statisticModel;
  const { getStatisticAuthors, getStatisticText } = statisticModel;

  useEffect(() => {
    if (userId && id) {
      getStatisticAuthors(7);
      getStatisticText(7);
    }
  }, [userId, id]);

  return (
    <>
      <div className={cls.container}>
        <div className={cls.top}>
          <Title3 className={cls.title}>Статистика по сценарию</Title3>
        </div>
        <div className={cls.row}>
          <div className={cls.col}>
            <div className={cls.state}>
              {/* <button className={cls.btn}>
                <span></span>
                <span></span>
                <span></span>
              </button> */}
              <span className={cls.all}>Всего авторов: {state?.authors_list?.length} </span>
              <Title5 className={cls.caption}>Движение авторов</Title5>
              <div className={cls.text}>
                <img className={cls.pic} src={iconBussines} alt="iconBussines" />
                <Title5 className={cls.title}>+{authors_s['прирост авторов за 7 дня']} </Title5>
                <Caption className={cls.day}>за 7 дней</Caption>
              </div>
              <div className={cls.text}>
                <img className={cls.pic} src={iconBussines} alt="iconBussines" />
                <Title5 className={cls.title}>-{authors_s['убыток авторов за 7 дня']} </Title5>
                <Caption className={cls.day}>за 7 дней</Caption>
              </div>
            </div>
          </div>
          <div className={cls.col}>
            <div className={cls.state}>
              <Title5 className={cls.caption}>Объем написанного текста</Title5>
              {/* <span className={cls.all}>Всего: 3 400 симв.</span> */}
              <div className={cls.text}>
                <img className={cls.pic} src={iconAnalys} alt="iconAnalys" />
                <Title5 className={cls.title}>{text_s['Объем написанного текста за 7 дня']} симв.</Title5>
                <Caption className={cls.day}>за 7 дней</Caption>
              </div>
              {/* <div className={cls.text}>
                <img className={cls.pic} src={iconAnalys} alt="iconAnalys" />
                <Title5 className={cls.title}>300 симв.</Title5>
                <Caption className={cls.day}>за 7 дней</Caption>
              </div> */}
            </div>
          </div>
          <UserStat />
        </div>
      </div>
      <div className={cls.container}>
        <div className={cls.top}>
          <Title3 className={cls.title}>История работы с сюжетом</Title3>
        </div>
        <div className={cls.col}>
          <div className={cls.target}>
            <div className={cls.head}>
              <div className={cls.titles}>
                <span className={cls.all}>Всего: 35 задач</span>
                <Title5 className={cls.caption}>Количество задач</Title5>
              </div>
              <Button className={cls.btnWhite} size={ButtonSizes.small}>
                Смотреть задачи
              </Button>
            </div>
            <div className={cls.targetList}>
              <div className={cls.targetLine}>
                <div className={cls.targetCol}>
                  <div className={cls.user}>
                    <img className={cls.picture} src={foto} alt={'foto'} />
                    <span className={cls.desc}>автор</span>
                    <span className={cls.name}>Александр Л.</span>
                  </div>
                </div>
                <div className={cls.targetCol}>
                  <div className={cls.captions}>
                    <span className={cls.date}>03.07.2022</span>
                    <Title5 className={cls.title}>Граф. 2 Длинное название графа</Title5>
                  </div>
                </div>
                <div className={cls.targetCol}>
                  <div className={cls.targetColText}>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada justo in est tortor est dictum
                      nisi odio. Integer aenean aliquam...
                    </p>
                  </div>
                </div>

                <div className={cls.targetCol}>
                  <Button className={cls.btnWhite} size={ButtonSizes.small}>
                    Смотреть
                  </Button>
                </div>
              </div>
              <div className={cls.targetLine}>
                <div className={cls.targetCol}>
                  <div className={cls.user}>
                    <img className={cls.picture} src={foto} alt={'foto'} />
                    <span className={cls.desc}>автор</span>
                    <span className={cls.name}>Александр Л.</span>
                  </div>
                </div>
                <div className={cls.targetCol}>
                  <div className={cls.captions}>
                    <span className={cls.date}>03.07.2022</span>
                    <Title5 className={cls.title}>Граф. 2 Длинное название графа</Title5>
                  </div>
                </div>
                <div className={cls.targetCol}>
                  <div className={cls.targetColText}>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada justo in est tortor est dictum
                      nisi odio. Integer aenean aliquam...
                    </p>
                  </div>
                </div>

                <div className={cls.targetCol}>
                  <Button className={cls.btnWhite} size={ButtonSizes.small}>
                    Смотреть
                  </Button>
                </div>
              </div>
              <div className={cls.targetLine}>
                <div className={cls.targetCol}>
                  <div className={cls.user}>
                    <img className={cls.picture} src={foto} alt={'foto'} />
                    <span className={cls.desc}>автор</span>
                    <span className={cls.name}>Александр Л.</span>
                  </div>
                </div>
                <div className={cls.targetCol}>
                  <div className={cls.captions}>
                    <span className={cls.date}>03.07.2022</span>
                    <Title5 className={cls.title}>Граф. 2 Длинное название графа</Title5>
                  </div>
                </div>
                <div className={cls.targetCol}>
                  <div className={cls.targetColText}>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada justo in est tortor est dictum
                      nisi odio. Integer aenean aliquam...
                    </p>
                  </div>
                </div>

                <div className={cls.targetCol}>
                  <Button className={cls.btnWhite} size={ButtonSizes.small}>
                    Смотреть
                  </Button>
                </div>
              </div>
              <div className={cls.targetLine}>
                <div className={cls.targetCol}>
                  <div className={cls.user}>
                    <img className={cls.picture} src={foto} alt={'foto'} />
                    <span className={cls.desc}>автор</span>
                    <span className={cls.name}>Александр Л.</span>
                  </div>
                </div>
                <div className={cls.targetCol}>
                  <div className={cls.captions}>
                    <span className={cls.date}>03.07.2022</span>
                    <Title5 className={cls.title}>Граф. 2 Длинное название графа</Title5>
                  </div>
                </div>
                <div className={cls.targetCol}>
                  <div className={cls.targetColText}>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada justo in est tortor est dictum
                      nisi odio. Integer aenean aliquam...
                    </p>
                  </div>
                </div>

                <div className={cls.targetCol}>
                  <Button className={cls.btnWhite} size={ButtonSizes.small}>
                    Смотреть
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
