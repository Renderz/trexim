import { useState } from 'react';
import { ExUploadProps, UploadProps } from './typings';

class UploadUtils {
  constructor(props: ExUploadProps) {
    this.props = props;
  }

  props: ExUploadProps;

  getUploadProps = (): UploadProps => {
    const { manual, amount = 0, ...rest } = this.props;
    const [fileList, setFileList] = useState<any[]>([]);
    if (manual) {
      const { beforeUpload, onRemove } = rest;
      return {
        ...rest,
        beforeUpload: (...params) => {
          setFileList([...fileList, params[0]].slice(-amount));
          if (beforeUpload) beforeUpload(...params);
          return false;
        },
        onRemove: (file: any) => {
          const index = fileList.indexOf(file);
          setFileList([...fileList].splice(index, 1));
          if (onRemove) onRemove(file);
        },
        fileList,
      };
    }
    return {
      ...rest,
    };
  };
}

export default UploadUtils;
