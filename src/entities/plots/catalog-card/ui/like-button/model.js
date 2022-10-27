import { useSnackbar } from 'notistack';
import { userAPI } from 'shared/api/user';

export const useToggleFavorites = (id, is_favorite, changeItem) => {
  const { enqueueSnackbar } = useSnackbar();

  const toggleFavorites = async e => {
    e.preventDefault();
    try {
      if (is_favorite) {
        await userAPI.removeFavorite({ quest: id });
        changeItem('user_favorite', !is_favorite, id);
        enqueueSnackbar('Сюжет успешно удален из избранного ', {
          variant: 'success',
        });
      } else {
        await userAPI.addFavorite({ quest: id });
        changeItem('user_favorite', !is_favorite, id);
        enqueueSnackbar('Сюжет успешно добавлен в избранное', {
          variant: 'success',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { toggleFavorites };
};
