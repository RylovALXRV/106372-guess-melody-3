import React from "react";
import renderer from "react-test-renderer";
import App from "./app";

const ERRORS_COUNT = 3;

it(`Render App`, () => {
  const tree = renderer.create(
      <App
        errorsCount={ERRORS_COUNT}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
