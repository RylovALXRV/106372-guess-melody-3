import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {GameType} from "../../const";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GameWinScreen from "../game-win-screen/game-win-screen.jsx";
import GameOverScreen from "../game-over-screen/game-over-screen.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer.jsx";

const GenreQuestionScreenWrapped = withAudioPlayer(withUserAnswer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);

class App extends PureComponent {
  _renderGameScreen() {
    const {maxMistakes, questions, onUserAnswer, onWelcomeButtonClick, step, mistakes, resetGame} = this.props;
    const question = questions[step];

    if (step === -1) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeScreenButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return (
        <GameOverScreen
          onReplayButtonClick={resetGame}
        />
      );
    }

    if (step >= questions.length) {
      return (
        <GameWinScreen
          onReplayButtonClick={resetGame}
          questionsCount={questions.length}
          mistakesCount={mistakes}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.GENRE:
          return (
            <GameScreen
              type={question.type}>
              <GenreQuestionScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
        case GameType.ARTIST:
          return (
            <GameScreen
              type={question.type}>
              <ArtistQuestionScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/genre">
            <GenreQuestionScreenWrapped
              question={questions[0]}
              onAnswer={() => {}}
            />
          </Route>
          <Route exact path="/artist">
            <ArtistQuestionScreenWrapped
              question={questions[1]}
              onAnswer={() => {}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
        genre: PropTypes.string,
        song: PropTypes.shape({
          artist: PropTypes.string.isRequired,
          src: PropTypes.string.isRequired,
        }),
        answers: PropTypes.arrayOf(
            PropTypes.shape({
              src: PropTypes.string,
              genre: PropTypes.string,
              artist: PropTypes.string,
              picture: PropTypes.string,
            })
        ).isRequired,
      })
  ).isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  maxMistakes: state.maxMistakes,
  questions: state.questions,
  mistakes: state.mistakes,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, answer));
  },
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
