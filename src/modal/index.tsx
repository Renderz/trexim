import React from 'react';
import { Modal } from 'antd';
import DraggableTitle from './draggableTitle';
import { ExModalProps } from './typings';

const ExModal: React.FC<ExModalProps> = props => {
  const { draggable, title, afterClose, ...rest } = props;

  return (
    <Modal
      {...rest}
      title={<DraggableTitle>{title}</DraggableTitle>}
      // title={draggable ? <DraggableTitle>{title}</DraggableTitle> : title}
      afterClose={
        draggable
          ? () => {
              try {
                const item = document.querySelector('.ant-modal-wrap') as HTMLElement;
                item.style.transform = 'translate(0px, 0px)';
              } catch (e) {
                console.log(e);
              }
            }
          : afterClose
      }
    />
  );
};

export default ExModal;
