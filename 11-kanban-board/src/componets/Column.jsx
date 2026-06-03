import React from "react";
import Task from "./Task";

function Column({ columnName, tasks, onDrop, onDragStart, onDropOnTask }) {
  return (
    <div className="column">
      <div className="header">{columnName}</div>
      <div
        className="items"
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => onDrop(columnName)}
      >
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            column={columnName}
            onDropOnTask={onDropOnTask}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
