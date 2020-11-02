import React from 'react';
import GlobalContext from './context';
import { ConfigProviderProps } from './typings';

const ConfigProvider: React.FC<ConfigProviderProps> = props => {
  const { children, enumList, cascaderList, menuData, menuKeyMap, limits } = props;
  return (
    <GlobalContext.Provider value={{ enumList, menuData, limits, menuKeyMap, cascaderList }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default ConfigProvider;
