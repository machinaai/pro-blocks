import { Link, formatMessage } from 'umi';
import { Result, Button } from 'antd';
import React from 'react';

export default () => (
  <Result
    status="500"
    title="500"
    style={{
      background: 'none',
    }}
    subTitle={formatMessage({ id: 'exception-500.description.500' })}
    extra={
      <Link to="/">
        <Button type="primary">{formatMessage({ id: 'exception-500.exception.back' })}</Button>
      </Link>
    }
  />
);
