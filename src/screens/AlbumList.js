import React, { Component } from 'react';
import { Text, ScrollView, Image } from 'react-native';
import { Header, Button, Card } from 'react-native-elements';
import qs from 'qs';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';

const ROOT_URL = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&';
const QUERY_PARAMS = {
    api_key: '1a50354a6a27b4ee2481a02c7efbbb25',
    format: 'json',
}; 
const NO_IMAGE = 'http://vignette3.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png/revision/latest?cb=20130527163652';

class AlbumList extends Component {

    state = { albumList: [], search_artist: '', album: '' }

    componentDidMount() {
        const params = qs.stringify({
            ...QUERY_PARAMS, artist: this.props.navigation.state.params.search_artist
        });
        this.getAlbums(ROOT_URL + params);
    }

    async getAlbums(url) {
        try {
            const response = await axios.get(url);
            this.setState({ 
                albumList: response.data.topalbums.album, 
                search_artist: this.props.navigation.state.params.search_artist
            });
            console.log(response.data.topalbums.album);
        } catch (error) {
            alert(error);
        }
    }

    buttonAlbumPress(index) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'track',
            params: { 
                search_artist: this.state.search_artist, 
                album: this.state.albumList[index].name }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    list() {
        if (this.state.albumList.length > 0) {
            return this.state.albumList.map((data, index) => {
                return (
                    <ScrollView key={index}>
                        <Card containerStyle={{ alignItems: 'center' }}>
                            <Text>{data.name}</Text>
                            <Text>{data.playcount}</Text>
                            <Image 
                                style={{ width: 300, height: 300 }}
                                source={{ uri: data.image[2]['#text'] || NO_IMAGE }}
                            />
                            <Button
                                icon={{ name: 'search' }}
                                title='View Albums'
                                onPress={() => { this.buttonAlbumPress(index); }}  
                            />
                        </Card>
                    </ScrollView>
                );
            });
        }
    }

    render() {
        return (
            <ScrollView>
                <Header
                    centerComponent={{ 
                        text: this.props.navigation.state.params.search_artist, 
                        style: { color: '#fff', fontWeight: '600' } 
                    }}
                />

                {this.list()}

            </ScrollView>
        );
    }
}

export default AlbumList;