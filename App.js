
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

//  Screens
import GameListScreen from './app/components/Games/GameListScreen';
import GameBriefScreen from './app/components/Games/GameBriefScreen';
import QuizScreen from './app/components/Quizzes/QuizScreen';
import GameResultsScreen from './app/components/Games/GameResultsScreen';


const App = StackNavigator(
  {
    GameListScreen: { screen: GameListScreen },
    GameBriefScreen: { screen: GameBriefScreen },
    QuizScreen: { screen: QuizScreen },
    GameResultsScreen: { screen: GameResultsScreen },
  },
  {
    initialRouteName: 'GameListScreen',
  }
);

export default App;
