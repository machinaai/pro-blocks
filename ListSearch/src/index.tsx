import React, { Component } from 'react';

import { Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi';

interface PAGE_NAME_UPPER_CAMEL_CASEProps {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
}

class PAGE_NAME_UPPER_CAMEL_CASE extends Component<PAGE_NAME_UPPER_CAMEL_CASEProps> {
  handleTabChange = (key: string) => {
    const { match } = this.props;
    const url = match.url === '/' ? '' : match.url;
    switch (key) {
      case 'articles':
        history.push(`${url}/articles`);
        break;
      case 'applications':
        history.push(`${url}/applications`);
        break;
      case 'projects':
        history.push(`${url}/projects`);
        break;
      default:
        break;
    }
  };

  handleFormSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };

  getTabKey = () => {
    const { match, location } = this.props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'articles';
  };

  render() {
    const tabList = [
      {
        key: 'articles',
        tab: 'artículo',
      },
      {
        key: 'projects',
        tab: 'proyecto',
      },
      {
        key: 'applications',
        tab: 'solicitud',
      },
    ];

    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="por favor escribe"
          enterButton="buscar"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ maxWidth: 522, width: '100%' }}
        />
      </div>
    );

    const { children } = this.props;

    return (
      <PageHeaderWrapper
        content={mainSearch}
        tabList={tabList}
        tabActiveKey={this.getTabKey()}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default PAGE_NAME_UPPER_CAMEL_CASE;
