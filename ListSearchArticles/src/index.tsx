import React, { FC, useEffect } from 'react';
import { Button, Card, Col, Form, List, Row, Select, Tag } from 'antd';
import { LoadingOutlined, StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';
import ArticleListContent from './components/ArticleListContent';
import { StateType } from './model';
import { ListItemDataType } from './data.d';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';

const { Option } = Select;
const FormItem = Form.Item;

const pageSize = 5;

interface PAGE_NAME_UPPER_CAMEL_CASEProps {
  dispatch: Dispatch<any>;
  BLOCK_NAME_CAMEL_CASE: StateType;
  loading: boolean;
}
const PAGE_NAME_UPPER_CAMEL_CASE: FC<PAGE_NAME_UPPER_CAMEL_CASEProps> = ({
  dispatch,
  BLOCK_NAME_CAMEL_CASE: { list },
  loading,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/fetch',
      payload: {
        count: 5,
      },
    });
  }, []);
  const setOwner = () => {
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  const fetchMore = () => {
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/appendFetch',
      payload: {
        count: pageSize,
      },
    });
  };

  const owners = [
    {
      id: 'rod',
      name: 'Rodolfo',
    },
    {
      id: 'art',
      name: 'Arturo',
    },
    {
      id: 'alj',
      name: 'Alejandro',
    },
    {
      id: 'crl',
      name: 'Carlos',
    },
    {
      id: 'ssn',
      name: 'Susana',
    },
  ];

  const IconText: React.FC<{
    type: string;
    text: React.ReactNode;
  }> = ({ type, text }) => {
    switch (type) {
      case 'star-o':
        return (
          <span>
            <StarOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'like-o':
        return (
          <span>
            <LikeOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'message':
        return (
          <span>
            <MessageOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      default:
        return null;
    }
  };

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
    },
  };

  const loadMore = list.length > 0 && (
    <div style={{ textAlign: 'center', marginTop: 16 }}>
      <Button onClick={fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
        {loading ? (
          <span>
            <LoadingOutlined /> Cargando...
          </span>
        ) : (
          'cargar más'
        )}
      </Button>
    </div>
  );

  return (
    <>
      <Card bordered={false}>
        <Form
          layout="inline"
          form={form}
          initialValues={{
            owner: ['wjh', 'zxx'],
          }}
          onValuesChange={() => {
            dispatch({
              type: 'BLOCK_NAME_CAMEL_CASE/fetch',
              payload: {
                count: 8,
              },
            });
          }}
        >
          <StandardFormRow title="Afiliación" block style={{ paddingBottom: 11 }}>
            <FormItem name="category">
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
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="owner" grid>
            <FormItem name="owner" noStyle>
              <Select mode="multiple" placeholder="Seleccione owner">
                {owners.map((owner) => (
                  <Option key={owner.id} value={owner.id}>
                    {owner.name}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <a className={styles.selfTrigger} onClick={setOwner}>
              Solo mira el tuyo
            </a>
          </StandardFormRow>
          <StandardFormRow title="Otras opciones" grid last>
            <Row gutter={16}>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="usuario activo" name="user">
                  <Select placeholder="Ilimitado" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="lisa">lisa</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="Rating" name="rate">
                  <Select placeholder="Ilimitado" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="good">bueno</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <Card
        style={{ marginTop: 24 }}
        bordered={false}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
        <List<ListItemDataType>
          size="large"
          loading={list.length === 0 ? loading : false}
          rowKey="id"
          itemLayout="vertical"
          loadMore={loadMore}
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <IconText key="star" type="star-o" text={item.star} />,
                <IconText key="like" type="like-o" text={item.like} />,
                <IconText key="message" type="message" text={item.message} />,
              ]}
              extra={<div className={styles.listItemExtra} />}
            >
              <List.Item.Meta
                title={
                  <a className={styles.listItemMetaTitle} href={item.href}>
                    {item.title}
                  </a>
                }
                description={
                  <span>
                    <Tag>React Design</Tag>
                    <Tag>Lenguaje de diseño</Tag>
                  </span>
                }
              />
              <ArticleListContent data={item} />
            </List.Item>
          )}
        />
      </Card>
    </>
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
