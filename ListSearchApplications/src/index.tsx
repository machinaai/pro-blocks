import {
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Col, Dropdown, List, Menu, Row, Select, Tooltip, Form } from 'antd';
import React, { FC, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
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
      <p>usuario activo</p>
      <p>{activeUser}</p>
    </div>
    <div>
      <p>Usuarios nuevos</p>
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
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
          3d menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.filterCardList}>
      <Card bordered={false}>
        <Form onValuesChange={handleValuesChange}>
          <StandardFormRow title="Afiliación" block style={{ paddingBottom: 11 }}>
            <Form.Item name="category">
              <TagSelect expandable>
                <TagSelect.Option value="cat1">Categoría 1</TagSelect.Option>
                <TagSelect.Option value="cat2">Categoría 2</TagSelect.Option>
                <TagSelect.Option value="cat3">Categoría 3</TagSelect.Option>
                <TagSelect.Option value="cat4">Categoría 4</TagSelect.Option>
                <TagSelect.Option value="cat5">Categoría 5</TagSelect.Option>
                <TagSelect.Option value="cat6">Categoría 6</TagSelect.Option>
                <TagSelect.Option value="cat7">Categoría 7</TagSelect.Option>
                <TagSelect.Option value="cat8">Categoría 8</TagSelect.Option>
                <TagSelect.Option value="cat9">Categoría 9</TagSelect.Option>
                <TagSelect.Option value="cat10">Categoría 10</TagSelect.Option>
                <TagSelect.Option value="cat11">Categoría 11</TagSelect.Option>
                <TagSelect.Option value="cat12">Categoría 12</TagSelect.Option>
              </TagSelect>
            </Form.Item>
          </StandardFormRow>
          <StandardFormRow title="Otras opciones" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item {...formItemLayout} name="author" label="Autor">
                  <Select placeholder="Ilimitado" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="lisa">Autor número 1</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item {...formItemLayout} name="rate" label="Rating">
                  <Select placeholder="Ilimitado" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="good">excelente</Option>
                    <Option value="normal">normal</Option>
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
                <Tooltip key="download" title="descargar">
                  <DownloadOutlined />
                </Tooltip>,
                <Tooltip key="edit" title="editar">
                  <EditOutlined />
                </Tooltip>,
                <Tooltip title="share" key="compartir">
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
