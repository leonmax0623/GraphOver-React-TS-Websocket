import { useAccount } from 'entities/user/model';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userAPI } from 'shared/api/user';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useSocials = () => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const [socials, setsocials] = useState([]);
  const [socialsState, setsocialsState] = useState({});
  const userSocials = useSelector(state => state.userReducer.user.get_social);
  const { actions } = useAccount();

  useEffect(() => {
    let new_state = {};
    userSocials.forEach(s => {
      new_state = { ...new_state, [s.name]: { id: s.id, social_id: s.social_id, url: s.url } };
    });
    setsocialsState(new_state);
  }, [userSocials]);

  const getSocials = async () => {
    try {
      const { data } = await userAPI.getSocials();
      setsocials(data);
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  const fetchSocialState = async () => {
    for (let soc in socialsState) {
      if (!userSocials.map(s => s.name).includes(soc)) {
        try {
          const { data } = await userAPI.addSocialLink({
            social: socialsState[soc].social_id,
            url: socialsState[soc].url,
          });
        } catch (err) {
          notificateAxiosError(err);
        }
      } else if (userSocials.filter(s => s.name === soc)[0].url !== socialsState[soc].url) {
        try {
          const { data } = await userAPI.changeSocialLink(userSocials.filter(s => s.name === soc)[0].id, {
            // social: userSocials.filter(s => s.name === soc)[0].id,
            url: socialsState[soc].url,
          });
        } catch (err) {
          notificateAxiosError(err);
        }
      }
    }
    actions.getUserData();
  };

  // const [ok, setOk] = useState('')
  // const [ok, setOk] = useState('')
  // const [ok, setOk] = useState('')
  // const [ok, setOk] = useState('')
  // const [ok, setOk] = useState('')

  return {
    getSocials,
    socials,
    socialsState,
    setsocialsState,
    fetchSocialState,
  };
};
