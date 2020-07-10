import { Divider } from 'antd';
import React from 'react';
import { formatMessage } from 'umi';
import { Toolbar } from 'gg-editor';
import ToolbarButton from './ToolbarButton';
import styles from './index.less';

const FlowToolbar = () => (
  <Toolbar className={styles.toolbar}>
    <ToolbarButton command="undo" text={formatMessage({ id: 'BLOCK_NAME.undo' })} />
    <ToolbarButton command="redo" text={formatMessage({ id: 'BLOCK_NAME.redo' })} />
    <Divider type="vertical" />
    <ToolbarButton
      command="zoomIn"
      icon="zoom-in"
      text={formatMessage({ id: 'BLOCK_NAME.zoom-in' })}
    />
    <ToolbarButton
      command="zoomOut"
      icon="zoom-out"
      text={formatMessage({ id: 'BLOCK_NAME.zoom-out' })}
    />
    <ToolbarButton
      command="autoZoom"
      icon="fit-map"
      text={formatMessage({ id: 'BLOCK_NAME.auto-zoom' })}
    />
    <ToolbarButton
      command="resetZoom"
      icon="actual-size"
      text={formatMessage({ id: 'BLOCK_NAME.reset-zoom' })}
    />
    <Divider type="vertical" />
    <ToolbarButton command="append" text={formatMessage({ id: 'BLOCK_NAME.topic' })} />
    <ToolbarButton
      command="appendChild"
      icon="append-child"
      text={formatMessage({ id: 'BLOCK_NAME.subtopic' })}
    />
    <Divider type="vertical" />
    <ToolbarButton command="collapse" text={formatMessage({ id: 'BLOCK_NAME.fold' })} />
    <ToolbarButton command="expand" text={formatMessage({ id: 'BLOCK_NAME.unfold' })} />
  </Toolbar>
);

export default FlowToolbar;
