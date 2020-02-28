import { createContext } from 'react';
import { ConfigProviderProps } from './typings';

const context: React.Context<ConfigProviderProps> = createContext({});

export default context;
