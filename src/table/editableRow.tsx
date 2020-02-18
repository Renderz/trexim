import React from 'react';
import { Form } from 'antd';
import EditableContext from './context';
import { EditableRowProps } from './typings';

const EditableRow: React.FC<EditableRowProps> = props => {
  const { name, formProps, ...trProps } = props;

  const [form] = Form.useForm();

  return (
    <Form {...formProps} form={form} component={false} name={name}>
      <EditableContext.Provider value={form}>
        <tr {...trProps} />
      </EditableContext.Provider>
    </Form>
  );
};

export default EditableRow;
