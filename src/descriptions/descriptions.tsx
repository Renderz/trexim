import React from 'react';
import { Descriptions } from 'antd';
import DescriptionsUtils from './utils';
import { ExDescriptionsProps } from './typings';

/**
 * 允许快速生成description.item的功能
 */
const ExDescriptions = <RecordType extends object>(props: ExDescriptionsProps<RecordType>) => {
  const utils = new DescriptionsUtils<RecordType>(props);

  const descriptionsProps = utils.getProps();
  const content = utils.getContent();

  return <Descriptions {...descriptionsProps}>{content}</Descriptions>;
};

ExDescriptions.Item = Descriptions.Item;

export default ExDescriptions;
