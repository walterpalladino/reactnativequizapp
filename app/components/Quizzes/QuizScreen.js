/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

// Import the react-native-sound module
import Sound from 'react-native-sound';

import QuizOptionItem from './QuizOptionItem';

import GameHelper from '../Services/GameHelper';

const imageCorrect = require('../../../assets/images/correct.png')
const imageWrong = require('../../../assets/images/wrong.png')


const soundCorrect = new Sound('sound_success.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Sound loading error ...');
    console.log(error)
  }
})
const soundWrong = new Sound('sound_error.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Sound loading error ...');
    console.log(error)
  }
})

export default class QuizScreen extends Component<{}> {

  static navigationOptions = {
    header: null
  }

  constructor (props) {

    super(props);

    const game = GameHelper.getActualGame();
    const quiz = GameHelper.getActualQuiz();
    this.actualQuizOption = -1;

    this.state = {
      game: game,
      quiz: quiz,
      modalCorrectVisible: false,
      modalWrongVisible: false,
    };
    /*
    this.state = {
      modalCorrectVisible: false,
    };*/
  }

  _onCancelButton = () => {
    console.log ("_onCancelButton");
    this.props.navigation.goBack();
  }

  _onAcceptButton = () => {
    console.log ("_onAcceptButton");
    //  Navigate to the first quiz
    this.props.navigation.navigate('QuizScreen');
  }

  _onPressOption = (quizOption) => {
      console.log ("_onPressOption");
      console.log (quizOption);
      //console.log (index);

      this.actualQuizOption = quizOption;

      this._checkValidAnswer (quizOption);

  };

  _moveNext = () => {
    console.log ("_moveNext");

    GameHelper.updateQuizStatus (this.actualQuizOption);
    GameHelper.moveNextQuiz ();
    if (GameHelper.isAnyQuizPending()) {

      //  Navigate to the next quiz
      this.props.navigation.navigate(
        'QuizScreen'
      );

    } else {

      //  Navigate to the game results
      this.props.navigation.navigate(
        'GameResultsScreen'
      );

    }

  };

  _checkValidAnswer = (quizOption) => {

    this.correctAnswer = GameHelper.checkValidAnswer (this.state.quiz, quizOption);

    if (this.correctAnswer) {

      this._setModalCorrectVisible();

      soundCorrect.play((success) => {
        if (!success) {
          console.log('Sound did not play')
        }
        //this._moveNext();
        this._hideModals();
      });

    } else {

      this._setModalWrongVisible();

      soundWrong.play((success) => {
        if (!success) {
          console.log('Sound did not play')
        }
        //this._moveNext();
        this._hideModals();
      });
    }

  }

  _renderQuizOption = ({item}) => (
    <QuizOptionItem
      quizOption={item}
      onPressItem={this._onPressOption}
      />
  );

  _keyExtractor = (item, index) => index;

  _setModalCorrectVisible() {
    this.setState({modalCorrectVisible: true});
    this.setState({modalWrongVisible: false});
  }

  _setModalWrongVisible(visible) {
    this.setState({modalCorrectVisible: false});
    this.setState({modalWrongVisible: true});
  }

  _hideModals () {
    this.setState({modalCorrectVisible: false});
    this.setState({modalWrongVisible: false});
  }


  _onRequestClose = () => {
    console.log ('Modal has been closed.');
    //this._hideModals();
    this._moveNext();
  }

  _onDismiss = () => {
    console.log ('Modal has been dismissed.');
    //  Quiz answered so move to the next
    this._moveNext();
  }

  _onShow = () => {
    console.log ('Modal has been shown.');
    //  ???????
  }


  _renderQuizStatus = () => {

      const image = (this.state.modalCorrectVisible) ? imageCorrect : imageWrong;

      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={(this.state.modalCorrectVisible || this.state.modalWrongVisible)}
          onRequestClose={this._onRequestClose}
          onDismiss={this._onDismiss}
          onShow={this._onShow}
          >
            <View style={styles.statusContainer}>

              <TouchableHighlight
                  onPress={() => {
                    //this._hideModals();
                  }}>
                <Image
                  style={styles.statusImage}
                  source={image}
                />
              </TouchableHighlight>

            </View>
        </Modal>
      );

  }


  render() {

    let actualQuizNumber = GameHelper.getActualQuizIdx() + 1;
    let totalQuizNumber = GameHelper.getQuizzes().length;

    return (
      <View style={styles.container}>

        <ImageBackground
         style = {styles.imageBackground}
         source = {require('../../../assets/images/bg.png')}
         resizeMode = "cover"
        >

          <View style={styles.headerContainer}>
            <Text style = {styles.headerTitle}>Quiz {actualQuizNumber}/{totalQuizNumber}</Text>
          </View>

          <View style={styles.quizDataContainer}>

            <View style={[{backgroundColor: this.state.game.color},styles.quizData]}>

              <Text style = {styles.quizDescription}>{this.state.quiz.description}</Text>

            </View>

            <FlatList
              style={styles.quizOptions}
              data={this.state.quiz.options}
              renderItem={this._renderQuizOption}
              keyExtractor={this._keyExtractor}
              onPressItem={this._onPressOption}
              scrollEnabled={true}
              />

          </View>

        </ImageBackground>

        {this._renderQuizStatus()}

      </View>
    );

  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'rgb(230, 206, 144)',
  },

  quizDataContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: 16,
    marginRight: 16,
  },

  quizData: {
    padding: 16,

    marginTop: 8,
    marginBottom: 8,

    alignSelf: 'stretch',

    maxHeight: 280,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#ffffff',

    justifyContent: 'center',
  },


  quizName: {
    color: '#000000',

    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 24,

    textShadowColor:'#ffffff',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:0,
  },

  quizDescription : {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
  },

  imageBackground : {
    flex: 1,
    height: '100%',
    width: '100%',

    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  headerContainer : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor : '#00BCD4',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#ffffff',
    margin : 8,
    marginTop : 36,
  },

  headerTitle : {
    fontWeight: '300',
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
  },

  quizOptions : {
    width : '100%',
  },

  //  Modal status
  statusContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusImage: {
    width: 120,
    height: 120,
  }
});
