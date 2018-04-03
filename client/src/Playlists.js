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

        return (<div id="playlist_view">
            {
                this.props.Playlists.items.map((item) => {
                    return <a className="playlist_link" href={item.external_urls.spotify} target="_blank" key={item.id} onClick={() => console.log("clicked")}>
                        <div className="playlist" key={item.id}>
                            <img className="playlist_img" src={item.images.length > 0
                                    ? item.images[0].url
                                    : 'http://lorempixel.com/150/150/'} style={{
                                    height: 150
                                }}/>
                            <span className="playlist_name">{item.name}</span>
                        </div>
                    </a>
                })
            }</div>);
    }
}

export default Playlists;
