import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UserForm from "./components/userForm";
import UserList from "./components/UserList";
import ToggleBtn from "./components/ToggleBtn";

function App() {
  const initialData = {
    fullName: "",
    email: "",
    password: "",
    gender: "",
    interests: [],
    about: "",
    image: null,
    imageUrl: "",
  };
  const [userData, setUserData] = useState(initialData);
  const [isEdit, setIsEdit] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [users, setUsers] = useState([]);

  const onSubmit = (userData) => {
    if (isEdit) {
      const updatedUsers = users.map((user) => {
        if (user.email === userData.email) {
          return userData;
        } else {
          return user;
        }
      });
      setUsers(updatedUsers);
    } else {
      const newUserList = [...users, userData];
      setUsers(newUserList);
    }

    onCancel();
  };

  const onDelete = (email) => {
    const updatedUsers = users.filter((user) => user.email != email);
    setUsers(updatedUsers);
  };

  const onCancel = () => {
    setIsFormActive(false);
    setUserData(initialData);
    setIsEdit(false);
  };

  const onUpdate = (data) => {
    setIsEdit(true);
    setUserData(data);
    setIsFormActive(true);
  };

  const modeChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };
  return (
    <div className="asBody">
      <div className="main">
        <div className="addAndMode">
          <button className="addBtn" onClick={() => setIsFormActive(true)}>
            Add User
          </button>{" "}
          <label title="Toggle theme">
            <ToggleBtn onChange={modeChange} />
          </label>
        </div>
        <div className="formSection">
          {isFormActive && (
            <UserForm
              userData={userData}
              onSubmit={onSubmit}
              onCancel={onCancel}
              isEdit={isEdit}
            />
          )}
          <div className="userSection">
            <h3>All Users</h3>
            {users.length ? (
              users.map((user) => (
                <UserList
                  onDelete={(email) => onDelete(email)}
                  onUpdate={(data) => onUpdate(data)}
                  user={user}
                />
              ))
            ) : (
              <p>No Data Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
