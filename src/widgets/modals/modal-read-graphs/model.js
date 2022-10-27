import { useEffect, useState } from 'react';
import { questAPI } from 'shared/api/quest';

export const useBook = questId => {
  // const [state, setstate] = useState(mockState);
  const [state, setstate] = useState([]);
  const [pdfState, setPdfState] = useState({});

  const getAllGrafs = async () => {
    try {
      const { data } = await questAPI.getGrafsForBook(questId);
      // console.log(data);
      setstate(data);
    } catch (err) {
      console.log(err);
    }
  };
  const getPdfGrafs = async () => {
    try {
      const { data } = await questAPI.getGrafsForBookPdf(questId);
      // console.log(data);
      setPdfState(data);
    } catch (err) {
      console.log(err);
    }
  };
  const downloadPdf = () => {
    if (pdfState['pdf_file']) {
      const el = document.createElement('a');
      el.href = process.env.REACT_APP_SITE_URL + pdfState['pdf_file'];
      el.download = 'download';
      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
      // el.remove();
    }
  };
  const viewPdf = () => {
    if (pdfState['pdf_file']) window.open(process.env.REACT_APP_SITE_URL + pdfState['pdf_file']);
  };

  useEffect(() => {
    if (questId) {
      getAllGrafs();
      getPdfGrafs();
    }
  }, [questId]);

  return { state, downloadPdf, viewPdf };
};
