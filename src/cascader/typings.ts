import { CascaderProps, CascaderOptionType } from 'antd/es/cascader';

export interface ExCascaderProps extends Omit<CascaderProps, 'options'> {
  options?: CascaderOptionType[];
  enumType?: string;
}
