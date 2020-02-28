import { TooltipProps } from 'antd/es/tooltip';
import { ValueFormatType } from '../typings';

type RenderFunc = (value: any) => React.ReactNode;

export interface FormatterProps {
  value: any;
  tooltip?: boolean | RenderFunc;
  tooltipProps?: TooltipProps;
  valueType?: ValueFormatType;
}
