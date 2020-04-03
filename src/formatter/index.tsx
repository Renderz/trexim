import React, { useContext } from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';
import { context } from '../configProvider';
import { currency } from '../utils';
import { FormatterProps } from './typings';

const Formatter: React.FC<FormatterProps> = props => {
  const { value, valueType, tooltip, tooltipProps, children } = props;

  const { enumList = {} } = useContext(context);

  let formattedValue = value;

  if (valueType) {
    const { type } = valueType;
    if (type === 'enum') {
      const { enumType } = valueType;

      const enumItem = enumType && enumList[enumType];

      formattedValue = enumItem && enumItem[value];
    }

    if (type === 'date') {
      const { dateParser, dateFormat } = valueType;
      formattedValue = moment(value, dateParser).format(dateFormat);
    }

    if (type === 'currency') {
      const { rate, precision } = valueType;
      formattedValue = currency(value, rate, precision);
    }
  }

  if (tooltip) {
    let title;

    if (typeof tooltip === 'function') {
      title = tooltip(value);
    } else {
      title = value;
    }

    return (
      <Tooltip title={title} autoAdjustOverflow placement="topLeft" {...tooltipProps}>
        {children || formattedValue}
      </Tooltip>
    );
  }

  return <span>{children || formattedValue}</span>;
};

export default Formatter;
