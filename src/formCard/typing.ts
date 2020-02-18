import { CardProps } from 'antd/es/card';
import { CollapseProps, CollapsePanelProps } from 'antd/es/collapse';
import { ExFormProps } from '../form';

export interface FormCardProps {
  collapsable?: boolean;
  formProps?: ExFormProps;
  cardProps?: CardProps;
  collapseProps?: CollapseProps;
  panelProps?: CollapsePanelProps;
}

export { CollapseProps, CollapsePanelProps };
