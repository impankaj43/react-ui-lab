import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const options = ["aasdf", "bsdf", "cdsf", "dsdfv", "easdf", "sdf", "hasd1"];
function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isSelectedRef = useRef(false);

  useEffect(() => {
    if (isSelectedRef.current) {
      isSelectedRef.current = false;
      return;
    }
    const timer = setTimeout(async () => {
      if (value) {
        setIsOpen(true);
        setIsLoading(true);
        fetch(`https://dummyjson.com/users/search?q=${value}`)
          .then((res) => res.json())
          .then((res) => {
            setIsLoading(false);
            setUsers(res.users);
          });
      } else {
        setIsLoading(false);
        setIsOpen(false);
        setUsers([]);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [value]);

  const handleInputChange = (e) => {
    setIsOpen(!!e.target.value);
    setValue(e.target.value);
  };

  const selectionHandler = (user) => {
    isSelectedRef.current = true;
    setSelectedUser(user);
    setUsers([]);
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
            {isLoading && <li>Searching....</li>}
            {!isLoading && users.length === 0 && (
              <li>No matching user found!</li>
            )}
          </ul>
        )}
        {selectedUser && (
          <div className="display-selection">
            <h3>Selected User</h3>
            <img src={selectedUser.image} />
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
