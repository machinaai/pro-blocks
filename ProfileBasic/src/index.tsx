import { Badge, Card, Descriptions, Divider, Table } from 'antd';
import React, { Component } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch, formatMessage } from 'umi';
import { BasicProfileDataType } from './data.d';
import styles from './style.less';

const progressColumns = [
  {
    title: formatMessage({ id: 'PROFILE.basic.progress.colum-A' }),
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: formatMessage({ id: 'PROFILE.basic.progress.colum-B' }),
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: formatMessage({ id: 'PROFILE.basic.progress.colum-C' }),
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
    title: formatMessage({ id: 'PROFILE.basic.progress.colum-D' }),
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: formatMessage({ id: 'PROFILE.basic.progress.colum-E' }),
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
        title: formatMessage({ id: 'PROFILE.basic.good.colum-A' }),
        dataIndex: 'id',
        key: 'id',
        render: (text: React.ReactNode, row: any, index: number) => {
          if (index < basicGoods.length) {
            return <a href="">{text}</a>;
          }
          return {
            children: (
              <span style={{ fontWeight: 600 }}>
                {formatMessage({ id: 'PROFILE.basic.total' })}
              </span>
            ),
            props: {
              colSpan: 4,
            },
          };
        },
      },
      {
        title: formatMessage({ id: 'PROFILE.basic.good.colum-B' }),
        dataIndex: 'name',
        key: 'name',
        render: renderContent,
      },
      {
        title: formatMessage({ id: 'PROFILE.basic.good.colum-C' }),
        dataIndex: 'barcode',
        key: 'barcode',
        render: renderContent,
      },
      {
        title: formatMessage({ id: 'PROFILE.basic.good.colum-D' }),
        dataIndex: 'price',
        key: 'price',
        align: 'right' as 'left' | 'right' | 'center',
        render: renderContent,
      },
      {
        title: formatMessage({ id: 'PROFILE.basic.good.colum-E' }),
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
        title: formatMessage({ id: 'PROFILE.basic.good.colum-F' }),
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
          <Descriptions
            title={formatMessage({ id: 'PROFILE.basic.descriptions.title-A' })}
            style={{ marginBottom: 32 }}
          >
            <Descriptions.Item label={formatMessage({ id: 'PROFILE.basic.descriptions.item-A' })}>
              1000000000
            </Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'PROFILE.basic.descriptions.item-B' })}>
              Recogido
            </Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'PROFILE.basic.descriptions.item-C' })}>
              1234123421
            </Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'PROFILE.basic.descriptions.item-D' })}>
              3214321432
            </Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions
            title={formatMessage({ id: 'PROFILE.basic.descriptions.title-B' })}
            style={{ marginBottom: 32 }}
          >
            <Descriptions.Item label={formatMessage({ id: 'PROFILE.basic.descriptions.item-E' })}>
              Juan
            </Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'PROFILE.basic.descriptions.item-F' })}>
              18100000000
            </Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'PROFILE.basic.descriptions.item-G' })}>
              Nuevo almacenamiento
            </Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'PROFILE.basic.descriptions.item-H' })}>
              Avenida 14, numero 23 interior 3
            </Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'PROFILE.basic.descriptions.item-I' })}>
              No
            </Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>
            {formatMessage({ id: 'PROFILE.basic.descriptions.title-C' })}{' '}
          </div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={goodsData}
            columns={goodsColumns}
            rowKey="id"
          />
          <div className={styles.title}>
            {formatMessage({ id: 'PROFILE.basic.descriptions.title-D' })}{' '}
          </div>
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
