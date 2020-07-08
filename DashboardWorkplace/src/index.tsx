import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from 'antd';
import React, { Component } from 'react';

import { Link, Dispatch, connect, formatMessage } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import Radar from './components/Radar';
import { ModalState } from './model';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import { ActivitiesType, CurrentUser, NoticeType, RadarDataType } from './data.d';

const links = [
  {
    title: 'Opción 1',
    href: '',
  },
  {
    title: 'Opción 2',
    href: '',
  },
  {
    title: 'Opción 3',
    href: '',
  },
  {
    title: 'Opción 4',
    href: '',
  },
  {
    title: 'Opción 5',
    href: '',
  },
  {
    title: 'Opción 6',
    href: '',
  },
];

interface PAGE_NAME_UPPER_CAMEL_CASEProps {
  currentUser?: CurrentUser;
  projectNotice: NoticeType[];
  activities: ActivitiesType[];
  radarData: RadarDataType[];
  dispatch: Dispatch<any>;
  currentUserLoading: boolean;
  projectLoading: boolean;
  activitiesLoading: boolean;
}

const PageHeaderContent: React.FC<{ currentUser: CurrentUser }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
        {formatMessage({ id: 'WORKPLACE.message.greeting' })} 
          {currentUser.name}
          ，{formatMessage({ id: 'WORKPLACE.message.week' })}
        </div>
        <div>
          {currentUser.title} |{currentUser.group}
        </div>
      </div>
    </div>
  );
};

const ExtraContent: React.FC<{}> = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
    <Statistic title={formatMessage({ id: 'WORKPLACE.number.item' })} value={56} />
    </div>
    <div className={styles.statItem}>
    <Statistic title={formatMessage({ id: 'WORKPLACE.ranking.team' })}  value={8} suffix="/ 24" />
    </div>
    <div className={styles.statItem}>
    <Statistic title={formatMessage({ id: 'WORKPLACE.access.project' })}  value={2223} />
    </div>
  </div>
);

class PAGE_NAME_UPPER_CAMEL_CASE extends Component<PAGE_NAME_UPPER_CAMEL_CASEProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/init',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/clear',
    });
  }

  renderActivities = (item: ActivitiesType) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }
      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  render() {
    const {
      currentUser,
      activities,
      projectNotice,
      projectLoading,
      activitiesLoading,
      radarData,
    } = this.props;

    if (!currentUser || !currentUser.userid) {
      return null;
    }
    return (
      <PageHeaderWrapper
        content={<PageHeaderContent currentUser={currentUser} />}
        extraContent={<ExtraContent />}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title={formatMessage({ id: 'WORKPLACE.card.A.title' })} 
              bordered={false}
              extra={<Link to="/">{formatMessage({ id: 'WORKPLACE.extra.all' })}</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {projectNotice.map((item) => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link to={item.href}>{item.title}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{item.member || ''}</Link>
                      {item.updatedAt && (
                        <span className={styles.datetime} title={item.updatedAt}>
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title={formatMessage({ id: 'WORKPLACE.card.B.title' })} 
              loading={activitiesLoading}
            >
              <List<ActivitiesType>
                loading={activitiesLoading}
                renderItem={(item) => this.renderActivities(item)}
                dataSource={activities}
                className={styles.activitiesList}
                size="large"
              />
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title={formatMessage({ id: 'WORKPLACE.card.C.title' })} 
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
            </Card>
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title={formatMessage({ id: 'WORKPLACE.card.D.title' })} 
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} data={radarData} />
              </div>
            </Card>
            <Card
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              title={formatMessage({ id: 'WORKPLACE.card.E.title' })} 
              loading={projectLoading}
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {projectNotice.map((item) => (
                    <Col span={12} key={`members-item-${item.id}`}>
                      <Link to={item.href}>
                        <Avatar src={item.logo} size="small" />
                        <span className={styles.member}>{item.member}</span>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    BLOCK_NAME_CAMEL_CASE: { currentUser, projectNotice, activities, radarData },
    loading,
  }: {
    BLOCK_NAME_CAMEL_CASE: ModalState;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    currentUser,
    projectNotice,
    activities,
    radarData,
    currentUserLoading: loading.effects['BLOCK_NAME_CAMEL_CASE/fetchUserCurrent'],
    projectLoading: loading.effects['BLOCK_NAME_CAMEL_CASE/fetchProjectNotice'],
    activitiesLoading: loading.effects['BLOCK_NAME_CAMEL_CASE/fetchActivitiesList'],
  }),
)(PAGE_NAME_UPPER_CAMEL_CASE);
