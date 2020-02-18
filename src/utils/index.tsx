import { useContext } from 'react';
import moment from 'moment';
import { globalContext } from '../configProvider';
import { ValueFormatType } from '../typings';

export function currency(text: number | string, rate: number = 2, precision: number = 2) {
  const ratio = 10 ** rate;
  const str = `${(Number(text) / ratio).toFixed(Math.max(precision, 0))}`;
  const int = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ',');
  const decimal = str.substring(str.length, str.indexOf('.'));
  return `${int}${decimal}`;
}

/**
 * 类型格式化的方法, 内置获取enumList
 */
export function useFormatter(valueType: ValueFormatType, value: any): any {
  const { enumList = {} } = useContext(globalContext);
  const { type } = valueType;

  if (type === 'enum') {
    const { enumType } = valueType;

    const enumItem = enumType && enumList[enumType];
    return enumItem && enumItem[value];
  }

  if (type === 'date') {
    const { dateParser, dateFormat } = valueType;
    return moment(value, dateParser).format(dateFormat);
  }

  if (type === 'currency') {
    const { rate, precision } = valueType;
    return currency(value, rate, precision);
  }

  return value;
}
