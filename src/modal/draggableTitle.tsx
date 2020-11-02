import React, { useEffect } from 'react';
import DragM from 'dragm';

const DraggableTitle: React.FC = props => {
  let modalDom: HTMLElement | undefined;

  useEffect(() => {
    const allModalWrap = document.querySelector(
      '.ant-modal-wrap', // modal的class是ant-modal
    ) as HTMLElement;

    modalDom = allModalWrap;

    // modalDom = document.getElementsByClassName(
    //   'ant-modal-wrap', // modal的class是ant-modal
    // )[0];

    return () => {
      modalDom = undefined;
    };
  }, []);

  return (
    <DragM
      updateTransform={(transformStr: any) => {
        if (modalDom) {
          modalDom.style.transform = transformStr;
        }
      }}
    >
      <div>{props.children}</div>
    </DragM>
  );
};

export default DraggableTitle;
