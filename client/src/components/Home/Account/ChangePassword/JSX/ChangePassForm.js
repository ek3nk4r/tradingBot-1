import React from "react";

// components
import CurrentPassTextField from "./CurrentPassTextField";
import NewPassTextField from "./NewPassTextField";
import NewPassAgainTextField from "./NewPassAgainTextField";
import UpdatePasswordButton from "./UpdatePasswordButton";

const ChangePassForm = (props) => {
  const {
    handleSubmit,
    classes,
    handleChange,
    currentPassword,
    newPassword,
    newPasswordAgain,
    errorMessage,
  } = props;

  return (
    <>
      <div className="flex flex-container center col">
        <div className="box">
          <form
            variant="outlined"
            onSubmit={handleSubmit}
            className={classes.root}
          >
            <CurrentPassTextField
              currentPassword={currentPassword}
              handleChange={handleChange}
            />
            <NewPassTextField
              newPassword={newPassword}
              handleChange={handleChange}
            />
            <NewPassAgainTextField
              newPasswordAgain={newPasswordAgain}
              handleChange={handleChange}
            />

            {/* show error message */}
            {errorMessage}

            <UpdatePasswordButton />
          </form>
          <div>You will be redirected on a successful password update.</div>
        </div>
      </div>
    </>
  );
};

export default ChangePassForm;
