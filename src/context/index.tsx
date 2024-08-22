import * as React from "react";
import { TreeContextType } from "../types";

export const TreeContext = React.createContext<TreeContextType | undefined>(
  undefined
);
export default function TreeProvider({
  children,
}: React.PropsWithChildren): React.ReactNode {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const value = React.useMemo(
    () => ({ selectedIds, setSelectedIds }),
    [selectedIds]
  );

  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
}
