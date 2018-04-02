import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Playlists from './Playlists';
import Albums from './Albums';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class LoginButton extends React.Component {
    render() {
        return (<a href='http://localhost:8888'>
            Login to Spotify
        </a>);
    }
}

class LogoutButton extends React.Component {
    render() {
        return (<div>User: {this.props.LogoutButton.id}</div>);
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = ({
            loggedIn: token
                ? true
                : false,
            user: [],
            nowPlaying: {
                name: 'Not Checked',
                albumArt: ''
            },
            savedAlbums: {
                name: 'Not Checked',
                albumArt: ''
            },
            userPlaylists: [],
            albums: []
        });

        console.log(token);

        this.getMe();
        this.getNowPlaying();
        this.getUserPlaylists();
        this.getMySavedAlbums();
        console.log(this.state);
        //this.getUser();
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

    getMe() {
        spotifyApi.getMe().then((response) => {
            this.setState({user: response});
        });
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
        // {
        //     limit: 5,
        //     offset: 10
        // }
        spotifyApi.getUserPlaylists('envious1').then((response) => {
            this.setState({userPlaylists: response});
        });
    }

    getMySavedAlbums() {
        // {limit: 5, offset: 10}
        spotifyApi.getMySavedAlbums({limit: 50, offset: 0}).then((response) => {
            console.log(response);
            this.setState({albums: response});
        });
    }

    // const LogoutButton = () => {
    //     return <div>
    //         <h1>Hello World!</h1>
    //         <p>This is my first React Component.</p>
    //     </div>
    // }

    render() {

        var loginButton;
        if (this.state.loggedIn) {
            console.log("here222");
            loginButton = <LogoutButton LogoutButton={this.state.user}/>;
        } else {
            console.log("here");
            loginButton = <LoginButton/>;
        }
        console.log(this.state);
        return (<div className="App">
            {loginButton}

            <div id="now_playing">
                Now Playing: {this.state.nowPlaying.name}
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
            <h3>User Playlists:</h3>
            <Playlists Playlists={this.state.userPlaylists} onload="onload"/>

            <h3>User Albums:</h3>
            <Albums Albums={this.state.albums} onload="onload"/>
        </div>);
    }
}

export default App;
