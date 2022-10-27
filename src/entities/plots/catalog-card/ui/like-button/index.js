import { useSelector } from 'react-redux';
import { Icon, IconNames } from 'shared/ui/icon';
import { ScreenReader } from 'shared/ui/screen-reader';
import cls from './like-button.module.scss';
import { useToggleFavorites } from './model';

export const LikeButton = ({ id, user_favorite, changeItem }) => {
  // console.log("Like BUTTON =>", user_favorite, changeItem)
  const userId = useSelector(state => state.userReducer.user.pk);

  const is_active = user_favorite?.includes(userId);
  const { toggleFavorites } = useToggleFavorites(id, is_active, changeItem);

  return (
    <button className={[cls.container, is_active ? cls.active : null].join(' ')} onClick={toggleFavorites}>
      <Icon className={cls.icon} name={IconNames.popular.heart} size={20} />
      <ScreenReader>Добавить в избранное</ScreenReader>
    </button>
  );
};
