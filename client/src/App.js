import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Playlists from './Playlists';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {

    constructor(props) {
        super(props);
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token
                ? true
                : false,
            nowPlaying: {
                name: 'Not Checked',
                albumArt: ''
            },
            savedAlbums: {
                name: 'Not Checked',
                albumArt: ''
            },
            userPlaylists: []
        }

        this.getUserPlaylists();
        this.getNowPlaying();
    }

    getHashParams() {
        var hashParams = {};
        var e,
            r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        return hashParams;
    }

    getNowPlaying() {
        spotifyApi.getMyCurrentPlaybackState().then((response) => {
            this.setState({
                nowPlaying: {
                    name: response.item.name,
                    albumArt: response.item.album.images[0].url
                }
            });
        })
    }

    getUserPlaylists() {
        spotifyApi.getUserPlaylists('envious1').then((response) => {
            this.setState({userPlaylists: response});
        });
    }

    render() {
        return (<div className="App">
            <a href='http://localhost:8888'>
                Login to Spotify
            </a>
            <div>
                Now Playing: {this.state.nowPlaying.name}
            </div>
            <div>
                Total User Playlists:
            </div>
            <div>
                <img src={this.state.nowPlaying.albumArt} style={{
                        height: 150
                    }}/>
            </div>
            {/* {
                this.state.loggedIn && <button onClick={() => this.getNowPlaying()}>
                        Check Now Playing
                    </button>
            }

            {
                this.state.loggedIn && <button onClick={() => this.getUserPlaylists()}>
                        Get User Playlists
                    </button>
            } */
            }
            <div>
                <Playlists Playlists={this.state.userPlaylists} onload="onload"/>
            </div>
        </div>);
    }
}

export default App;
