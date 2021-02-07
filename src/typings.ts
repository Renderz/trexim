import { Location } from 'history';

export type EnumListType = {
  [propName: string]: {
    [propName: string]: string;
  };
};

export type CascaderType = {
  label: string;
  value: string;
  children?: CascaderType[];
};

export type CascaderList = {
  [propName: string]: CascaderType[];
};

export type KeyMap = {
  name?: string;
  key?: string;
  path?: string;
  icon?: string;
  hide?: string;
  children?: string;
};

export interface MenuDataItem {
  authority?: string[] | string;
  children?: MenuDataItem[];
  hide?: boolean;
  icon?: React.ReactNode;
  name?: string;
  path?: string;
  key?: string;
  // type?: 'local' | 'new';
  // iframeUrl?: string;
  parentKeys?: string[];
  [key: string]: any;
}

export type ValueFormatType = {
  type?: 'enum' | 'date' | 'currency';
  enumType?: string;
  dateParser?: string;
  dateFormat?: string;
  rate?: number;
  precision?: number;
};

export interface LocationWithQuery extends Location {
  query: object;
}
