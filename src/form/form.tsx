import React from 'react';
import { Form } from 'antd';
import FormUtils from './utils';
import { ExFormProps } from './typings';

/**
 * 允许根据数组列表渲染子组件
 */
const ExForm: React.FC<ExFormProps> = props => {
  const utils = new FormUtils(props);

  const formProps = utils.getFormProps();
  const content = utils.getFormContent();

  return <Form {...formProps}>{content}</Form>;
};

export const { useForm } = Form;

export default ExForm;
