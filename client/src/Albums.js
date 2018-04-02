import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import App from './App';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Albums extends Component {

    render() {
        if (this.props.Albums.items == undefined) 
            return <h1>No results</h1>

        return (<div id="album_view">
            {
                this.props.Albums.items.map((item) => {
                    return <a className="album_link" href={item.album.external_urls.spotify} target="_blank" key={item.id} onClick={() => console.log("clicked")}>
                        <div className="album" key={item.id}>
                            <img className="album_img" src={item.album.images[0].url} style={{
                                    height: 150
                                }}/>
                            <span className="album_name">{item.album.name}</span>
                        </div>
                    </a>
                })
            }</div>);
    }
}

export default Albums;
