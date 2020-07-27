import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, List, Typography } from 'antd';
import React, { Component } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch, formatMessage } from 'umi';
import { StateType } from './model';
import { CardListItemDataType } from './data.d';
import styles from './style.less';

const { Paragraph } = Typography;

interface PAGE_NAME_UPPER_CAMEL_CASEProps {
  BLOCK_NAME_CAMEL_CASE: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}
interface PAGE_NAME_UPPER_CAMEL_CASEState {
  visible: boolean;
  done: boolean;
  current?: Partial<CardListItemDataType>;
}

class PAGE_NAME_UPPER_CAMEL_CASE extends Component<
  PAGE_NAME_UPPER_CAMEL_CASEProps,
  PAGE_NAME_UPPER_CAMEL_CASEState
> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/fetch',
      payload: {
        count: 8,
      },
    });
  }

  render() {
    const {
      BLOCK_NAME_CAMEL_CASE: { list },
      loading,
    } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>{formatMessage({ id: 'CARD-LIST.page.description' })}</p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
            {formatMessage({ id: 'CARD-LIST.page.link.A' })}
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
            {formatMessage({ id: 'CARD-LIST.page.link.B' })}
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
            {formatMessage({ id: 'CARD-LIST.page.link.C' })}
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="Este es un título"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );
    const nullData: Partial<CardListItemDataType> = {};
    return (
      <PageHeaderWrapper content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List<Partial<CardListItemDataType>>
            rowKey="id"
            loading={loading}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={[nullData, ...list]}
            renderItem={(item) => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={[
                        <a key="option1">{formatMessage({ id: 'CARD-LIST.card.option1' })}</a>,
                        <a key="option2">{formatMessage({ id: 'CARD-LIST.card.option2' })}</a>,
                      ]}
                    >
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        title={<a>{item.title}</a>}
                        description={
                          <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                            {item.description}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <PlusOutlined /> {formatMessage({ id: 'CARD-LIST.add.item' })}
                  </Button>
                </List.Item>
              );
            }}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    BLOCK_NAME_CAMEL_CASE,
    loading,
  }: {
    BLOCK_NAME_CAMEL_CASE: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    BLOCK_NAME_CAMEL_CASE,
    loading: loading.models.BLOCK_NAME_CAMEL_CASE,
  }),
)(PAGE_NAME_UPPER_CAMEL_CASE);
