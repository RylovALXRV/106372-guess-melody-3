import React from "react";
import renderer from "react-test-renderer";
import AudioPlayer from "./audio-player.jsx";

const mock = {
  song: {
    src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`
  },
  isPlaying: false,
};

it(`Should AudioPlayer render correctly`, () => {
  const {song, isPlaying} = mock;

  const tree = renderer.create(
      <AudioPlayer
        isPlaying={isPlaying}
        src={song.src}
        onPlayButtonClick={() => {}}
      />, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
