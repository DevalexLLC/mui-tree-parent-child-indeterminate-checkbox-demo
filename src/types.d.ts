import { TreeViewBaseItem } from "@mui/x-tree-view";
import * as React from "react";

export interface TreeViewBaseItemWithParents extends TreeViewBaseItem {
  children?: TreeViewBaseItemWithParents[];
  parents?: string[];
}

export type TreeContextType = {
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
};
