import { Card, Col, Form, List, Row, Select, Typography } from 'antd';
import React, { FC, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import moment from 'moment';
import AvatarList from './components/AvatarList';
import { StateType } from './model';
import { ListItemDataType } from './data.d';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

interface PAGE_NAME_UPPER_CAMEL_CASEProps {
  dispatch: Dispatch<any>;
  BLOCK_NAME_CAMEL_CASE: StateType;
  loading: boolean;
}

const getKey = (id: string, index: number) => `${id}-${index}`;

const PAGE_NAME_UPPER_CAMEL_CASE: FC<PAGE_NAME_UPPER_CAMEL_CASEProps> = ({
  dispatch,
  BLOCK_NAME_CAMEL_CASE: { list = [] },
  loading,
}) => {
  useEffect(() => {
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/fetch',
      payload: {
        count: 8,
      },
    });
  }, []);
  const cardList = list && (
    <List<ListItemDataType>
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
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card className={styles.card} hoverable cover={<img alt={item.title} src={item.cover} />}>
            <Card.Meta
              title={<a>{item.title}</a>}
              description={
                <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                  {item.subDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>{moment(item.updatedAt).fromNow()}</span>
              <div className={styles.avatarList}>
                <AvatarList size="small">
                  {item.members.map((member, i) => (
                    <AvatarList.Item
                      key={getKey(item.id, i)}
                      src={member.avatar}
                      tips={member.name}
                    />
                  ))}
                </AvatarList>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <div className={styles.coverCardList}>
      <Card bordered={false}>
        <Form
          layout="inline"
          onValuesChange={() => {
            // Solicitar datos cuando cambie el elemento del formulario
            // El formulario de consulta de simulación surte efecto
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
          <StandardFormRow title="Otras opciones" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="Autor" name="author">
                  <Select placeholder="Ilimitado" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="lisa">lisa</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="Alabanza de" name="rate">
                  <Select placeholder="Ilimitado" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="good">bueno</Option>
                    <Option value="normal">normal</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <div className={styles.cardList}>{cardList}</div>
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
