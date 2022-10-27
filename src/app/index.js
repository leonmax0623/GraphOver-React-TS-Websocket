import React, { useEffect, useState } from 'react';

import './styles/index.scss';
import '../shared/fonts/index.scss';

import { Routing } from './../pages/routing';
import { withProviders } from './providers';
import { CircularProgress } from '@mui/material';

export const App = () => {
  // const {} = useWebSocketChat(roomName, scrollChatRef, webSockets);
  const [visible, setVisible] = useState(false);

  return (
    <div className="app">
      <div
        style={
          visible
            ? { opacity: '1', transition: '.8s' }
            : { opacity: '0', transition: 'unset', overflow: 'hidden', height: '100vh' }
        }
      >
        <Routing setVisible={setVisible} visible={visible} />
      </div>
      {!visible && (
        <div className="app-loader">
          <CircularProgress color="secondary" />
        </div>
      )}
    </div>
  );
};

export default withProviders(App);
