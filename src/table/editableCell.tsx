import React from 'react';
import { Form } from 'antd';
import { EditableCellProps } from './typings';

const EditableCell: React.FC<EditableCellProps> = props => {
  const { editing, formItemProps, children, ...tdProps } = props;

  return (
    <td {...tdProps}>
      {editing && formItemProps ? (
        <Form.Item {...formItemProps} style={{ margin: 0 }}></Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
