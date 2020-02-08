import React from "react";
import PropTypes from "prop-types";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";

const welcomeScreenButtonHandler = () => {};

const App = ({errorsCount}) => {
  return (
    <WelcomeScreen
      errorsCount={errorsCount}
      onWelcomeScreenButtonClick={welcomeScreenButtonHandler}
    />
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired
};

export default App;
