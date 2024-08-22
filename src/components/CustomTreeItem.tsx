import {
  TreeItem2Checkbox,
  TreeItem2Content,
  TreeItem2GroupTransition,
  TreeItem2Icon,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Provider,
  TreeItem2Root,
  UseTreeItem2Parameters,
} from "@mui/x-tree-view";
import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2/useTreeItem2";
import * as React from "react";

import { useTreeContext } from "../context/hook";
import { TreeViewBaseItemWithParents } from "../types";
import { getItemChildIds } from "../util";

interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, "rootRef">,
    Omit<React.HTMLAttributes<HTMLLIElement>, "onFocus"> {
  onClickHandler: (checked: boolean, itemId: string) => void;
}

export const CustomTreeItem = React.forwardRef(function CustomTreeItem2(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const { id, itemId, label, disabled, children, onClickHandler, ...other } =
    props;

  const { selectedIds } = useTreeContext();

  const {
    getCheckboxProps,
    getContentProps,
    getGroupTransitionProps,
    getIconContainerProps,
    getLabelProps,
    getRootProps,
    publicAPI,
    status,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  // Get the full item, so we have access to the item parents and children
  const item = publicAPI.getItem(itemId) as TreeViewBaseItemWithParents;
  let indeterminate = false;

  // If the item has children, it's possible for the checkbox state to be indeterminate
  if (item.children) {
    // Recursively get all of the item's children's IDs
    const childIds = getItemChildIds(item);
    if (
      // If some of the children are checked, but not all of them
      childIds.some((childId) => selectedIds.includes(childId)) &&
      !childIds.every((childId) => selectedIds.includes(childId))
    ) {
      indeterminate = true;
    }
  }

  return (
    <TreeItem2Provider itemId={itemId}>
      <TreeItem2Root {...getRootProps(other)}>
        <TreeItem2Content {...getContentProps()}>
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer>
          <TreeItem2Checkbox
            {...getCheckboxProps()}
            onChange={(event, checked) => {
              event.stopPropagation();
              onClickHandler(checked, itemId);
            }}
            indeterminate={indeterminate}
          />
          <TreeItem2Label {...getLabelProps()} />
        </TreeItem2Content>
        {children && (
          <TreeItem2GroupTransition {...getGroupTransitionProps()} />
        )}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});
