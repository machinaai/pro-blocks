import { CanvasMenu, ContextMenu, NodeMenu } from 'gg-editor';
import { formatMessage } from 'umi';

import React from 'react';
import MenuItem from './MenuItem';
import styles from './index.less';

const MindContextMenu = () => (
  <ContextMenu className={styles.contextMenu}>
    <NodeMenu>
      <MenuItem command="append" text={formatMessage({ id: 'BLOCK_NAME.topic' })} />
      <MenuItem
        command="appendChild"
        icon="append-child"
        text={formatMessage({ id: 'BLOCK_NAME.subtopic' })}
      />
      <MenuItem command="collapse" text={formatMessage({ id: 'BLOCK_NAME.fold' })} />
      <MenuItem command="expand" text={formatMessage({ id: 'BLOCK_NAME.unfold' })} />
      <MenuItem command="delete" text={formatMessage({ id: 'BLOCK_NAME.delete' })} />
    </NodeMenu>
    <CanvasMenu>
      <MenuItem command="undo" text={formatMessage({ id: 'BLOCK_NAME.undo' })} />
      <MenuItem command="redo" text={formatMessage({ id: 'BLOCK_NAME.redo' })} />
    </CanvasMenu>
  </ContextMenu>
);

export default MindContextMenu;
