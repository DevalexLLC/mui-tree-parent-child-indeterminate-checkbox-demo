import Box from "@mui/material/Box";
import {
  RichTreeView,
  TreeItem2Props,
  useTreeViewApiRef,
} from "@mui/x-tree-view";
import * as React from "react";
import { CustomTreeItem } from "./components/CustomTreeItem";
import { useTreeContext } from "./context/hook";
import { productsWithParents } from "./items";
import { getItemChildIds, getItemParentIds } from "./util";

function App() {
  const context = useTreeContext();
  const apiRef = useTreeViewApiRef();

  // Custom handler is passed to a custom TreeItem2
  const handleSelection = React.useCallback(
    (checked: boolean, itemId: string) => {
      // This is for TypeScript; apiRef.current should not be undefined in this instance
      if (apiRef.current) {
        // Get the full item, so we have access to the item parents and children
        const item = apiRef.current.getItem(itemId);

        if (checked) {
          const idsToSelect = [itemId];
          // Get item's children
          idsToSelect.push(...getItemChildIds(item));
          // Get item's parents
          idsToSelect.push(...getItemParentIds(item, apiRef.current));

          context.setSelectedIds((prev) => [
            ...new Set([...prev, ...idsToSelect]),
          ]);
        } else {
          const idsToUnselect = [itemId];
          // Get children
          idsToUnselect.push(...getItemChildIds(item));
          // Get parents
          idsToUnselect.push(...getItemParentIds(item, apiRef.current));

          context.setSelectedIds((prev) =>
            prev.filter((p) => !idsToUnselect.includes(p))
          );
        }
      }
    },
    [apiRef, context]
  );

  const renderCustomTreeItem = React.useCallback(
    (props: TreeItem2Props) => (
      <CustomTreeItem {...props} onClickHandler={handleSelection} />
    ),
    [handleSelection]
  );

  return (
    <Box sx={{ minHeight: 200, minWidth: 250, flexGrow: 1 }}>
      <RichTreeView
        apiRef={apiRef}
        checkboxSelection
        items={productsWithParents}
        multiSelect
        selectedItems={context.selectedIds}
        slots={{
          item: renderCustomTreeItem,
        }}
      />
    </Box>
  );
}

export default App;
