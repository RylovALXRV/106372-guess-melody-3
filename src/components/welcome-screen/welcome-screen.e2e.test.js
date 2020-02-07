import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WelcomeScreen from "./welcome-screen";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should welcomeScreen button be pressed`, function () {
  const onWelcomeScreenButtonClick = jest.fn();

  const welcomeScreen = shallow(
      <WelcomeScreen
        errorsCount={3}
        onWelcomeScreenButtonClick = {onWelcomeScreenButtonClick}
      />
  );

  const welcomeScreenButtonElement = welcomeScreen.find(`button.welcome__button`);

  welcomeScreenButtonElement.props().onClick();

  expect(onWelcomeScreenButtonClick.mock.calls.length).toBe(1);
});
