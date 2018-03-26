
//  Stores game data
class GameHelper {

  constructor() {}

  static actualGame = null;
  static quizzes = [];
  static answers = [];
  static actualQuizIdx = -1;


  static setActualGame (game) {
    return this.actualGame  = game;
  }

  static getActualGame () {
    return this.actualGame;
  }

  static setQuizzes (quizzes) {
    return this.quizzes  = quizzes;
  }

  static getQuizzes () {
    return this.quizzes;
  }

  static getActualQuiz () {

    const game = GameHelper.getActualGame();
    const quizIdx = GameHelper.getActualQuizIdx();
    const quiz = game.quizzes[quizIdx];

    return quiz;
  }

  static setActualQuizIdx (actualQuizIdx) {
    return this.actualQuizIdx  = actualQuizIdx;
  }

  static getActualQuizIdx () {
    return this.actualQuizIdx;
  }


  static generateQuizzes () {

    GameHelper.setQuizzes(GameHelper.getActualGame().quizzes);
    GameHelper.setActualQuizIdx(0);
    this.answers = new Array(GameHelper.getQuizzes().length);

  }


  static checkValidAnswer (quiz, quizOption) {
    if (quiz.quiz_option_code == quizOption.code) {
      return true;
    } else {
      return false;
    }
  }

  static updateQuizStatus (quizOption) {
    var quiz = GameHelper.getActualQuiz();
    this.answers[GameHelper.getActualQuizIdx()]  = GameHelper.checkValidAnswer(quiz, quizOption);
  }

  static moveNextQuiz () {
    GameHelper.setActualQuizIdx (GameHelper.getActualQuizIdx () + 1);
  }

  static isAnyQuizPending () {
    return (GameHelper.getActualQuizIdx () < GameHelper.getQuizzes().length);
  }

  static getCorrectAnswersCount () {
    var countCorrectAnswers = 0;
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i]) {
        countCorrectAnswers ++;
      }
    }
    return countCorrectAnswers;
  }


}

export default GameHelper;
