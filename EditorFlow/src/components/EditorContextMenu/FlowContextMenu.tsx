import { CanvasMenu, ContextMenu, EdgeMenu, GroupMenu, MultiMenu, NodeMenu } from 'gg-editor';
import { formatMessage } from 'umi';

import React from 'react';
import MenuItem from './MenuItem';
import styles from './index.less';

const FlowContextMenu = () => (
  <ContextMenu className={styles.contextMenu}>
    <NodeMenu>
      <MenuItem command="copy" text={formatMessage({ id: 'BLOCK_NAME.copy' })} />
      <MenuItem command="delete" text={formatMessage({ id: 'BLOCK_NAME.delete' })} />
    </NodeMenu>
    <EdgeMenu>
      <MenuItem command="delete" text={formatMessage({ id: 'BLOCK_NAME.delete' })} />
    </EdgeMenu>
    <GroupMenu>
      <MenuItem command="copy" text={formatMessage({ id: 'BLOCK_NAME.copy' })} />
      <MenuItem command="delete" text={formatMessage({ id: 'BLOCK_NAME.delete' })} />
      <MenuItem
        command="unGroup"
        icon="ungroup"
        text={formatMessage({ id: 'BLOCK_NAME.ungroup' })}
      />
    </GroupMenu>
    <MultiMenu>
      <MenuItem command="copy" text={formatMessage({ id: 'BLOCK_NAME.copy' })} />
      <MenuItem command="paste" text={formatMessage({ id: 'BLOCK_NAME.paste' })} />
      <MenuItem
        command="addGroup"
        icon="group"
        text={formatMessage({ id: 'BLOCK_NAME.addgroup' })}
      />
      <MenuItem command="delete" text={formatMessage({ id: 'BLOCK_NAME.delete' })} />
    </MultiMenu>
    <CanvasMenu>
      <MenuItem command="undo" text={formatMessage({ id: 'BLOCK_NAME.undo' })} />
      <MenuItem command="redo" text={formatMessage({ id: 'BLOCK_NAME.redo' })} />
      <MenuItem
        command="pasteHere"
        icon="paste"
        text={formatMessage({ id: 'BLOCK_NAME.pastehere' })}
      />
    </CanvasMenu>
  </ContextMenu>
);

export default FlowContextMenu;
