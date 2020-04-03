import { RouteComponentProps } from 'react-router';
import { MenuMode } from 'antd/es/menu';

export interface BaseMenuProps extends RouteComponentProps {
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
  siderWidth?: number;
  contentStyle?: React.CSSProperties;
  contentClass?: string;
  contentRender?: (children?: React.ReactNode) => React.ReactNode;
  isTab?: boolean;
  onDelete?: (path: string) => void;
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
  width?: number;
}

export interface ContentProps extends RouteComponentProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  render?: (children?: React.ReactNode) => React.ReactNode;
  isTab?: boolean;
  onDelete?: (path: string) => void;
}

export interface FooterProps {}
