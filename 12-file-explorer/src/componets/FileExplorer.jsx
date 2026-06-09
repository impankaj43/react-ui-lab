import React, {
  useCallback,
  useEffect,
  useReducer,
  useState,
  useRef,
} from "react";
import ExplorerData from "../assets/ExplorerData";
import Node from "./Node";
import ContextMenu from "./ContextMenu";
import Form from "./Form";

function FileExplorer({ expandAll }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [explorerData, setExplorerData] = useState(ExplorerData);
  const [menu, setMenu] = useState({
    isVisible: false,
    x: 0,
    y: 0,
    targetItem: null,
  });
  const [openForm, setOpenForm] = useState(false);
  const menuRef = useRef();

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

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !openForm) {
        console.log(openForm);
        setMenu({
          isVisible: false,
          x: 0,
          y: 0,
          targetItem: null,
        });
      }
    };
    if (menu.isVisible) document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [menu.isVisible, openForm]);

  const onContext = useCallback((e, item) => {
    event.preventDefault();
    event.stopPropagation();
    setMenu({
      isVisible: true,
      x: event.clientX,
      y: event.clientY,
      targetItem: item,
    });
  }, []);

  const addExplorerItem = (existingExplorerData, parentId, item) => {
    return existingExplorerData.map((data) => {
      if (data.id === parentId && data.type === "folder") {
        return { ...data, children: [...data.children, item] };
      }
      if (data.type === "folder") {
        return {
          ...data,
          children: addExplorerItem(data.children, parentId, item),
        };
      } else {
        return data;
      }
    });
  };

  const handleAddExplorerItem = (parentId, item) => {
    setExplorerData((prev) => addExplorerItem(prev, parentId, item));
    closeForm();
  };

  const onAddMenuItemClick = () => {
    setOpenForm(true);
  };

  const removeExplorerItem = (existingExplorerData, item) => {
    const filteredItems = existingExplorerData.filter(
      (data) => data.id !== item.id,
    );
    return filteredItems.map((data) => {
      if (data.type === "folder") {
        return {
          ...data,
          children: removeExplorerItem(data.children, item),
        };
      } else {
        return data;
      }
    });
  };

  const onRemoveMenuItemClick = () => {
    setExplorerData((prev) => removeExplorerItem(prev, menu.targetItem));
    closeForm();
  };

  const closeForm = () => {
    setOpenForm(false);
    setMenu({
      isVisible: false,
      x: 0,
      y: 0,
      targetItem: null,
    });
  };

  const onformSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const itemData = { ...Object.fromEntries(formData), id: Date.now() };
    if (itemData.type == "folder") {
      itemData.children = [];
    }
    handleAddExplorerItem(menu.targetItem.id, itemData);
  };

  const menuItems = [
    { id: 1, label: "Add Item", action: onAddMenuItemClick },
    { id: 2, label: "Remove Item", action: onRemoveMenuItemClick },
  ];

  return (
    <div className="file-explorer">
      {explorerData?.length ? (
        <>
          {explorerData?.map((data) => {
            return (
              <Node
                key={data.id}
                nodeData={data}
                depth={0}
                updateSelectedIds={handleSelectedFile}
                selectedIds={selectedIds}
                expandAll={expandAll}
                contextMenu={onContext}
              />
            );
          })}
          <ContextMenu
            ref={menuRef}
            isVisible={menu.isVisible}
            x={menu.x}
            y={menu.y}
            items={
              menu.targetItem?.type == "folder" ? menuItems : menuItems.slice(1)
            }
          />
          {openForm && <Form onsubmit={onformSubmit} onClose={closeForm} />}
        </>
      ) : (
        <h4>No Data Fount!</h4>
      )}
    </div>
  );
}

export default React.memo(FileExplorer);
