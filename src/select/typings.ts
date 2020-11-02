import { SelectProps } from 'antd/lib/select';

export type ItemType = {
  [propName: string]: any;
};

export type ArrayDataType = ItemType[];

export type ObjectDataType = { [propName: string]: string };

export type RawDataType = ArrayDataType | ObjectDataType;

export type StandardDataType = {
  value: string | number;
  name: string;
  title: string;
  key: string;
};

export interface ExSelectProps extends SelectProps<string | number> {
  enumType?: string;
  data?: RawDataType;
  mapping?: {
    key?: string;
    value?: string;
    name?: string;
    title?: string;
  };
  disabledKeys?: string[];
  hiddenKeys?: string[];
  showTooltip?: boolean;
  renderName?: (key: string, name: string) => string;
  renderTitle?: (key: string, name: string) => string;
}

export { SelectProps };
