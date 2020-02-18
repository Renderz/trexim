import React from 'react';
import { Upload } from 'antd';
import UploadUtils from './utils';
import { ExUploadProps } from './typings';

/**
 * 功能说明:
 * 封装手动upload场景, 避免多写一套逻辑
 * 其他功能还不是很确定. 先这样写.
 */
const ExUpload: React.FC<ExUploadProps> = props => {
  const utils = new UploadUtils(props);
  const uploadProps = utils.getUploadProps();

  return <Upload {...uploadProps} />;
};

export default ExUpload;
