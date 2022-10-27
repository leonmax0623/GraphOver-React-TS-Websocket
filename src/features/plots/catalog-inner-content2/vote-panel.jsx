import cls from './content.module.scss';
import like from 'shared/assets/test-content/like.svg';
import dislike from 'shared/assets/test-content/dislike.svg';
import check from 'shared/assets/test-content/check.svg';
import close from 'shared/assets/test-content/close.svg';

export const VotePanel = ({ likeCnt, dislikeCnt, likeCallback, dislikeCallback }) => {
  return (
    <div
      className={cls.votepanel}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className={cls.likes}>
        <div className={cls.like}>
          {likeCnt} <img src={like} alt={'like'} />
        </div>
        <div className={cls.dislike}>
          {dislikeCnt} <img src={dislike} alt={'dislike'} />
        </div>
      </div>
      <div className={cls.btns}>
        <button className={[cls.btnIcon, cls.check].join(' ')} onClick={likeCallback}>
          <img src={check} alt={'check'} />
        </button>
        <button className={[cls.btnIcon, cls.canced].join(' ')} onClick={dislikeCallback}>
          <img src={close} alt={'close'} />
        </button>
      </div>
    </div>
  );
};
