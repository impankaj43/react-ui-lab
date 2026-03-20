import { useRef, useState } from "react";
import "./App.css";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const isSelectedRef = useRef(false);

  const { users, loading } = useDebounce(value, 500);

  const handleInputChange = (e) => {
    isSelectedRef.current = false;

    const inputValue = e.target.value;
    setValue(inputValue);
    setIsOpen(!!inputValue);
  };

  const selectionHandler = (user) => {
    isSelectedRef.current = true;

    setSelectedUser(user);
    setValue("");
    setIsOpen(false);
  };

  return (
    <div className="asBody">
      <h2>Debounce Searchable Dropdown</h2>

      <div className="dropdown">
        <input
          onChange={handleInputChange}
          placeholder="Search users by name like: Emily, William"
          className="dropdown-input"
          value={value}
        />

        {isOpen && (
          <ul className="dropdown-list">
            {users.map((user) => (
              <li key={user.id} onClick={() => selectionHandler(user)}>
                {`${user.firstName} ${user.lastName}`}
              </li>
            ))}

            {loading && <li>Searching....</li>}

            {!loading && users.length === 0 && <li>No matching user found!</li>}
          </ul>
        )}

        {selectedUser && (
          <div className="display-selection">
            <h3>Selected User</h3>
            <img src={selectedUser.image} alt="user" />
            <span>
              Name: {`${selectedUser.firstName} ${selectedUser.lastName}`}
            </span>
            <span>University: {selectedUser.university}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
