import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';


import StringUtils from '../../libs/StringUtils';


export default class GameListItem extends PureComponent {

  _onPress = () => {
    this.props.onPressItem(this.props.game);
  };

  render() {

    const { game } = this.props

    return (
      <TouchableOpacity
        onPress={this._onPress}
      >
      <View style={styles.game}>

        <View style={[{backgroundColor: game.color},styles.gameData]}>
          <Text style={styles.gameName}>{StringUtils.capitalize(game.name)}</Text>
        </View>

      </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({

  game: {
    flex: 1,
    flexDirection: 'row',

    minHeight: 80,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },

  gameData: {
    flex: 1,
    padding: 20,
  },

  gameName: {
    color: '#000000',

    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',

    textShadowColor:'#ffffff',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:0,

  },

  gameDescription:{
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },

});
