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
  Dimensions,
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

import GameHelper from '../Services/GameHelper';


export default class GameBriefScreen extends Component<{}> {


  static navigationOptions = {
          header: null
      }


  _onCancelButton = () => {
    this.props.navigation.goBack();
  }

  _onAcceptButton = () => {

    //  Create quiz List
    GameHelper.generateQuizzes ();

    //  Navigate to the first quiz
    this.props.navigation.navigate(
      'QuizScreen'
    );

  }

  render() {

    const game = GameHelper.getActualGame();

    return (
      <View style={styles.container}>

        <ImageBackground
         style = {styles.imageBackground}
         source = {require('../../../assets/images/bg.png')}
         resizeMode = "cover"
        >

          <View style={styles.headerContainer}>
            <Text style = {styles.headerTitle}>Start the Game?</Text>
          </View>

          <View style={styles.gameDataContainer}>

            <View style={[{backgroundColor: game.color},styles.gameData]}>

              <Text style = {styles.gameName}>{game.name}</Text>
              <Text style = {styles.gameDescription}>{game.description}</Text>

            </View>

          </View>

          <View style={styles.actionsContainer}>

            <TouchableOpacity onPress={this._onCancelButton}>
              <Image
                style={styles.cancelButton}
                source={require('../../../assets/images/wrong.png')}
              />
            </TouchableOpacity>

            <View style={styles.actionSeparator} />

            <TouchableOpacity onPress={this._onAcceptButton}>
              <Image
                style={styles.acceptButton}
                source={require('../../../assets/images/correct.png')}
              />
            </TouchableOpacity>

          </View>

        </ImageBackground>

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

  gameDataContainer : {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  gameData: {
    flex: 1,

    alignSelf: 'stretch',
    alignContent: 'center',

    padding: 24,

    margin : 16,
    marginTop : 32,
    marginBottom : 32,

    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#ffffff',
  },


  gameName: {
    color: '#000000',

    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 24,

    textShadowColor:'#ffffff',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:0,
  },

  gameDescription : {
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

  gameInstructions : {
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  actionsContainer : {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor : '#f4e842',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#f4bc42',
    margin : 8,

  },

  actionSeparator : {
    width : 16,
  },

  cancelButton : {
    width: 56,
    height: 56,
  },

  acceptButton : {
    width: 56,
    height: 56,
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

});
