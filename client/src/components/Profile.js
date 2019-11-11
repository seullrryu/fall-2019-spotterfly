import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import '../App.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Profile extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      topArtists: { artists: 'Not Checked' }, //, artistProfile: ''}
      topTracks: { tracks : 'Not Checked' },
      location: { latitude : 'Loading', longitude : 'Loading'}
    };
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }

  getTopArtists(){
    spotifyApi.getMyTopArtists({limit: 20})
      .then((response) => {
        var arr = [];
        response.items.forEach(function(p){
          arr.push(p.name);
        });
        this.setState({
          topArtists: { 
              artists: arr.join(', ')
            }
        });
      });
  }

  getTopTracks(){
    spotifyApi.getMyTopTracks()
      .then((response) => {
        var arr = [1];
        response.items.forEach(function(p){
          arr.push(p.name);
        });
        this.setState({
          topTracks: { 
              tracks: arr.join(', ')
            }
        });
      })
  }

  getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        this.setState({
          location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
          }
        })
      );
    }
  }

  render() {
    return (
      <div class="container">
        <section class="profile">
          <nav>
              <div><Link to="/">Home</Link></div>
              <div><Link to="/profile">Profile</Link></div>
          </nav>
        
          {/* <div>
              Now Playing: { this.state.nowPlaying.name }
            </div>
          <div>
            <img src={this.state.nowPlaying.albumArt} alt={this.state.nowPlaying.name} style={{ height: 150 }}/>
          </div> */}

            {/* <button onClick={() => this.getNowPlaying()}>
              Check Now Playing
            </button> */}

          <div id="top-artists">
            <h3>Your Top Artists: </h3>
            <p>{this.getNowPlaying()}</p>
          </div> 
          <div id="top-tracks">
            <h3>Your Top Tracks: </h3>
          </div>
        </section>
      </div>
    );
  }
}

export default Profile;  