import React from "react";

const ContextMenu = React.forwardRef(({ isVisible, items, x, y }, ref) => {
  if (!isVisible || !items.length) return null;
  return (
    <ul
      ref={ref}
      style={{
        position: "absolute",
        top: `${y}px`,
        left: `${x}px`,
        backgroundColor: "white",
        border: "1px solid white",
        padding: "10px",
        listStyle: "none",
        minWidth: "100px",
        boxShadow: "5px 5px 5px lightgray",
      }}
    >
      {items.map((item) => (
        <li
          style={{
            padding: "5px 2px",
            cursor: "pointer",
          }}
          key={item.id}
          onClick={item.action}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
});

export default ContextMenu;
