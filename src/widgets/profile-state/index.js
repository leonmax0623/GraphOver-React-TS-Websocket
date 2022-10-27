import React from 'react';

import cls from './state.module.scss';

import { Caption, Title2, Title4 } from 'shared/ui/typography';

import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip)

export const ProfileState = (
  {
    all,
    without = { percentage: 1, value: 1 },
    basic = { percentage: 1, value: 1 },
    business = { percentage: 1, value: 1 },
    pro = { percentage: 1, value: 1 },
    donutInnerPercents = 0
  }
) => {

  return (
    <div className={cls.state}>
      <div className={cls.head}>
        <div className={cls.left}>
          <Title4 className={cls.title}>Статистика</Title4>
          <Title2 className={cls.value}>{ all }</Title2>
          <Caption className={cls.caption}>пользователей</Caption>
        </div>
        <div className={cls.right}>
          <div className={cls.knob}>
            <div className={cls.knobWrapper} style={{ width: 175, height: 175 }}>
              <Doughnut
                options={{
                  cutout: 70,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label(data) {
                          return `${data.label}: ${data.formattedValue}%`
                        }
                      }
                    }
                  }
                }}
                data={{
                  labels: ['Basic', 'Pro', 'Business', 'Без'],
                  datasets: [
                    {
                      label: '# of Votes',
                      data: [basic.percentage, pro.percentage, business.percentage, without.percentage],
                      backgroundColor: [
                        'rgb(86, 41, 225)',
                        'rgb(255, 75, 103)',
                        'rgb(162, 30, 224)',
                        'rgba(196, 196, 196, 0.3)',
                      ],
                      borderWidth: 5
                    }
                  ]
                }}
              />
              <div className={cls.progressBarText}>
                <span className={cls.percent}>{ donutInnerPercents.toFixed() } %</span>
                <span className={cls.desc}>тарифов</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cls.list}>
        <div className={cls.line}>
          <div className={cls.txt}>
            <span className={cls.tit}>Тариф BASIC </span>
            <span className={cls.val}>{ basic.value }</span>
          </div>
          <div className={cls.progLine}>
            <div className={cls.progValue} style={{ width: (basic.percentage) + '%', backgroundColor: '#5629E1' }}></div>
          </div>
        </div>
        <div className={cls.line}>
          <div className={cls.txt}>
            <span className={cls.tit}>Тариф PRO </span>
            <span className={cls.val}>{ pro.value }</span>
          </div>
          <div className={cls.progLine}>
            <div className={cls.progValue} style={{ width: (pro.percentage) + '%', backgroundColor: '#FF4B67' }}></div>
          </div>
        </div>
        <div className={cls.line}>
          <div className={cls.txt}>
            <span className={cls.tit}>Тариф BUSINESS </span>
            <span className={cls.val}>{ business.value }</span>
          </div>
          <div className={cls.progLine}>
            <div className={cls.progValue} style={{ width: (business.percentage) + '%', backgroundColor: '#A21EE0' }}></div>
          </div>
        </div>
        <div className={cls.line}>
          <div className={cls.txt}>
            <span className={cls.tit}>Пользователи</span>
            <span className={cls.val}> { all }</span>
          </div>
          <div className={cls.progLine}>
            <div className={cls.progValue} style={{ width: '20%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};