import React, { Component } from 'react';
import { Text, ScrollView, Image } from 'react-native';
import { Header, SearchBar, Button, Card } from 'react-native-elements';
import axios from 'axios';
import qs from 'qs';
import { NavigationActions } from 'react-navigation';

//import Card from './../common/Card';


const ROOT_URL = 'http://ws.audioscrobbler.com/2.0/?method=artist.search&';
const QUERY_PARAMS = {
    api_key: '1a50354a6a27b4ee2481a02c7efbbb25',
    format: 'json',
}; 
const NO_IMAGE = 'http://vignette3.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png/revision/latest?cb=20130527163652';

class ArtistList extends Component {
    state = {
        search: '',
        artistList: []
    }

    async getArtist(url) {
        try {
            const response = await axios.get(url);
            this.setState({ artistList: response.data.results.artistmatches.artist });
            console.log(response.data);
        } catch (error) {
            alert(error);
        }
    }

    buttonArtistPress() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'album',
            params: { search_artist: this.state.search }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    mapArtist() {
        if (this.state.artistList.length > 0) {
            return this.state.artistList.map((data, index) => {
                return (
                <ScrollView key={index}>
                    <Card containerStyle={{ alignItems: 'center' }}>
                        
                            <Text>{data.name}</Text>
                            <Text>{data.listeners}</Text>
                            <Image 
                                style={{ width: 300, height: 300 }}
                                source={{ uri: data.image[2]['#text'] || NO_IMAGE }}
                            />
                            <Button
                                icon={{ name: 'search' }}
                                title='View Albums'
                                onPress={this.buttonArtistPress.bind(this)} 
                            />
                        
                    </Card>
                </ScrollView>
                );
            });
        }
    }

    buttonPress() {
        const params = qs.stringify({
            ...QUERY_PARAMS, artist: this.state.search
        });
        this.getArtist(ROOT_URL + params);
    }

    render() {
        return (
            <ScrollView>
                <Header
                    centerComponent={{ 
                        text: 'Danu`s Music Database', 
                        style: { color: '#fff', fontWeight: '600' } 
                    }}
                />
                <Card>
                    
                        <SearchBar
                            onChangeText={(text) => { this.setState({ search: text }); }}
                            placeholder='Search Artist'
                            lightTheme 
                        />
                    
                        <Button
                            icon={{ name: 'search' }}
                            title='Search'
                            onPress={this.buttonPress.bind(this)} 
                        />
                
                </Card>

                {this.mapArtist()}

            </ScrollView>
        );
    }
}

export default ArtistList;