import React from 'react';
import { Card, Collapse } from 'antd';
import ExForm from '../form';
import { FormCardProps } from './typing';
import styles from './index.less';

const { Panel } = Collapse;

interface PanelHeaderProps {
  header?: React.ReactNode;
}

const Header: React.FC<PanelHeaderProps> = ({ children, header }) => (
  <div
    style={{
      height: '32px',
      lineHeight: '32px',
    }}
  >
    {header}
    <div style={styles.content}>{children}</div>
  </div>
);

const FormCard: React.FC<FormCardProps> = props => {
  const {
    collapsable,
    collapseProps,
    formProps,
    cardProps,
    panelProps: { extra = '', header = '', key = '', ...restPanelProps } = {},
  } = props;
  if (collapsable) {
    return (
      <Collapse
        {...collapseProps}
        style={{
          fontWeight: 500,
          fontSize: '16px',
          color: 'rgba(0, 0, 0, 0.75)',
        }}
      >
        <Panel {...restPanelProps} key={key} header={<Header header={header}>{extra}</Header>}>
          <ExForm {...formProps} />
        </Panel>
      </Collapse>
    );
  }
  return (
    <Card {...cardProps}>
      <ExForm {...formProps} />
    </Card>
  );
};

export default FormCard;
