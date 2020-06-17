import { Badge, Card, Descriptions, Divider, Table } from 'antd';
import React, { Component } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import { BasicProfileDataType } from './data.d';
import styles from './style.less';

const progressColumns = [
  {
    title: 'hora',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Progreso actual',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: 'estado',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => {
      if (text === 'success') {
        return <Badge status="success" text="éxito" />;
      }
      return <Badge status="processing" text="procesando" />;
    },
  },

  {
    title: 'ID del operador',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: 'Costo en Tiempo',
    dataIndex: 'cost',
    key: 'cost',
  },
];

interface PAGE_NAME_UPPER_CAMEL_CASEProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  BLOCK_NAME_CAMEL_CASE: BasicProfileDataType;
}
interface PAGE_NAME_UPPER_CAMEL_CASEState {
  visible: boolean;
}

class PAGE_NAME_UPPER_CAMEL_CASE extends Component<
  PAGE_NAME_UPPER_CAMEL_CASEProps,
  PAGE_NAME_UPPER_CAMEL_CASEState
> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/fetchBasic',
    });
  }

  render() {
    const { BLOCK_NAME_CAMEL_CASE, loading } = this.props;
    const { basicGoods, basicProgress } = BLOCK_NAME_CAMEL_CASE;
    let goodsData: typeof basicGoods = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach((item) => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: 'total',
        num,
        amount,
      });
    }
    const renderContent = (value: any, row: any, index: any) => {
      const obj: {
        children: any;
        props: { colSpan?: number };
      } = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const goodsColumns = [
      {
        title: 'Número de producto',
        dataIndex: 'id',
        key: 'id',
        render: (text: React.ReactNode, row: any, index: number) => {
          if (index < basicGoods.length) {
            return <a href="">{text}</a>;
          }
          return {
            children: <span style={{ fontWeight: 600 }}>total</span>,
            props: {
              colSpan: 4,
            },
          };
        },
      },
      {
        title: 'nombre del producto',
        dataIndex: 'name',
        key: 'name',
        render: renderContent,
      },
      {
        title: 'código de barras',
        dataIndex: 'barcode',
        key: 'barcode',
        render: renderContent,
      },
      {
        title: 'precio unitario',
        dataIndex: 'price',
        key: 'price',
        align: 'right' as 'left' | 'right' | 'center',
        render: renderContent,
      },
      {
        title: 'Cantidad（Piezas）',
        dataIndex: 'num',
        key: 'num',
        align: 'right' as 'left' | 'right' | 'center',
        render: (text: React.ReactNode, row: any, index: number) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: 'Cantidad',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right' as 'left' | 'right' | 'center',
        render: (text: React.ReactNode, row: any, index: number) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
    ];
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Descriptions title="solicitud de reembolso" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="Número de petición">1000000000</Descriptions.Item>
            <Descriptions.Item label="estado">Recogido</Descriptions.Item>
            <Descriptions.Item label="Número de venta">1234123421</Descriptions.Item>
            <Descriptions.Item label="Orden derivada">3214321432</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions title="Información de usuario" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="nombre de usuario">Juan</Descriptions.Item>
            <Descriptions.Item label="número de contacto">18100000000</Descriptions.Item>
            <Descriptions.Item label="Uso">Nuevo almacenamiento</Descriptions.Item>
            <Descriptions.Item label="Dirección de entrega">Avenida 14, numero 23 interior 3</Descriptions.Item>
            <Descriptions.Item label="Observaciones">No</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>Retorno de Mercancía</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={goodsData}
            columns={goodsColumns}
            rowKey="id"
          />
          <div className={styles.title}>Progreso del retorno</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    BLOCK_NAME_CAMEL_CASE,
    loading,
  }: {
    BLOCK_NAME_CAMEL_CASE: BasicProfileDataType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    BLOCK_NAME_CAMEL_CASE,
    loading: loading.effects['BLOCK_NAME_CAMEL_CASE/fetchBasic'],
  }),
)(PAGE_NAME_UPPER_CAMEL_CASE);
