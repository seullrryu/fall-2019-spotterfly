import React, { Component } from 'react';
import Login from "./Login.js";
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

  getNowPlaying(){
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
        var arr = [];
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
    if (this.state.loggedIn === true) {
      return (
        <section class="top-artists">
          <h2>Thanks for logging in! Your top artists have been imported. </h2>
          <br></br>
          <p>Your top artists are: </p>
          <div class="display-box">
              <ol>
                <li>However we can get the top artists.</li>
              </ol>
          </div>
        </section>
      );
    }
    else {
      return (
        <div className="App">
          <Login></Login>
    
            <div>
              Now Playing: { this.state.nowPlaying.name }
            </div>
            <div>
              <img src={this.state.nowPlaying.albumArt} alt={this.state.nowPlaying.name} style={{ height: 150 }}/>
            </div>
            { this.state.loggedIn &&
              <button onClick={() => this.getNowPlaying()}>
                Check Now Playing
              </button>
            }
    
            <div>
              Top Artists: { this.state.topArtists.artists }
            </div>
            { this.state.loggedIn && 
              <button onClick={() => this.getTopArtists()}>
                Check Top Artists
              </button>
            }
    
            <div>
              Top Tracks: { this.state.topTracks.tracks }
            </div>
            { this.state.loggedIn && 
              <button onClick={() => this.getTopTracks()}>
                Check Top Tracks
              </button>
            }
    
            <div>
              Latitude: { this.state.location.latitude }
            </div>
            <div>
              Longitude: { this.state.location.longitude }
            </div>
            { <button onClick={() => this.getLocation()}>
                Check Location
              </button>
            }
    
            <footer>Copyright © Seulmin Ryu, Yena Park, Alexander Goldman, Zhongheng Sun 2019</footer>
          </div>
        );
    }
  }
}

export default Profile;  