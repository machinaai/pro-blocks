import { CanvasPanel, DetailPanel, NodePanel } from 'gg-editor';
import { formatMessage } from 'umi';

import { Card } from 'antd';
import React from 'react';
import DetailForm from './DetailForm';
import styles from './index.less';

const MindDetailPanel = () => (
  <DetailPanel className={styles.detailPanel}>
    <NodePanel>
      <DetailForm type="node" text={formatMessage({ id: 'BLOCK_NAME.node' })} />
    </NodePanel>
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

export default MindDetailPanel;
