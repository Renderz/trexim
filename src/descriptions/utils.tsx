import React from 'react';
import { Descriptions } from 'antd';
import { useFormatter } from '../utils';
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
      const { label, span, valueType, render, key, dataIndex } = item;

      let text = dataIndex && data && data[dataIndex];

      // valueType优先级高于render
      if (valueType) {
        text = useFormatter(valueType, text);
      } else {
        text = render ? render(text, data) : text;
      }

      return (
        <Descriptions.Item label={label} span={span} key={key}>
          {text}
        </Descriptions.Item>
      );
    });
  };
}

export default DescriptionsUtils;
