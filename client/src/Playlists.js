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
            {
                this.props.Playlists.items.map((item) => {
                    return <a key={item.id} onClick={() => this.props.clicked(item.id)}>
                        <div key={item.id}>
                            <img src={item.images[0].url} style={{
                                    height: 150
                                }}/> {item.name}
                        </div>
                    </a>
                })
            }</div>);
    }
}

export default Playlists;
