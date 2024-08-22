import { UseTreeViewItemsPublicAPI } from "@mui/x-tree-view/internals/plugins/useTreeViewItems/useTreeViewItems.types";
import { TreeViewBaseItemWithParents } from "./types";

export function getItemChildIds(item: TreeViewBaseItemWithParents): string[] {
  const ids: string[] = [];
  item.children?.forEach((child) => {
    ids.push(child.id);
    ids.push(...getItemChildIds(child));
  });

  return ids;
}

export function getItemParentIds(
  item: TreeViewBaseItemWithParents,
  api: UseTreeViewItemsPublicAPI<TreeViewBaseItemWithParents>
): string[] {
  const ids: string[] = [];
  item.parents?.forEach((parentId) => {
    ids.push(parentId);
    const parent = api.getItem(parentId);
    ids.push(...getItemParentIds(parent, api));
  });

  return ids;
}
