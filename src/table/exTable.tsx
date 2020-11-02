import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Table } from 'antd';
import {
  ExColumnType,
  ExTableProps,
  ResizableHeaderProps,
  ResizeFunc,
  EditableCellProps,
  EditableRowProps,
  EditFunc,
  SaveFunc,
  CancelFunc,
  AddFunc,
  EditingItem,
} from './typings';
import EditableContext from './context';
import ResizableHeader from './resizableHeader';
import EditableRow from './editableRow';
import EditableCell from './editableCell';
import Formatter from '../formatter';
import './index.less';

const ExTable = forwardRef(
  <RecordType extends object>(props: ExTableProps<RecordType>, ref?: React.Ref<any>) => {
    const {
      resizable = false,
      rowKey = 'key',
      formProps,
      onEdit,
      onCancel,
      onSave,
      onAdd,
      newRecord = {},
      dataSource = [],
      columns = [],
      ...tableProps
    } = props;

    function getInitialWidth(rawColumns: ExColumnType<RecordType>[] = []) {
      const widths = {};
      rawColumns.forEach(col => {
        const { key, width } = col;
        if (key) {
          widths[key] = width;
        }
      });
      return widths;
    }

    const [widths, setWidths] = useState<{}>(getInitialWidth(columns));
    const [editingChildren, setEditingChildren] = useState<EditingItem>({});
    const [childSeq, setChildSeq] = useState(0);
    const [editingKeys, setEditingKeys] = useState<string[]>([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

    const getKey = (record: RecordType): string => {
      const key = typeof rowKey === 'function' ? rowKey(record) : record[rowKey];

      return String(key);
    };

    const handleInsertChild = (targetKey?: string) => {
      const newChildSeq = childSeq + 1;
      setChildSeq(newChildSeq);

      const childKey = `__RESERVE_KEY_${newChildSeq}__`;
      const newEditingKeys = [...editingKeys];
      newEditingKeys.push(childKey);
      setEditingKeys(newEditingKeys);

      if (targetKey) {
        const newEditingChildren = { ...editingChildren };
        newEditingChildren[childKey] = targetKey;
        setEditingChildren(newEditingChildren);

        const newExpandedRowKeys = [...expandedRowKeys, targetKey];
        setExpandedRowKeys(newExpandedRowKeys);
      }
    };

    const handleResize = (key: string): ResizeFunc => (e, { size }) => {
      const newWidths = { ...widths };
      newWidths[key] = size.width;
      setWidths(newWidths);
    };

    const handleInsert = (key: string): void => {
      const newEditingKeys = [...editingKeys];
      const index = newEditingKeys.findIndex(_ => _ === key);
      if (index === -1) newEditingKeys.push(key);
      setEditingKeys(newEditingKeys);
    };

    const handleRemove = (key: string): void => {
      const newEditingKeys = [...editingKeys];
      const index = newEditingKeys.findIndex(_ => _ === key);
      if (index >= 0) newEditingKeys.splice(index, 1);
      setEditingKeys(newEditingKeys);

      const newEditingChildren = {};
      Object.keys(editingChildren).forEach(childKey => {
        const parentKey = editingChildren[childKey];
        if (childKey !== key) {
          newEditingChildren[childKey] = parentKey;
        }
      });
      setEditingChildren(newEditingChildren);
    };

    const edit: EditFunc<RecordType> = async (key, record) => {
      if ((onEdit && (await onEdit(key, record))) || !onEdit) {
        handleInsert(key);
      }
    };

    const cancel: CancelFunc<RecordType> = async (key, record) => {
      if ((onCancel && (await onCancel(key, record))) || !onCancel) {
        handleRemove(key);
      }
    };

    const save: SaveFunc<RecordType> = async (key, formInstance, record) => {
      const parentKey = editingChildren[key];
      if ((onSave && (await onSave(key, formInstance, parentKey, record))) || !onSave) {
        handleRemove(key);
      }
    };

    const add: AddFunc<RecordType> = async (key, record) => {
      if ((onAdd && (await onAdd(key, record))) || !onAdd) {
        handleInsertChild(key);
      }
    };

    const onExpandedRowsChange = (expandedRows: string[]) => {
      setExpandedRowKeys(expandedRows);
      if (tableProps.onExpandedRowsChange) {
        tableProps.onExpandedRowsChange(expandedRows);
      }
    };

    useImperativeHandle(ref, () => ({
      add: () => handleInsertChild(),
    }));

    const mergedColumns = columns.map(
      (col): ExColumnType<RecordType> => {
        const { valueType, editable, tooltip, tooltipProps, formItemProps, fixed, render } = col;
        const mergedResizable = !fixed && (col.resizable === undefined ? resizable : col.resizable);
        return {
          ...col,
          width: col.key && widths[col.key],
          onHeaderCell: mergedResizable
            ? (column: ExColumnType<RecordType>): ResizableHeaderProps => ({
                width: column.width,
                // onResize: handleResize(index),
                onResize: handleResize(String(col?.key)),
              })
            : undefined,
          onCell: editable
            ? (record: RecordType): EditableCellProps => ({
                formItemProps,
                // editing: true,
                editing: editingKeys.includes(getKey(record)),
              })
            : undefined,
          render: (text, record, recordIndex) => (
            <EditableContext.Consumer>
              {form => {
                const key = getKey(record);
                const editForm = {
                  editing: editingKeys.includes(key),
                  save: () => save(key, form, record),
                  cancel: () => cancel(key, record),
                  edit: () => edit(key, record),
                  add: () => add(key, record),
                };

                const content = render ? render(text, record, recordIndex, editForm) : text;

                return (
                  <Formatter
                    value={content}
                    valueType={valueType}
                    tooltip={tooltip}
                    tooltipProps={tooltipProps}
                  />
                );
              }}
            </EditableContext.Consumer>
          ),
        };
      },
    );

    const mergeData = (record: RecordType): RecordType => {
      const { childrenColumnName = 'children' } = tableProps;

      const key = getKey(record);
      const children = record[childrenColumnName] || [];

      const extendChildren = [] as RecordType[];
      Object.keys(editingChildren).forEach(childKey => {
        const parentKey = editingChildren[childKey];
        if (parentKey === key && typeof rowKey === 'string') {
          extendChildren.push({ ...newRecord, [rowKey]: childKey } as RecordType);
        }
      });

      const combinedChildren = [...extendChildren, ...children];

      const result = { ...record };

      if (combinedChildren.length > 0) {
        result[childrenColumnName] = combinedChildren.map(mergeData);
      }

      return result;
    };

    const newParents =
      typeof rowKey === 'string'
        ? editingKeys
            .filter(key => !editingChildren[key])
            .map(key => ({ ...newRecord, [rowKey]: key } as RecordType))
        : [];

    const mergedDataSource = [...newParents, ...dataSource].map(mergeData);

    const components = {
      header: {
        cell: ResizableHeader,
      },
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };

    const onRow = (record: RecordType): EditableRowProps => {
      const name = getKey(record);

      return {
        name,
        formProps: {
          ...formProps,
          initialValues: record,
        },
      };
    };

    return (
      <Table
        {...tableProps}
        rowKey={rowKey}
        expandedRowKeys={expandedRowKeys}
        onExpandedRowsChange={onExpandedRowsChange as (key: React.ReactText[]) => void}
        components={components}
        columns={mergedColumns}
        dataSource={mergedDataSource}
        onRow={onRow}
      />
    );
  },
);

export default ExTable as <RecordType extends object>(
  props: ExTableProps<RecordType> & { ref?: React.Ref<any> },
  ref?: React.Ref<any>,
) => React.ReactElement;
