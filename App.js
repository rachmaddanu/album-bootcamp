import React from 'react';
import { TabNavigator } from 'react-navigation';

import AlbumList from './src/screens/AlbumList';
import ArtistList from './src/screens/ArtistList';
import TrackList from './src/screens/TrackList';

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({ 
      artist: { screen: ArtistList },
      track: { screen: TrackList },
      album: { screen: AlbumList }
    }, {
      tabBarPosition: 'bottom',
      lazy: true, 
      swipeEnabled: false,
      animationEnabled: false,
      navigationOptions: {
        tabBarVisible: false
      }
    });
    return (
        
        <MainNavigator />
      
    );
  }
}
