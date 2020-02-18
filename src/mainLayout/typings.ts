import RouterTypes from 'umi/routerTypes';
import { MenuMode } from 'antd/es/menu';
import { MenuDataItem } from '../typings';

export interface BaseMenuProps extends RouterTypes {
  menuData?: MenuDataItem[];
  mode?: MenuMode;
}

export interface MainLayoutProps {
  headerBar?: React.ReactNode;
  headerStyle?: React.CSSProperties;
  headerClass?: string;
  siderBackground?: string;
  siderLogo?: string[];
  siderStyle?: React.CSSProperties;
  siderClass?: string;
  siderRender?: (collapsed?: boolean) => React.ReactNode;
  contentStyle?: React.CSSProperties;
  contentClass?: string;
  contentRender?: (children?: React.ReactNode) => React.ReactNode;
}

export interface HeaderProps {
  setCollapsed: (collapsed: boolean) => void;
  content?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export interface SiderProps {
  background?: string;
  logo?: string[];
  className?: string;
  style?: React.CSSProperties;
  render?: (collapsed?: boolean) => React.ReactNode;
}

export interface ContentProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  render?: (children?: React.ReactNode) => React.ReactNode;
}

export interface FooterProps {}
