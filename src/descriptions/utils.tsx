import React from 'react';
import { Descriptions } from 'antd';
import Formatter from '../formatter';
import { ExDescriptionsProps, DescriptionsProps } from './typings';

class DescriptionsUtils<RecordType> {
  constructor(props: ExDescriptionsProps<RecordType>) {
    this.props = props;
  }

  props: ExDescriptionsProps<RecordType>;

  getProps = (): DescriptionsProps => {
    const { schema, data, ...rest } = this.props;
    return { ...rest };
  };

  getContent = (): React.ReactNode => {
    const { children } = this.props;
    if (children) {
      return children;
    }

    return this.getDescriptionItem();
  };

  getDescriptionItem = (): React.ReactNode => {
    const { schema = [], data } = this.props;
    return schema.map(item => {
      const { label, span, valueType, render, tooltip, tooltipProps, key, dataIndex } = item;

      const text = dataIndex && data && data[dataIndex];

      const content = render ? render(text, data) : text;

      return (
        <Descriptions.Item label={label} span={span} key={key}>
          <Formatter
            value={content}
            valueType={valueType}
            tooltip={tooltip}
            tooltipProps={tooltipProps}
          />
        </Descriptions.Item>
      );
    });
  };
}

export default DescriptionsUtils;
