import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import App from './App';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Playlists extends Component {

    render() {
        console.log("yolo");
        var arr = ['a', 'b', 'c', 'd'];
        // console.log(this.props.Playlists, "whoop whoop");
        // if (this.props.Playlists.items != undefined) {
        //     console.log((this.props.Playlists.items));
        //     console.log(this.props.Playlists.items.length);
        //     console.log((this.props.Playlists.items).length);
        //     console.log(this.props.Playlists, "toot toot");
        // }
        if (this.props.Playlists.items == undefined) 
            return <h1>No results</h1>

        return (<div>
            <ul>
                {
                    this.props.Playlists.items.map((item) => {
                        return <a key={item.id} onClick={() => this.props.clicked(item.id)}>
                            <li key={item.id}>{item.name}</li>
                        </a>
                    })
                }</ul>
        </div>);
    }
}

export default Playlists;
