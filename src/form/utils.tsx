import React from 'react';
import { Form, Row, Col } from 'antd';

import { ExFormProps, ExFormItemProps, ExFormRowProps } from './typings';

/**
 * xs:  480px
 * sm:  576px
 * md:  768px
 * lg:  992px
 * xl:  1200px
 * xxl: 1600px
 */
export const colLayout = {
  0: {},
  1: {
    sm: { span: 24, offset: 0 },
  },
  2: {
    sm: { span: 24, offset: 0 },
    md: { span: 12, offset: 0 },
    lg: { span: 12, offset: 0 },
    xxl: { span: 12, offset: 0 },
  },
  3: {
    sm: { span: 24, offset: 0 },
    md: { span: 12, offset: 0 },
    lg: { span: 12, offset: 0 },
    xl: { span: 8, offset: 0 },
  },
  4: {
    sm: { span: 24, offset: 0 },
    md: { span: 12, offset: 0 },
    lg: { span: 8, offset: 0 },
    xl: { span: 6, offset: 0 },
  },
};

export const itemLayout = {
  0: {},
  1: {
    labelCol: {
      sm: { span: 8 },
    },
    wrapperCol: {
      sm: { span: 16 },
    },
  },
  2: {
    labelCol: {
      sm: { span: 6 },
      md: { span: 8 },
      lg: { span: 8 },
      xxl: { span: 6 },
    },
    wrapperCol: {
      sm: { span: 16 },
      md: { span: 15 },
      lg: { span: 16 },
      xl: { span: 15 },
      xxl: { span: 14 },
    },
  },
  3: {
    labelCol: {
      sm: { span: 6 },
      md: { span: 8 },
      lg: { span: 8 },
      xl: { span: 9 },
      xxl: { span: 7 },
    },
    wrapperCol: {
      sm: { span: 16 },
      md: { span: 16 },
      lg: { span: 16 },
      xl: { span: 15 },
      xxl: { span: 14 },
    },
  },
  4: {
    labelCol: {
      sm: { span: 6 },
      md: { span: 8 },
      lg: { span: 8 },
      xl: { span: 9 },
      xxl: { span: 7 },
    },
    wrapperCol: {
      sm: { span: 16 },
      md: { span: 16 },
      lg: { span: 16 },
      xl: { span: 15 },
      xxl: { span: 14 },
    },
  },
};

class FormUtils {
  constructor(props: ExFormProps) {
    this.props = props;
  }

  props: ExFormProps;

  getFormProps = () => {
    const { max = 0, itemList, ...rest } = this.props;
    return {
      ...rest,
      ...itemLayout[max],
    };
  };

  getFormContent = (): React.ReactNode => {
    const { children, itemList } = this.props;
    if (children) {
      return children;
    }
    return itemList?.map(this.getRowItem);
  };

  getRowItem = (item: ExFormRowProps, index: number): React.ReactNode => {
    const { itemList, hide = false, ...rest } = item;
    if (Array.isArray(itemList) && itemList.length > 0 && !hide) {
      return (
        <Row key={index} {...rest}>
          {itemList.map(this.getColItem)}
        </Row>
      );
    }
    return null;
  };

  getColItem = (item: ExFormItemProps, index: number): React.ReactNode => {
    const { hide, colProps, ...formItemProps } = item;
    if (hide) return null;
    return (
      <Col {...colProps} key={index} {...this.getColLayout()}>
        <Form.Item {...formItemProps}></Form.Item>
      </Col>
    );
  };

  getColLayout = () => {
    const { max = 0 } = this.props;
    return colLayout[max];
  };
}

export default FormUtils;
