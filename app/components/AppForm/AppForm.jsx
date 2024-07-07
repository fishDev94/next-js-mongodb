"use client";

import styles from "./app-form.module.scss";

export default function AppForm({
  firstInputText = "Username",
  secondInputText = "Password",
  buttonText = "Submit",
  formRefs,
  handleSubmit = () => {},
}) {
  console.log(formRefs);

  return (
    <form className={styles.appForm}>
      <input
        ref={formRefs.userNameInput}
        type="text"
        placeholder={firstInputText}
      />
      <input
        ref={formRefs.passwordInput}
        type="password"
        placeholder={secondInputText}
      />
      <button onClick={handleSubmit} type="button">
        {buttonText}
      </button>
    </form>
  );
}
