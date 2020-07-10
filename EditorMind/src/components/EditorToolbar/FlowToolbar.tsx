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
    <ToolbarButton command="copy" text={formatMessage({ id: 'BLOCK_NAME.copy' })} />
    <ToolbarButton command="paste" text={formatMessage({ id: 'BLOCK_NAME.paste' })} />
    <ToolbarButton command="delete" text={formatMessage({ id: 'BLOCK_NAME.delete' })} />
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
    <ToolbarButton
      command="toBack"
      icon="to-back"
      text={formatMessage({ id: 'BLOCK_NAME.to-back' })}
    />
    <ToolbarButton
      command="toFront"
      icon="to-front"
      text={formatMessage({ id: 'BLOCK_NAME.to-front' })}
    />
    <Divider type="vertical" />
    <ToolbarButton
      command="multiSelect"
      icon="multi-select"
      text={formatMessage({ id: 'BLOCK_NAME.multi-select' })}
    />
    <ToolbarButton
      command="addGroup"
      icon="group"
      text={formatMessage({ id: 'BLOCK_NAME.addgroup' })}
    />
    <ToolbarButton
      command="unGroup"
      icon="ungroup"
      text={formatMessage({ id: 'BLOCK_NAME.ungroup' })}
    />
  </Toolbar>
);

export default FlowToolbar;
