import * as React from "react";
import { TreeContextType } from "../types";
import { TreeContext } from "./index";

export function useTreeContext(): TreeContextType {
  const context = React.useContext(TreeContext);

  if (context === undefined) {
    throw new Error("useTreeContext must be used with a TreeProvider");
  }

  return context;
}
