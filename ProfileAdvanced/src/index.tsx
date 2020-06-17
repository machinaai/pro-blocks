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
import { connect, Dispatch } from 'umi';
import { AdvancedProfileData } from './data.d';
import styles from './style.less';

const { Step } = Steps;
const ButtonGroup = Button.Group;

const menu = (
  <Menu>
    <Menu.Item key="1">Opción 1</Menu.Item>
    <Menu.Item key="2">Opción 2</Menu.Item>
    <Menu.Item key="3">Opción 3</Menu.Item>
  </Menu>
);

const mobileMenu = (
  <Menu>
    <Menu.Item key="1">Operación 1</Menu.Item>
    <Menu.Item key="2">Operación 2</Menu.Item>
    <Menu.Item key="3">Operación 3</Menu.Item>
    <Menu.Item key="4">Operación 4</Menu.Item>
    <Menu.Item key="5">Operación 5</Menu.Item>
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
            Operación principal
          </Dropdown.Button>
        );
      }
      return (
        <Fragment>
          <ButtonGroup>
            <Button>Operación 1</Button>
            <Button>Operación 2</Button>
            <Dropdown overlay={menu} placement="bottomRight">
              <Button>
                <EllipsisOutlined />
              </Button>
            </Dropdown>
          </ButtonGroup>
          <Button type="primary">Operación principal</Button>
        </Fragment>
      );
    }}
  </RouteContext.Consumer>
);

const extra = (
  <div className={styles.moreInfo}>
    <Statistic title="estado" value="estado" />
    <Statistic title="Total de la orden" value={568.08} prefix="$" />
  </div>
);

const description = (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
        <Descriptions.Item label="fundador">Alejandro Hernández</Descriptions.Item>
        <Descriptions.Item label="Pedido de productos">XX Servicio</Descriptions.Item>
        <Descriptions.Item label="Tiempo de creación">2017-07-07</Descriptions.Item>
        <Descriptions.Item label="Documentos relacionados">
          <a href="">12421</a>
        </Descriptions.Item>
        <Descriptions.Item label="Fecha efectiva">2017-07-07 ~ 2017-08-08</Descriptions.Item>
        <Descriptions.Item label="Observaciones">Por favor confirme dentro de dos días hábiles</Descriptions.Item>
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
      <a href="">Prisa</a>
    </div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    Nombre del recurso
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Ninguna respuesta</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      Consumo de tiempo: 2 horas y 25 minutos.
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
    tab: 'Registro de operación 1',
  },
  {
    key: 'tab2',
    tab: 'Registro de operación 2',
  },
  {
    key: 'tab3',
    tab: 'Registro de operación 3',
  },
];

const columns = [
  {
    title: 'Tipo de operación',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Operador',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Resultados ',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => {
      if (text === 'agree') {
        return <Badge status="success" text="exitoso" />;
      }
      return <Badge status="error" text="error" />;
    },
  },
  {
    title: 'Hora de actualización',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'Observaciones',
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
            tab: 'Detalles',
          },
          {
            key: 'rule',
            tab: 'regla',
          },
        ]}
      >
        <div className={styles.main}>
          <GridContent>
            <Card title="Progreso del proceso" style={{ marginBottom: 24 }}>
              <RouteContext.Consumer>
                {({ isMobile }) => (
                  <Steps
                    direction={isMobile ? 'vertical' : 'horizontal'}
                    progressDot={customDot}
                    current={1}
                  >
                    <Step title="Crear proyecto" description={desc1} />
                    <Step title="Examen preliminar departamental" description={desc2} />
                    <Step title="Revisión financiera" />
                    <Step title="Aplicar" />
                  </Steps>
                )}
              </RouteContext.Consumer>
            </Card>
            <Card title="Información de usuario" style={{ marginBottom: 24 }} bordered={false}>
              <Descriptions style={{ marginBottom: 24 }}>
                <Descriptions.Item label="nombre de usuario">Sunana</Descriptions.Item>
                <Descriptions.Item label="número de tarjeta de miembro">32943898021309809423</Descriptions.Item>
                <Descriptions.Item label="tarjeta de identificación">3321944288191034921</Descriptions.Item>
                <Descriptions.Item label="Contacto">18112345678</Descriptions.Item>
                <Descriptions.Item label="dirección de contacto">
                  Calzada de las bombas 456 interior 4
                </Descriptions.Item>
              </Descriptions>
              <Descriptions style={{ marginBottom: 24 }} title="Grupo de información">
                <Descriptions.Item label="Datos XX">725</Descriptions.Item>
                <Descriptions.Item label="Actualización de los datos">2017-08-08</Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span>
                      Datos XX
                      <Tooltip title="los datos muestran">
                        <InfoCircleOutlined
                          style={{ color: 'rgba(0, 0, 0, 0.43)', marginLeft: 4 }}
                        />
                      </Tooltip>
                    </span>
                  }
                >
                  725
                </Descriptions.Item>
                <Descriptions.Item label="Actialización de los datos">2017-08-08</Descriptions.Item>
              </Descriptions>
              <h4 style={{ marginBottom: 16 }}>Grupo de información</h4>
              <Card type="inner" title="Grupo de información multinivel">
                <Descriptions style={{ marginBottom: 16 }} title="Nombre del grupo">
                  <Descriptions.Item label="principal">Nombre del Grupo</Descriptions.Item>
                  <Descriptions.Item label="id">1234567</Descriptions.Item>
                  <Descriptions.Item label="Departamento">compañia XX - unidad YY</Descriptions.Item>
                  <Descriptions.Item label="fecha de caducidad">2017-08-08</Descriptions.Item>
                  <Descriptions.Item label="descripción">
                   Esta descripción es muy larga, muy larga, muy larga, muy larga, muy larga, muy larga, muy larga, muy larga, muy larga, muy larga, muy larga...
                  </Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: '16px 0' }} />
                <Descriptions style={{ marginBottom: 16 }} title="Nombre del grupo" column={1}>
                  <Descriptions.Item label="nombre científico">
                    Citrullus lanatus (Thunb.) Matsum. et
                    Nakai cultiva vides anualmente; los tallos y ramas son gruesos y tienen bordes obvios. Zarcillos gruesos..
                  </Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: '16px 0' }} />
                <Descriptions title="Nombre del grupo">
                  <Descriptions.Item label="principal">Grupo Uno</Descriptions.Item>
                  <Descriptions.Item label="id">1234568</Descriptions.Item>
                </Descriptions>
              </Card>
            </Card>
            <Card title="Historial de llamadas de usuarios en los últimos seis meses." style={{ marginBottom: 24 }} bordered={false}>
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
