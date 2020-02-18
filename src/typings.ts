export type EnumListType = {
  [propName: string]: {
    [propName: string]: string;
  };
};

export interface MenuDataItem {
  authority?: string[] | string;
  children?: MenuDataItem[];
  hide?: boolean;
  icon?: React.ReactNode;
  name?: string;
  path?: string;
  key?: string;
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
