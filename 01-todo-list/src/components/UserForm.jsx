import React, { useEffect, useState } from "react";
import styles from "./UserForm.module.css";

const UserForm = ({ isEdit, userData, onCancel, onSubmit }) => {
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const onInputChange = (e) => {
    const { name, type, value, files, checked } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        setUser((prev) => ({
          ...prev,
          image: file,
          imageUrl: URL.createObjectURL(file),
        }));
      }
    } else if (type === "checkbox") {
      setUser((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((i) => i !== value),
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = true;
    if (isValid) {
      onSubmit(user);
    } else {
      setIsError(true);
    }
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.formControl}>
        <label>Name: </label>
        <input
          name="fullName"
          type="text"
          value={user?.fullName}
          onChange={onInputChange}
        />
      </div>
      <div className={styles.formControl}>
        <label>Email: </label>
        <input
          name="email"
          type="email"
          value={user?.email}
          onChange={onInputChange}
          disabled={isEdit}
        />
      </div>
      <div className={styles.formControl}>
        <label>Image: </label>
        <input
          name="image"
          type="file"
          accept="image/*"
          //   value={user?.image}
          onChange={onInputChange}
        />
      </div>
      <div className={styles.formControl}>
        <label>Gender: </label>
        <div>
          <label>
            <input
              name="gender"
              type="radio"
              value="male"
              checked={user?.gender === "male"}
              onChange={onInputChange}
            />
            Male
          </label>
          <label>
            <input
              name="gender"
              type="radio"
              value="female"
              checked={user?.gender === "female"}
              onChange={onInputChange}
            />
            Female
          </label>
          <label>
            <input
              name="gender"
              type="radio"
              value="other"
              checked={user?.gender === "other"}
              onChange={onInputChange}
            />
            Other
          </label>
        </div>
      </div>
      <div className={styles.formControl}>
        <label>Interests: </label>
        <div>
          <label>
            <input
              name="interests"
              type="checkbox"
              value="cricket"
              checked={user?.interests.includes("cricket")}
              onChange={onInputChange}
            />
            Cricket
          </label>
          <label>
            <input
              name="interests"
              type="checkbox"
              value="gaming"
              checked={user?.interests.includes("gaming")}
              onChange={onInputChange}
            />
            Gaming
          </label>
        </div>
      </div>
      <textarea name="about" value={user?.about} onChange={onInputChange} />
      {isError && <p className="error">Please fill all the details</p>}
      <div className={styles.formControlBtn}>
        <button className="submitBtn" onClick={onCancel}>
          Cancel
        </button>
        <button className="submitBtn" type="submit">
          {isEdit ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
