import { InputNumberProps } from 'antd/es/input-number';

export interface RangeInputNumberProps
  extends Omit<InputNumberProps, 'value' | 'defaultValue' | 'onChange'> {
  value?: number[];
  defaultValue?: number[];
  separator?: string;
  onChange?: (value?: Array<number | undefined>) => void;
}

export { InputNumberProps };
