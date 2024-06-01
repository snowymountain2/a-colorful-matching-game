import { useState } from "react";

export default function SubmitHighScore({
  setSubmittedNameInForm,
  setWasNameinFormSubmitted,
}) {
  const [unsubmittedNameInForm, setUnsubmittedNameInForm] = useState("");

  function handleSubmit(e) {
    if (unsubmittedNameInForm.length === 3) {
      let toUpperCaseSubmittedNameInForm = unsubmittedNameInForm.toUpperCase();
      console.log(toUpperCaseSubmittedNameInForm);
      setSubmittedNameInForm(toUpperCaseSubmittedNameInForm);
      setWasNameinFormSubmitted(true);
      e.preventDefault();
    } else {
      e.preventDefault();
      return;
    }
  }

  function handleChange(e) {
    console.log(e);
    const lettersOnly = new RegExp("^[a-zA-Z ]*$");

    if (
      e.key === "Backspace" ||
      e.key === "delete" ||
      e.key === "Delete" ||
      e.key === "backspace"
    ) {
      const splitString = unsubmittedNameInForm.split("");
      splitString.pop();
      const removeCommas = splitString.toString().replace(",", "");
      setUnsubmittedNameInForm(removeCommas);
    }
    if (
      unsubmittedNameInForm.length <= 2 &&
      e.key.length === 1 &&
      lettersOnly.test(e.key)
    ) {
      setUnsubmittedNameInForm((prevstate) => prevstate + e.key);
    }
  }
  return (
    <>
      <div className="submithighscore">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={unsubmittedNameInForm}
            onKeyDown={handleChange}
          />
          {"\n"}
          <input type="submit" value="SUBMIT" />
        </form>
      </div>
    </>
  );
}
