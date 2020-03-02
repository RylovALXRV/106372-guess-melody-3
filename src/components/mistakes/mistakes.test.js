import React from "react";
import renderer from "react-test-renderer";
import Mistakes from "./mistakes.jsx";

const Mistake = {
  ONE: 1,
  ZERO: 0,
};

describe(`Should Mistakes render correctly`, () => {
  it(`With one zero count`, () => {
    const tree = renderer
      .create(<Mistakes
        count={Mistake.ZERO}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With one one count`, () => {
    const tree = renderer
      .create(<Mistakes
        count={Mistake.ONE}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
