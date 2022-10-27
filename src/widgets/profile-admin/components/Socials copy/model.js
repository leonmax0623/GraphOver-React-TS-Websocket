import { useEffect, useState } from 'react';
import { adminPanelApi } from 'shared/api/admin-panel';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useSliderSettings = () => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const [settings, setSettings] = useState({});
  const [files, setFiles] = useState([]);

  const appendFile = e => {
    e.preventDefault();
    setFiles(e.target.files);
  };

  useEffect(() => {
    console.log(files);
    if (files && files.length) {
      addSlide();
    }
  }, [files]);

  const getSliderSettings = async () => {
    try {
      const { data } = await adminPanelApi.getSliderData();
      setSettings(data);
    } catch (err) {
      notificateAxiosError(err);
    }
  };
  const addSlide = async () => {
    const formData = new FormData();
    formData.append('image', files[0]);
    formData.append('text', '');
    try {
      const { data } = await adminPanelApi.addSlide(formData);
      getSliderSettings();
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  const removeSlide = async id => {
    try {
      const { data } = await adminPanelApi.removeSlide({ id });
      getSliderSettings();
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { getSliderSettings, removeSlide, addSlide, appendFile, settings };
};
