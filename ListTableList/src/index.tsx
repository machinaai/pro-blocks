import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule } from './service';

/**
 * Agregar nodo
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('Agregando');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Agregado exitosamente');
    return true;
  } catch (error) {
    hide();
    message.error('¡Error al agregar, por favor intente nuevamente!');
    return false;
  }
};

/**
 * Nodo de actualización
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configurando');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configurado con éxito');
    return true;
  } catch (error) {
    hide();
    message.error('¡Intente nuevamente si la configuración falla!');
    return false;
  }
};

/**
 *  Eliminar un nodo
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('borrando');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Eliminado correctamente, se actualizará pronto');
    return true;
  } catch (error) {
    hide();
    message.error('Error al eliminar, por favor intente nuevamente');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Nombre de la regla',
      dataIndex: 'name',
      rules: [
        {
          required: true,
          message: 'Se requiere el nombre de la regla',
        },
      ],
    },
    {
      title: 'descripción',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: 'Llamadas de servicio',
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) => `${val} K`,
    },
    {
      title: 'estado',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: 'default', status: 'Default' },
        1: { text: 'processing', status: 'Processing' },
        2: { text: 'success', status: 'Success' },
        3: { text: 'error', status: 'Error' },
      },
    },
    {
      title: 'Última hora programada',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="Por favor, introduzca el motivo" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: 'operando',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            Configuración
          </a>
          <Divider type="vertical" />
          <a href="">Suscríbase a las alertas</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="Formulario de consulta"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> Nuevo
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">Eliminar todos</Menu.Item>
                  <Menu.Item key="approval">Aprobar todos</Menu.Item>
                </Menu>
              }
            >
              <Button>
               Operaciones masivas <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            seleccionado <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> articulo(s)&nbsp;&nbsp;
            <span>
            Total de llamadas de servicio {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} K
            </span>
          </div>
        )}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
