import React, { useEffect, useState } from "react";

function Node({ nodeData, depth, selectedIds, updateSelectedIds, expandAll }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (expandAll) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [expandAll]);

  const handleClick = () => {
    if (nodeData.type === "folder") {
      setOpen((prev) => !prev);
    } else {
      updateSelectedIds(nodeData.id);
    }
  };

  return (
    <div className="node">
      <div
        onClick={handleClick}
        style={{ marginLeft: `${16 + 16 * depth}px` }}
        className={
          selectedIds?.includes(nodeData.id)
            ? "node-row active-row"
            : "node-row"
        }
      >
        <span>
          {nodeData.type === "folder" ? (open ? "⮮🗂️" : "⮩🗂️") : "📄"}
        </span>
        <span>{nodeData.name}</span>
      </div>
      {nodeData.type === "folder" &&
        nodeData?.children.length &&
        open &&
        nodeData.children?.map((data) => (
          <Node
            key={data.id}
            depth={depth + 1}
            nodeData={data}
            updateSelectedIds={updateSelectedIds}
            selectedIds={selectedIds}
            expandAll={expandAll}
          />
        ))}
    </div>
  );
}

export default React.memo(Node);
