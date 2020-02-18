import { InputNumberProps } from 'antd/es/input-number';

export interface RangeInputNumberProps
  extends Omit<InputNumberProps, 'value' | 'defaultValue' | 'onChange'> {
  value?: number[];
  defaultValue?: number[];
  range: true;
  separator?: string;
  onChange?: (value?: number[]) => void;
}

export { InputNumberProps };
