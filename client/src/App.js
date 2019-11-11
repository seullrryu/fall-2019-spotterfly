import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Login from "./components/Login.js";
import Artists from "./components/Artists.js";
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      topArtists: { artists: 'Not Checked', artistsPic:""}, //, artistProfile: ''}
      topTracks: { tracks : 'Not Checked' },
      location: { latitude : 'Loading', longitude : 'Loading'}
    };

    if (token) {
      spotifyApi.setAccessToken(token);
    }
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
    spotifyApi.getMyCurrentPlaybackState().then(
      (response) => {
        console.log(response);
        this.setState({
          nowPlaying: { 
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          }
        });
      })
  }

  getTopArtists(){
    spotifyApi.getMyTopArtists({limit: 10, time_range: 'long_term'})
      .then((response) => {
        console.log(response);
        var arr = [];
        var picArray = []; 
        response.items.forEach(function(p){
          arr.push(p.name);
          picArray.push(p.images[0].url)
        });
        this.setState({
          topArtists: { 
              artists: arr,
              artistsPic: picArray
            }
        });
      });
  }

  getTopTracks(){
    spotifyApi.getMyTopTracks({limit: 10, time_range: 'long_term'})
      .then((response) => {
        console.log(response);
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
        <section class="profile">
          <nav>
              <div><Link to="/">Home</Link></div>
              <div><Link to="/profile">Profile</Link></div>
          </nav>
        
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

          <div id="top-artists">
            <h3>Your Top Artists: </h3>
            <div>
              Top Artists: { this.state.topArtists.artists }
              <br></br>
              Pics: {this.state.topArtists.artistsPic}
            </div>
            { this.state.loggedIn &&
              <button onClick={() => this.getTopArtists()}>
                Get Top Artists
              </button>
            }
          </div> 
          <div id="top-tracks">
            <h3>Your Top Tracks: </h3>
            <div>
              Top Artists: { this.state.topTracks.tracks }
            </div>
            { this.state.loggedIn &&
              <button onClick={() => this.getTopTracks()}>
                Get Top Tracks
              </button>
            }
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
          </div>
        );
    }
  }
}

export default App;  