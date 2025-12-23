import React from "react";
import styles from "./ToggleBtn.module.css";

const ToggleBtn = ({ onChange }) => {
  return (
    <label className={styles.toggle}>
      <input type="checkbox" on onChange={onChange} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleBtn;
