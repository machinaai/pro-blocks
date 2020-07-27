import { Link, formatMessage } from 'umi';
import { Result, Button } from 'antd';
import React from 'react';

export default () => (
  <Result
    status="404"
    title="404"
    style={{
      background: 'none',
    }}
    subTitle={formatMessage({ id: 'exception-404.description' })}
    extra={
      <Link to="/">
        <Button type="primary">{formatMessage({ id: 'exception-404.exception.back' })}</Button>
      </Link>
    }
  />
);
