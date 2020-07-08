import { Card } from 'antd';
import { Minimap } from 'gg-editor';
import React from 'react';
import { formatMessage } from 'umi';

const EditorMinimap = () => (
  <Card type="inner" size="small" title={formatMessage({id: 'BLOCK_NAME.minimap'})} bordered={false}>
    <Minimap height={200} />
  </Card>
);

export default EditorMinimap;
