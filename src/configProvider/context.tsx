import { createContext } from 'react';
import { IConfig } from './typings';

const globalContext: React.Context<IConfig> = createContext({});

export default globalContext;
