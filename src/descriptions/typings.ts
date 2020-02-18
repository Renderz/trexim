import { DescriptionsProps, DescriptionsItemProps } from 'antd/lib/descriptions';
import { ValueFormatType } from '../typings';

export interface ISchemaItem<RecordType> extends Omit<DescriptionsItemProps, 'children'> {
  children?: React.ReactNode;
  dataIndex?: string;
  key: string;
  render?: (value?: any, record?: RecordType) => React.ReactNode;
  valueType?: ValueFormatType;
}

export type SchemaType<RecordType> = ISchemaItem<RecordType>[];

export interface ExDescriptionsProps<RecordType> extends DescriptionsProps {
  schema?: SchemaType<RecordType>;
  data?: RecordType;
}

export { DescriptionsProps, DescriptionsItemProps };
