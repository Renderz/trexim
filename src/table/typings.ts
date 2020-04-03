import { ResizeCallbackData } from 'react-resizable';
import { TableProps } from 'antd/es/table/Table';
import { ColumnType } from 'antd/es/table/interface';
import { TooltipProps } from 'antd/es/tooltip';
import { FormItemProps, FormProps, FormInstance } from 'antd/lib/form';
import { ValueFormatType } from '../typings';

type RenderFunc = (value: any) => React.ReactNode;

export type EditFunc<RecordType> = (key: string, record: RecordType) => void;

export type SaveFunc<RecordType> = (
  key: string,
  formInstance: FormInstance,
  record: RecordType,
) => void;

export type CancelFunc<RecordType> = (key: string, record: RecordType) => void;

export type AddFunc<RecordType> = (key: string, Record: RecordType) => void;

export type EditFormType = {
  editing?: boolean;
  edit?: () => void;
  save?: () => void;
  cancel?: () => void;
  add?: () => void;
};

// react-resizable的Resize方法类型
export type ResizeFunc = (e: React.SyntheticEvent, data: ResizeCallbackData) => void;

export type EditingItem = {
  [key: string]: string;
};

// ResizableHeader需要的参数
export interface ResizableHeaderProps extends React.HTMLAttributes<HTMLElement> {
  width?: number | string;
  onResize?: ResizeFunc;
}

// 在columnType基础上增加一些定制化的参数
export interface ExColumnType<RecordType> extends Omit<ColumnType<RecordType>, 'render'> {
  valueType?: ValueFormatType;
  resizable?: boolean;
  editable?: boolean;
  tooltip?: boolean | RenderFunc;
  tooltipProps?: TooltipProps;
  formItemProps?: FormItemProps;
  render?: (
    value: any,
    record: RecordType,
    index: number,
    editForm?: EditFormType,
  ) => React.ReactNode;
}

// 在tableProps基础上增加的一些定制化参数
export interface ExTableProps<RecordType> extends TableProps<RecordType> {
  resizable?: boolean;
  columns?: ExColumnType<RecordType>[];
  formProps?: FormProps;
  onEdit?: (key: string, record: RecordType) => Promise<boolean | undefined>;
  onSave?: (
    key: string,
    formInstance: FormInstance,
    parentKey: string,
    record: RecordType,
  ) => Promise<boolean | undefined>;
  onCancel?: (key: string, record: RecordType) => Promise<boolean | undefined>;
  onAdd?: (key: string, record: RecordType) => Promise<boolean | undefined>;
  newRecord?: RecordType;
}

export interface EditableRowProps extends React.HTMLAttributes<HTMLElement> {
  name?: string;
  formProps?: FormProps;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing?: boolean;
  formItemProps?: FormItemProps;
}

export { FormInstance, FormItemProps };
