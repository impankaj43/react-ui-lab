import React from "react";
import styles from "./UserList.module.css";

const UserList = ({ user, onUpdate, onDelete }) => {
  return (
    <div className={styles.item}>
      <div className={styles.itemToFlex}>
        <div className={styles.itemToFlex_data}>
          <label>
            Name: <span>{user.fullName}</span>
          </label>
          <label>
            Email: <span>{user.email}</span>
          </label>
          <label>
            Gender: <span>{user.gender}</span>
          </label>{" "}
          <label>
            Interests: <span>{user.interests.join(",")}</span>
          </label>
        </div>
        <img src={user.imageUrl} alt="user image" />
      </div>
      <p>{user.about}</p>
      <div className={styles.itemToFlex}>
        <button onClick={() => onDelete(user.email)}>Delete</button>
        <button onClick={() => onUpdate(user)}>Update</button>
      </div>
    </div>
  );
};

export default UserList;
