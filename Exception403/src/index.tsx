import { Link, formatMessage  } from 'umi';
import { Result, Button } from 'antd';
import React from 'react';

export default () => (
  <Result
    status="403"
    title="403"
    style={{
      background: 'none',
    }}
    subTitle={formatMessage({ id: 'exception-403.description' })}
    extra={
      <Link to="/">
        <Button type="primary">{formatMessage({ id: 'exception-403.exception.back' })}</Button>
      </Link>
    }
  />
);
