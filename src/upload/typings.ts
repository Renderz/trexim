import { UploadProps, UploadListProps, UploadChangeParam, RcFile } from 'antd/es/upload';

export interface ExUploadProps extends UploadProps {
  // 是否是手动上传模式 适用于嵌入form中
  manual?: boolean;
  // 允许上传的文件个数
  amount?: number;
}

export { UploadProps, UploadListProps, UploadChangeParam, RcFile };
