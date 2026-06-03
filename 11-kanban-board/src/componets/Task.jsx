import React from "react";

function Task({ column, task, onDragStart, onDropOnTask }) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(column, task)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        onDropOnTask(e, column, task);
      }}
      className="task"
    >
      {task.title}
    </div>
  );
}

export default Task;
