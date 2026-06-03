import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Column from "./componets/Column";

function App() {
  const [boardData, setBordData] = useState({
    todo: [
      { id: 1, title: "React" },
      { id: 2, title: "JavaScript" },
    ],
    inProgress: [
      { id: 3, title: "SQL" },
      { id: 4, title: "Mysql" },
    ],
    done: [
      { id: 5, title: "html" },
      { id: 6, title: "css" },
    ],
  });
  const [draggedItem, setdraggedItem] = useState(null);

  const onDragStart = (column, task) => {
    console.log(column, task);
    setdraggedItem({
      columnName: column,
      task: task,
    });
  };

  const onDrop = (column) => {
    if (draggedItem) {
      const draggedTask = draggedItem.task;
      const fromColumn = draggedItem.columnName;
      const destinationColumn = column;
      const existingBoard = { ...boardData };
      existingBoard[fromColumn] = existingBoard[fromColumn]
        .filter((task) => task.id !== draggedTask.id)
        .map((task) => task);
      existingBoard[destinationColumn].push(draggedTask);
      setBordData({ ...existingBoard });
    }
    setdraggedItem(null);
  };

  const onDropOnTask = (e, column, task) => {
    e.stopPropagation();
    const draggedTask = draggedItem.task;
    const fromColumn = draggedItem.columnName;
    const destinationColumn = column;
    const existingBoard = { ...boardData };
    if (fromColumn == destinationColumn) {
      const fromIndex = existingBoard[fromColumn].findIndex(
        (data) => data.id == draggedTask.id,
      );
      const destinationIndex = existingBoard[destinationColumn].findIndex(
        (data) => data.id === task.id,
      );
      [
        existingBoard[fromColumn][fromIndex],
        existingBoard[fromColumn][destinationIndex],
      ] = [
        existingBoard[fromColumn][destinationIndex],
        existingBoard[fromColumn][fromIndex],
      ];
    } else {
      const index = existingBoard[destinationColumn].findIndex(
        (data) => data.id == task.id,
      );
      if (index !== -1) {
        existingBoard[destinationColumn].splice(index, 0, draggedTask);
        existingBoard[fromColumn] = existingBoard[fromColumn]
          .filter((task) => task.id !== draggedTask.id)
          .map((task) => task);
      }
    }
    setBordData(existingBoard);
    setdraggedItem(null);
  };

  return (
    <div className="main">
      <h2>Kanban Board (Drag and Drop) Feature Implementation</h2>
      <div className="board">
        {Object.entries(boardData).map(([columnName, tasks]) => {
          return (
            <Column
              key={columnName}
              columnName={columnName}
              tasks={tasks}
              onDragStart={onDragStart}
              onDrop={onDrop}
              onDropOnTask={onDropOnTask}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
