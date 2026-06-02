import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import useDebounce from "./hooks/useDebounce";

const Operators = {
  and: "∧",
  or: "∨",
};

function App() {
  const [queryData, setQueryData] = useState({
    globalOperator: Operators.or,
    groups: [],
  });
  const [activeGroup, setActiveGroup] = useState("g1");
  const [searchString, setSearchString] = useState("");
  const { loading, data: searchResults } = useDebounce(searchString, 500);

  const changeGlobalOperator = () => {
    const updatedQueryData = { ...queryData };
    updatedQueryData.globalOperator =
      updatedQueryData.globalOperator === Operators.and
        ? Operators.or
        : Operators.and;
    setQueryData(updatedQueryData);
  };

  const addNewGroup = () => {
    if (queryData.groups.length && queryData.groups[0].items.length == 0) {
      return;
    }
    const group = {
      id: "g",
      items: [],
    };
    group.id = group.id + (queryData.groups.length + 1);
    const updatedQueryData = { ...queryData };
    updatedQueryData.groups.unshift(group);
    setQueryData(updatedQueryData);
    setActiveGroup(group.id);
  };

  const onSelectDropdownItem = (result) => {
    const updatedQueryData = { ...queryData };
    let groupIndex = updatedQueryData.groups.findIndex(
      (group) => group.id === activeGroup,
    );
    if (groupIndex !== -1) {
      updatedQueryData.groups[groupIndex].items.push({
        value: result,
        operator: Operators.or,
      });
    } else {
      const group = {
        id: "g",
        items: [],
      };
      group.id = group.id + (queryData.groups.length + 1);
      const updatedQueryData = { ...queryData };
      updatedQueryData.groups.unshift(group);
      updatedQueryData.groups[0].items.push({
        value: result,
        operator: Operators.or,
      });
      setActiveGroup(group.id);
    }
    setQueryData(updatedQueryData);
    setSearchString("");
  };

  const changeOperatorOfGroupItem = (e, groupIndex, itemIndex) => {
    e.stopPropagation();
    const updatedQueryData = { ...queryData };
    const current =
      updatedQueryData.groups[groupIndex].items[itemIndex].operator;
    updatedQueryData.groups[groupIndex].items[itemIndex].operator =
      current === Operators.or ? Operators.and : Operators.or;
    setQueryData(updatedQueryData);
    setActiveGroup(updatedQueryData.groups[groupIndex].id);
  };

  const removeGroupItem = (e, groupIndex, itemIndex) => {
    e.stopPropagation();
    const updatedGroups = queryData.groups.map((group, gIndex) => {
      if (gIndex !== groupIndex) return group;
      return {
        ...group,
        items: group.items.filter((item, iIndex) => iIndex !== itemIndex),
      };
    });
    let gorupId = queryData.groups[groupIndex].id;
    const finalGroups = updatedGroups.filter((group, index) => {
      if (index === groupIndex && group.items.length === 0) {
        gorupId = "g1";
        return false;
      }
      return true;
    });
    setQueryData({
      ...queryData,
      groups: finalGroups,
    });
    setActiveGroup(gorupId);
  };

  return (
    <div className="main">
      <h2>Custom Query Builder Uisng AND/OR</h2>
      <div className="editor-container">
        <div className="editor-input">
          <div className="editor-input-row">
            <button
              className="button"
              onClick={() =>
                setQueryData({
                  globalOperator: Operators.or,
                  groups: [],
                })
              }
            >
              Clear
            </button>
            <input
              placeholder="Search..."
              onChange={(e) => setSearchString(e.target.value)}
              value={searchString}
            ></input>
            <button
              className="button"
              onClick={addNewGroup}
              title="Add new group"
            >
              + ()
            </button>
          </div>
          {searchString && (
            <ul className="dropdown-list">
              {searchResults.map((result) => (
                <li key={result} onClick={() => onSelectDropdownItem(result)}>
                  {result}
                </li>
              ))}
              {loading && <li>Searching...</li>}
              {!loading && !searchResults.length && searchString && (
                <li>No match found!</li>
              )}
            </ul>
          )}
        </div>
        <div className="editor-query">
          <div className="editor-query-display">
            {queryData.groups.map((group, groupIndex) => {
              return (
                <div
                  className="group"
                  onClick={(e) => {
                    setActiveGroup(group.id);
                  }}
                >
                  {groupIndex !== 0 && (
                    <span className="global-operator-pills">
                      {queryData.globalOperator}
                    </span>
                  )}
                  <span
                    style={{
                      fontWeight: activeGroup === group.id ? "bold" : "",
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    (
                    {group.items.map((item, itemIndex) => {
                      return (
                        <>
                          {itemIndex !== 0 && (
                            <span
                              className="operator-pills"
                              onClick={(e) =>
                                changeOperatorOfGroupItem(
                                  e,
                                  groupIndex,
                                  itemIndex,
                                )
                              }
                            >
                              {item.operator}
                            </span>
                          )}
                          <span className="pills">
                            {item.value}
                            <button
                              className="remove-group-item_button"
                              onClick={(e) =>
                                removeGroupItem(e, groupIndex, itemIndex)
                              }
                            >
                              X
                            </button>
                          </span>
                        </>
                      );
                    })}
                    )
                  </span>
                </div>
              );
            })}
          </div>
          <button
            className="editor-query-global-operator"
            onClick={changeGlobalOperator}
          >
            {queryData.globalOperator === Operators.or
              ? Operators.and
              : Operators.or}
          </button>
        </div>
      </div>
      <div>
        <h3>Current Query Data:</h3>
        <pre>{JSON.stringify(queryData, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
