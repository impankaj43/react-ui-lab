import React from "react";

function Form({ onsubmit, onClose }) {
  return (
    <form onSubmit={onsubmit} className="form">
      <h3>Add Item to Explorer</h3>
      <div>
        <label htmlFor="type">Item Type: </label>
        <select name="type" id="type">
          <option value={"file"}>file</option>
          <option value={"folder"}>folder</option>
        </select>
      </div>
      <div>
        <label htmlFor="name">Item Name: </label>
        <input
          name="name"
          type="text"
          id="name"
          placeholder="Enter the name"
        ></input>
      </div>
      <div className="form-controlls">
        <button onClick={onclose}>Cancel</button>
        <button type="submit">Add Item</button>
      </div>
    </form>
  );
}

export default Form;
