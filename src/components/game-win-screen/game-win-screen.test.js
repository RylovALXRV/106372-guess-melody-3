import React from "react";
import renderer from "react-test-renderer";
import GameWinScreen from "./game-win-screen.jsx";

describe(`Should GameWinScreen render correctly`, () => {
  describe(`With 3 questions`, () => {
    it(`With 0 mistake`, () => {
      const tree = renderer
        .create(
            <GameWinScreen
              questionsCount={3}
              mistakesCount={0}
              onReplayButtonClick={() => {}}
            />
        ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`With 1 mistake`, () => {
      const tree = renderer
        .create(
            <GameWinScreen
              questionsCount={3}
              mistakesCount={1}
              onReplayButtonClick={() => {}}
            />
        ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`With 2 questions`, () => {
    it(`With 0 mistake`, () => {
      const tree = renderer
        .create(
            <GameWinScreen
              questionsCount={2}
              mistakesCount={0}
              onReplayButtonClick={() => {}}
            />
        ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`With 1 mistake`, () => {
      const tree = renderer
        .create(
            <GameWinScreen
              questionsCount={2}
              mistakesCount={1}
              onReplayButtonClick={() => {}}
            />
        ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
