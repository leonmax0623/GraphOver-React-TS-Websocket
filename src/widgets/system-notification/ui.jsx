import { Badge, Popover } from '@mui/material';

import classNames from 'classnames';

import { useEffect, useState } from 'react';
import Scrollbar from 'react-scrollbars-custom';
import { useNotifications, useUpdate } from 'services/update-services';
import SvgSelector from 'shared/assets/SvgSelector';
import { Title4 } from 'shared/ui/typography';
import { convertDate } from 'shared/utils';

import { createNotTitle } from './model';
import cls from './style.module.scss';

export const SystemNotification = ({ isOpenNotification, openNotification, userId }) => {
  const { notList, notLenght } = useUpdate(userId);
  const { getNotifications } = useNotifications();

  const [invisible, setInvisible] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = event => {
    openNotification();
    getNotifications();
    setAnchorEl(event.currentTarget);
    // console.log(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setInvisible(!!!notLenght);
  }, [notLenght]);

  return (
    <>
      <Badge
        color="secondary"
        badgeContent={notLenght}
        invisible={invisible}
        className={cls.badge}
        onClick={handleClick}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <SvgSelector id="notificate" />
      </Badge>
      {/* 
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className={cls.ratings}></div>
      </Popover> */}
      <div className={[cls.notification, isOpenNotification && cls.opened].join(' ')}>
        <div className={cls.controls}>
          <Title4 className={cls.title}>Уведомления</Title4>
          <button className={cls.btnClose} onClick={openNotification}>
            <span></span>
            <span></span>
          </button>
        </div>
        <NotList data={notList} />
      </div>
    </>
  );
};

const NotList = ({ data }) => {
  return (
    // <div className={classes.wrapper}>
    //   <ol className={classes.list}>
    //     <Scrollbar style={{ width: '100%', height: '100%' }}>
    //       {data
    //         .filter(i => i.id)
    //         .map(n => (
    //           <li key={n.id}>
    //             <div className={classNames(classes.notItem, { [classes['notItem_new']]: n.is_new })}>
    //               <div className={classes.notHeader}>
    //                 <h4>{createNotTitle(n.type)}</h4>
    //                 <span>{convertDate(n.created_at)}</span>
    //               </div>
    //               <p>{n.message}</p>
    //             </div>
    //           </li>
    //         ))}
    //     </Scrollbar>
    //   </ol>
    // </div>
    <div className={cls.notes}>
      {data
        .filter(i => i.id)
        .map(n => (
          <div className={cls.note} style={n.is_new ? { background: '#5629e130' } : {}} key={n.id}>
            <div className={cls.head}>
              <span>
                <span className={cls.date}>{convertDate(n.created_at)}</span>
              </span>
            </div>
            <div className={cls.body}>
              <Title4 className={cls.cap}>Новое уведомление</Title4>
              <p>{n.message}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
