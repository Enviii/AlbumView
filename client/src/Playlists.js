import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import App from './App';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Playlists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userPlaylists: []
        }
    }

    getUserPlaylists() {
        spotifyApi.getUserPlaylists('envious1').then((response) => {
            console.log('User playlists22', response);
            this.setState({userPlaylists: response});
        });
    }

    render() {
        this.getUserPlaylists()
        console.log(this.props);
        if (!this.props.userPlaylists.length) 
            return <h1>No results</h1>

        return (<div>
            <ul>
                {
                    this.props.userPlaylists.map((item) => {
                        return <a key={item.id} onClick={() => this.props.clicked(item.id)}>
                            <li key={item.id}>{item.name}</li>
                        </a>
                    })
                }
            </ul>
        </div>);
    }
}

export default Playlists;
