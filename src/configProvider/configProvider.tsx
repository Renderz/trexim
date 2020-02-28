import React from 'react';
import GlobalContext from './context';
import { ConfigProviderProps } from './typings';

const ConfigProvider: React.FC<ConfigProviderProps> = props => {
  const { children, enumList, menuData } = props;
  return <GlobalContext.Provider value={{ enumList, menuData }}>{children}</GlobalContext.Provider>;
};

export default ConfigProvider;
