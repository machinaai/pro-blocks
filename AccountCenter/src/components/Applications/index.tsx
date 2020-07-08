import {
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Dropdown, List, Menu, Tooltip } from 'antd';
import React from 'react';

import { connect, FormattedMessage, formatMessage } from 'umi';
import numeral from 'numeral';
import { ModalState } from '../../model';
import stylesApplications from './index.less';

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

const Applications: React.FC<Partial<ModalState>> = (props) => {
  const { list } = props;
  const itemMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
          <FormattedMessage id='BLOCK_NAME.menu.item1' />
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
          <FormattedMessage id='BLOCK_NAME.menu.item2' />
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
          <FormattedMessage id='BLOCK_NAME.menu.item3' />
        </a>
      </Menu.Item>
    </Menu>
  );
  const CardInfo: React.FC<{
    activeUser: React.ReactNode;
    newUser: React.ReactNode;
  }> = ({ activeUser, newUser }) => (
    <div className={stylesApplications.cardInfo}>
      <div>
        <p>< FormattedMessage id='BLOCK_NAME.active.user'/> </p>
        <p>{activeUser}</p>
      </div>
      <div>
        <p>< FormattedMessage id='BLOCK_NAME.new.user'/> </p>
        <p>{newUser}</p>
      </div>
    </div>
  );
  return (
    <List
      rowKey="id"
      className={stylesApplications.filterCardList}
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
        <List.Item key={item.id}>
          <Card
            hoverable
            bodyStyle={{ paddingBottom: 20 }}
            actions={[
              <Tooltip key="download" title={formatMessage({id: 'BLOCK_NAME.list.item.download'})}>
                <DownloadOutlined />
              </Tooltip>,
              <Tooltip title={formatMessage({id: 'BLOCK_NAME.list.item.edit'})} key="editar">
                <EditOutlined />
              </Tooltip>,
              <Tooltip title={formatMessage({id: 'BLOCK_NAME.list.item.share'})} key="compartir">
                <ShareAltOutlined />
              </Tooltip>,
              <Dropdown overlay={itemMenu} key="ellipsis">
                <EllipsisOutlined />
              </Dropdown>,
            ]}
          >
            <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
            <div className={stylesApplications.cardItemContent}>
              <CardInfo
                activeUser={formatWan(item.activeUser)}
                newUser={numeral(item.newUser).format('0,0')}
              />
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default connect(({ BLOCK_NAME_CAMEL_CASE }: { BLOCK_NAME_CAMEL_CASE: ModalState }) => ({
  list: BLOCK_NAME_CAMEL_CASE.list,
}))(Applications);
