
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
} from 'react-native';

// Ignore Yellow Box Warnings
console.disableYellowBox = true;


import GameListItem from './GameListItem';
import GameHelper from '../Services/GameHelper';


//  Game Data
import localGameList from '../../../assets/raw/gamelist.json';


type Props = {};
export default class GameListScreen extends Component<Props> {

  static navigationOptions = {
    header: null
  }

    constructor(props) {
        super(props);

        this.state = {
          loading: false,
          data: [],
          page: 1,
          seed: 1,
          error: null,
          refreshing: false,
        };
      }

    componentDidMount() {
      this._makeLocalRequestForGameList();
    }

    _makeLocalRequestForGameList = () => {

      this.setState({ loading: true });

      this.setState({ error: null });
      this.setState({ gameList: localGameList.games });

      this.setState({ loading: false });

    };

    _keyExtractor = (item, index) => index;

    _renderItem = ({item}) => (
      <GameListItem
        game={item}
        onPressItem={this._onPressItem}
        />
    );


    _onPressItem = (game: Object) => {

      //  Store the selected game
      GameHelper.setActualGame(game);

      this.props.navigation.navigate (
        'GameBriefScreen',
        {
          game :  game
        }
      );

    };


    render() {
      return (
        <View style={styles.container}>

          <ImageBackground
           style = {styles.imageBackground}
           source = {require('../../../assets/images/bg.png')}
           resizeMode = "cover"
          >
            <View style={styles.headerContainer}>
              <Text style = {styles.headerTitle}>Themes</Text>
            </View>

            <FlatList
              style={styles.games}
              data={this.state.gameList}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              />
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

    games: {
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 12,

    },

    imageBackground : {
      flex: 1,
      height: '100%',
      width: '100%',
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
