import { DescriptionsProps } from 'antd/lib/descriptions';
import { DescriptionsItemProps } from 'antd/lib/descriptions/Item';
import { TooltipProps } from 'antd/es/tooltip';
import { ValueFormatType } from '../typings';

type RenderFunc = (value: any) => React.ReactNode;

export interface SchemaProps<RecordType> extends Omit<DescriptionsItemProps, 'children'> {
  children?: React.ReactNode;
  dataIndex?: string;
  key: string;
  render?: (value?: any, record?: RecordType) => React.ReactNode;
  valueType?: ValueFormatType;
  tooltip?: boolean | RenderFunc;
  tooltipProps?: TooltipProps;
}

export interface ExDescriptionsProps<RecordType> extends DescriptionsProps {
  schema?: SchemaProps<RecordType>[];
  data?: RecordType;
}

export { DescriptionsProps, DescriptionsItemProps };
