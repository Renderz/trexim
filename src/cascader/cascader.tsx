import React, { useContext } from 'react';
import { Cascader } from 'antd';
import GlobalContext from '../configProvider/context';
import { ExCascaderProps } from './typings';

const ExCascader: React.FC<ExCascaderProps> = props => {
  const { cascaderList = {} } = useContext(GlobalContext);
  const { enumType, ...restProps } = props;

  let mergedProps = restProps;

  if (enumType) {
    mergedProps = {
      ...restProps,
      options: cascaderList[enumType],
    };
  }

  return <Cascader {...mergedProps} />;
};

export default ExCascader;
