import {
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Col, Dropdown, List, Menu, Row, Select, Tooltip, Form } from 'antd';
import React, { FC, useEffect } from 'react';
import { connect, Dispatch, formatMessage } from 'umi';
import numeral from 'numeral';
import { ListItemDataType } from './data.d';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import { StateType } from './model';

const { Option } = Select;

export function formatWan(val: number) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result: React.ReactNode = val;
  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          k
        </span>
      </span>
    );
  }
  return result;
}

interface PAGE_NAME_UPPER_CAMEL_CASEProps {
  dispatch: Dispatch<any>;
  BLOCK_NAME_CAMEL_CASE: StateType;
  loading: boolean;
}

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const CardInfo: React.FC<{
  activeUser: React.ReactNode;
  newUser: React.ReactNode;
}> = ({ activeUser, newUser }) => (
  <div className={styles.cardInfo}>
    <div>
    <p>{formatMessage({ id: 'SEARCH-APPLICATIONS.card.info.active.users' })}</p>
      <p>{activeUser}</p>
    </div>
    <div>
    <p>{formatMessage({ id: 'SEARCH-APPLICATIONS.card.info.new.users' })}</p>
      <p>{newUser}</p>
    </div>
  </div>
);

export const PAGE_NAME_UPPER_CAMEL_CASE: FC<PAGE_NAME_UPPER_CAMEL_CASEProps> = (props) => {
  const {
    dispatch,
    loading,
    BLOCK_NAME_CAMEL_CASE: { list },
  } = props;

  useEffect(() => {
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/fetch',
      payload: {
        count: 8,
      },
    });
  }, [1]);

  const handleValuesChange = () => {
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/fetch',
      payload: {
        count: 8,
      },
    });
  };

  const itemMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
        {formatMessage({ id: 'SEARCH-APPLICATIONS.menu.item.1st' })}
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
        {formatMessage({ id: 'SEARCH-APPLICATIONS.menu.item.2nd' })}
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
        {formatMessage({ id: 'SEARCH-APPLICATIONS.menu.item.3d' })}
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.filterCardList}>
      <Card bordered={false}>
        <Form onValuesChange={handleValuesChange}>
        <StandardFormRow title={formatMessage({ id: 'SEARCH-APPLICATIONS.membership' })} block style={{ paddingBottom: 11 }}>
            <Form.Item name="category">
              <TagSelect expandable>
              <TagSelect.Option value="cat1">{formatMessage({ id: 'SEARCH-APPLICATIONS.tagselect.A' })} </TagSelect.Option>
                <TagSelect.Option value="cat2">{formatMessage({ id: 'SEARCH-APPLICATIONS.tagselect.B' })}</TagSelect.Option>
                <TagSelect.Option value="cat3">{formatMessage({ id: 'SEARCH-APPLICATIONS.tagselect.C' })}</TagSelect.Option>
                <TagSelect.Option value="cat4">{formatMessage({ id: 'SEARCH-APPLICATIONS.tagselect.D' })}</TagSelect.Option>
                <TagSelect.Option value="cat5">{formatMessage({ id: 'SEARCH-APPLICATIONS.tagselect.E' })}</TagSelect.Option>
                <TagSelect.Option value="cat6">{formatMessage({ id: 'SEARCH-APPLICATIONS.tagselect.F' })}</TagSelect.Option>
                <TagSelect.Option value="cat7">{formatMessage({ id: 'SEARCH-APPLICATIONS.tagselect.G' })}</TagSelect.Option>
                <TagSelect.Option value="cat8">{formatMessage({ id: 'SEARCH-APPLICATIONS.tagselect.H' })}</TagSelect.Option>
                <TagSelect.Option value="cat9">{formatMessage({ id: 'SEARCH-APPLICATIONS.tagselect.I' })}</TagSelect.Option>
                <TagSelect.Option value="cat10">{formatMessage({ id: 'SEARCH-APPLICATIONS.tagselect.J' })}</TagSelect.Option>
                <TagSelect.Option value="cat11">{formatMessage({ id: 'SEARCH-APPLICATIONS.tagselect.K' })}</TagSelect.Option>
                <TagSelect.Option value="cat12">{formatMessage({ id: 'SEARCH-APPLICATIONS.tagselect.L' })}</TagSelect.Option>
              </TagSelect>
            </Form.Item>
          </StandardFormRow>
          <StandardFormRow title={formatMessage({ id: 'SEARCH-APPLICATIONS.extra.options' })} grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
              <Form.Item {...formItemLayout} name="author" label={formatMessage({ id: 'SEARCH-APPLICATIONS.extra.options.author' })} >
              <Select placeholder={formatMessage({ id: 'SEARCH-APPLICATIONS.extra.options.placeholder' })}  style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="lisa">Autor número 1</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
              <Form.Item {...formItemLayout} name="rate" label={formatMessage({ id: 'SEARCH-APPLICATIONS.extra.options.rating' })}>
                  <Select placeholder={formatMessage({ id: 'SEARCH-APPLICATIONS.extra.options.placeholder' })} style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="good">{formatMessage({ id: 'SEARCH-APPLICATIONS.extra.rating.good' })}</Option>
                    <Option value="normal">{formatMessage({ id: 'SEARCH-APPLICATIONS.extra.rating.normal' })}</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <br />
      <List<ListItemDataType>
        rowKey="id"
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        loading={loading}
        dataSource={list}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card
              hoverable
              bodyStyle={{ paddingBottom: 20 }}
              actions={[
                <Tooltip key="download" title={formatMessage({ id: 'SEARCH-APPLICATIONS.tooltip.download' })}>
                  <DownloadOutlined />
                </Tooltip>,
                <Tooltip key="edit" title={formatMessage({ id: 'SEARCH-APPLICATIONS.tooltip.edit' })}>
                  <EditOutlined />
                </Tooltip>,
                <Tooltip title={formatMessage({ id: 'SEARCH-APPLICATIONS.tooltip.share' })} key="compartir">
                  <ShareAltOutlined />
                </Tooltip>,
                <Dropdown key="ellipsis" overlay={itemMenu}>
                  <EllipsisOutlined />
                </Dropdown>,
              ]}
            >
              <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
              <div className={styles.cardItemContent}>
                <CardInfo
                  activeUser={formatWan(item.activeUser)}
                  newUser={numeral(item.newUser).format('0,0')}
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default connect(
  ({
    BLOCK_NAME_CAMEL_CASE,
    loading,
  }: {
    BLOCK_NAME_CAMEL_CASE: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    BLOCK_NAME_CAMEL_CASE,
    loading: loading.models.BLOCK_NAME_CAMEL_CASE,
  }),
)(PAGE_NAME_UPPER_CAMEL_CASE);
