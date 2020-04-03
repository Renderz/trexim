import { createContext } from 'react';

export interface LayoutContext {
  isMobile?: boolean;
  collapsed?: boolean;
}

const layoutContext: React.Context<LayoutContext> = createContext({});

export default layoutContext;
