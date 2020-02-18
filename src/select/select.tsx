import React from 'react';
import { Select } from 'antd';
import SelectUtils from './utils';
import { ExSelectProps } from './typings';

const ExSelect: React.FC<ExSelectProps> = props => {
  const selectUtils = new SelectUtils(props);

  const selectProps = selectUtils.getProps();
  const content = selectUtils.getContent();

  return <Select {...selectProps}>{content}</Select>;
};

export default ExSelect;
