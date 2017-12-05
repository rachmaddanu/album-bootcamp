import React, { Component } from 'react';
import { Text, ScrollView, Linking } from 'react-native';
import { Header, Button, Card } from 'react-native-elements';
import qs from 'qs';
import axios from 'axios';

const ROOT_URL = 'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&';
const QUERY_PARAMS = {
    api_key: '1a50354a6a27b4ee2481a02c7efbbb25',
    format: 'json',
}; 

class AlbumList extends Component {

    state = { track_name: '', track_list: [], duration: '' }

    componentDidMount() {
        const params = qs.stringify({
            ...QUERY_PARAMS, 
            artist: this.props.navigation.state.params.search_artist,
            album: this.props.navigation.state.params.album
        });
        this.getAlbums(ROOT_URL + params);
    }

    async getAlbums(url) {
        try {
            const response = await axios.get(url);
            this.setState({ 
                track_name: response.data.album.tracks.track.name, 
                track_list: response.data.album.tracks.track,
                duration: response.data.album.tracks.track.duration,
            });
            console.log(response.data.album);
        } catch (error) {
            alert(error);
        }
    }

    buttonAlbumPress(index) {
        Linking.openURL(this.state.track_list[index].url);
    }

    list() {
        if (this.state.track_list.length > 0) {
            return this.state.track_list.map((data, index) => {
                return (
                    <ScrollView key={index}>
                        <Card containerStyle={{ alignItems: 'center' }}>
                            <Text>{data.name}</Text>
                            <Text>{data.duration}</Text>
                            <Button
                                icon={{ name: 'search' }}
                                title='Play Song'
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
                        text: this.props.navigation.state.params.album, 
                        style: { color: '#fff', fontWeight: '600' } 
                    }}
                />

                {this.list()}

            </ScrollView>
        );
    }
}

export default AlbumList;