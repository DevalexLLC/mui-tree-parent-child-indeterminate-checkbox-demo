import { TreeViewBaseItem } from "@mui/x-tree-view";
import { TreeViewBaseItemWithParents } from "./types";

const MUI_X_PRODUCTS: TreeViewBaseItem[] = [
  {
    id: "grid",
    label: "Data Grid",
    children: [
      { id: "grid-community", label: "@mui/x-data-grid" },
      { id: "grid-pro", label: "@mui/x-data-grid-pro" },
      {
        id: "grid-premium",
        label: "@mui/x-data-grid-premium",
        children: [
          {
            id: "grid-2",
            label: "Data Grid",
            children: [
              {
                id: "grid-community-2",
                label: "@mui/x-data-grid",
              },
              {
                id: "grid-pro-2",
                label: "@mui/x-data-grid-pro",
              },
              {
                id: "grid-premium-2",
                label: "@mui/x-data-grid-premium",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "pickers",
    label: "Date and Time Pickers",
    children: [
      {
        id: "pickers-community",
        label: "@mui/x-date-pickers",
      },
      {
        id: "pickers-pro",
        label: "@mui/x-date-pickers-pro",
      },
    ],
  },
  {
    id: "charts",
    label: "Charts",
    children: [{ id: "charts-community", label: "@mui/x-charts" }],
  },
  {
    id: "tree-view",
    label: "Tree View",
    children: [
      {
        id: "tree-view-community",
        label: "@mui/x-tree-view",
      },
    ],
  },
];

function getItemsWithParents(
  items: TreeViewBaseItem[],
  parents: string[] = []
): TreeViewBaseItemWithParents[] {
  return items.map((item) => {
    if (item.children) {
      const newParents = [...parents, item.id];
      return {
        ...item,
        parents,
        children: getItemsWithParents(item.children, newParents),
      };
    }

    return {
      ...item,
      parents,
    };
  });
}

export const productsWithParents = getItemsWithParents(MUI_X_PRODUCTS);

// Here's what the array should look like once parents are added:
// export const MUI_X_PRODUCTS_WITH_PARENTS: TreeViewBaseItemWithParents[] = [
//   {
//     id: "grid",
//     label: "Data Grid",
//     children: [
//       { id: "grid-community", label: "@mui/x-data-grid", parents: ["grid"] },
//       { id: "grid-pro", label: "@mui/x-data-grid-pro", parents: ["grid"] },
//       {
//         id: "grid-premium",
//         label: "@mui/x-data-grid-premium",
//         children: [
//           {
//             id: "grid-2",
//             label: "Data Grid",
//             children: [
//               {
//                 id: "grid-community-2",
//                 label: "@mui/x-data-grid",
//                 parents: ["grid", "grid-premium", "grid-2"],
//               },
//               {
//                 id: "grid-pro-2",
//                 label: "@mui/x-data-grid-pro",
//                 parents: ["grid", "grid-premium", "grid-2"],
//               },
//               {
//                 id: "grid-premium-2",
//                 label: "@mui/x-data-grid-premium",
//                 parents: ["grid", "grid-premium", "grid-2"],
//               },
//             ],
//             parents: ["grid", "grid-premium"],
//           },
//         ],
//         parents: ["grid"],
//       },
//     ],
//     parents: [],
//   },
//   {
//     id: "pickers",
//     label: "Date and Time Pickers",
//     children: [
//       {
//         id: "pickers-community",
//         label: "@mui/x-date-pickers",
//         parents: ["pickers"],
//       },
//       {
//         id: "pickers-pro",
//         label: "@mui/x-date-pickers-pro",
//         parents: ["pickers"],
//       },
//     ],
//   },
//   {
//     id: "charts",
//     label: "Charts",
//     children: [
//       { id: "charts-community", label: "@mui/x-charts", parents: ["charts"] },
//     ],
//     parents: [],
//   },
//   {
//     id: "tree-view",
//     label: "Tree View",
//     children: [
//       {
//         id: "tree-view-community",
//         label: "@mui/x-tree-view",
//         parents: ["tree-view"],
//       },
//     ],
//     parents: [],
//   },
// ];
