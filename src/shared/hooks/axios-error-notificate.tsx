import axios from 'axios';
import { useSnackbar } from 'notistack';

const DEFAULT_ERROR_TEXT = 'Sorry, something went wrong. Try later.';

interface IAxiosErrorNotificate {
  defaultErrorText?: string;
  axiosErrorCallback?: any;
  commonErrorCallback?: any;
}

export const useAxiosErrorNotificate = (errorNotificateCongig?: IAxiosErrorNotificate) => {
  const { enqueueSnackbar } = useSnackbar();

  const defaultErrorText = errorNotificateCongig?.defaultErrorText || DEFAULT_ERROR_TEXT;

  const parseErrorData = (_errorData: any) => {
    const errorDataKeys = Object.keys(_errorData);
    const errorDataText = errorDataKeys
      .map((e: any) => {
        if (Array.isArray(_errorData[e])) {
          return _errorData[e].join(' ');
        } else {
          return JSON.stringify(_errorData[e]);
        }
      })
      .join('. ');

    return errorDataText || defaultErrorText;
  };

  const notificateAxiosError = (err: any) => {
    errorNotificateCongig?.axiosErrorCallback();
    let errText = '';
    try {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 500) throw 'InternalServerStatus';

        errorNotificateCongig?.commonErrorCallback();
        errText = parseErrorData(err.response.data);
        enqueueSnackbar(errText, {
          variant: 'error',
          autoHideDuration: 3000,
          preventDuplicate: true,
        });
      } else {
        throw 'NonAxiosResponse';
      }
    } catch (exceptionError) {
      console.log('useAxiosErrorNotificate', exceptionError, err);
      enqueueSnackbar(defaultErrorText, {
        variant: 'error',
        autoHideDuration: 3000,
        preventDuplicate: true,
      });
    }
    return errText;
  };

  return {
    notificateAxiosError,
  };
};
