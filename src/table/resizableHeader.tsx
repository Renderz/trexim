import React from 'react';
import { Resizable } from 'react-resizable';
import { ResizableHeaderProps } from './typings';
import styles from './index.less';

const ResizableHeader: React.FC<ResizableHeaderProps> = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={Number(width)}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} className={styles.th} />
    </Resizable>
  );
};

export default ResizableHeader;
