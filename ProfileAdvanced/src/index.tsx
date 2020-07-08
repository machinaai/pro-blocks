import {
  DingdingOutlined,
  DownOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Button,
  Card,
  Statistic,
  Descriptions,
  Divider,
  Dropdown,
  Menu,
  Popover,
  Steps,
  Table,
  Tooltip,
  Empty,
} from 'antd';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import React, { Component, Fragment } from 'react';

import classNames from 'classnames';
import { connect, Dispatch,  formatMessage, FormattedMessage } from 'umi';
import { AdvancedProfileData } from './data.d';
import styles from './style.less';

const { Step } = Steps;
const ButtonGroup = Button.Group;

const menu = (
  <Menu>
    <Menu.Item key="1"><FormattedMessage id='BLOCK_NAME.menu.item.option1'/></Menu.Item>
    <Menu.Item key="2"><FormattedMessage id='BLOCK_NAME.menu.item.option2'/></Menu.Item>
    <Menu.Item key="3"><FormattedMessage id='BLOCK_NAME.menu.item.option3'/></Menu.Item>
  </Menu>
);

const mobileMenu = (
  <Menu>
    <Menu.Item key="1"><FormattedMessage id='BLOCK_NAME.menu.item.operation1'/></Menu.Item>
    <Menu.Item key="2"><FormattedMessage id='BLOCK_NAME.menu.item.operation2'/></Menu.Item>
    <Menu.Item key="3"><FormattedMessage id='BLOCK_NAME.menu.item.operation3'/></Menu.Item>
    <Menu.Item key="4"><FormattedMessage id='BLOCK_NAME.menu.item.operation4'/></Menu.Item>
    <Menu.Item key="5"><FormattedMessage id='BLOCK_NAME.menu.item.operation5'/></Menu.Item>
  </Menu>
);

const action = (
  <RouteContext.Consumer>
    {({ isMobile }) => {
      if (isMobile) {
        return (
          <Dropdown.Button
            type="primary"
            icon={<DownOutlined />}
            overlay={mobileMenu}
            placement="bottomRight"
          >
            <FormattedMessage id='BLOCK_NAME.dropdown.button'/>
          </Dropdown.Button>
        );
      }
      return (
        <Fragment>
          <ButtonGroup>
            <Button><FormattedMessage id='BLOCK_NAME.menu.item.operation1'/></Button>
            <Button><FormattedMessage id='BLOCK_NAME.menu.item.operation2'/></Button>
            <Dropdown overlay={menu} placement="bottomRight">
              <Button>
                <EllipsisOutlined />
              </Button>
            </Dropdown>
          </ButtonGroup>
          <Button type="primary"><FormattedMessage id='BLOCK_NAME.dropdown.button'/></Button>
        </Fragment>
      );
    }}
  </RouteContext.Consumer>
);

const extra = (
  <div className={styles.moreInfo}>
    <Statistic title={formatMessage({id: 'BLOCK_NAME.extra.state'})} value={formatMessage({id: 'BLOCK_NAME.extra.received'})} />
    <Statistic title={formatMessage({id: 'BLOCK_NAME.extra.order'})} value={568.08} prefix="$" />
  </div>
);

const description = (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
        <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.consumer.founder'})}>Alejandro Hernández</Descriptions.Item>
        <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.order'})}>XX <FormattedMessage id='BLOCK_NAME.servce' /></Descriptions.Item>
        <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.time.create'})}>2017-07-07</Descriptions.Item>
        <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.documentation'})}>
          <a href="">12421</a>
        </Descriptions.Item>
        <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.effective.date'})}>2017-07-07 ~ 2017-08-08</Descriptions.Item>
        <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.observation'})}><FormattedMessage id='BLOCK_NAME.business.days'/></Descriptions.Item>
      </Descriptions>
    )}
  </RouteContext.Consumer>
);

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      Alejandro Henández
      <DingdingOutlined style={{ marginLeft: 8 }} />
    </Fragment>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      Arturo López
      <DingdingOutlined style={{ color: '#00A0E9', marginLeft: 8 }} />
    </Fragment>
    <div>
      <a href=""> <FormattedMessage id='BLOCK_NAME.avatar'/> </a>
    </div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    <FormattedMessage id='BLOCK_NAME.popover.name'/>
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}> <FormattedMessage id='BLOCK_NAME.popover.reply'/></span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      <FormattedMessage id='BLOCK_NAME.popover.time'/>
    </div>
  </div>
);

const customDot = (
  dot: React.ReactNode,
  {
    status,
  }: {
    status: string;
  },
) => {
  if (status === 'process') {
    return (
      <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
        {dot}
      </Popover>
    );
  }
  return dot;
};

const operationTabList = [
  {
    key: 'tab1',
    tab: formatMessage({id: 'BLOCK_NAME.table1'}),
  },
  {
    key: 'tab2',
    tab: formatMessage({id: 'BLOCK_NAME.table2'}),
  },
  {
    key: 'tab3',
    tab: formatMessage({id: 'BLOCK_NAME.table2'}),
  },
];

const columns = [
  {
    title: formatMessage({id: 'BLOCK_NAME.columns.type.operation'}),
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: formatMessage({id: 'BLOCK_NAME.columns.operator'}),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: formatMessage({id: 'BLOCK_NAME.columns.results'}),
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => {
      if (text === 'agree') {
        return <Badge status="success" text={formatMessage({id: 'BLOCK_NAME.columns.results.success'})} />;
      }
      return <Badge status="error" text={formatMessage({id: 'BLOCK_NAME.columns.results.error'})} />;
    },
  },
  {
    title: formatMessage({id: 'BLOCK_NAME.columns.update.time'}),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: formatMessage({id: 'BLOCK_NAME.columns.observation'}),
    dataIndex: 'memo',
    key: 'memo',
  },
];

interface PAGE_NAME_UPPER_CAMEL_CASEState {
  operationKey: string;
  tabActiveKey: string;
}

class PAGE_NAME_UPPER_CAMEL_CASE extends Component<
  { loading: boolean; BLOCK_NAME_CAMEL_CASE: AdvancedProfileData; dispatch: Dispatch<any> },
  PAGE_NAME_UPPER_CAMEL_CASEState
> {
  public state: PAGE_NAME_UPPER_CAMEL_CASEState = {
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/fetchAdvanced',
    });
  }

  onOperationTabChange = (key: string) => {
    this.setState({ operationKey: key });
  };

  onTabChange = (tabActiveKey: string) => {
    this.setState({ tabActiveKey });
  };

  render() {
    const { operationKey, tabActiveKey } = this.state;
    const { BLOCK_NAME_CAMEL_CASE, loading } = this.props;
    const { advancedOperation1, advancedOperation2, advancedOperation3 } = BLOCK_NAME_CAMEL_CASE;
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation3}
          columns={columns}
        />
      ),
    };
    return (
      <PageHeaderWrapper
        title="Id：234231029431"
        extra={action}
        className={styles.pageHeader}
        content={description}
        extraContent={extra}
        tabActiveKey={tabActiveKey}
        onTabChange={this.onTabChange}
        tabList={[
          {
            key: 'detail',
            tab: formatMessage({id: 'BLOCK_NAME.page.header.tab.detail'}),
          },
          {
            key: 'rule',
            tab: formatMessage({id: 'BLOCK_NAME.page.header.tab.rule'}),
          },
        ]}
      >
        <div className={styles.main}>
          <GridContent>
            <Card title={formatMessage({id: 'BLOCK_NAME.grid.title'})} style={{ marginBottom: 24 }}>
              <RouteContext.Consumer>
                {({ isMobile }) => (
                  <Steps
                    direction={isMobile ? 'vertical' : 'horizontal'}
                    progressDot={customDot}
                    current={1}
                  >
                    <Step title={formatMessage({id: 'BLOCK_NAME.grid.step.proyect'})} description={desc1} />
                    <Step title={formatMessage({id: 'BLOCK_NAME.grid.step.analysis'})} description={desc2} />
                    <Step title={formatMessage({id: 'BLOCK_NAME.grid.step.review'})} />
                    <Step title={formatMessage({id: 'BLOCK_NAME.grid.step.aplly'})} />
                  </Steps>
                )}
              </RouteContext.Consumer>
            </Card>
            <Card title={formatMessage({id: 'BLOCK_NAME.card.title'})} style={{ marginBottom: 24 }} bordered={false}>
              <Descriptions style={{ marginBottom: 24 }}>
                <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.card.description.name'})}>Sunana</Descriptions.Item>
                <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.card.description.card.name'})}>32943898021309809423</Descriptions.Item>
                <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.card.description.identification.card'})}>3321944288191034921</Descriptions.Item>
                <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.card.description.contact'})}>18112345678</Descriptions.Item>
                <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.card.description.direction.contact'})}>
                  <FormattedMessage id='BLOCK_NAME.menssage.calzada' />
                </Descriptions.Item>
              </Descriptions>
              <Descriptions style={{ marginBottom: 24 }} title={formatMessage({id: 'BLOCK_NAME.descriptions.h4'})}>
                <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.menssage.data'})}>725</Descriptions.Item>
                <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.update.data'})}>2017-08-08</Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span>
                      
                      <FormattedMessage id ='BLOCK_NAME.menssage.data'/>
                      <Tooltip title={formatMessage({id: 'BLOCK_NAME.show.datas'})}>
                        <InfoCircleOutlined
                          style={{ color: 'rgba(0, 0, 0, 0.43)', marginLeft: 4 }}
                        />
                      </Tooltip>
                    </span>
                  }
                >
                  725
                </Descriptions.Item>
                <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.update.data'})}>2017-08-08</Descriptions.Item>
              </Descriptions>
              <h4 style={{ marginBottom: 16 }}><FormattedMessage id='BLOCK_NAME.descriptions.h4'/></h4>
              <Card type="inner" title={formatMessage({id: 'BLOCK_NAME.card.title.group'})}>
                <Descriptions style={{ marginBottom: 16 }} title={formatMessage({id: 'BLOCK_NAME.card.subtitle.group'})}>
                  <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.card.description.first'})}>Nombre del Grupo</Descriptions.Item>
                  <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.card.description.id'})}>1234567</Descriptions.Item>
                  <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.card.description.departmen'})}>compañia XX - unidad YY</Descriptions.Item>
                  <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.card.description.expiration.date'})}>2017-08-08</Descriptions.Item>
                  <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.card.description.description'})}>
                   Esta descripción es muy larga, muy larga, muy larga, muy larga, muy larga, muy larga, muy larga, muy larga, muy larga, muy larga, muy larga...
                  </Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: '16px 0' }} />
                <Descriptions style={{ marginBottom: 16 }} title={formatMessage({id: 'BLOCK_NAME.divider.description.title'})} column={1}>
                  <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.divider.description.label1'})}>
                    Citrullus lanatus (Thunb.) Matsum. et
                    Nakai cultiva vides anualmente; los tallos y ramas son gruesos y tienen bordes obvios. Zarcillos gruesos..
                  </Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: '16px 0' }} />
                <Descriptions title={formatMessage({id: 'BLOCK_NAME.divider.description.title2'})}>
                  <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.divider.description.label3'})}>Grupo Uno</Descriptions.Item>
                  <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.divider.description.label3'})}>1234568</Descriptions.Item>
                </Descriptions>
              </Card>
            </Card>
            <Card title={formatMessage({id: 'BLOCK_NAME.card.record'})} style={{ marginBottom: 24 }} bordered={false}>
              <Empty />
            </Card>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              onTabChange={this.onOperationTabChange}
            >
              {contentList[operationKey]}
            </Card>
          </GridContent>
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
    BLOCK_NAME_CAMEL_CASE: AdvancedProfileData;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    BLOCK_NAME_CAMEL_CASE,
    loading: loading.effects['BLOCK_NAME_CAMEL_CASE/fetchAdvanced'],
  }),
)(PAGE_NAME_UPPER_CAMEL_CASE);
