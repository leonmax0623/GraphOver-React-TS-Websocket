import { convertDateMn } from 'shared/utils';
import cls from './answer.module.scss';

export const MsgMedia = ({ el }) => {
  switch (el.media_type) {
    case 'file':
      let fname = el.url.split('/');
      fname = fname[fname.length - 1];

      return (
        <div
          key={el.url}
          onClick={e => {
            e.preventDefault();
            window.open('https://graphover.ru' + el.url);
          }}
          style={{ display: 'flex', fontSize: 12 }}
        >
          {/* <span>
            <SvgSelector id={'book'} />
          </span> */}
          <p
            style={{
              display: 'flex',
              cursor: 'pointer',
              fontSize: 12,
              color: '#a4a4a4',
              lineHeight: '120%',
              wordBreak: 'break-all',
            }}
          >
            {el.name}
          </p>
        </div>
      );
    case 'image':
      return (
        <>
          <img
            key={el.url}
            src={'https://graphover.ru/' + el.url}
            alt=""
            style={{ cursor: 'pointer' }}
            onClick={e => {
              e.preventDefault();
              window.open('https://graphover.ru' + el.url);
            }}
          />
          <p
            style={{
              display: 'flex',
              cursor: 'pointer',
              fontSize: 12,
              color: '#a4a4a4',
              lineHeight: '120%',
              wordBreak: 'break-all',
            }}
          >
            {el.name}
          </p>
        </>
      );
    case 'gif':
      return (
        <>
          <img
            key={el.url}
            src={'https://graphover.ru/' + el.url}
            alt=""
            style={{ cursor: 'pointer' }}
            onClick={e => {
              e.preventDefault();
              window.open('https://graphover.ru' + el.url);
            }}
          />
          <p
            style={{
              display: 'flex',
              cursor: 'pointer',
              fontSize: 12,
              color: '#a4a4a4',
              lineHeight: '120%',
              wordBreak: 'break-all',
            }}
          >
            {el.name}
          </p>
        </>
      );
    case 'video':
      return (
        <>
          <video
            key={el.url}
            controls
            src={'https://graphover.ru/' + el.url}
            style={{ cursor: 'pointer' }}
            onClick={e => {
              e.preventDefault();
              window.open('https://graphover.ru' + el.url);
            }}
          />
          <p
            style={{
              display: 'flex',
              cursor: 'pointer',
              fontSize: 12,
              color: '#a4a4a4',
              lineHeight: '120%',
              wordBreak: 'break-all',
            }}
          >
            {el.name}
          </p>
        </>
      );

    default:
      return <></>;
  }
};

export const Answer = ({ className, time, text, media }) => {
  console.log("22222222", media)
  return (
    <div className={[cls.container, className].join(' ')}>
      <div className={cls.content}>
        <p className={cls.text}>{text}</p>
        {media?.length > 0 && media?.map(m => <MsgMedia el={m} />)}
      </div>
      <span className={cls.date}>{convertDateMn(time)}</span>
    </div>
  );
};
