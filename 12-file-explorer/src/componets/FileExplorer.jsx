import React, { useCallback, useEffect, useState } from "react";
import explorerData from "../assets/ExplorerData";
import Node from "./Node";

function FileExplorer({ expandAll }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const handleSelectedFile = useCallback(
    (selectedId) => {
      const index = selectedIds?.findIndex((id) => selectedId == id);
      if (index !== -1) {
        const ids = [...selectedIds];
        ids.splice(index, 1);
        setSelectedIds(ids);
      } else {
        setSelectedIds((prev) => [...prev, selectedId]);
      }
    },
    [selectedIds],
  );

  return (
    <div className="file-explorer">
      {explorerData?.length ? (
        explorerData?.map((data) => {
          return (
            <Node
              key={data.id}
              nodeData={data}
              depth={0}
              updateSelectedIds={handleSelectedFile}
              selectedIds={selectedIds}
              expandAll={expandAll}
            />
          );
        })
      ) : (
        <h4>No Data Fount!</h4>
      )}
    </div>
  );
}

export default React.memo(FileExplorer);
