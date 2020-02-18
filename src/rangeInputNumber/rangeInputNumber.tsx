import React from 'react';
import InputNumberUtils from './utils';
import { RangeInputNumberProps } from './typings';

const RangeInputNumber: React.FC<RangeInputNumberProps> = props => {
  const utils = new InputNumberUtils(props);
  const content = utils.getContent();

  return <React.Fragment>{content}</React.Fragment>;
};

export default RangeInputNumber;
