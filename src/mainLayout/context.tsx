import { createContext } from 'react';
import { MenuDataItem } from '../typings';

export interface LayoutContext {
  menuData?: MenuDataItem[];
  isMobile?: boolean;
  collapsed?: boolean;
}

const layoutContext: React.Context<LayoutContext> = createContext({});

export default layoutContext;
