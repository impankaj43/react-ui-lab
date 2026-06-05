// src/data/treeData.js

export const treeData = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "components",
        type: "folder",
        children: [
          { id: "3", name: "App.jsx", type: "file" },
          { id: "4", name: "QueryBuilder.jsx", type: "file" },
          { id: "5", name: "TreeNode.jsx", type: "file" },
        ],
      },
      {
        id: "6",
        name: "hooks",
        type: "folder",
        children: [
          { id: "7", name: "useDebounce.js", type: "file" },
          { id: "8", name: "useFetch.js", type: "file" },
        ],
      },
      {
        id: "9",
        name: "styles",
        type: "folder",
        children: [
          { id: "10", name: "App.css", type: "file" },
          { id: "11", name: "index.css", type: "file" },
        ],
      },
      { id: "12", name: "index.js", type: "file" },
    ],
  },
  {
    id: "13",
    name: "public",
    type: "folder",
    children: [
      { id: "14", name: "index.html", type: "file" },
      { id: "15", name: "favicon.ico", type: "file" },
    ],
  },
  { id: "16", name: "package.json", type: "file" },
  { id: "17", name: "README.md", type: "file" },
];

export default treeData;
