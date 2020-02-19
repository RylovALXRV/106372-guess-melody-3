import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen";

const ERRORS_COUNT = 3;

it(`Should WelcomeScreen render correctly`, () => {
  const tree = renderer.create(
      <WelcomeScreen
        errorsCount={ERRORS_COUNT}
        onWelcomeScreenButtonClick={() => {}}
      />
  )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
