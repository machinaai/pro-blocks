import { CanvasPanel, DetailPanel, EdgePanel, GroupPanel, MultiPanel, NodePanel } from 'gg-editor';
import { formatMessage } from 'umi';

import { Card } from 'antd';
import React from 'react';
import DetailForm from './DetailForm';
import styles from './index.less';

const FlowDetailPanel = () => (
  <DetailPanel className={styles.detailPanel}>
    <NodePanel>
      <DetailForm type={formatMessage({ id: 'BLOCK_NAME.node' })} />
    </NodePanel>
    <EdgePanel>
      <DetailForm type={formatMessage({ id: 'BLOCK_NAME.edge' })} />
    </EdgePanel>
    <GroupPanel>
      <DetailForm type={formatMessage({ id: 'BLOCK_NAME.group' })} />
    </GroupPanel>
    <MultiPanel>
      <Card
        type="inner"
        size="small"
        title={formatMessage({ id: 'BLOCK_NAME.multi-select' })}
        bordered={false}
      />
    </MultiPanel>
    <CanvasPanel>
      <Card
        type="inner"
        size="small"
        title={formatMessage({ id: 'BLOCK_NAME.canvas' })}
        bordered={false}
      />
    </CanvasPanel>
  </DetailPanel>
);

export default FlowDetailPanel;
