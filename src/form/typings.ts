import { FormProps, FormItemProps, FormInstance } from 'antd/es/form';
import { RowProps } from 'antd/es/row';
import { ColProps } from 'antd/es/col';

export interface ExFormItemProps extends FormItemProps {
  colProps?: ColProps;
  hide?: boolean;
}

export interface ExFormRowProps extends RowProps {
  hide?: boolean;
  itemList?: ExFormItemProps[];
}

export interface ExFormProps extends FormProps {
  // 支持数组嵌套数组
  itemList?: ExFormRowProps[];
  max?: 1 | 2 | 3 | 4 | 5;
}

export { FormInstance };
