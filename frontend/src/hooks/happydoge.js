import axios from 'axios';
import React from 'react';

const useServerAPI = () => {
  const serverAPI = React.useMemo(() => {
    return axios.create({
      baseURL: 'http://localhost:5000',
      headers: {
        ContentType: 'application/json',
      },
    });
  });

  return serverAPI;
};

export {useServerAPI};
