import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Popconfirm, Table, message } from 'antd';
import React, { FC, useState } from 'react';

import styles from '../style.less';

interface TableFormDateType {
  key: string;
  workId?: string;
  name?: string;
  department?: string;
  isNew?: boolean;
  editable?: boolean;
}
interface TableFormProps {
  value?: TableFormDateType[];
  onChange?: (value: TableFormDateType[]) => void;
}

const TableForm: FC<TableFormProps> = ({ value, onChange }) => {
  const [clickedCancel, setClickedCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [cacheOriginData, setCacheOriginData] = useState({});
  const [data, setData] = useState(value);

  const getRowByKey = (key: string, newData?: TableFormDateType[]) =>
    (newData || data)?.filter((item) => item.key === key)[0];

  const toggleEditable = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.preventDefault();
    const newData = data?.map((item) => ({ ...item }));
    const target = getRowByKey(key, newData);
    if (target) {
      // Guardar datos originales al ingresar al estado de edición
      if (!target.editable) {
        cacheOriginData[key] = { ...target };
        setCacheOriginData(cacheOriginData);
      }
      target.editable = !target.editable;
      setData(newData);
    }
  };
  const newMember = () => {
    const newData = data?.map((item) => ({ ...item })) || [];

    newData.push({
      key: `NEW_TEMP_ID_${index}`,
      workId: '',
      name: '',
      department: '',
      editable: true,
      isNew: true,
    });

    setIndex(index + 1);
    setData(newData);
  };

  const remove = (key: string) => {
    const newData = data?.filter((item) => item.key !== key) as TableFormDateType[];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string,
  ) => {
    const newData = [...(data as TableFormDateType[])];
    const target = getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      setData(newData);
    }
  };

  const saveRow = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.persist();
    setLoading(true);
    setTimeout(() => {
      if (clickedCancel) {
        setClickedCancel(false);
        return;
      }
      const target = getRowByKey(key) || ({} as any);
      if (!target.workId || !target.name || !target.department) {
        message.error('Complete la información completa del miembro.');
        (e.target as HTMLInputElement).focus();
        setLoading(false);
        return;
      }
      delete target.isNew;
      toggleEditable(e, key);
      if (onChange) {
        onChange(data as TableFormDateType[]);
      }
      setLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent, key: string) => {
    if (e.key === 'Enter') {
      saveRow(e, key);
    }
  };

  const cancel = (e: React.MouseEvent, key: string) => {
    setClickedCancel(true);
    e.preventDefault();
    const newData = [...(data as TableFormDateType[])];
    // Datos sin procesar antes de editar
    let cacheData = [];
    cacheData = newData.map((item) => {
      if (item.key === key) {
        if (cacheOriginData[key]) {
          const originItem = {
            ...item,
            ...cacheOriginData[key],
            editable: false,
          };
          delete cacheOriginData[key];
          setCacheOriginData(cacheOriginData);
          return originItem;
        }
      }
      return item;
    });
    setData(cacheData);
    setClickedCancel(false);
  };

  const columns = [
    {
      title: 'Nombre del miembro',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={(e) => handleFieldChange(e, 'name', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder="Nombre del miembro"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Número de trabajo',
      dataIndex: 'workId',
      key: 'workId',
      width: '20%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={(e) => handleFieldChange(e, 'workId', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder="Número de trabajo"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Departamento',
      dataIndex: 'department',
      key: 'department',
      width: '40%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={(e) => handleFieldChange(e, 'department', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder="Departamento"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Operación',
      key: 'action',
      render: (text: string, record: TableFormDateType) => {
        if (!!record.editable && loading) {
          return null;
        }
        if (record.editable) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={(e) => saveRow(e, record.key)}>añadir</a>
                <Divider type="vertical" />
                <Popconfirm title="¿Quieres eliminar éste registro?" onConfirm={() => remove(record.key)}>
                  <a>Eliminar</a>
                </Popconfirm>
              </span>
            );
          }
          return (
            <span>
              <a onClick={(e) => saveRow(e, record.key)}>guardar</a>
              <Divider type="vertical" />
              <a onClick={(e) => cancel(e, record.key)}>cancelar</a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={(e) => toggleEditable(e, record.key)}>editar</a>
            <Divider type="vertical" />
            <Popconfirm title="¿Quieres eliminar ésta registro?" onConfirm={() => remove(record.key)}>
              <a>Eliminar</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <>
      <Table<TableFormDateType>
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={(record) => (record.editable ? styles.editable : '')}
      />
      <Button
        style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
        type="dashed"
        onClick={newMember}
      >
        <PlusOutlined />
        Nuevo miembro
      </Button>
    </>
  );
};

export default TableForm;
