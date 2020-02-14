import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ArtistQuestionScreen from "./artist-question-screen";

const question = {
  type: `artist`,
  song: {
    artist: ``,
    src: ``,
  },
  answers: [{
    picture: `one`,
    artist: `artist-one`,
  }, {
    picture: `two`,
    artist: `artist-two`,
  }, {
    picture: `three`,
    artist: `artist-three`,
  }],
};

configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault() {}
};

it(`Click on user answer should pass to the callback data-object from which this answer was created`, () => {
  const onAnswer = jest.fn();
  const userAnswer = {
    picture: `one`,
    artist: `artist-one`
  };

  const artistQuestionScreen = shallow(
      <ArtistQuestionScreen
        onAnswer={onAnswer}
        question={question}
      />
  );

  const gameArtistElement = artistQuestionScreen.find(`.game__artist`);
  const answerOne = gameArtistElement.find(`input`).at(0);

  answerOne.simulate(`change`, mockEvent);

  expect(onAnswer.mock.calls[0][0]).toMatchObject(question);
  expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);
});
